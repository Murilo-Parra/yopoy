import { Router } from "express";
import { FiscalCanaryControlController } from "./FiscalCanaryControlController";
import { requireFiscalAuth } from "./helpers";

const fiscalCanaryControlRoutes = Router();
const controller = new FiscalCanaryControlController();

fiscalCanaryControlRoutes.use(requireFiscalAuth);

fiscalCanaryControlRoutes.get("/status", (req, res) => controller.getStatus(req, res));
fiscalCanaryControlRoutes.get("/allowlist", (req, res) => controller.listAllowlist(req, res));
fiscalCanaryControlRoutes.post("/allowlist/simulate", (req, res) => controller.simulateAllowlist(req, res));
fiscalCanaryControlRoutes.post("/approve-simulation", (req, res) => controller.approveSimulation(req, res));
fiscalCanaryControlRoutes.post("/block", (req, res) => controller.blockCandidate(req, res));
fiscalCanaryControlRoutes.get("/audit", (req, res) => controller.listAudit(req, res));

export { fiscalCanaryControlRoutes };
