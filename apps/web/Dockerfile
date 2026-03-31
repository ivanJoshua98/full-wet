FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# ---- STAGE: BUILD ----
FROM base AS build

# Se define la variable de entorno para el frontend
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL

COPY . .

# Instalar dependencias para el frontend (filtra y carga apps/web y la dependencia types)
RUN pnpm install --filter full-wet-frontend... --frozen-lockfile

# Compilar la aplicación Astro
RUN pnpm --filter full-wet-frontend run build

# ---- STAGE: RUNNER ----
FROM base AS runner
WORKDIR /app

# Se define la variable de entorno para el frontend
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Copiar configuraciones y lockfile del monorepo
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-workspace.yaml ./
COPY --from=build /app/pnpm-lock.yaml ./

# Copiar ÚNICAMENTE el paquete types
COPY --from=build /app/packages/types ./packages/types

# Copiar el build del frontend
COPY --from=build /app/apps/web ./apps/web

# Se instalan las dependencias necesarias
RUN pnpm install --prod --frozen-lockfile

EXPOSE 4321

# Iniciar el servidor Astro generado
CMD pnpm --filter full-wet-frontend run start
