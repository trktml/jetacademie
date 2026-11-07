#!/usr/bin/env bash
set -euo pipefail
umask 077

BACKUP_DIR="${BACKUP_DIR:-./backups}"
OUT_FILE="${1:-$BACKUP_DIR/jetacademie_backup_$(date +'%Y%m%d_%H%M%S').sql}"
mkdir -p -- "$(dirname -- "$OUT_FILE")"
OUT_FILE="$(cd -- "$(dirname -- "$OUT_FILE")" && pwd -P)/$(basename -- "$OUT_FILE")"
if [ -e "$OUT_FILE" ] || [ -L "$OUT_FILE" ]; then
  echo "Backup destination already exists." >&2
  exit 1
fi
partial="$(mktemp "$OUT_FILE.tmp.XXXXXX")"
trap 'rm -f -- "$partial"' EXIT

# Copy the schema and account data, but never preserve live authentication material.
args=(
  --no-password --no-owner --no-acl
  --exclude-table-data=public.session
  --exclude-table-data=public.verification
  --exclude-table-data=public.curriculum_editor_sessions
  --exclude-table-data=public.auth_request_attempts
  --exclude-table-data=public.curriculum_editor_attempts
)
if [ -n "${PGDATABASE:-}" ]; then
  pg_dump "${args[@]}" > "$partial"
else
  docker compose exec -T db sh -c 'exec pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" "$@"' \
    pg_dump "${args[@]}" > "$partial"
fi
# Publish only a complete dump. A hard link cannot replace a file or follow a directory target.
if ! link "$partial" "$OUT_FILE"; then
  echo "Backup destination already exists." >&2
  exit 1
fi
printf 'Backup saved to %s\n' "$OUT_FILE"
