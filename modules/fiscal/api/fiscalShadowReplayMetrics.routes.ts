import { Router } from "express";
import { FiscalShadowReplayMetricsController } from "./FiscalShadowReplayMetricsController";
import { FiscalShadowReplayQueueRepository } from "../canary/tap/replay/FiscalShadowReplayQueueRepository";
import { FiscalShadowReplayBatchService } from "../canary/tap/replay/batch/FiscalShadowReplayBatchService";

export const createFiscalShadowReplayMetricsRoutes = (
    repository: FiscalShadowReplayQueueRepository,
    batchService: FiscalShadowReplayBatchService
) => {
    const router = Router();
    const controller = new FiscalShadowReplayMetricsController(repository, batchService);

    router.get("/summary", controller.getSummary);
    router.get("/routes", controller.getRouteMetrics);
    router.get("/blockers", controller.getBlockerMetrics);
    router.get("/severity", controller.getSeverityMetrics);
    router.get("/readiness", controller.getReadiness);
    router.get("/report", controller.getReport);

    return router;
};
