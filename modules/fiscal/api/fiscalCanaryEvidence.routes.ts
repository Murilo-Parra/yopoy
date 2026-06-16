import { Router } from "express";
import { FiscalCanaryEvidenceController } from "./FiscalCanaryEvidenceController";
import { requireFiscalAuth } from "./helpers";

const fiscalCanaryEvidenceRoutes = Router();
const controller = new FiscalCanaryEvidenceController();

fiscalCanaryEvidenceRoutes.use(requireFiscalAuth);

fiscalCanaryEvidenceRoutes.get("/summary", (req, res) => controller.getSummary(req, res));
fiscalCanaryEvidenceRoutes.get("/by-record/:id", (req, res) => controller.getByRecord(req, res));
fiscalCanaryEvidenceRoutes.get("/correlation", (req, res) => controller.getCorrelation(req, res));
fiscalCanaryEvidenceRoutes.post("/revalidate", (req, res) => controller.revalidate(req, res));
fiscalCanaryEvidenceRoutes.post("/simulate-suspension", (req, res) => controller.simulateSuspension(req, res));

export { fiscalCanaryEvidenceRoutes };
