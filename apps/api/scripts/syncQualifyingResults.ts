import { prisma } from 'database';

async function syncQualifyingResults(year: number) {
  // 1. Obtener datos de la API
  const url = `https://api.jolpi.ca/ergast/f1/${year}/qualifying.json`;
  const response = await fetch(url);
  const data = await response.json();

  const races = data.MRData.RaceTable.Races;
  for (let i = 0; i < races.length; i++) {
    // Verificamos si hay resultados (si la qualy ya ocurrió)
    const raceData = data.MRData.RaceTable.Races[i];
    if (!raceData || !raceData.QualifyingResults) {
      console.log(`⚠️ No hay datos de clasificación para la ronda ${raceData.round}`);
      continue;
    }

    console.log(`⏱️ Sincronizando Clasificación: ${raceData.raceName}`);

    // 2. Buscamos el ID de la carrera en nuestra DB local
    const dbRace = await prisma.race.findFirst({
      where: { seasonYear: year, round: parseInt(raceData.round) }
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
}

syncQualifyingResults(2026)
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());