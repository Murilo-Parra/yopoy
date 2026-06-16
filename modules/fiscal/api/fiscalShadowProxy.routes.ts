import { Router } from "express";
import { FiscalShadowProxyController } from "./FiscalShadowProxyController";
import { requireFiscalAuth } from "./helpers";

const fiscalShadowProxyRoutes = Router();
const controller = new FiscalShadowProxyController();

fiscalShadowProxyRoutes.use(requireFiscalAuth);

fiscalShadowProxyRoutes.get("/status", (req, res) => controller.getStatus(req, res));
fiscalShadowProxyRoutes.post("/simulate-dispatch", (req, res) => controller.simulateDispatch(req, res));
fiscalShadowProxyRoutes.post("/compare-shape", (req, res) => controller.compareShape(req, res));
fiscalShadowProxyRoutes.post("/validate-route", (req, res) => controller.validateRoute(req, res));
fiscalShadowProxyRoutes.get("/audit", (req, res) => controller.getAudit(req, res));
fiscalShadowProxyRoutes.post("/validate-safe-shape", (req, res) => controller.validateSafeShape(req, res));

export { fiscalShadowProxyRoutes };
