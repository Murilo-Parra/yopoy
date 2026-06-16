import { Router } from "express";
import { FiscalCanaryCockpitController } from "./FiscalCanaryCockpitController";
import { requireFiscalAuth } from "./helpers";

const fiscalCanaryCockpitRoutes = Router();
const controller = new FiscalCanaryCockpitController();

fiscalCanaryCockpitRoutes.use(requireFiscalAuth);

fiscalCanaryCockpitRoutes.get("/overview", (req, res) => controller.getOverview(req, res));
fiscalCanaryCockpitRoutes.get("/routes", (req, res) => controller.getRoutes(req, res));
fiscalCanaryCockpitRoutes.get("/blockers", (req, res) => controller.getBlockers(req, res));
fiscalCanaryCockpitRoutes.get("/recommendations", (req, res) => controller.getRecommendations(req, res));
fiscalCanaryCockpitRoutes.get("/timeline", (req, res) => controller.getTimeline(req, res));
fiscalCanaryCockpitRoutes.post("/simulate-final-review", (req, res) => controller.simulateFinalReview(req, res));

export { fiscalCanaryCockpitRoutes };
