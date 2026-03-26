import { prisma } from "database";
import type { models } from "types";

export async function getRacesByYear(year: number) {
  const races = await prisma.race.findMany({
    where: { seasonYear: year },
    include: {
      circuit: true,
    },
    orderBy: { round: "asc" },
  });
  return races as models.Race[];
}

export async function getNextRace(year: number) {
  const nextRace = await prisma.race.findFirst({
    where: {
      seasonYear: year,
      date: { gte: new Date() }
    },
    orderBy: { date: 'asc' },
    include: { circuit: true }
  });

  return nextRace as models.Race;
}