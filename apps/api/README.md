# @unstage/api

Backend API service for Unstage built with Hono and tRPC.

## Tech Stack

- **Framework**: Hono 4.10.4
- **RPC**: tRPC 11.7.1  
- **Database**: Drizzle ORM + PostgreSQL
- **Auth**: better-auth with API key support
- **Validation**: Zod schemas
- **Logging**: Pino with structured logging
- **Documentation**: OpenAPI + Scalar UI

## Features

- RESTful OpenAPI endpoints with auto-generated documentation
- Type-safe tRPC procedures for internal use
- API key authentication with scopes
- Rate limiting
- Request logging with PII redaction
- Health checks
- CORS support

## API Routes

###  tRPC (`/trpc/*`)

- `user.me` - Get current user
- `user.update` - Update user profile
- `organization.get` - Get organization details
- `organization.update` - Update organization
- `interview.create` - Create new interview
- `interview.get` - Get interview by ID
- `interview.list` - List interviews

### REST (`/users/*`)

- `GET /users/me` - Get current user
- `PATCH /users/me` - Update current user

### Documentation

- `GET /` - Scalar API documentation
- `GET /openapi` - OpenAPI spec
- `GET /health` - Health check

## Development

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm typecheck
```

Server runs at http://localhost:8787

## Environment Variables

See `.env.example` for all required variables:

- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Auth secret key
- `BETTER_AUTH_URL` - Auth callback URL
- `ALLOWED_API_ORIGINS` - CORS allowed origins
- `OPENAI_API_KEY` - OpenAI API key
- `RESEND_API_KEY` - Resend email API key
- `LOG_LEVEL` - Logging level (debug|info|warn|error)

## Project Structure

```
src/
├── env.ts              # Environment validation
├── index.ts            # App entry point
├── rest/
│   ├── middleware/     # Auth, logging, DB, rate limiting
│   └── routers/        # REST API routes
├── trpc/
│   ├── init.ts         # tRPC setup
│   └── routers/        # tRPC procedures
├── schemas/            # Zod validation schemas
├── types/              # TypeScript types
└── utils/              # Shared utilities
```

## Authentication

API supports Bearer token authentication:

```bash
curl -H "Authorization: Bearer unstage_xxxxx" \
  http://localhost:8787/users/me
```

API keys are generated in the dashboard and support scoped permissions:
- `users.read` - Read user data
- `users.write` - Modify user data
- `interviews.read` - Read interviews
- `interviews.write` - Modify interviews

## Logging

Production-ready structured logging with:
- Request IDs for tracing
- PII/secret redaction (GDPR compliant)
- Pretty printing in development
- JSON output in production
- Error tracking with stack traces

## Deployment

Built for Node.js environments:

```bash
pnpm build
pnpm start
```

Environment variables must be set in production.

## Dependencies

- `@unstage/auth` - Authentication utilities
- `@unstage/cache` - LRU caching
- `@unstage/db` - Database queries
- `@unstage/email` - Email templates
- `@unstage/encryption` - Crypto functions
- `@unstage/utils` - Shared utilities
