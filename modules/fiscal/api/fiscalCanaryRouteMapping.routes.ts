import { Router } from "express";
import { FiscalCanaryRouteMappingController } from "./FiscalCanaryRouteMappingController";
import { requireFiscalAuth } from "./helpers";

const fiscalCanaryRouteMappingRoutes = Router();
const controller = new FiscalCanaryRouteMappingController();

fiscalCanaryRouteMappingRoutes.use(requireFiscalAuth);

fiscalCanaryRouteMappingRoutes.get("/catalog", (req, res) => controller.getCatalog(req, res));
fiscalCanaryRouteMappingRoutes.get("/mappings", (req, res) => controller.getMappings(req, res));
fiscalCanaryRouteMappingRoutes.get("/mappings/:id", (req, res) => controller.getMappingById(req, res));
fiscalCanaryRouteMappingRoutes.get("/readiness", (req, res) => controller.getReadiness(req, res));
fiscalCanaryRouteMappingRoutes.post("/simulate-mapping", (req, res) => controller.simulateMapping(req, res));
fiscalCanaryRouteMappingRoutes.post("/validate-mapping", (req, res) => controller.validateMapping(req, res));

export { fiscalCanaryRouteMappingRoutes };
