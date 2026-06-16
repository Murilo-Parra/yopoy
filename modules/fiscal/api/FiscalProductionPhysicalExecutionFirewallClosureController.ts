import { Request, Response } from 'express';
import { 
  FiscalProductionPhysicalExecutionFirewallClosurePolicy,
  FiscalProductionPhysicalExecutionFirewallClosureInventory,
  FiscalProductionPhysicalExecutionFirewallFinalChecklist,
  FiscalProductionPhysicalExecutionFirewallEvidencePackageService,
  FiscalProductionPhysicalExecutionNoActivationHandoffService,
  FiscalProductionPhysicalExecutionPostClosureRoadmap,
  FiscalProductionPhysicalExecutionFinalBlockerRegister,
  FiscalProductionPhysicalExecutionFinalRiskRegister,
  FiscalProductionPhysicalExecutionFirewallClosureValidator,
  FiscalProductionPhysicalExecutionFirewallClosureEvaluationService,
  FiscalProductionPhysicalExecutionFirewallClosureDecisionService,
  FiscalProductionPhysicalExecutionFirewallClosureReportService,
  FiscalProductionPhysicalExecutionFirewallClosureAuditService
} from '../dedicated-homologation/production-physical-execution-firewall/closure';

export class FiscalProductionPhysicalExecutionFirewallClosureController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('getPolicy');
    res.status(200).json({ policy: FiscalProductionPhysicalExecutionFirewallClosurePolicy.getPolicyMessage() });
  }

  public static getClosureInventory(req: Request, res: Response) {
    FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('getClosureInventory');
    res.status(200).json({ inventory: FiscalProductionPhysicalExecutionFirewallClosureInventory.getInventory() });
  }

  public static getFinalChecklist(req: Request, res: Response) {
    FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('getFinalChecklist');
    res.status(200).json({ checklist: FiscalProductionPhysicalExecutionFirewallFinalChecklist.getChecklist() });
  }

  public static getEvidencePackage(req: Request, res: Response) {
    FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('getEvidencePackage');
    res.status(200).json({ package: FiscalProductionPhysicalExecutionFirewallEvidencePackageService.getPackage() });
  }

  public static getNoActivationHandoff(req: Request, res: Response) {
    FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('getNoActivationHandoff');
    res.status(200).json({ handoff: FiscalProductionPhysicalExecutionNoActivationHandoffService.getHandoff() });
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('getPostClosureRoadmap');
    res.status(200).json({ roadmap: FiscalProductionPhysicalExecutionPostClosureRoadmap.getRoadmap() });
  }

  public static getFinalBlockers(req: Request, res: Response) {
    FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('getFinalBlockers');
    res.status(200).json({ blockers: FiscalProductionPhysicalExecutionFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('getFinalRisks');
    res.status(200).json({ risks: FiscalProductionPhysicalExecutionFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    try {
      FiscalProductionPhysicalExecutionFirewallClosureValidator.validate(req.body);
      FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('validate', { success: true });
      res.status(200).json({ valid: true });
    } catch (error: any) {
      FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('validate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static evaluate(req: Request, res: Response) {
    try {
      const evaluation = FiscalProductionPhysicalExecutionFirewallClosureEvaluationService.evaluate(req.body);
      FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('evaluate', { success: true });
      res.status(200).json({ evaluation });
    } catch (error: any) {
      FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('evaluate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static simulateDecision(req: Request, res: Response) {
    try {
      FiscalProductionPhysicalExecutionFirewallClosureValidator.validate(req.body);
      const decision = FiscalProductionPhysicalExecutionFirewallClosureDecisionService.simulateDecision(req.body);
      FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('simulateDecision', { success: true });
      res.status(200).json({ decision });
    } catch (error: any) {
      FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('simulateDecision', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionPhysicalExecutionFirewallClosureAuditService.audit('getReport');
    res.status(200).json({ report: FiscalProductionPhysicalExecutionFirewallClosureReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionPhysicalExecutionFirewallClosureAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '34.5',
      realClosureExecuted: false,
      realHandoffConcluded: false
    });
  }
}
