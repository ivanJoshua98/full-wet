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
RUN pnpm install --filter full-wet-api... --frozen-lockfile

# Generar el cliente de Prisma (necesario en build-time para TypeScript)
RUN pnpm --filter database run db:generate

# Buildear el API
RUN pnpm --filter full-wet-api run build

# ---- STAGE: RUNNER ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copiar configuraciones y lockfile del monorepo
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-workspace.yaml ./
COPY --from=build /app/pnpm-lock.yaml ./

# Copiar las librerías necesarias del workspace
COPY --from=build /app/packages/database ./packages/database
COPY --from=build /app/packages/types ./packages/types

# Copiar la aplicación compilada
COPY --from=build /app/apps/api ./apps/api

# Copiar los node_modules. Esto garantiza que existan los symlinks del monorepo
# y todas las dependencias instaladas en la fase de build.
# Modificar en un futuro, mas si el proyecto crece
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=build /app/packages/database/node_modules ./packages/database/node_modules

EXPOSE 3000

# Se ejecuta la migración a la base de datos (se aplicarán los cambios si los hay) 
# y a continuación se arranca el servidor API.
CMD cd packages/database && pnpm exec prisma migrate deploy && cd ../../apps/api && pnpm run start
