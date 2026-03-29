import { API_URL } from "./api";
import { type models } from "types";

export async function getNextRace(year: number) {
  try {
    const response = await fetch(`${API_URL}/races/${year}/next`);
    const data = await response.json();
    return data as models.Race;
  } catch (error) {
    console.error("Error al obtener la próxima carrera:", error);
    return null;
  }
}

export async function getRacesByYear(year: number) {
  try {
    const response = await fetch(`${API_URL}/races/${year}`);
    const data = await response.json();
    return data as models.Race[];
  } catch (error) {
    console.error("Error al obtener las carreras de la temporada ", year, ":", error);
    return [];
  }
}

export async function getAllRaces() {
  try {
    const response = await fetch(`${API_URL}/races`);
    const data = await response.json();
    return data as Record<number, number[]>;
  } catch (error) {
    console.error("Error al obtener todas las carreras:", error);
    return {};
  }
}

export async function getRaceResults(raceId: number) {
  try {
    const response = await fetch(`${API_URL}/race-results/${raceId}`);
    const data = await response.json();
    return data as models.RaceResultTable;
  } catch (error) {
    console.error("Error al obtener los resultados de la carrera:", error);
    return { race: null, results: [] };
  }
}
