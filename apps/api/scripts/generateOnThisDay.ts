import { prisma } from 'database';
import { onThisDayGoogleAI } from './onThisDayIA.js';

async function generateOnThisDay() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;

  try {
    console.log(`Generando efeméride para el ${day}/${month}...`);
    
    // Se llama a la API de la IA (Google AI)
    const aiResponse = await onThisDayGoogleAI();
    const newData = await prisma.onThisDay.upsert({
      where: {
        day_month: {
          day: day,
          month: month,
        }
      },
      update: {
        history: aiResponse,
        createdAt: now
      },
      create: {
        day: day,
        month: month,
        history: aiResponse,
        createdAt: now
      }
    });
    console.log("Efeméride generada y guardada con éxito:", newData);
  } catch (error) {
    console.error("Error al procesar la efeméride:", error);
  } finally {
    await prisma.$disconnect();
  }
}

generateOnThisDay();