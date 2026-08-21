# Production Deployment Guide (Virtualmin/Apache)

This document outlines the steps to deploy Codex to a Virtualmin environment running Apache.

## 1. Server Requirements

Ensure your Virtualmin server has the following enabled:
- **PHP**: 8.2 or higher (Check under *Server Configuration > PHP Versions*)
- **Database**: MySQL 8.0+ or MariaDB 10.6+
- **Extensions**: bcmath, ctype, curl, dom, fileinfo, mbstring, pdo, tokenizer, xml
- **Runtime**: Bun (recommended) or Node.js

## 2. Initial Virtual Server Setup

1.  **Create Virtual Server**: In Virtualmin, create a new virtual server (e.g., `codex.yourdomain.com`).
2.  **Enable Features**: Ensure "MySQL database" and "Apache website" are checked.
3.  **SSH Access**: Ensure you can SSH into the server as the **virtual server owner** (not just root).

## 3. Application Setup

**Note**: Execute the following steps via SSH as the **virtual server owner** (e.g., `ssh admin@yourdomain.com`). Do NOT use root permissions for these file operations to avoid permission issues.

### Clone Repository
We recommend cloning the repository into the home directory, parallel to `public_html`.
```bash
# Go to home directory
cd $HOME

# Clone repo
git clone <your-repo-url> codex
cd codex
```

### Install Dependencies
```bash
# Backend
composer install --optimize-autoloader --no-dev

# Frontend
bun install
```

### Environment Configuration
```bash
cp .env.example .env
nano .env
```
Update the settings:
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://codex.yourdomain.com`
- **Database**: Use the credentials created by Virtualmin (check *Edit Databases*).

### Permissions
Since you are running as the server owner, standard permissions usually work fine. However, ensure `storage` and `cache` are writable.
```bash
chmod -R 775 storage bootstrap/cache
```

### Finalize Setup
```bash
# Generate key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Build frontend assets
bun run build
```

## 4. Apache Configuration (Document Root)

You need to tell Apache to serve these files from `codex/public` instead of the default `public_html`.

1.  Go to **Virtualmin > Server Configuration > Website Options**.
2.  Find **Website documents sub-directory**.
3.  Change it to point to your project's public folder.
    -   *Option 1 (path)*: Set it to `../codex/public` (relative to home).
    -   *Option 2 (absolute)*: `/home/yourusername/codex/public`.
4.  Save and Apply Changes.

**Alternative (Symlink method)**:
If you cannot change the setting above:
```bash
cd $HOME
rm -rf public_html
ln -s codex/public public_html
```

## 5. Supervisor Configuration (Queue Workers)

Since you are on a shared/VPS environment, you might need root access to set up Supervisor, or use a user-level cron if Supervisor isn't available.

**If you have Root access (Recommended):**

Create file: `/etc/supervisor/conf.d/codex-worker.conf`
**Important**: Change `user` to your Virtualmin username.

```ini
[program:codex-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /home/YOUR_USERNAME/codex/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=YOUR_USERNAME
numprocs=2
redirect_stderr=true
stdout_logfile=/home/YOUR_USERNAME/codex/storage/logs/worker.log
stopwaitsecs=3600
```
Then run: `sudo supervisorctl update`

**If you only have User access:**
Add a cron job to process the queue (less robust than Supervisor but works):
`crontab -e`
```cron
* * * * * php /home/YOUR_USERNAME/codex/artisan schedule:run >> /dev/null 2>&1
```

## 6. Optimization

Run these commands to verify everything is optimized for production:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 7. CI/CD with GitHub Actions

Codex is pre-configured for deployment via GitHub Actions using a **self-hosted runner**.

### Setting up the GitHub Runner:
1. Go to your GitHub Repository > **Settings** > **Actions** > **Runners**.
2. Click **New self-hosted runner**.
3. Select **Linux** and follow the instructions to install it on your VPS (under the virtual server user).
4. Run the `./config.sh` command to register the runner.
5. **Install as a System Service** (Critical for persistence):
   ```bash
   # Install the runner as a systemd service
   sudo ./svc.sh install

   # Start the service
   sudo ./svc.sh start

   # Check the status
   sudo ./svc.sh status
   ```
   This ensures the runner starts automatically when the server reboots.
6. If you are using Virtualmin, ensure the service is running as the **Virtual Server Owner** user, not root, to avoid permission issues during deployment.

### How it works:
- Every time you push to the `main` branch, the workflow in `.github/workflows/deploy.yml` triggers.
- It executes `scripts/deploy.sh`, which handles the composer install, bun build, and Laravel optimizations automatically.

