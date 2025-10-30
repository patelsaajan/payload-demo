#!/bin/sh
set -e

echo "Running database migrations..."
node node_modules/payload/bin/index.js migrate

echo "Starting Next.js server..."
exec node server.js
