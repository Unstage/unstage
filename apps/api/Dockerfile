# Base image with pnpm
FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install turbo CLI globally using pnpm
FROM base AS turbo-cli
RUN pnpm add -g turbo

# Builder stage
FROM turbo-cli AS builder
WORKDIR /app
# Copy all files
COPY . .
# Use turbo CLI from pnpm global install to prune workspaces
RUN turbo prune @unstage/api --docker

# Installer stage
FROM base AS installer
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
# Don't copy the lockfile, allow pnpm to generate a fresh one
RUN pnpm install

# Copy the full source code
COPY --from=builder /app/out/full/ .

# Runner stage (same as installer to avoid another copy)
FROM installer AS runner

# Set the API directory as working directory
WORKDIR /app/apps/api

# Set environment variables
ENV NODE_ENV=production

# Expose the port the API runs on
EXPOSE 3000

# Run the API directly with pnpm
CMD ["pnpm", "run", "start"]