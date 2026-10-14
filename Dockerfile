# syntax=docker/dockerfile:1

# ------------------------------------------------------------------
# Website Pribadi — Next.js (standalone) multi-stage build.
# Debian slim base: OpenSSL tersedia, kompatibel dengan engine Prisma.
# ------------------------------------------------------------------

FROM node:20-slim AS base
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# ---------- deps: install dependencies ----------
FROM base AS deps
COPY package.json package-lock.json* ./
# Prisma's postinstall needs the schema present to generate the client.
COPY prisma ./prisma
RUN npm ci

# ---------- builder: build the app ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# DATABASE_URL is only needed at runtime; a dummy keeps the build happy.
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public"
RUN npm run build

# ---------- runner: minimal runtime image ----------
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

# Prisma CLI (for `db push` at startup) + generated client + engines.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Standalone server output.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --chmod=0755 docker-entrypoint.sh ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
