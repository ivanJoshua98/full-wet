import { API_URL } from "./api";
import type { models } from "types";

export async function getDriverStandings(year: number) {
  try {
    const response = await fetch(`${API_URL}/driver-standings/${year}`);
    const data = await response.json();
    return data as models.DriverStanding[];
  } catch (error) {
    console.error("Error al obtener las posiciones de los pilotos:", error);
    return [];
  }
}

export async function getConstructorStandings(year: number) {
  try {
    const response = await fetch(`${API_URL}/constructor-standings/${year}`);
    const data = await response.json();
    return data as models.ConstructorStanding[];
  } catch (error) {
    console.error("Error al obtener las posiciones de los constructores:", error);
    return [];
  }
}