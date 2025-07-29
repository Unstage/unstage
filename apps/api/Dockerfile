# ---------- Base ----------
FROM node:24-slim AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---------- Prune ----------
FROM base AS prune
WORKDIR /app

# Copy only necessary files early to avoid cache busting
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps/api/package.json apps/api/
COPY packages/ packages/
COPY .gitignore .npmrc ./

# Install full deps temporarily to allow Turbo prune
RUN pnpm install --frozen-lockfile

# Copy the rest for pruning
COPY . .

# Prune for only what's needed by @unstage/api
RUN pnpm exec turbo prune --scope=@unstage/api --docker

# ---------- Install ----------
FROM base AS install
WORKDIR /app

# Copy pruned package manifests & lockfile
COPY --from=prune /app/out/json/ ./

# Install pruned deps
RUN pnpm install --frozen-lockfile

# Copy the full pruned source code
COPY --from=prune /app/out/full/ ./

# ---------- Build ----------
FROM install AS build
RUN pnpm turbo run build --filter=@unstage/api...

# ---------- Runtime ----------
FROM node:24-slim AS runtime
WORKDIR /app

# Copy runtime files only
COPY --from=install /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=install /app/apps/api/package.json ./apps/api/package.json

ENV NODE_ENV=production
WORKDIR /app/apps/api
EXPOSE 8080

CMD ["node", "dist/index.js"]
    