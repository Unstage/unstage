---
description: Help diagnose and fix common development issues
---

You are helping a developer troubleshoot issues with their Unstage development environment. Follow this diagnostic process to identify and resolve problems.

## Diagnostic Process

### 1. Gather Information

Ask the developer:
- What command were they running when the issue occurred?
- What error message did they see? (full error text)
- Which app/package is affected? (api, dashboard, web, or a package)
- Have they made recent changes?
- Is this a fresh setup or existing environment?

### 2. Common Issues & Solutions

#### Port Already in Use

**Symptoms**: `EADDRINUSE` error when starting apps

**Solution**:
```bash
# Find and kill process on port
lsof -ti:8787 | xargs kill -9  # API
lsof -ti:3000 | xargs kill -9  # Web
lsof -ti:3001 | xargs kill -9  # Dashboard

# Or change port in .env files
```

#### Database Connection Failed

**Symptoms**: `connection refused`, `ECONNREFUSED`, database errors

**Diagnose**:
```bash
# Check if PostgreSQL is running
pg_isready

# Test connection string
psql $DATABASE_URL -c "SELECT 1"

# Check database exists
psql -l | grep unstage
```

**Solutions**:
- Start PostgreSQL: `brew services start postgresql` (macOS)
- Create database: `createdb unstage`
- Verify DATABASE_URL in all .env.local files
- Run migrations: `pnpm --filter @unstage/db db:migrate`

#### Type Errors / Module Not Found

**Symptoms**: TypeScript errors, `Cannot find module`, import errors

**Solution**:
```bash
# Rebuild all packages
pnpm build

# Clean and reinstall
rm -rf node_modules
pnpm install

# Clear turbo cache
pnpm clean

# Restart TypeScript server in IDE
```

#### Environment Variable Missing

**Symptoms**: `env validation error`, `undefined is not valid`

**Solution**:
1. Check .env.local exists in affected app/package
2. Compare with .env.example
3. Ensure no typos in variable names
4. Restart dev server after adding variables

#### Build Failures

**Symptoms**: Build errors, compilation errors

**Diagnose**:
```bash
# Check specific package
pnpm --filter @unstage/db build

# View full error output
pnpm build 2>&1 | tee build.log
```

**Solutions**:
- Fix TypeScript errors shown in output
- Ensure dependencies are installed
- Check for circular dependencies
- Rebuild in correct order (packages → apps)

#### API Returns 500 Errors

**Symptoms**: API requests failing, 500 status codes

**Diagnose**:
```bash
# Check API logs
pnpm --filter @unstage/api dev

# Test health endpoint
curl http://localhost:8787/health

# Check database connectivity
```

**Common causes**:
- Database not migrated
- Missing environment variables
- Auth configuration incorrect
- API key cache issues

#### Authentication Not Working

**Symptoms**: Login fails, session errors, redirect loops

**Check**:
- BETTER_AUTH_SECRET matches in API and dashboard
- BETTER_AUTH_URL is correct for each app
- Database has auth tables (sessions, users)
- Cookies are enabled in browser

**Solution**:
```bash
# Clear browser cookies
# Restart both API and dashboard
# Verify auth configuration in .env files
```

#### Slow Performance / Memory Issues

**Symptoms**: Apps running slowly, high memory usage

**Solutions**:
```bash
# Disable React Compiler temporarily
# Remove from next.config.ts: reactCompiler: true

# Reduce log level
# In API .env: LOG_LEVEL=warn

# Clear build cache
pnpm clean

# Close unused apps
# Only run the apps you're actively developing
```

#### Migration Errors

**Symptoms**: Migration fails, schema errors

**Solution**:
```bash
cd packages/db

# Reset database (DESTRUCTIVE - dev only!)
pnpm db:push --force

# Or regenerate and run migrations
pnpm db:generate
pnpm db:migrate

# Check migration history
psql $DATABASE_URL -c "SELECT * FROM drizzle_migrations"
```

### 3. Advanced Diagnostics

If basic solutions don't work:

**Check package versions**:
```bash
node --version  # Should be >= 24
pnpm --version  # Should be >= 10.14.0
```

**Verify monorepo integrity**:
```bash
# Check for phantom dependencies
pnpm why <package-name>

# Verify workspace links
ls -la node_modules/@unstage/
```

**Database state**:
```bash
# Open Drizzle Studio
pnpm --filter @unstage/db db:studio

# Inspect tables directly
psql $DATABASE_URL
\dt
SELECT * FROM users;
```

**API debugging**:
```bash
# Enable debug logging
# In API .env: LOG_LEVEL=debug

# Test specific endpoints
curl -v http://localhost:8787/health
```

### 4. Nuclear Options (Last Resort)

If nothing else works:

```bash
# 1. Clean everything
pnpm clean
rm -rf node_modules
rm -rf .next
rm -rf .turbo
rm pnpm-lock.yaml

# 2. Reinstall
pnpm install

# 3. Rebuild
pnpm build

# 4. Reset database (DESTRUCTIVE!)
dropdb unstage
createdb unstage
pnpm --filter @unstage/db db:migrate

# 5. Restart dev servers
pnpm dev
```

### 5. Get More Help

If issue persists:
1. Check GitHub issues
2. Review recent commits for breaking changes
3. Ask in team chat with full error logs
4. Check if it's a known issue in dependencies

## Troubleshooting Checklist

Use this to systematically check common issues:

- [ ] Node.js version >= 24
- [ ] pnpm version >= 10.14.0
- [ ] PostgreSQL running and accessible
- [ ] All .env.local files created and filled
- [ ] DATABASE_URL correct in all .env.local
- [ ] Database migrations run successfully
- [ ] Dependencies installed (pnpm install)
- [ ] Packages built (pnpm build)
- [ ] No port conflicts
- [ ] No other Unstage processes running
- [ ] Browser cookies/cache cleared
- [ ] IDE TypeScript server restarted

Walk through this checklist with the developer and fix any issues found.
