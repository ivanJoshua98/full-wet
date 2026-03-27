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

export async function getAllRaces() {
  const races = await prisma.race.findMany({
    select: {
      id: true,
      seasonYear: true,
    },
    orderBy: { id: 'desc' },
  });

  const racesByYear: Record<number, number[]> = {};
  for (const race of races) {
    const yearRaces = racesByYear[race.seasonYear] || [];
    yearRaces.push(race.id);
    racesByYear[race.seasonYear] = yearRaces;
  }

  return racesByYear;
}