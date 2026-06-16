import { Request, Response } from "express";
import { FiscalCanaryApprovalService } from "../canary/FiscalCanaryApprovalService";
import { FiscalCanaryAllowlistService } from "../canary/FiscalCanaryAllowlistService";
import { FiscalCanaryControlAuditService } from "../canary/FiscalCanaryControlAuditService";
import { FiscalCanaryControlConfig } from "../canary/FiscalCanaryControlConfig";

export class FiscalCanaryControlController {
  private approvalService = new FiscalCanaryApprovalService();
  private allowlistService = new FiscalCanaryAllowlistService();
  private auditService = new FiscalCanaryControlAuditService();

  public async getStatus(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      res.json({
        success: true,
        data: {
          controlEnabled: FiscalCanaryControlConfig.isControlEnabled(),
          controlMode: FiscalCanaryControlConfig.getControlMode(),
          allowlistEnabled: FiscalCanaryControlConfig.isAllowlistEnabled(),
          approvalRequired: FiscalCanaryControlConfig.isApprovalRequired(),
          simulationOnly: true
        }
      });
    } catch (e: any) {
      if (e.message.includes("Master Admin")) {
        res.status(403).json({ success: false, error: e.message });
      } else {
        res.status(500).json({ success: false, error: "Erro interno no Control Plane" });
      }
    }
  }

  public async listAllowlist(req: Request, res: Response): Promise<void> {
     try {
        this.enforceMasterAdmin(req);
        const allowlist = await this.allowlistService.listSimulatedAllowlist();
        res.json({ success: true, count: allowlist.length, data: allowlist });
     } catch (e: any) {
      if (e.message.includes("Master Admin")) {
        res.status(403).json({ success: false, error: e.message });
      } else {
        res.status(500).json({ success: false, error: "Erro interno no Control Plane" });
      }
    }
  }

  public async simulateAllowlist(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const input = {
        companyId: req.body.companyId as string,
        route: req.body.route as string,
        operation: req.body.operation as string,
        userId: (req as any).user?.id as string
      };
      const result = await this.allowlistService.simulateAllowlistEntry(input);
      res.json({ success: true, data: result });
    } catch (e: any) {
      if (e.message.includes("Master Admin")) {
        res.status(403).json({ success: false, error: e.message });
      } else {
        res.status(500).json({ success: false, error: "Erro na simulação do Allowlist" });
      }
    }
  }

  public async approveSimulation(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const requestArgs = {
        companyId: req.body.companyId,
        route: req.body.route,
        operation: req.body.operation,
        requestedMode: req.body.requestedMode,
        justification: req.body.justification,
        simulationOnly: true
      };
      const userId = (req as any).user?.id;
      const result = await this.approvalService.processApproval(requestArgs, userId);
      res.json({ success: true, data: result });
    } catch (e: any) {
      if (e.message.includes("Master Admin")) {
        res.status(403).json({ success: false, error: e.message });
      } else {
        res.status(500).json({ success: false, error: "Erro ao processar aprovação" });
      }
    }
  }

  public async blockCandidate(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const route = req.body.route as string;
      const operation = req.body.operation as string;
      const companyId = req.body.companyId as string;
      const userId = (req as any).user?.id;
      const result = await this.approvalService.processBlock(route, operation, companyId, userId);
      res.json({ success: true, data: result });
    } catch (e: any) {
      if (e.message.includes("Master Admin")) {
        res.status(403).json({ success: false, error: e.message });
      } else {
        res.status(500).json({ success: false, error: "Erro ao realizar bloqueio no Control Plane" });
      }
    }
  }

  public async listAudit(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const audit = await this.auditService.listAudit();
      res.json({ success: true, count: audit.length, data: audit });
    } catch (e: any) {
      if (e.message.includes("Master Admin")) {
        res.status(403).json({ success: false, error: e.message });
      } else {
        res.status(500).json({ success: false, error: "Erro interno no Control Plane Audit" });
      }
    }
  }

  private enforceMasterAdmin(req: Request): void {
    const isMasterAdmin = (req as any).user?.is_master_admin === true;
    if (!isMasterAdmin) {
      throw new Error("Acesso restrito. Módulo de Canary Control Plane exige privilégios de Master Admin.");
    }
  }
}
