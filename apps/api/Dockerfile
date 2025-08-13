# Use Node.js 24 Alpine image
FROM node:24-alpine AS base
# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS turbo-cli

# Install turbo
RUN pnpm install -g turbo

FROM turbo-cli AS builder

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Turbo prune
RUN turbo prune @unstage/api --docker

FROM base as installer

WORKDIR /app

COPY --from=builder /app/out/full/ .

RUN pnpm install

FROM installer AS runner

WORKDIR /app/apps/api

ENV NODE_ENV=production

# Set environment
ENV NODE_ENV=production
ENV PORT=8787

EXPOSE 8787

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8787/health || exit 1

# Start the application
CMD ["node", "src/index.ts"]