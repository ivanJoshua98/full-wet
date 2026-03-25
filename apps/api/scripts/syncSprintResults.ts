import { prisma } from 'database';

async function syncSprintResults(year: number) {
  const url = `https://api.jolpi.ca/ergast/f1/${year}/sprint.json`;
  const response = await fetch(url);
  const data = await response.json();
  const sprints = data.MRData.RaceTable.Races;
  
  for (let i = 0; i < sprints.length; i++) {
    // Verificamos si hay resultados (si la sprint ya ocurrió)
    const sprintData = data.MRData.RaceTable.Races[i];
    if (!sprintData || !sprintData.SprintResults) {
      console.log(`⚠️ No hay datos de clasificación para la ronda ${sprintData.round}`);
      continue;
    }

    console.log(`⏱️ Sincronizando Clasificación: ${sprintData.raceName}`);

    // 2. Buscamos el ID de la carrera en nuestra DB local
    const dbRace = await prisma.race.findFirst({
      where: { seasonYear: year, round: parseInt(sprintData.round) }
    });

    if (!dbRace) throw new Error("La carrera debe existir en la DB antes de añadir resultados.");
    
    for (const res of sprintData.SprintResults) {
      const existingResult = await prisma.sprintResult.findFirst({
        where: {
          raceId: dbRace.id,
          driverId: res.Driver.driverId
        }
      });

      if (existingResult) {
        await prisma.sprintResult.update({
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
      } else {
        await prisma.sprintResult.create({
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
    console.log(`✅ Clasificación de ${sprintData.raceName} guardada con éxito.`);
  }
}

syncSprintResults(2026)
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());