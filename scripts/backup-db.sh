#!/usr/bin/env bash
set -e

# ==============================================================================
# JetAcademie - PostgreSQL Backup Script
# ==============================================================================
# Usage:
#   ./scripts/backup-db.sh [output_file]
# ==============================================================================

BACKUP_DIR="${BACKUP_DIR:-./backups}"
mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUT_FILE="${1:-$BACKUP_DIR/jetacademie_backup_$TIMESTAMP.sql}"

echo "📦 Creating PostgreSQL database backup..."

if command -v docker >/dev/null 2>&1 && docker compose ps db >/dev/null 2>&1; then
  docker compose exec -T db pg_dump -U "${POSTGRES_USER:-jetacademie}" "${POSTGRES_DB:-jetacademie}" > "$OUT_FILE"
elif [ -n "$DATABASE_URL" ]; then
  pg_dump "$DATABASE_URL" > "$OUT_FILE"
else
  echo "❌ Error: Could not determine database to backup (docker compose db not running and DATABASE_URL unset)."
  exit 1
fi

echo "✓ Backup created successfully at: $OUT_FILE"
ls -lh "$OUT_FILE"
