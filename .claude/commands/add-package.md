---
description: Guide for adding a new package to the monorepo
---

You are helping a developer add a new package or app to the Unstage monorepo. Guide them through creating it properly within the monorepo structure.

## Adding a New Package

### 1. Determine Package Type

Ask the developer:
- What is the package for? (utilities, UI components, API client, etc.)
- Will it be used by multiple apps or just one?
- Does it have dependencies on other packages?
- Should it be published or internal-only?

### 2. Create Package Directory

```bash
# Create package structure
mkdir -p packages/<package-name>/src

cd packages/<package-name>
```

### 3. Create package.json

```json
{
  "name": "@unstage/<package-name>",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    }
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "typecheck": "tsc --noEmit",
    "lint": "biome check .",
    "format": "biome format --write ."
  },
  "dependencies": {},
  "devDependencies": {
    "@unstage/typescript-config": "workspace:*",
    "typescript": "^5.9.3"
  }
}
```

### 4. Add TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "extends": "@unstage/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 5. Create Entry Point

Create `src/index.ts`:

```typescript
// Export your package's public API
export { functionName } from "./function";
export type { TypeName } from "./types";
```

### 6. Add README

Create `README.md`:

```markdown
# @unstage/<package-name>

Description of what this package does.

## Usage

\`\`\`typescript
import { functionName } from "@unstage/<package-name>";

functionName();
\`\`\`

## API

Document your public API here.
```

### 7. Add to Root Workspace

The package should automatically be detected by pnpm workspaces, but verify:

In root `package.json`, ensure:
```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### 8. Install Dependencies

```bash
# From package directory
pnpm install

# Or from root
pnpm install
```

### 9. Build the Package

```bash
# From package directory
pnpm build

# Or from root
pnpm --filter @unstage/<package-name> build
```

### 10. Use in Other Packages/Apps

Add to another package's dependencies:

```json
{
  "dependencies": {
    "@unstage/<package-name>": "workspace:*"
  }
}
```

Then import:

```typescript
import { something } from "@unstage/<package-name>";
```

## Adding a New App

For adding a new app to `apps/`:

### 1. Choose Framework

- **API Service**: Use Hono (like apps/api)
- **Web App**: Use Next.js (like apps/dashboard or apps/web)
- **Other**: Choose appropriate framework

### 2. Create App

```bash
# For Next.js app
cd apps
npx create-next-app@latest <app-name> --typescript --tailwind --app

# Move into workspace structure
cd <app-name>
```

### 3. Update package.json

Change package name to `@unstage/<app-name>`:

```json
{
  "name": "@unstage/<app-name>",
  "version": "0.0.1",
  "private": true
}
```

### 4. Add Environment Setup

```bash
# Create env validation
touch src/env.ts

# Create env example
touch .env.example
```

In `src/env.ts`:
```typescript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    // Add your server-side env vars
  },
  client: {
    // Add your client-side env vars (NEXT_PUBLIC_*)
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // Map process.env to your schema
  },
});
```

### 5. Add README

Create app-specific README documenting:
- What the app does
- How to run it
- Environment variables
- Key features

### 6. Update Turbo Configuration

In root `turbo.json`, add your app if it needs special build configuration.

### 7. Test the App

```bash
# From root
pnpm --filter @unstage/<app-name> dev

# Verify it works
curl http://localhost:<port>
```

## Best Practices

### Package Guidelines

1. **Single Responsibility**: Each package should do one thing well
2. **Clear API**: Export only what consumers need
3. **Type Safety**: Export types alongside functions
4. **Documentation**: Always include README with examples
5. **Dependencies**: Minimize external dependencies
6. **Testing**: Add tests for public API

### Naming Conventions

- Packages: `@unstage/<name>` (lowercase, kebab-case)
- Apps: `@unstage/<name>` (lowercase, kebab-case)
- Exports: Use named exports, not default exports

### Dependency Management

- Use `workspace:*` for internal packages
- Pin versions for critical dependencies
- Keep dependencies updated
- Avoid circular dependencies

### File Structure

```
packages/<name>/
├── src/
│   ├── index.ts       # Public API
│   ├── types.ts       # Type definitions
│   └── utils.ts       # Implementation
├── package.json
├── tsconfig.json
├── README.md
└── .env.example (if needed)
```

## Verification Checklist

After adding a package/app, verify:

- [ ] Package name follows `@unstage/<name>` convention
- [ ] TypeScript configuration extends base config
- [ ] Builds successfully
- [ ] Can be imported by other packages
- [ ] README documents usage
- [ ] Environment variables documented (if any)
- [ ] Added to git (not in .gitignore)
- [ ] Follows monorepo conventions

## Common Issues

**Package not found after creation**
```bash
# Reinstall dependencies to update workspace
pnpm install
```

**Build errors**
```bash
# Ensure TypeScript config is correct
# Check that dependencies are installed
pnpm install
```

**Can't import from package**
```bash
# Rebuild the package
pnpm --filter @unstage/<name> build
```

**Circular dependency**
- Check dependency graph
- Refactor to remove circular references
- Consider creating a new shared package

Guide the developer through each step and help them create a well-structured package that fits into the monorepo.
