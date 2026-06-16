import { Router } from "express";
import { FiscalCanaryController } from "./FiscalCanaryController";
import { requireFiscalAuth } from "./helpers";

const fiscalCanaryRoutes = Router();
const controller = new FiscalCanaryController();

fiscalCanaryRoutes.use(requireFiscalAuth);

fiscalCanaryRoutes.get("/plan", (req, res) => controller.getPlan(req, res));
fiscalCanaryRoutes.get("/eligibility", (req, res) => controller.getEligibility(req, res));
fiscalCanaryRoutes.get("/readiness", (req, res) => controller.getReadiness(req, res));
fiscalCanaryRoutes.post("/simulate-decision", (req, res) => controller.simulateDecision(req, res));

export { fiscalCanaryRoutes };
