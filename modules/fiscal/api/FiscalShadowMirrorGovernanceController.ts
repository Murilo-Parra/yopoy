import { Request, Response } from 'express';
import { FiscalShadowMirrorGovernanceInventory } from '../shadow-mirror/governance/FiscalShadowMirrorGovernanceInventory';
import { FiscalShadowMirrorGovernanceGuardrails } from '../shadow-mirror/governance/FiscalShadowMirrorGovernanceGuardrails';
import { FiscalShadowMirrorGovernanceRiskRegister } from '../shadow-mirror/governance/FiscalShadowMirrorGovernanceRiskRegister';
import { FiscalShadowMirrorGovernanceHandoffService } from '../shadow-mirror/governance/FiscalShadowMirrorGovernanceHandoffService';
import { FiscalShadowMirrorGovernanceReportService } from '../shadow-mirror/governance/FiscalShadowMirrorGovernanceReportService';
import { FiscalShadowMirrorGovernanceAuditService } from '../shadow-mirror/governance/FiscalShadowMirrorGovernanceAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalShadowMirrorGovernanceController {
  public static async getInventory(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorGovernanceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_INVENTORY' });

      res.json({
        inventory: FiscalShadowMirrorGovernanceInventory.getInventory(),
        designOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getGuardrails(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorGovernanceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GUARDRAILS' });

      res.json({
        guardrails: FiscalShadowMirrorGovernanceGuardrails.getChecklist(),
        designOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorGovernanceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });

      res.json({
        risks: FiscalShadowMirrorGovernanceRiskRegister.getRisks(),
        designOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }
  
  public static async getHandoff(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorGovernanceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' });

      res.json(FiscalShadowMirrorGovernanceHandoffService.generateHandoff());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getFinalReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorGovernanceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_REPORT' });

      res.json(FiscalShadowMirrorGovernanceReportService.getFinalReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorGovernanceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalShadowMirrorGovernanceAuditService.getLogs(),
         designOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true 
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      designOnly: true,
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealCapture: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      routeToV2: false,
      routeToLegacy: true
    });
  }
}
