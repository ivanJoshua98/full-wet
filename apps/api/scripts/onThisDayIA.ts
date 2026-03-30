import { GoogleGenAI } from "@google/genai";

export async function onThisDayIA() {
  // Obtenemos el mes y día en español explícitamente para no confundir a la IA con el año actual
  const date = new Date();
  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio", 
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const todayString = `${date.getDate()} de ${monthNames[date.getMonth()]}`;

  const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1/chat/completions";
  const OPENROUTER_DEFAULT_MODEL = process.env.OPENROUTER_DEFAULT_MODEL || "openrouter/free";

  try {
    const response = await fetch(OPENROUTER_BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": OPENROUTER_DEFAULT_MODEL,
        "messages": [
          {
            "role": "system",
            "content": "Eres un historiador experto en Fórmula 1, especializado en datos técnicos, biografías y aniversarios. " +
            "Tu objetivo es buscar UNA efeméride diaria en español que sea REAL, precisa, emocionante y breve. " +
            "La efeméride puede ser sobre hitos históricos, primeras victorias, títulos mundiales, resumen de carreras que hayan ocurrido en esa fecha, " +
            "nacimientos de pilotos o escuderias, o eventos relacionados con la Fórmula 1. " +
            "Tono: Profesional, apasionado y directo."
          },
          {
            "role": "user",
            "content": `Busca UNA efeméride de 4 -5 lineas sobre Fórmula 1 exactamente para un día como hoy: ${todayString}. ` + 
              `Responde unicamente con la efeméride, sin agregar comentarios extra, ni nada por el estilo.`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API falló con status ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    if (result.choices?.[0]) {
      console.log("Contenido generado por la IA:", result.choices?.[0]);
    }

    const contentStr = result.choices?.[0]?.message?.content;

    if (!contentStr) {
      throw new Error("Respuesta de OpenRouter vacía o sin content.");
    }
    return contentStr;
  } catch (error) {
    console.error("Error contactando a la IA:", error);
    throw error;
  }
}

export async function onThisDayGoogleAI() {
  const ai = new GoogleGenAI({});
  const defaultModel = process.env.GEMINI_DEFAULT_MODEL || "gemini-3-flash-preview";
  
  const date = new Date();
  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio", 
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const todayString = `${date.getDate()} de ${monthNames[date.getMonth()]}`;
  try {
    const response = await ai.models.generateContent({
      model: defaultModel,
      contents: `Busca UNA efeméride REAL de Fórmula 1 exactamente para un día como hoy: ${todayString}. ` +
        `Escribe un parrafo de 4-5 lineas en español.`
    });
    return response.text;
  } catch (error) {
    console.error("Error contactando a la IA:", error);
    throw error;
  }
}