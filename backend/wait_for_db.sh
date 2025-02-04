#!/usr/bin/env sh
set -e

host="$POSTGRES_HOST"
port="$POSTGRES_PORT"

echo "Waiting for postgres..."
until nc -z $host $port; do
  sleep 0.5
done
echo "PostgreSQL started"

exec "$@"
