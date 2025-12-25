#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Deployment for Codex..."

# Ensure we are in the project root
cd "$(dirname "$0")/.."

# 1. Setup Environment Path
export PATH="$HOME/.bun/bin:$PATH"

# 2. Environment Check
echo "🔑 Checking environment in $(pwd)..."

# If .env is missing and we are in a runner, try to find the "real" .env in the site directory
SITE_DIR="/home/syrian/domains/codex.syrian.zone/public_html"
SITE_ENV="$SITE_DIR/.env"

if [ ! -f ".env" ] && [ -f "$SITE_ENV" ]; then
    echo "🔗 Symlinking .env from $SITE_ENV"
    ln -s "$SITE_ENV" .env
fi

if [ ! -f ".env" ]; then
    echo "❌ Error: .env file missing at $(pwd)/.env"
    echo "Please ensure your production .env exists at $SITE_ENV"
    exit 1
fi

# 3. Backend Deployment (Laravel)
echo "🐘 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

echo "📂 Setting permissions..."
chmod -R 775 storage bootstrap/cache

echo "🗄️ Running migrations..."
php artisan migrate --force

# 4. Frontend Deployment (React/Vite)
echo "⚛️  Installing JS dependencies..."
bun install

echo "🛠️ Building assets..."
bun run build

# 5. Sync to Live Directory
echo "🔄 Syncing files to live directory: $SITE_DIR"
# Exclusion list to avoid overwriting or deleting persistent directories
rsync -avz --delete --exclude='.git' --exclude='node_modules' --exclude='storage' --exclude='.env' ./ "$SITE_DIR/"

# 6. Optimization & Cleanup (In the live directory)
echo "🧹 Clearing and caching in live directory..."
cd "$SITE_DIR"
php artisan optimize:clear
php artisan optimize

# 7. Restart Workers
echo "🔄 Restarting queue workers..."
php artisan queue:restart

echo "✅ Deployment Finished Successfully!"
