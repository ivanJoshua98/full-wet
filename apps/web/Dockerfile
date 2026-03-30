FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# ---- STAGE: BUILD ----
FROM base AS build
COPY . .

# Instalar dependencias para el frontend (filtra y carga apps/web y la dependencia types)
RUN pnpm install --filter full-wet-frontend... --frozen-lockfile

# Compilar la aplicación Astro
RUN pnpm --filter full-wet-frontend run build

# ---- STAGE: RUNNER ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Astro requiere setear esto para exponer el servidor hacia Bakploy/Dokploy
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

# Copiar los node_modules necesarios (root y web)
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/web/node_modules ./apps/web/node_modules

EXPOSE 4321

# Iniciar el servidor Astro generado
CMD cd apps/web && node ./dist/server/entry.mjs
