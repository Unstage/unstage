# ---------- Base ----------
FROM node:24-slim AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
    
# ---------- Prune ----------
FROM base AS prune
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm exec turbo prune --scope=@unstage/api --docker
    
# ---------- Install ----------
FROM base AS install
WORKDIR /app
COPY --from=prune /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=prune /app/out/full/ .
    
# ---------- Build ----------
FROM install AS build
RUN pnpm turbo run build --filter=@unstage/api...
    
# ---------- Runtime ----------
FROM node:24-slim AS runtime
WORKDIR /app
    
# Copy compiled files + dependencies
COPY --from=install /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=install /app/apps/api/package.json ./apps/api/package.json
    
ENV NODE_ENV=production
WORKDIR /app/apps/api
EXPOSE 8080
    
CMD ["node", "dist/index.js"]
    