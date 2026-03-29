import { Router } from "express";
import { getDriverStandingsHandler } from "../controllers/driverStandingController.js";

export function createDriverStandingRouter(): Router {
  const router = Router();

  // Driver Standings routes
  router.get("/:year", getDriverStandingsHandler);

  return router;
}