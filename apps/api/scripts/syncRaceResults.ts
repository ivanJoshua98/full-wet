import { prisma } from 'database';

async function syncRaceResults(year: number) {
  const url = `https://api.jolpi.ca/ergast/f1/${year}/results.json`;
  const response = await fetch(url);
  const data = await response.json();
  const races = data.MRData.RaceTable.Races;
  
  for (let i = 0; i < races.length; i++) {
    // Verificamos si hay resultados (si la carrera ya ocurrió)
    const raceData = data.MRData.RaceTable.Races[i];
    if (!raceData || !raceData.Results) {
    console.log(`⚠️ No hay datos de clasificación para la ronda ${raceData.round}`);
    return;
  }

  console.log(`⏱️ Sincronizando Clasificación: ${raceData.raceName}`);

  // 2. Buscamos el ID de la carrera en nuestra DB local
  const dbRace = await prisma.race.findFirst({
    where: { seasonYear: year, round: parseInt(raceData.round) }
  });

  if (!dbRace) throw new Error("La carrera debe existir en la DB antes de añadir resultados.");
    
  for (const res of raceData.Results) {
    const existingResult = await prisma.raceResult.findFirst({
      where: {
        raceId: dbRace.id,
        driverId: res.Driver.driverId
      }
    });

    if (existingResult) {
      await prisma.raceResult.update({
        where: { id: existingResult.id },
        data: {
          teamId: res.Constructor.constructorId,
          position: parseInt(res.position),
          points: parseFloat(res.points),
          grid: parseInt(res.grid),
          status: res.status,
          laps: parseInt(res.laps)
        }
      });
      console.log(`ℹ️ El resultado de ${res.Driver.driverId} fue actualizado.`);
    } else {
      await prisma.raceResult.create({
        data: {
          raceId: dbRace.id,
          driverId: res.Driver.driverId,
          teamId: res.Constructor.constructorId,
          position: parseInt(res.position),
          points: parseFloat(res.points),
          grid: parseInt(res.grid),
          status: res.status,
          laps: parseInt(res.laps)
        }
      });
    }
  }
  console.log(`✅ Clasificación de ${raceData.raceName} guardada con éxito.`);
  }
}

syncRaceResults(2026)
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());