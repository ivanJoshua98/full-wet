import { prisma } from "database";
import type { models } from "types";

export async function getDriverStandingsByYear(year: number) {
  const driverStandings = await prisma.driverStanding.findMany({
      where: {
          seasonYear: year,
      },
      include: {
          driver: true
      },
      orderBy: {
          position: "asc",
      },
  });
  return driverStandings as models.DriverStanding[];
}