import { Router } from "express";
import { getAllSeasonsHandler } from "../controllers/seasonsController.js";

export function createSeasonRouter(): Router {
  const router = Router();

  // Seasons routes
  router.get("/", getAllSeasonsHandler);

  return router;
}