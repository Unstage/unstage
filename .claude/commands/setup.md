---
description: Guide new developers through local development setup
---

You are helping a new developer set up Unstage for local development. Follow this comprehensive checklist to ensure everything is configured correctly.

## Setup Process

### 1. Check Prerequisites

First, verify the development environment has the required tools:

```bash
# Check Node.js version (must be >= 24)
node --version

# Check pnpm version (must be >= 10.14.0)
pnpm --version

# Check if PostgreSQL is accessible
psql --version
```

If any are missing or outdated, provide installation instructions for their OS.

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install
```

Wait for installation to complete and check for any errors.

### 3. Environment Variables Setup

Guide the user through setting up environment variables for each app/package:

**Database (packages/db/.env.local)**
```bash
cp packages/db/.env.example packages/db/.env.local
```

Required:
- `DATABASE_URL` - PostgreSQL connection string
  - Format: `postgresql://user:password@host:port/database`
  - For local dev, typically: `postgresql://postgres:postgres@localhost:5432/unstage`

**API (apps/api/.env.local)**
```bash
cp apps/api/.env.example apps/api/.env.local
```

Required:
- `DATABASE_URL` - Same as above
- `BETTER_AUTH_SECRET` - Random 32+ character string (generate one)
- `BETTER_AUTH_URL` - `http://localhost:8787`
- `NODE_ENV` - `development`
- `PORT` - `8787`
- `LOG_LEVEL` - `info` or `debug`

Optional (for full features):
- `OPENAI_API_KEY` - OpenAI API key
- `RESEND_API_KEY` - Email service key
- `ALLOWED_API_ORIGINS` - `http://localhost:3000,http://localhost:3001`

**Dashboard (apps/dashboard/.env.local)**
```bash
cp apps/dashboard/.env.example apps/dashboard/.env.local
```

Required:
- `DATABASE_URL` - Same PostgreSQL URL
- `NEXT_PUBLIC_API_URL` - `http://localhost:8787`
- `BETTER_AUTH_SECRET` - Same as API
- `BETTER_AUTH_URL` - `http://localhost:3001`

Optional:
- `RESEND_API_KEY` - For emails
- `OPENAI_API_KEY` - For AI features

**Web (apps/web/.env.local)**
```bash
cp apps/web/.env.example apps/web/.env.local
```

Required:
- `DATABASE_URL` - Same PostgreSQL URL
- `NEXT_PUBLIC_API_URL` - `http://localhost:8787`

### 4. Database Setup

```bash
# Generate Drizzle migrations
cd packages/db
pnpm db:generate

# Run migrations to create tables
pnpm db:migrate

# Return to root
cd ../..
```

Verify the database has tables:
```bash
psql $DATABASE_URL -c "\dt"
```

Should show tables: users, organizations, interviews, candidates, api_keys, personas, scenarios

### 5. Build Packages

Build shared packages first (required for apps to work):

```bash
pnpm build --filter="@unstage/db"
pnpm build --filter="@unstage/auth"
pnpm build --filter="@unstage/ui"
pnpm build --filter="@unstage/cache"
pnpm build --filter="@unstage/email"
pnpm build --filter="@unstage/encryption"
pnpm build --filter="@unstage/location"
pnpm build --filter="@unstage/utils"
```

Or build all at once:
```bash
pnpm build
```

### 6. Start Development Servers

Start all apps in development mode:

```bash
# Start all apps (API, Dashboard, Web)
pnpm dev
```

Or start individually in separate terminals:
```bash
# Terminal 1 - API
pnpm --filter @unstage/api dev

# Terminal 2 - Dashboard
pnpm --filter @unstage/dashboard dev

# Terminal 3 - Web
pnpm --filter @unstage/web dev
```

### 7. Verify Everything Works

Check that all services are running:

**API** - http://localhost:8787
- Visit http://localhost:8787 - Should show Scalar API docs
- Check http://localhost:8787/health - Should return `{"status":"ok"}`

**Dashboard** - http://localhost:3001
- Visit http://localhost:3001 - Should show dashboard login

**Web** - http://localhost:3000
- Visit http://localhost:3000 - Should show landing page

### 8. Create Test Data (Optional)

Help them create a test account:

```bash
# Use Drizzle Studio to inspect/create data
pnpm --filter @unstage/db db:studio
```

Or guide them through signing up via the dashboard.

### 9. Common Issues & Troubleshooting

**Port conflicts**
- If ports 8787, 3000, or 3001 are in use, update PORT in .env files

**Database connection errors**
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL format
- Ensure database exists: `createdb unstage`

**Build errors**
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Clear turbo cache: `pnpm clean`

**Missing dependencies**
- Run `pnpm install` in root directory
- Ensure all package .env.local files are created

**Type errors**
- Rebuild packages: `pnpm build`
- Restart TypeScript server in your IDE

### 10. Next Steps

Once setup is complete, suggest:

1. Read the root README.md for architecture overview
2. Check individual app/package READMEs for specific details
3. Review the code structure
4. Try creating a test interview in the dashboard
5. Explore the API documentation at http://localhost:8787

## Success Criteria

Setup is complete when:
- ✅ All dependencies installed without errors
- ✅ Environment variables configured for all apps
- ✅ Database migrations run successfully
- ✅ All three apps start without errors
- ✅ Can access all three apps in browser
- ✅ Health check passes
- ✅ Can log in to dashboard

Ask the user to confirm each step before moving to the next one. Be patient and provide detailed help for any issues they encounter.
