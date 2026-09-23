#!/bin/sh
set -e

# If the container runs as root, drop privileges to nextjs user
if [ "$(id -u)" = '0' ]; then
  exec su-exec nextjs "$@"
fi

exec "$@"
