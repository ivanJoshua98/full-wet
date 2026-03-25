import { prisma } from 'database';

async function syncQualifyingResultsByRound(year: number, round: number) {
  // 1. Obtener datos de la API
  const url = `https://api.jolpi.ca/ergast/f1/${year}/${round}/qualifying.json`;
  const response = await fetch(url);
  const data = await response.json();

  const raceData = data.MRData.RaceTable.Races[0];
  if (!raceData || !raceData.QualifyingResults) {
    console.log(`⚠️ No hay datos de clasificación para la ronda ${round}`);
    return;
  }
  console.log(`⏱️ Sincronizando Clasificación: ${raceData.raceName}`);
  // 2. Buscamos el ID de la carrera en nuestra DB local
  const dbRace = await prisma.race.findFirst({
    where: { seasonYear: year, round: round }
  });
  if (!dbRace) throw new Error("La carrera debe existir en la DB antes de añadir resultados.");
  // 3. Procesar cada resultado de piloto
  for (const res of raceData.QualifyingResults) {
    // Upsert del Equipo (Constructor)
    await prisma.team.upsert({
      where: { id: res.Constructor.constructorId },
      update: { name: res.Constructor.name },
      create: { 
        id: res.Constructor.constructorId, 
        name: res.Constructor.name 
      },
    });
    // Upsert del Piloto (Driver)
    await prisma.driver.upsert({
      where: { id: res.Driver.driverId },
      update: { 
        name: `${res.Driver.givenName} ${res.Driver.familyName}`,
        number: parseInt(res.Driver.permanentNumber)
      },
      create: {
        id: res.Driver.driverId,
        name: `${res.Driver.givenName} ${res.Driver.familyName}`,
        number: parseInt(res.Driver.permanentNumber),
        teamId: res.Constructor.constructorId
      },
    });
    // 4. Guardar el resultado de clasificación
    const existingResult = await prisma.qualifyingResult.findFirst({
      where: {
        raceId: dbRace.id,
        driverId: res.Driver.driverId
      }
    });
    if (existingResult) {
      await prisma.qualifyingResult.update({
        where: { id: existingResult.id },
        data: {
          teamId: res.Constructor.constructorId,
          position: parseInt(res.position),
          q1: res.Q1 || null,
          q2: res.Q2 || null,
          q3: res.Q3 || null,
        }
      });
    } else {
      await prisma.qualifyingResult.create({
        data: {
          raceId: dbRace.id,
          driverId: res.Driver.driverId,
          teamId: res.Constructor.constructorId,
          position: parseInt(res.position),
          q1: res.Q1 || null,
          q2: res.Q2 || null,
          q3: res.Q3 || null,
        }
      });
    }
  }
  console.log(`✅ Clasificación de ${raceData.raceName} guardada con éxito.`);
}

syncQualifyingResultsByRound(2026, 2)
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());