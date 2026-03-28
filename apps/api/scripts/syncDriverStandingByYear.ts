import { prisma } from 'database';

async function syncDriverStandingByYear(year: number) {    
	const url = `https://api.jolpi.ca/ergast/f1/${year}/driverStandings.json`;
  const response = await fetch(url);
  const data = await response.json();
  const standingsLists = data.MRData.StandingsTable.StandingsLists;
  if (!standingsLists || standingsLists.length === 0 || !standingsLists[0].DriverStandings) {
    console.log(`⚠️ No hay datos del campeonato para el año ${year}`);
    return;
  }
  const driverStandings = standingsLists[0].DriverStandings;
  // Asegurarse de que exista la temporada
  await prisma.season.upsert({
    where: { year },
    update: {},
    create: { year }
  });
  console.log(`Sincronizando ${driverStandings.length} posiciones de pilotos para el año ${year}...`);
  for (const standing of driverStandings) {
    const position = parseInt(standing.position);
    const points = parseFloat(standing.points);
    const wins = parseInt(standing.wins);
    const driverInfo = standing.Driver;
		const constructorInfo = standing.Constructors[0];
    
    let teamIdStr = "unknown";
    if (standing.Constructors && standing.Constructors.length > 0) {
      teamIdStr = constructorInfo.constructorId;
      // Asegurar que el equipo exista
      await prisma.team.upsert({
        where: { id: teamIdStr },
        update: {},
        create: {
          id: teamIdStr,
          name: constructorInfo.name,
        }
      });
    } else {
      // Asegurar equipo "unknown" en el inusual caso de que falte
      await prisma.team.upsert({
        where: { id: "unknown" },
        update: {},
        create: { id: "unknown", name: "Unknown Team" }
      });
    }
    // Asegurar que el piloto exista
    await prisma.driver.upsert({
      where: { id: driverInfo.driverId },
      update: {},
      create: {
        id: driverInfo.driverId,
        name: `${driverInfo.givenName} ${driverInfo.familyName}`,
        number: driverInfo.permanentNumber ? parseInt(driverInfo.permanentNumber) : null,
        nationality: driverInfo.nationality,
        teamId: teamIdStr
      }
    });
    // Crear o actualizar la posición en el campeonato
    await prisma.driverStanding.upsert({
      where: {
        seasonYear_driverId: {
          seasonYear: year,
          driverId: driverInfo.driverId
        }
      },
      update: {
        position,
        points,
        wins,
        teamName: constructorInfo.name,
      },
      create: {
        seasonYear: year,
        driverId: driverInfo.driverId,
        position,
        points,
        wins,
        teamName: constructorInfo.name,
      }
    });
  }
  console.log(`✅ Campeonato de pilotos ${year} sincronizado correctamente.`);
}

const args = process.argv.slice(2);
const yearStr = args[0];
const year = yearStr ? parseInt(yearStr) : 2026;

syncDriverStandingByYear(year)
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());