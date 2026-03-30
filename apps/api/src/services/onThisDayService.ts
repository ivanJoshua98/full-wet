import { prisma } from "database";
import type { models } from "types";

export async function getAllOnThisDay() {
  const all = await prisma.onThisDay.findMany({
    select: {
      day: true,
      month: true,
      history: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return all as models.OnThisDay[];
}

export async function getOnThisDayByDate(day: number, month: number) {
  const onThisDay = await prisma.onThisDay.findFirst({
    select: {
      day: true,
      month: true,
      history: true,
      createdAt: true,
    },
    where: {
      day,
      month,
    },
    orderBy: { createdAt: 'desc' },
  });
  return onThisDay as models.OnThisDay;
}