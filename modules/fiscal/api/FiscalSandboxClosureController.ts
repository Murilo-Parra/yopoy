import { Request, Response } from 'express';
import { FiscalSandboxClosureInventory } from '../sandbox-persistence/FiscalSandboxClosureInventory';
import { FiscalSandboxClosureGuardrails } from '../sandbox-persistence/FiscalSandboxClosureGuardrails';
import { FiscalSandboxClosureRiskRegister } from '../sandbox-persistence/FiscalSandboxClosureRiskRegister';
import { FiscalSandboxClosureHandoffService } from '../sandbox-persistence/FiscalSandboxClosureHandoffService';
import { FiscalSandboxClosureReportService } from '../sandbox-persistence/FiscalSandboxClosureReportService';
import { FiscalSandboxClosureAuditService } from '../sandbox-persistence/FiscalSandboxClosureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalSandboxClosureController {
  public static async getInventory(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxClosureAuditService.logAdministrativeClosureRead({ companyId, userId, endpoint });

      res.json({
        inventory: FiscalSandboxClosureInventory.getInventory(),
        readOnly: true,
        sandboxOnly: true,
        productionWrite: false
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getGuardrails(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxClosureAuditService.logAdministrativeClosureRead({ companyId, userId, endpoint });

      res.json({
        guardrails: FiscalSandboxClosureGuardrails.getGuardrails(),
        approvedForRealCanary: false,
        approvedForProductionV2: false,
        activationBlocked: true,
        simulationOnly: true,
        productionWrite: false,
        readOnly: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxClosureAuditService.logAdministrativeClosureRead({ companyId, userId, endpoint });

      res.json({
        risks: FiscalSandboxClosureRiskRegister.getRisks(),
        readOnly: true,
        sandboxOnly: true,
        productionWrite: false
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHandoff(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxClosureAuditService.logAdministrativeClosureRead({ companyId, userId, endpoint });

      res.json(FiscalSandboxClosureHandoffService.getHandoff());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getFinalReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxClosureAuditService.logAdministrativeClosureRead({ companyId, userId, endpoint });

      res.json(FiscalSandboxClosureReportService.getFinalReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      readOnly: true,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    });
  }
}
