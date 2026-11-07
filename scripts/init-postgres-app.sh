#!/usr/bin/env bash
set -euo pipefail

# The official image runs this only when initializing an empty data directory.
[ -n "${POSTGRES_APP_PASSWORD:-}" ] || exit 0
psql -X --set ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<'SQL'
\getenv app_password POSTGRES_APP_PASSWORD
CREATE ROLE jetacademie_app LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'app_password';
GRANT USAGE, CREATE ON SCHEMA public TO jetacademie_app;
SQL
