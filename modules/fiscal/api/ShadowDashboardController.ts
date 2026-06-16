import { Request, Response } from "express";
import { FiscalShadowDashboardService } from "../shadow/FiscalShadowDashboardService";
import { FiscalShadowGovernanceService } from "../shadow/FiscalShadowGovernanceService";
import { ShadowDashboardValidators } from "../validators/ShadowDashboardValidators";
import { extractCompanyId } from "../api/helpers";

export class ShadowDashboardController {
  private dashboardService = new FiscalShadowDashboardService();
  private governanceService = new FiscalShadowGovernanceService();

  public async getSummary(req: Request, res: Response): Promise<void> {
    try {
      const filters = ShadowDashboardValidators.validateFilters(req.query);
      this.enforceSecurityScoping(req, filters);
      
      const summary = await this.dashboardService.getSummary(filters);
      res.json({ success: true, data: summary });
    } catch (error: any) {
      res.status(500).json({ success: false, error: "Erro ao gerar resumo do dashboard." });
    }
  }

  public async listDivergences(req: Request, res: Response): Promise<void> {
    try {
      const filters = ShadowDashboardValidators.validateFilters(req.query);
      this.enforceSecurityScoping(req, filters);

      const records = await this.dashboardService.listDivergences(filters);
      res.json({ success: true, count: records.length, data: records });
    } catch (error: any) {
      res.status(500).json({ success: false, error: "Erro ao listar divergências." });
    }
  }

  public async getSeverityBreakdown(req: Request, res: Response): Promise<void> {
    try {
      const filters = ShadowDashboardValidators.validateFilters(req.query);
      this.enforceSecurityScoping(req, filters);

      const breakdown = await this.dashboardService.getSeverityBreakdown(filters);
      res.json({ success: true, data: breakdown });
    } catch (error: any) {
      res.status(500).json({ success: false, error: "Erro ao buscar quebra por severidade." });
    }
  }

  public async getReadiness(req: Request, res: Response): Promise<void> {
    try {
      const filters = ShadowDashboardValidators.validateFilters(req.query);
      this.enforceSecurityScoping(req, filters);

      const readiness = await this.governanceService.evaluateReadiness(filters);
      res.json({ success: true, data: readiness });
    } catch (error: any) {
      res.status(500).json({ success: false, error: "Erro ao avaliar maturidade shadow." });
    }
  }

  private enforceSecurityScoping(req: Request, filters: any): void {
    const isMasterAdmin = (req as any).user?.is_master_admin === true;
    
    if (!isMasterAdmin) {
      // Normal company user: force company filter
      const userCompany = extractCompanyId(req);
      if (!userCompany) {
         throw new Error("CompanyId ausente.");
      }
      filters.companyId = userCompany;
    }
    // If isMasterAdmin, allow query across all companies if companyId not provided
  }
}
