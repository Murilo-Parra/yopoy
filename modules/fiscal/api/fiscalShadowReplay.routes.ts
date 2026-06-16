import { Router } from "express";
import { FiscalShadowReplayController } from "./FiscalShadowReplayController";
import { FiscalShadowReplayBatchController } from "./FiscalShadowReplayBatchController";
import { createFiscalShadowReplayGovernanceRoutes } from "./fiscalShadowReplayGovernance.routes";
import { createFiscalShadowReplayClosureRoutes } from "./fiscalShadowReplayClosure.routes";
import { FiscalShadowReplayQueueRepository } from "../canary/tap/replay/FiscalShadowReplayQueueRepository";
import { FiscalShadowReplayAuditService } from "../canary/tap/replay/FiscalShadowReplayAuditService";
import { createFiscalShadowReplayMetricsRoutes } from "./fiscalShadowReplayMetrics.routes";

import { FiscalShadowReplayMetricsReadModel } from "../canary/tap/replay/metrics/FiscalShadowReplayMetricsReadModel";
import { FiscalShadowReplayMetricsDashboardService } from "../canary/tap/replay/metrics/FiscalShadowReplayMetricsDashboardService";

const router = Router();
const repository = new FiscalShadowReplayQueueRepository();
const auditService = new FiscalShadowReplayAuditService();

const controller = new FiscalShadowReplayController(repository, auditService);
const batchController = new FiscalShadowReplayBatchController(repository, auditService);

const batchRouter = Router();
batchRouter.post("/validate", batchController.validateBatch);
batchRouter.post("/simulate", batchController.simulateBatch);
batchRouter.get("/report", batchController.getReport);
batchRouter.get("/audit", batchController.getAudit);
batchRouter.get("/:id", batchController.getBatch);
batchRouter.post("/:id/mark-reviewed", batchController.markReviewed);

const readModel = new FiscalShadowReplayMetricsReadModel(repository, batchController.batchService);
const metricsService = new FiscalShadowReplayMetricsDashboardService(readModel);

router.use("/closure", createFiscalShadowReplayClosureRoutes());
router.use("/governance", createFiscalShadowReplayGovernanceRoutes(metricsService));
router.use("/metrics", createFiscalShadowReplayMetricsRoutes(repository, batchController.batchService));
router.use("/batch", batchRouter);

router.post("/enqueue", controller.enqueue);
router.get("/list", controller.list);
router.get("/report", controller.getReport);
router.get("/audit", controller.getAudit);
router.post("/validate-item", controller.validateItem);
router.get("/:id", controller.getById);
router.post("/:id/simulate", controller.simulate);
router.post("/:id/mark-skipped", controller.markSkipped);

export { router as fiscalShadowReplayRoutes };
