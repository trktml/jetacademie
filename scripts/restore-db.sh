#!/usr/bin/env bash
set -euo pipefail

BACKUP_FILE="${1:-}"
if [ ! -f "$BACKUP_FILE" ] || [ ! -r "$BACKUP_FILE" ]; then
  echo "Usage: ./scripts/restore-db.sh <trusted-backup.sql>" >&2
  exit 1
fi

# Use a single transaction and invalidate sessions even when restoring an older dump.
revoke_sessions=$(cat <<'SQL'
DO $restore$
BEGIN
  IF to_regclass('public.session') IS NOT NULL THEN
    DELETE FROM public.session;
  END IF;
  IF to_regclass('public.curriculum_editor_sessions') IS NOT NULL THEN
    DELETE FROM public.curriculum_editor_sessions;
  END IF;
  IF to_regclass('public.verification') IS NOT NULL THEN
    DELETE FROM public.verification;
  END IF;
END
$restore$;
SQL
)
args=(-X --no-password --set ON_ERROR_STOP=1 --single-transaction --file - --command "$revoke_sessions")
if [ -n "${PGDATABASE:-}" ]; then
  psql "${args[@]}" < "$BACKUP_FILE"
else
  docker compose exec -T db sh -c '
    if [ -n "${POSTGRES_APP_PASSWORD:-}" ]; then
      set -- --command "SET ROLE jetacademie_app" "$@"
    fi
    exec psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" "$@"
  ' psql "${args[@]}" < "$BACKUP_FILE"
fi
echo "Database restore completed; previous sessions were revoked."
