import { Router } from "express";
import { FiscalShadowReplayGovernanceController } from "./FiscalShadowReplayGovernanceController";
import { FiscalShadowReplayMetricsDashboardService } from "../canary/tap/replay/metrics/FiscalShadowReplayMetricsDashboardService";

export const createFiscalShadowReplayGovernanceRoutes = (
    metricsService: FiscalShadowReplayMetricsDashboardService
) => {
    const router = Router();
    const controller = new FiscalShadowReplayGovernanceController(metricsService);

    router.get("/snapshot", controller.getSnapshot);
    router.get("/checklist", controller.getChecklist);
    router.get("/risks", controller.getRisks);
    router.get("/export-json", controller.exportJson);
    router.get("/export-text", controller.exportText);
    router.get("/final-review", controller.getFinalReview);

    return router;
};
