import { Router } from "express";
import { FiscalShadowReplayBatchController } from "./FiscalShadowReplayBatchController";
import { FiscalShadowReplayQueueRepository } from "../canary/tap/replay/FiscalShadowReplayQueueRepository";
import { FiscalShadowReplayAuditService } from "../canary/tap/replay/FiscalShadowReplayAuditService";

export const createFiscalShadowReplayBatchRoutes = (
    repository: FiscalShadowReplayQueueRepository,
    auditService: FiscalShadowReplayAuditService
) => {
    const router = Router();
    const controller = new FiscalShadowReplayBatchController(repository, auditService);

    router.post("/validate", controller.validateBatch);
    router.post("/simulate", controller.simulateBatch);
    router.get("/report", controller.getReport);
    router.get("/audit", controller.getAudit);
    router.get("/:id", controller.getBatch);
    router.post("/:id/mark-reviewed", controller.markReviewed);

    return router;
};
