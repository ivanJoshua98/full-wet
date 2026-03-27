import { prisma } from 'database';

async function syncRaceResultsByRound(year: number, round: number) {
  const url = `https://api.jolpi.ca/ergast/f1/${year}/${round}/results.json`;
  const response = await fetch(url);
  const data = await response.json();
  const raceData = data.MRData.RaceTable.Races[0];
  if (!raceData || !raceData.Results) {
    console.log(`⚠️ No hay datos de clasificación para la ronda ${round}`);
    return;
  }

  console.log(`⏱️ Sincronizando Clasificación: ${raceData.raceName}`);

  // 2. Buscamos el ID de la carrera en nuestra DB local
  const dbRace = await prisma.race.findFirst({
    where: { seasonYear: year, round: round }
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
          laps: parseInt(res.laps),
          time: res.Time?.time || null,
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
          laps: parseInt(res.laps),
          time: res.Time?.time || null,
        }
      });
    }
  }
  console.log(`✅ Clasificación de ${raceData.raceName} guardada con éxito.`);
}

const args = process.argv.slice(2) || [2026, 2];
const year = parseInt(args[0]!);
const round = parseInt(args[1]!);

syncRaceResultsByRound(year, round)
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());