#!/bin/sh
set -e

# Ensure data directory exists for persistent sqlite databases
mkdir -p /app/data

# If the container runs as root, ensure nextjs user owns /app/data and drop privileges
if [ "$(id -u)" = '0' ]; then
  chown -R nextjs:nodejs /app/data 2>/dev/null || true
  chmod 775 /app/data 2>/dev/null || true
  exec su-exec nextjs "$@"
fi

exec "$@"
