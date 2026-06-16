import { Router } from "express";
import { FiscalShadowTapController } from "./FiscalShadowTapController";

const router = Router();
const controller = new FiscalShadowTapController();

router.get("/status", controller.getStatus);
router.get("/config", controller.getConfig);
router.post("/simulate-capture", controller.simulateCapture);
router.post("/validate-policy", controller.validatePolicy);
router.get("/audit", controller.getAudit);

router.post("/manual/simulate-capture", controller.manualSimulateCapture);
router.post("/manual/compare-snapshot", controller.manualCompareSnapshot);
router.post("/manual/validate-snapshot", controller.manualValidateSnapshot);
router.get("/manual/report", controller.getManualReport);
router.get("/manual/audit", controller.getManualAudit);

export { router as fiscalShadowTapRoutes };
