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
    return results as models.RaceResult[];
}