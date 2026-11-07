#!/usr/bin/env bash
set -euo pipefail

TARGET_HOST="${1:-${DEPLOY_HOST:-100.80.51.7}}"
TARGET_DIR="${2:-${DEPLOY_DIR:-/opt/jetacademie}}"
if ! [[ "$TARGET_HOST" =~ ^([a-zA-Z0-9_][a-zA-Z0-9_.-]*@)?[a-zA-Z0-9][a-zA-Z0-9.-]*$ ]] ||
   ! [[ "$TARGET_DIR" =~ ^/[a-zA-Z0-9_./-]+$ ]]; then
  echo "Use a hostname (optionally user@host) and an absolute deployment directory." >&2
  exit 1
fi
case "$TARGET_DIR/" in
  *//*|*/../*|*/./*) echo "Use a normalized deployment directory without a trailing slash." >&2; exit 1 ;;
esac

repo="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
stage="$(mktemp -d)"
trap 'rm -rf -- "$stage"' EXIT
# Take one reviewed Git snapshot. Ignored files and working copies never go to the host.
git -C "$repo" archive HEAD -- Dockerfile Dockerfile.postgres Dockerfile.postgres.dockerignore \
  .dockerignore docker-entrypoint.sh docker-compose.yml \
  docker-compose.db-tunnel.yml .env.example package.json bun.lock next.config.ts tsconfig.json \
  postcss.config.mjs .prettierignore .prettierrc.json scripts src public | tar -xf - -C "$stage"

echo "Deploying $(git -C "$repo" rev-parse --short HEAD) to $TARGET_HOST:$TARGET_DIR"
ssh -o ConnectTimeout=10 "$TARGET_HOST" "umask 077; mkdir -p '$TARGET_DIR'"
# Delete obsolete files only in the managed source trees, never at the deployment root.
rsync -rtz --delete "$stage/src" "$stage/public" "$stage/scripts" "$TARGET_HOST:$TARGET_DIR/"
rsync -rtz "$stage"/.[!.]* "$stage"/*.* "$stage/Dockerfile" "$TARGET_HOST:$TARGET_DIR/"

ssh "$TARGET_HOST" "bash -s '$TARGET_DIR'" <<'REMOTE'
  set -euo pipefail
  umask 077
  cd "$1"
  if [ ! -f .env ]; then
    ts_dns=$(tailscale status --json | awk -F'"' '
      /"Self":/ { self=1 }
      self && /"DNSName":/ && !name { name=$4 }
      END { sub(/\.$/, "", name); print name }
    ')
    if ! [[ "$ts_dns" =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]*\.ts\.net$ ]]; then
      echo "Create a private .env with the external HTTPS origin (see .env.example)." >&2
      exit 1
    fi
    auth_secret=$(openssl rand -hex 32)
    db_password=$(openssl rand -hex 32)
    app_password=$(openssl rand -hex 32)
    (
      set -C
      cat > .env <<ENV
BETTER_AUTH_URL=https://$ts_dns
NEXT_PUBLIC_APP_URL=https://$ts_dns
BETTER_AUTH_SECRET=$auth_secret
POSTGRES_PASSWORD=$db_password
POSTGRES_APP_PASSWORD=$app_password
APP_DATABASE_URL=postgres://jetacademie_app:$app_password@db:5432/jetacademie
ENV
    )
  fi
  chmod 600 .env
  docker compose -f docker-compose.yml build --pull
  docker compose -f docker-compose.yml up -d --wait --wait-timeout 120
REMOTE

echo "Deployment is healthy. Configure Tailscale Serve or your HTTPS reverse proxy if needed."
