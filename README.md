# Unstage

> Hire engineers based on real skills, not algorithm memorization

Unstage is an AI-powered technical interview platform that evaluates candidates through realistic coding scenarios, collaborative problem-solving, and predictive job performance insights.

## Tech Stack

- **Frontend**: React 19, Next.js 16, TailwindCSS 4
- **Backend**: Hono 4, tRPC 11
- **Database**: PostgreSQL, Drizzle ORM
- **Auth**: better-auth with email OTP
- **Monorepo**: Turbo, pnpm
- **Code Quality**: Biome, TypeScript

## Project Structure

```
unstage/
├── apps/
│   ├── api/          # Backend API (Hono + tRPC)
│   ├── dashboard/    # Recruiter dashboard (Next.js)
│   └── web/          # Public website (Next.js)
├── packages/
│   ├── auth/         # Authentication
│   ├── cache/        # LRU caching
│   ├── db/           # Database schema & queries
│   ├── email/        # Email templates
│   ├── encryption/   # Crypto utilities
│   ├── location/     # Geolocation
│   ├── ui/           # Component library
│   └── utils/        # Shared utilities
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 24
- pnpm 10.14.0 or higher
- PostgreSQL database

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
# Copy .env.example files in each app/package and configure

# Database setup
cd packages/db
pnpm db:generate
pnpm db:migrate

# Run development servers
pnpm dev
```

This starts all apps:
- API: http://localhost:8787
- Dashboard: http://localhost:3001
- Web: http://localhost:3000

### Development

```bash
# Run specific app
pnpm --filter @unstage/api dev
pnpm --filter @unstage/dashboard dev
pnpm --filter @unstage/web dev

# Build all apps
pnpm build

# Code quality
pnpm lint
pnpm format
```

## Apps

### API (`apps/api`)
Backend service with REST and tRPC endpoints. Handles authentication, interviews, organizations, and user management.

- OpenAPI documentation at `/`
- Health check at `/health`
- tRPC at `/trpc/*`

### Dashboard (`apps/dashboard`)
Recruiter-facing interface for managing interviews, teams, and candidates.

- Interview creation and editing
- Scenario library
- Team management
- Candidate tracking

### Web (`apps/web`)
Public-facing website and candidate interview interface.

- Landing pages
- Pricing
- Interview taking experience

## Packages

- **db**: PostgreSQL database with Drizzle ORM
- **auth**: Email OTP authentication with better-auth
- **ui**: Shared React component library (20+ components)
- **cache**: LRU caching for API keys and users
- **email**: React-based email templates
- **encryption**: AES-256-GCM encryption utilities
- **location**: Geolocation from request headers
- **utils**: Shared utilities and validation

## Environment Variables

Each app and package has its own `.env.example` file. Copy and configure:

```bash
# Database
cp packages/db/.env.example packages/db/.env.local

# API
cp apps/api/.env.example apps/api/.env.local

# Dashboard
cp apps/dashboard/.env.example apps/dashboard/.env.local

# Web
cp apps/web/.env.example apps/web/.env.local
```

Required variables are validated at runtime using `t3-env`.

## Scripts

```bash
# Development
pnpm dev              # Start all apps
pnpm build            # Build all apps
pnpm clean            # Clean build artifacts

# Database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Drizzle Studio

# Code Quality
pnpm lint             # Lint all code
pnpm format           # Format all code
pnpm typecheck        # Type check all packages
```

## Architecture

Unstage uses a monorepo architecture with clearly separated concerns:

1. **Apps** contain user-facing applications
2. **Packages** provide shared functionality
3. **Turbo** orchestrates builds and caching
4. **pnpm** manages dependencies efficiently

### Dependency Graph

```
apps/api → auth, cache, db, email, encryption, utils
apps/dashboard → api (types), auth, db, email, location, ui
apps/web → db, email, ui
packages/auth → db
packages/cache → (standalone)
packages/db → (foundation)
packages/email → ui, utils
packages/ui → utils
```

## Claude Code Commands

We use Claude Code with custom slash commands to help with development. If you have Claude Code installed, you can use:

- **`/setup`** - Complete guided setup for new developers
  - Checks prerequisites
  - Configures environment variables
  - Sets up database
  - Verifies everything works

- **`/troubleshoot`** - Diagnose and fix development issues
  - Port conflicts
  - Database connection errors
  - Build failures
  - Authentication problems

- **`/add-package`** - Add new packages or apps to the monorepo
  - Creates proper structure
  - Sets up TypeScript config
  - Follows best practices

See [`.claude/README.md`](.claude/README.md) for more information.

## Contributing

1. Follow the existing code style (enforced by Biome)
2. Write tests for new features
3. Update documentation as needed
4. Use conventional commit messages

## License

Proprietary
