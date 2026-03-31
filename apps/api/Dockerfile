FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Instalar OpenSSL y certificados (Prisma lo necesita en Debian/Ubuntu slim)
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ---- STAGE: BUILD ----
FROM base AS build
COPY . .

# Instalar las dependencias filtrando solo lo que el API y el root necesitan
RUN pnpm install --filter database... --frozen-lockfile
RUN pnpm install --filter full-wet-api... --frozen-lockfile

# Buildear el API
RUN pnpm --filter database run build
RUN pnpm --filter full-wet-api run build

# ---- STAGE: RUNNER ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copiar configuraciones y lockfile del monorepo
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-workspace.yaml ./
COPY --from=build /app/pnpm-lock.yaml ./

# Copiar la aplicación compilada
COPY --from=build /app/apps/api ./apps/api
COPY --from=build /app/packages ./packages

# Se instalan las dependencias necesarias
RUN pnpm install --frozen-lockfile

EXPOSE 3000

# Se ejecuta la migración a la base de datos (se aplicarán los cambios si los hay) 
# y a continuación se arranca el servidor API.
CMD pnpm --filter database exec prisma migrate deploy && pnpm --filter full-wet-api run start
