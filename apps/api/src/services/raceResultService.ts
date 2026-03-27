import { prisma } from "database";
import type { models } from "types";

export async function getRaceResults(raceId: number) {
    const results = await prisma.raceResult.findMany({
        where: {
            raceId,
        },
        include: {
            driver: true,
            team: true,
        },
        orderBy: {
            position: 'asc',
        },
    });
    const race = await prisma.race.findUnique({
        where: {
            id: raceId,
        },
    });
    return { race, results } as models.RaceResultTable;
}