import { Router } from "express";
import { getAllRacesHandler, getNextRaceHandler, getRacesByYearHandler } from "../controllers/raceController.js";

export function createRaceRouter(): Router {
  const router = Router();

  // Races routes
  router.get("/", getAllRacesHandler);
  router.get('/:year', getRacesByYearHandler);
  router.get('/:year/next', getNextRaceHandler);

  return router;
}