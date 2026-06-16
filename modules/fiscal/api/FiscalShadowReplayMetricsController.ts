import { Request, Response } from "express";
import { FiscalShadowReplayMetricsDashboardService } from "../canary/tap/replay/metrics/FiscalShadowReplayMetricsDashboardService";
import { FiscalShadowReplayMetricsReportService } from "../canary/tap/replay/metrics/FiscalShadowReplayMetricsReportService";
import { FiscalShadowReplayMetricsReadModel } from "../canary/tap/replay/metrics/FiscalShadowReplayMetricsReadModel";
import { FiscalShadowReplayQueueRepository } from "../canary/tap/replay/FiscalShadowReplayQueueRepository";
import { FiscalShadowReplayBatchService } from "../canary/tap/replay/batch/FiscalShadowReplayBatchService";

export class FiscalShadowReplayMetricsController {
    private dashboardService: FiscalShadowReplayMetricsDashboardService;
    private reportService: FiscalShadowReplayMetricsReportService;

    constructor(repository: FiscalShadowReplayQueueRepository, batchService: FiscalShadowReplayBatchService) {
        const readModel = new FiscalShadowReplayMetricsReadModel(repository, batchService);
        this.dashboardService = new FiscalShadowReplayMetricsDashboardService(readModel);
        this.reportService = new FiscalShadowReplayMetricsReportService(this.dashboardService);
    }

    private checkAuthAndPermissions(req: Request, res: Response): boolean {
        const r = req as any;
        if (!r.user) {
            res.status(401).json({ error: "Access denied" });
            return false;
        }
        if (!r.user.is_master_admin) {
            res.status(403).json({ error: "Permission denied. Master Admin required" });
            return false;
        }
        return true;
    }

    public getSummary = (req: Request, res: Response) => {
        if (!this.checkAuthAndPermissions(req, res)) return;
        try {
            res.json({
                success: true,
                simulationOnly: true,
                activationBlocked: true,
                data: this.dashboardService.getSummary()
            });
        } catch (e: any) {
             res.status(500).json({ error: "Erro ao buscar métricas de summary" });
        }
    };

    public getRouteMetrics = (req: Request, res: Response) => {
        if (!this.checkAuthAndPermissions(req, res)) return;
        try {
            res.json({
                success: true,
                simulationOnly: true,
                activationBlocked: true,
                data: this.dashboardService.getRouteMetrics()
            });
        } catch (e: any) {
             res.status(500).json({ error: "Erro ao buscar métricas de rota" });
        }
    };

    public getBlockerMetrics = (req: Request, res: Response) => {
        if (!this.checkAuthAndPermissions(req, res)) return;
        try {
            res.json({
                success: true,
                simulationOnly: true,
                activationBlocked: true,
                data: this.dashboardService.getBlockerMetrics()
            });
        } catch (e: any) {
             res.status(500).json({ error: "Erro ao buscar métricas de blockers" });
        }
    };

    public getSeverityMetrics = (req: Request, res: Response) => {
        if (!this.checkAuthAndPermissions(req, res)) return;
        try {
            res.json({
                success: true,
                simulationOnly: true,
                activationBlocked: true,
                data: this.dashboardService.getSeverityMetrics()
            });
        } catch (e: any) {
             res.status(500).json({ error: "Erro ao buscar métricas de severidade" });
        }
    };

    public getReadiness = (req: Request, res: Response) => {
        if (!this.checkAuthAndPermissions(req, res)) return;
        try {
            res.json({
                success: true,
                simulationOnly: true,
                activationBlocked: true,
                data: this.dashboardService.getReadiness()
            });
        } catch (e: any) {
             res.status(500).json({ error: "Erro ao buscar métricas de prontidão" });
        }
    };

    public getReport = (req: Request, res: Response) => {
        if (!this.checkAuthAndPermissions(req, res)) return;
        try {
            res.json({
                success: true,
                simulationOnly: true,
                activationBlocked: true,
                data: this.reportService.generateReport()
            });
        } catch (e: any) {
             res.status(500).json({ error: "Erro ao buscar relatório" });
        }
    };
}
