import { prisma } from "database";

export async function getAllSeasons() {
  const seasons = await prisma.season.findMany({
    select: {
      year: true,
    },
    distinct: ['year'],
    orderBy: { year: 'desc' },
  });
  return seasons.map((season: { year: number }) => season.year);
}