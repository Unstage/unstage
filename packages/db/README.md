# @unstage/db

PostgreSQL database layer with Drizzle ORM for the Unstage platform.

## Features

- Type-safe database schema
- Drizzle ORM integration
- Database migrations
- Pre-built query functions
- Connection pooling
- Health checks

## Tech Stack

- **ORM**: Drizzle ORM 0.44
- **Database**: PostgreSQL (via Neon serverless)
- **Migrations**: drizzle-kit
- **Validation**: Zod schemas

## Schema

### Tables

- `users` - User accounts and profiles
- `organizations` - Company/team accounts
- `interviews` - Interview definitions
- `candidates` - Interview participants
- `api_keys` - API authentication tokens
- `personas` - AI interviewer personas
- `scenarios` - Coding scenarios/questions

All tables include:
- `id` (UUID primary key)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Usage

```typescript
import db from "@unstage/db";
import { getUserById, createUser } from "@unstage/db/queries/users";

// Use pre-built queries
const user = await getUserById(db, "user-id");

// Or use Drizzle directly
import { users } from "@unstage/db/schema";
import { eq } from "drizzle-orm";

const user = await db
  .select()
  .from(users)
  .where(eq(users.id, "user-id"));
```

## Development

```bash
# Generate migrations from schema changes
pnpm db:generate

# Run migrations
pnpm db:migrate

# Push schema without migrations (dev only)
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

## Environment Variables

See `.env.example`:

- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Environment (development|production)

## Project Structure

```
src/
├── schema.ts           # Database schema definitions
├── index.ts            # DB instance export
├── env.ts              # Environment validation
├── queries/            # Pre-built query functions
│   ├── users.ts
│   ├── organizations.ts
│   ├── interviews.ts
│   └── api-keys.ts
└── utils/
    └── health.ts       # Health check utilities
```

## Queries

### Users
- `getUserById(db, id)` - Get user by ID
- `getUserByEmail(db, email)` - Get user by email
- `createUser(db, data)` - Create new user
- `updateUser(db, data)` - Update user
- `deleteUser(db, id)` - Soft delete user

### Organizations
- `getOrganizationById(db, id)` - Get organization
- `createOrganization(db, data)` - Create organization
- `updateOrganization(db, data)` - Update organization

### Interviews
- `getInterviewById(db, id)` - Get interview
- `listInterviews(db, organizationId)` - List interviews
- `createInterview(db, data)` - Create interview
- `updateInterview(db, data)` - Update interview
- `deleteInterview(db, id)` - Delete interview

### API Keys
- `getApiKeyByToken(db, hash)` - Get API key by token hash
- `createApiKey(db, data)` - Create new API key
- `updateApiKeyLastUsedAt(db, id)` - Update last used timestamp

## Migrations

Migrations are stored in `drizzle/` directory and managed by drizzle-kit:

```bash
# Create migration
pnpm db:generate

# Apply migrations
pnpm db:migrate
```

## Type Safety

All queries are fully typed with TypeScript. Schema changes automatically update query types.

```typescript
// TypeScript knows the exact shape
const user = await getUserById(db, "id");
//    ^? { id: string; email: string; full_name: string; ... }
```

## Connection

Uses Neon serverless PostgreSQL with connection pooling:

```typescript
import { drizzle } from "drizzle-orm/neon-serverless";
import { env } from "./env";
import * as schema from "./schema";

const db = drizzle(env.DATABASE_URL, {
  schema,
  casing: "snake_case",
});
```

## Best Practices

1. Always use prepared statements (built-in with Drizzle)
2. Use transactions for multi-step operations
3. Add indexes for frequently queried columns
4. Keep migrations small and focused
5. Test migrations in staging first
