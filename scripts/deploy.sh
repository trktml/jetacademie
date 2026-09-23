#!/usr/bin/env bash
set -e

# ==============================================================================
# JetAcademie - One-Command Tailscale Remote Deployment Script
# ==============================================================================
# Target Tailscale Server: 100.80.51.7
# Usage:
#   ./scripts/deploy.sh [user@100.80.51.7] [target_directory]
# Examples:
#   ./scripts/deploy.sh
#   ./scripts/deploy.sh ubuntu@100.80.51.7
#   ./scripts/deploy.sh root@100.80.51.7 /opt/jetacademie
# ==============================================================================

DEFAULT_TAILSCALE_IP="100.80.51.7"
INPUT_TARGET="${1:-${DEPLOY_HOST}}"

if [ -z "$INPUT_TARGET" ]; then
  # Default to current user or prompt/use 100.80.51.7
  TARGET_HOST="$DEFAULT_TAILSCALE_IP"
  TAILSCALE_IP="$DEFAULT_TAILSCALE_IP"
else
  TARGET_HOST="$INPUT_TARGET"
  TAILSCALE_IP=$(echo "$TARGET_HOST" | awk -F'@' '{print $NF}')
fi

TARGET_DIR="${2:-${DEPLOY_DIR:-/opt/jetacademie}}"

echo "=============================================================================="
echo "🚀 JetAcademie - Deploying to Tailscale Host: $TARGET_HOST"
echo "📂 Remote directory: $TARGET_DIR"
echo "🔌 PostgreSQL Host Port: 5433 (preserving existing port 5432)"
echo "🔒 PostgreSQL Bind IP: $TAILSCALE_IP (Strict Tailscale isolation, public WAN blocked)"
echo "=============================================================================="

# 1. Test SSH connectivity
echo -e "\n[1/5] Testing connection over Tailscale SSH..."
if ! ssh -o ConnectTimeout=8 -o BatchMode=yes "$TARGET_HOST" "echo '✓ Connection successful: \$(hostname)'" 2>/dev/null; then
  echo "⚠️ Attempting interactive SSH connection to $TARGET_HOST..."
  ssh -o ConnectTimeout=10 "$TARGET_HOST" "echo '✓ Connection established: \$(hostname)'"
fi

# 2. Ensure remote directory exists
echo -e "\n[2/5] Initializing remote directory structure..."
ssh "$TARGET_HOST" "mkdir -p '$TARGET_DIR'"

# 3. Synchronize application files
echo -e "\n[3/5] Synchronizing repository files..."
rsync -avz --delete \
  --exclude "node_modules" \
  --exclude ".next" \
  --exclude ".git" \
  --exclude ".DS_Store" \
  --exclude "auth.sqlite*" \
  --exclude ".env.local" \
  --exclude ".env" \
  ./ "$TARGET_HOST:$TARGET_DIR/"

