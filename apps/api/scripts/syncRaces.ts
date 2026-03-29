import { prisma } from 'database'

// Función helper para unir fecha y hora de Jolpica
const parseF1DateTime = (date?: string, time?: string) => {
  if (!date || !time) return null;
  return new Date(`${date}T${time}`);
};

async function syncCalendar(year: number) {
  const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/races.json`);
  const data = await response.json();
  const races = data.MRData.RaceTable.Races;

  console.log(`🚀 Sincronizando ${races.length} carreras...`);

  // 1. Asegurarnos de que la temporada existe
  await prisma.season.upsert({
    where: { year: year },
    update: {},
    create: { year: year },
  });

  for (const race of races) {
    // 2. Primero guardamos/actualizamos el Circuito
    // (Importante: Prisma requiere que el padre exista antes que el hijo)
    await prisma.circuit.upsert({
      where: { id: race.Circuit.circuitId },
      update: {
        name: race.Circuit.circuitName,
        location: race.Circuit.Location.locality,
        country: race.Circuit.Location.country,
      },
      create: {
        id: race.Circuit.circuitId,
        name: race.Circuit.circuitName,
        location: race.Circuit.Location.locality,
        country: race.Circuit.Location.country,
      },
    });

    // 3. Guardamos la Carrera
    const existingRace = await prisma.race.findFirst({
      where: {
        seasonYear: parseInt(race.season),
        round: parseInt(race.round)
      }
    });

    if (existingRace) {
      console.log(`ℹ️ La carrera ${race.raceName} ya existe, actualizando datos...`);
      await prisma.race.update({
        where: { id: existingRace.id },
        data: {
          firstPractice:  parseF1DateTime(race.FirstPractice?.date, race.FirstPractice?.time),
          secondPractice: parseF1DateTime(race.SecondPractice?.date, race.SecondPractice?.time),
          thirdPractice:  parseF1DateTime(race.ThirdPractice?.date, race.ThirdPractice?.time),
          qualifying:     parseF1DateTime(race.Qualifying?.date, race.Qualifying?.time),
          name: race.raceName,
          date: new Date(`${race.date}T${race.time || '00:00:00Z'}`),
          sprint: parseF1DateTime(race.Sprint?.date, race.Sprint?.time),
          circuitId: race.Circuit.circuitId
        }
      });
    } else {
      await prisma.race.create({
        data: {
          seasonYear: parseInt(race.season),
          round: parseInt(race.round),
          name: race.raceName,
          date: new Date(`${race.date}T${race.time || '00:00:00Z'}`),
          circuitId: race.Circuit.circuitId,
          sprint: parseF1DateTime(race.Sprint?.date, race.Sprint?.time),
          firstPractice:  parseF1DateTime(race.FirstPractice?.date, race.FirstPractice?.time),
          secondPractice: parseF1DateTime(race.SecondPractice?.date, race.SecondPractice?.time),
          thirdPractice:  parseF1DateTime(race.ThirdPractice?.date, race.ThirdPractice?.time),
          qualifying:     parseF1DateTime(race.Qualifying?.date, race.Qualifying?.time),
        }
      });
    }
  }

  console.log(`✅ Calendario ${year} actualizado en Full Wet DB`);
}

const args = process.argv.slice(2) || [2026]
const year = parseInt(args[0]!)

syncCalendar(year)
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());