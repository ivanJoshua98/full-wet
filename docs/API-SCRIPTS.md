# 📡 Endpoints de la API (Backend BFF)

La API provee los datos consolidados en formato JSON al Front-End. Estos endpoints están definidos en `apps/api/src/index.ts`.

### Rutas de Carreras y Calendario

- `GET /api/seasons`
  Retorna un listado con todos los años (temporadas) de Fórmula 1 disponibles en la base de datos.
  
- `GET /api/:year/races`
  Retorna la lista completa de carreras planificadas y pasadas para el año especificado (Ej. `2024`). Es utilizado para armar el componente calendario.
  
- `GET /api/:year/races/next`
  Busca y retorna los detalles de la próxima carrera agendada para el año indicado. Utilizado por el componente "Next GP Countdown".

- `GET /api/races`
  Devuelve la colección general con el registro histórico de todas las carreras almacenadas en el sistema.

- `GET /api/races/:raceId/results`
  Obtiene la tabla de resultados de la carrera principal perteneciente a un `raceId` específico. Devuelve las posiciones finales, puntos obtenidos por cada piloto, status de abandonos, etc.

### Rutas del Campeonato (Standings)

- `GET /api/:year/driver-standings`
  Devuelve la tabla de posiciones del **Campeonato Mundial de Pilotos** actualizada correspondientemente a la temporada `:year`. Retorna los pilotos con todos sus puntos estandarizados.

- `GET /api/:year/constructor-standings`
  Devuelve la tabla de posiciones del **Campeonato Mundial de Constructores** (Equipos). El servidor retorna la suma oficial de las contribuciones de los pilotos respecto a su escudería en dicho año.

---


# ⚙️ Scripts de Sincronización (Ingesta de Datos)

Para poder garantizar rapidez de carga mediante generación estática o renderizado de servidor rápido desde Astro, se optó por guardar toda la información en una Base de Datos relacional propia.

Los scripts contenidos de forma modular bajo la sub-carpeta `apps/api/scripts/` son archivos ejecutables que se comunican con instancias externas oficiales de base de datos como **Ergast/Jolpica F1 API**, descargan los datos en bloque, los formatean a nuestro esquema y los inyectan transaccionalmente con *Prisma*.

### Listado de Scripts

- **`syncRaces.ts`**
  Este script sincroniza de forma masiva la información fundamental y fechas de todos los Grandes Premios y Circuitos de un año específico. Configura los horarios precisos en estándar UTC de Prácticas Libres, Carrera Sprint, Clasificación y Carrera Dominical.

- **`syncRaceResultsByRound.ts`**
  Encargados de obtener el posicionamiento final de las carreras principales. Actualiza los resultados de una carrera específica tomando como parámetro el año y la ronda. Pensada para ejecutarse horas después del final de cada Gran Premio.

- **`syncDriverStandingByYear.ts`**
  Ajusta directamente en la tabla de Pilotos el total de puntos y su posición correspondiente basándose en los resultados deportivos para ese año, manteniéndolo siempre actualizado tras cada evento.

- **`syncConstructorStandingByYear.ts`**
  Ajusta el total general en la cuenta de Equipos y Escuderías, permitiendo la visualización exacta del campeonato de marcas en vivo.

### Uso y Ejecución

Estos scripts se diseñaron para ejecutarse mediante entornos Node / TypeScript usando herramientas como `tsx` o `ts-node` desde la raíz de `api` y poder pasarle parámetros si es que el script lo requiere.

```bash
pnpm run tsx scripts/syncRaces.ts <year>
```
```bash
pnpm run tsx scripts/syncRaceResultsByRound.ts <year> <round>
```
```bash
pnpm run tsx scripts/syncDriverStandingByYear.ts <year>
```
```bash
pnpm run tsx scripts/syncConstructorStandingByYear.ts <year>
```
