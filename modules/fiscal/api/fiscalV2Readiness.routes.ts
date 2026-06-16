import { Router } from "express";
import { FiscalV2ReadinessController } from "./FiscalV2ReadinessController";

const router = Router();
const controller = new FiscalV2ReadinessController();

router.get("/inventory", controller.getInventory);
router.get("/audit", controller.getAudit);
router.get("/risks", controller.getRisks);
router.get("/gaps", controller.getGaps);
router.get("/final-report", controller.getFinalReport);
router.post("/simulate-future-activation-review", controller.simulateFutureActivationReview);

export { router as fiscalV2ReadinessRoutes };
