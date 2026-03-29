import { Router } from "express";
import { getRaceResultsHandler } from "../controllers/raceResultController.js";

export function createRaceResultRouter(): Router {
  const router = Router();

  // Race Results routes
  router.get("/:raceId", getRaceResultsHandler);

  return router;
}