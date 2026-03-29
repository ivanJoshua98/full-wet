import { Router } from "express";
import { getConstructorStandingsHandler } from "../controllers/constructorStandingController.js";

export function createConstructorStandingRouter(): Router {
  const router = Router();

  // Constructor Standings routes
  router.get("/:year", getConstructorStandingsHandler);

  return router;
}