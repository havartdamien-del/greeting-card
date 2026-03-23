#!/bin/sh
set -e

if [ ! -d vendor ]; then
  echo "📦 Installing vendors..."
  composer install --no-interaction
else
  echo "NOT Installing vendors..."
fi

exec "$@"