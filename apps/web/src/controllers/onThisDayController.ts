import { API_URL } from "./api";
import { type models } from "types";

export async function getOnThisDay(day: number, month: number) {
  try {
    const response = await fetch(`${API_URL}/on-this-day/${day}/${month}`);
    const data = await response.json();
    if(response.status === 200) {
      return data as models.OnThisDay;
    }
    return null;
  } catch (error) {
    console.error("Error al obtener la efeméride:", error);
    return null;
  }
}