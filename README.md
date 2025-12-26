# Codex

Codex is a social platform built for developers to share projects, discuss ideas, and connect with peers. We've built this functionality using Laravel and React, aiming to provide a smooth and engaging experience.

## Tech Stack

We utilize a modern stack to ensure performance and developer experience:

- **Backend:** [Laravel](https://laravel.com)
- **Frontend:** [React](https://react.dev) with [Inertia.js](https://inertiajs.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Runtime:** [Bun](https://bun.sh) (for JavaScript environment)
- **Database:** Compatible with MySQL, MariaDB, or SQLite
- **Authentication:** Integrated GitHub OAuth

## Project Structure

To help you navigate the codebase, here is a brief overview of the key directories:

- **`app/Http/Controllers`**: This directory contains the backend logic and API endpoints (e.g., `RepoController`, `PostController`).
- **`app/Models`**: Here you will find the Eloquent models representing our database tables (e.g., `User`, `Repo`, `Post`).
- **`resources/js/Pages`**: This directory houses the frontend views which are rendered by Inertia.js.
- **`resources/js/components`**: Our reusable UI components, primarily built using shadcn/ui, are located here.
- **`routes/web.php`**: This file defines all the web routes for the application.

## Deployment & Setup (Local Development)

If you'd like to run Codex locally for testing or development, please follow these steps. We hope this guide makes the process straightforward.

### Prerequisites

Before starting, please ensure you have the following installed on your machine:
- [PHP](https://www.php.net/) (8.2 or higher)
- [Composer](https://getcomposer.org/)
- [Bun](https://bun.sh/) (or Node.js)
- A running database server we use MySQL for production

### Installation Steps

1. **Clone the repository**
   Start by cloning the codebase to your local machine:
   ```bash
   git clone <repository-url>
   cd codex
   ```

2. **Install Backend Dependencies**
   Use Composer to install the PHP dependencies:
   ```bash
   composer install
   ```

3. **Install Frontend Dependencies**
   We use Bun for managing frontend packages (you can also use npm/yarn if you prefer):
   ```bash
   bun install
   ```

4. **Environment Configuration**
   Create your environment configuration file by copying the example:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file in your text editor and update the database credentials and GitHub OAuth settings:
   ```ini
   APP_NAME=Codex
   APP_URL=http://localhost:8000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=codex
   DB_USERNAME=root
   DB_PASSWORD=your_password

   # GitHub OAuth credentials (required for login)
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_REDIRECT_URI="${APP_URL}/auth/github/callback"
   ```

5. **Generate Application Key**
   Generate a unique application key for your instance:
   ```bash
   php artisan key:generate
   ```

6. **Run Migrations**
   Set up the database tables by running the migrations:
   ```bash
   php artisan migrate
   ```

7. **Run the Application**
   To start the development environment, you will need to run the backend and frontend servers simultaneously in separate terminal windows.

   **Terminal 1 (Backend):**
   ```bash
   php artisan serve
   ```

   **Terminal 2 (Frontend):**
   ```bash
   bun run dev
   ```

   Once both are running, open your browser and visit `http://localhost:8000` to see the application in action.

## Contributing

We are grateful for any contributions! If you encounter issues or have suggestions, please feel free to open an issue or submit a pull request. We appreciate your specific feedback.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
