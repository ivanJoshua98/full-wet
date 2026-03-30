# Full Wet

## 🎯 1. Definición del Proyecto

Un portal informativo para entusiastas de la Fórmula 1, con escalabilidad futura a F2, F3 y F1 Academy. Una herramienta para el aficionado que muestre resultados, horarios, calendario, pilotos, equipos y todo sobre la categoría reina del automovilismo.

- Lista de objetivos y funcionalidades: [FUNCIONALIDADES.md](docs/FUNCIONALIDADES.md)
- Documentación de la API y Scripts: [API-SCRIPTS.md](docs/API-SCRIPTS.md)

## 💻 Stack Tecnológico
- **Frontend Framework:** Astro (Híbrido SSG + SSR).
- **Backend:** Node.js + Express
- **Base de Datos:** PostgreSQL
- **ORM:** Prisma
- **Estilos:** Tailwind CSS
- **APIs Primarias:** 
  - [Jolpica/Ergast](https://github.com/jolpica/jolpica-f1) (resultados/tablas).
  - [Gemini](https://ai.google.dev/gemini-api/docs) (generación de contenido/efemerides).
  - [OpenRouter](https://openrouter.ai/) (generación de contenido/efemerides).

## 🏗️ Arquitectura del sistema

- **Backend BFF (API Propia):** Endpoints optimizados que filtran y sirven solo la data necesaria al frontend.
- **Capa de Datos (DB):** PostgreSQL con Prisma ORM para persistencia y modelado de datos.
- **Capa de Presentación (Frontend):** Astro SSG para datos históricos + SSR para datos actuales. Configuración híbrida para SEO y rendimiento.
- **Capa de Ingesta (Sync):** Scripts programados (Cron Jobs) que consultan APIs externas y pueblan la DB local para evitar latencia.

## 📂 Estructura monorepo

```
full-wet/
├── apps/
│   ├── web/                # Proyecto Astro (Frontend)
│   │   ├── src/
│   │   │   ├── components/  # Componentes Astro
│   │   │   ├── layouts/     # Plantillas base (Dark mode / Blue accents)
│   │   │   ├── pages/       # Rutas (Index, Calendar, Standings)
│   │   │   └── utils/       # Helpers de formato (Fechas, Unidades)
│   │   └── public/          # Assets (Logos, etc)
│   │
│   └── api/                # Backend con Node.js + Express (BFF)
│       ├── src/
│       │   ├── controllers/ # Lógica de los Endpoints
│       │   ├── services/    # Transformación de datos de APIs externas
│       │   ├── routes/      # Rutas de la API
│       │   └── index.ts     # Servidor Express
│       └── scripts/         # Cron jobs de sincronización (Sync)
│
├── packages/               # Código compartido
│   ├── database/           # Capa de datos única
│   │    ├── prisma/
│   │    │   └── schema.prisma
│   │    └── src/
│   │        └── client.ts    # Cliente de Prisma exportable
│   └── types/                # Tipos compartidos TypeScript
│
├── .env                      # Variables de entorno (DB_URL, PORTS, etc.)
├── package.json              # Root package.json
└── README.md
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Instala las dependencias                            |
| `pnpm run dev`             | Inicia el backend y el frontend en modo desarrollo (backend en `localhost:3000` y frontend en `localhost:4321` por defecto) |
| `pnpm dev:api`             | Inicia el servidor backend de desarrollo local en `localhost:3000` por defecto     |
| `pnpm dev:api-build`       | Construye el backend de producción en `./dist/`          |
| `pnpm dev:api-start`       | Inicia el backend de producción     |
| `pnpm dev:web`             | Inicia el servidor frontend de desarrollo local en `localhost:4321` por defecto      |
| `pnpm dev:web-build`       | Construye el sitio de producción en `./dist/`          |
| `pnpm dev:web-preview`     | Previsualiza el sitio de producción localmente, antes de desplegar     |

## 📋 Variables de entorno

Las variables de entorno se deben configurar en un archivo `.env` en la raíz del proyecto.

- `DATABASE_URL`: URL de conexión a la base de datos
- `API_PORT`: Definir el puerto del servidor backend si se desea cambiar el puerto por defecto
- `API_URL`: URL de la API servida por el backend
- `GEMINI_API_KEY`: API Key de Gemini
- `GEMINI_DEFAULT_MODEL`: Modelo de Gemini por defecto
- `OPENROUTER_API_KEY`: API Key de OpenRouter
- `OPENROUTER_BASE_URL`: URL de la API de OpenRouter
- `OPENROUTER_DEFAULT_MODEL`: Modelo de OpenRouter por defecto
