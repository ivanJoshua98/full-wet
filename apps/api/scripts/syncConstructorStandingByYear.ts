import { prisma } from 'database';

async function syncConstructorStandingByYear(year: number) {
  const url = `https://api.jolpi.ca/ergast/f1/${year}/constructorStandings.json`;
  const response = await fetch(url);
  const data = await response.json();
  const standingsLists = data.MRData.StandingsTable.StandingsLists;

  if (!standingsLists || standingsLists.length === 0 || !standingsLists[0].ConstructorStandings) {
    console.log(`⚠️ No hay datos del campeonato para el año ${year}`);
    return;
  }
  const constructorStandings = standingsLists[0].ConstructorStandings;
  // Asegurarse de que exista la temporada
  await prisma.season.upsert({
    where: { year },
    update: {},
    create: { year }
  });
  console.log(`Sincronizando ${constructorStandings.length} posiciones de constructores para el año ${year}...`);
  for (const standing of constructorStandings) {
    const position = parseInt(standing.position);
    const points = parseFloat(standing.points);
    const wins = parseInt(standing.wins);
    const constructorInfo = standing.Constructor;
    // Asegurar que el equipo exista
    await prisma.team.upsert({
      where: { id: constructorInfo.constructorId },
      update: {},
      create: {
        id: constructorInfo.constructorId,
        name: constructorInfo.name
      }
    });
    // Crear o actualizar la posición en el campeonato
    await prisma.constructorStanding.upsert({
      where: {
        seasonYear_teamId: {
          seasonYear: year,
          teamId: constructorInfo.constructorId
        }
      },
      update: {
        position,
        points,
        wins
      },
      create: {
        seasonYear: year,
        teamId: constructorInfo.constructorId,
        position,
        points,
        wins
      }
    });
  }
  console.log(`✅ Campeonato de constructores ${year} sincronizado correctamente.`);
}

const args = process.argv.slice(2);
const yearStr = args[0];
const year = yearStr ? parseInt(yearStr) : 2026;

syncConstructorStandingByYear(year)
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());