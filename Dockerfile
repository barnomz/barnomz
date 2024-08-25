FROM node:20-alpine AS base

##### DEPENDENCIES

FROM base AS deps

# Install required packages including Python and build tools
RUN apk add --no-cache libc6-compat openssl python3 make g++

WORKDIR /app

# Install Prisma Client - remove if not using Prisma
COPY prisma ./

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### BUILDER

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
COPY .env.prod .env.production

ENV NEXT_TELEMETRY_DISABLED 1

RUN \
    if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
    elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && SKIP_ENV_VALIDATION=1 pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### RUNNER

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.prod ./.env
COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

COPY --from=liaracloud/supercronic:v0.1.11 \
     /usr/local/bin/supercronic /usr/local/bin/supercronic

# Copy the crontab and entrypoint script from local filesystem
COPY crontab ./crontab
COPY entrypoint.sh ./entrypoint.sh

# Ensure the entrypoint.sh file is executable
RUN chmod +x ./entrypoint.sh
RUN apk add curl

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Use the entrypoint script to start Supercronic and your app
ENTRYPOINT ["/app/entrypoint.sh"]
