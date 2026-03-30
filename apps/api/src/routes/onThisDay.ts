import { Router } from "express";
import { getAllOnThisDayHandler, getOnThisDayByDateHandler } from "../controllers/onThisDayController.js";

export function createOnThisDayRouter(): Router {
    const router = Router();

    // On this day routes
    router.get("/", getAllOnThisDayHandler);
    router.get("/:day/:month", getOnThisDayByDateHandler);

    return router;
}