import { prisma } from "database";
import { type models } from "types";

export async function getCalendar(year: number) {
  const races = await prisma.race.findMany({
    where: { seasonYear: year },
    include: {
      circuit: true,
    },
    orderBy: { round: "asc" },
  });
  return races as models.Race[];
}

export async function getNextRace() {
  const nextRace = await prisma.race.findFirst({
    where: {
      date: { gte: new Date() }
    },
    orderBy: { date: 'asc' },
    include: { circuit: true }
  });

  return nextRace as models.Race;
}