# 4. Configure remote environment & secrets
echo -e "\n[4/5] Checking remote .env configuration..."
ssh "$TARGET_HOST" "bash -s '$TARGET_DIR' '$TAILSCALE_IP'" << 'EOF'
  TARGET_DIR="$1"
  TAILSCALE_IP="$2"
  cd "$TARGET_DIR"
  if [ ! -f .env ]; then
    echo "Creating production .env on remote server..."
    cp .env.example .env
    
    # Generate random strong secrets
    AUTH_SECRET=$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 40)
    PG_PASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 24)
    
    sed -i.bak "s|development-secret-must-be-at-least-32-characters-long|$AUTH_SECRET|g" .env 2>/dev/null || true
    sed -i.bak "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$PG_PASS|g" .env 2>/dev/null || true
    
    # Ensure port 5433 is set for Postgres host binding and bound strictly to Tailscale IP
    grep -q "PG_BIND_IP=" .env || echo "PG_BIND_IP=$TAILSCALE_IP" >> .env
    grep -q "PG_HOST_PORT=" .env || echo "PG_HOST_PORT=5433" >> .env
    grep -q "HOST_PORT=" .env || echo "HOST_PORT=3001" >> .env
    grep -q "POSTGRES_USER=" .env || echo "POSTGRES_USER=jetacademie" >> .env
    grep -q "POSTGRES_PASSWORD=" .env || echo "POSTGRES_PASSWORD=$PG_PASS" >> .env
    grep -q "POSTGRES_DB=" .env || echo "POSTGRES_DB=jetacademie" >> .env
    if grep -q "DATABASE_URL=" .env; then
      sed -i.bak "s|^DATABASE_URL=.*|DATABASE_URL=postgres://jetacademie:$PG_PASS@db:5432/jetacademie|g" .env 2>/dev/null || true
    else
      echo "DATABASE_URL=postgres://jetacademie:$PG_PASS@db:5432/jetacademie" >> .env
    fi
    
    rm -f .env.bak
    echo "✓ New .env created with cryptographically secure passwords (PG_BIND_IP=$TAILSCALE_IP, PG_HOST_PORT=5433, HOST_PORT=3001)."
  else
    echo "✓ Existing remote .env retained."
    # Ensure DATABASE_URL uses internal port 5432 (not external host port 5433)
    if grep -q "DATABASE_URL=" .env; then
      sed -i.bak -E 's|:5433/|:5432/|g; s|@localhost:|@db:|g; s|@127.0.0.1:|@db:|g' .env 2>/dev/null || true
      rm -f .env.bak
      echo "✓ Ensured DATABASE_URL points to internal db:5432."
    fi
    # Ensure PG_BIND_IP is bound strictly to Tailscale IP
    if ! grep -q "PG_BIND_IP=" .env; then
      echo "PG_BIND_IP=$TAILSCALE_IP" >> .env
      echo "✓ Added PG_BIND_IP=$TAILSCALE_IP to existing .env (strict Tailscale isolation)."
    else
      sed -i.bak "s|^PG_BIND_IP=.*|PG_BIND_IP=$TAILSCALE_IP|g" .env 2>/dev/null || true
      rm -f .env.bak
      echo "✓ Updated PG_BIND_IP=$TAILSCALE_IP in existing .env."
    fi
    # Ensure PG_HOST_PORT is 5433 even in existing .env if missing
    if ! grep -q "PG_HOST_PORT=" .env; then
      echo "PG_HOST_PORT=5433" >> .env
      echo "✓ Added PG_HOST_PORT=5433 to existing .env."
    fi
    if ! grep -q "HOST_PORT=" .env; then
      echo "HOST_PORT=3001" >> .env
      echo "✓ Added HOST_PORT=3001 to existing .env."
    fi
  fi
EOF

# 5. Build and launch containers via Docker Compose
echo -e "\n[5/5] Building and starting services with Docker Compose..."
ssh "$TARGET_HOST" "cd '$TARGET_DIR' && docker compose pull db && docker compose up -d --build"

# Verify health status
echo -e "\n⏳ Verifying application health status..."
sleep 5
ssh "$TARGET_HOST" "cd '$TARGET_DIR' && docker compose ps"

# Extract the remote postgres password to display migration command
REMOTE_PG_PASS=$(ssh "$TARGET_HOST" "grep '^POSTGRES_PASSWORD=' '$TARGET_DIR/.env' | cut -d= -f2")

echo -e "\n=============================================================================="
echo "🎉 Deployment to Tailscale host ($TARGET_HOST) completed successfully!"
echo "=============================================================================="
echo "🌐 Web App Access (Port 3001 avoids conflict with Dokploy on 3000):"
echo "   http://100.80.51.7:3001"
echo ""
echo "🔒 Instant HTTPS with Tailscale Serve:"
echo "   ssh $TARGET_HOST 'tailscale serve --bg 3001'"
echo ""
echo "📦 PostgreSQL Migration (from local machine over Tailscale):"
echo "   DATABASE_URL=\"postgres://jetacademie:${REMOTE_PG_PASS}@100.80.51.7:5433/jetacademie\" bun scripts/migrate-sqlite-to-pg.ts"
echo "=============================================================================="
