#!/bin/sh
set -e

if [ "$NODE_ENV" = "production" ]; then
  case "$BETTER_AUTH_URL" in
    https://*) ;;
    *) echo "BETTER_AUTH_URL must be the external HTTPS URL in production." >&2; exit 1 ;;
  esac
  if [ "${BETTER_AUTH_URL%/}" != "${NEXT_PUBLIC_APP_URL%/}" ]; then
    echo "BETTER_AUTH_URL and NEXT_PUBLIC_APP_URL must match in production." >&2
    exit 1
  fi
fi

if [ "$(id -u)" = '0' ]; then
  echo "JetAcademie must not run as root." >&2
  exit 1
fi

exec "$@"
