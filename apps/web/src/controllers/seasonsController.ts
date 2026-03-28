import { API_URL } from "./api";

export async function getAllSeasons() {
  try {
    const response = await fetch(`${API_URL}/seasons`);
    const data = await response.json();
    return data as number[];
  } catch (error) {
    console.error("Error al obtener las temporadas:", error);
    return [];
  }
}

export async function getPastSeasons() {
  try {
    const response = await fetch(`${API_URL}/seasons`);
    const data = await response.json();
    if (data.length > 0) {
      data.shift();
    }
    return data as number[];
  } catch (error) {
    console.error("Error al obtener las temporadas:", error);
    return [];
  }
}