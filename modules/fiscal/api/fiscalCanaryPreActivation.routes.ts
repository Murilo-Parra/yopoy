import { Router } from "express";
import { FiscalCanaryPreActivationController } from "./FiscalCanaryPreActivationController";
import { requireFiscalAuth } from "./helpers";

const fiscalCanaryPreActivationRoutes = Router();
const controller = new FiscalCanaryPreActivationController();

fiscalCanaryPreActivationRoutes.use(requireFiscalAuth);

fiscalCanaryPreActivationRoutes.get("/checklist", (req, res) => controller.getChecklist(req, res));
fiscalCanaryPreActivationRoutes.get("/gate", (req, res) => controller.getGate(req, res));
fiscalCanaryPreActivationRoutes.get("/rollback-plan", (req, res) => controller.getRollbackPlan(req, res));
fiscalCanaryPreActivationRoutes.get("/final-report", (req, res) => controller.getFinalReport(req, res));
fiscalCanaryPreActivationRoutes.post("/simulate-go-no-go", (req, res) => controller.simulateGoNoGo(req, res));

export { fiscalCanaryPreActivationRoutes };
