import { API_URL } from "./api";
import { type models } from "types";

export async function getNextRace() {
  try {
    const response = await fetch(`${API_URL}/calendar/next`);
    const data = await response.json();
    return data as models.Race;
  } catch (error) {
    console.error("Error al obtener la próxima carrera:", error);
    return null;
  }
}

export async function getCalendarByYear(year: number) {
  try {
    const response = await fetch(`${API_URL}/calendar/${year}`);
    const data = await response.json();
    return data as models.Race[];
  } catch (error) {
    console.error("Error al obtener el calendario de la temporada ", year, ":", error);
    return [];
  }
}