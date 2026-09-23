#!/usr/bin/env bash
set -e

# ==============================================================================
# JetAcademie - PostgreSQL Restore Script
# ==============================================================================
# Usage:
#   ./scripts/restore-db.sh <backup_file.sql>
# ==============================================================================

BACKUP_FILE="$1"

if [ -z "$BACKUP_FILE" ] || [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Error: Backup file is required."
  echo "Usage: ./scripts/restore-db.sh <backup_file.sql>"
  exit 1
fi

echo "⚠️ Restoring PostgreSQL database from: $BACKUP_FILE..."

if command -v docker >/dev/null 2>&1 && docker compose ps db >/dev/null 2>&1; then
  docker compose exec -T db psql -U "${POSTGRES_USER:-jetacademie}" -d "${POSTGRES_DB:-jetacademie}" < "$BACKUP_FILE"
elif [ -n "$DATABASE_URL" ]; then
  psql "$DATABASE_URL" < "$BACKUP_FILE"
else
  echo "❌ Error: Could not determine target database (docker compose db not running and DATABASE_URL unset)."
  exit 1
fi

echo "✓ Database restore completed successfully!"
