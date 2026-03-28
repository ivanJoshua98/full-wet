import { API_URL } from "./api";
import type { models } from "types";

export async function getDriverStandings(year: number) {
  try {
    const response = await fetch(`${API_URL}/${year}/driver-standings`);
    const data = await response.json();
    return data as models.DriverStanding[];
  } catch (error) {
    console.error("Error al obtener las posiciones de los pilotos:", error);
    return [];
  }
}

export async function getConstructorStandings(year: number) {
  try {
    const response = await fetch(`${API_URL}/${year}/constructor-standings`);
    const data = await response.json();
    return data as models.ConstructorStanding[];
  } catch (error) {
    console.error("Error al obtener las posiciones de los constructores:", error);
    return [];
  }
}