import { Router } from "express";
import { FiscalCanaryRuntimeController } from "./FiscalCanaryRuntimeController";
import { requireFiscalAuth } from "./helpers";

const fiscalCanaryRuntimeRoutes = Router();
const controller = new FiscalCanaryRuntimeController();

fiscalCanaryRuntimeRoutes.use(requireFiscalAuth);

fiscalCanaryRuntimeRoutes.get("/status", (req, res) => controller.getStatus(req, res));
fiscalCanaryRuntimeRoutes.get("/flags", (req, res) => controller.getFlags(req, res));
fiscalCanaryRuntimeRoutes.get("/kill-switch", (req, res) => controller.getKillSwitch(req, res));
fiscalCanaryRuntimeRoutes.post("/simulate-decision", (req, res) => controller.simulateDecision(req, res));
fiscalCanaryRuntimeRoutes.post("/validate-hard-off", (req, res) => controller.validateHardOff(req, res));
fiscalCanaryRuntimeRoutes.get("/audit", (req, res) => controller.getAudit(req, res));

export { fiscalCanaryRuntimeRoutes };
