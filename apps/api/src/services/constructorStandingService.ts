import { prisma } from "database";
import type { models } from "types";

export async function getConstructorStandingsByYear(year: number) {
  const constructorStandings = await prisma.constructorStanding.findMany({
    where: {
      seasonYear: year,
    },
    include: {
      team: true
    },
    orderBy: {
      position: "asc",
    },
  });
  return constructorStandings as models.ConstructorStanding[];
}
