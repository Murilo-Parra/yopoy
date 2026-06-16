import { Request, Response } from 'express';
import { 
  FiscalProductionActivationClosurePolicy,
  FiscalProductionActivationClosureInventory,
  FiscalProductionActivationFinalChecklist,
  FiscalProductionActivationEvidencePackageService,
  FiscalProductionActivationNoActivationHandoffService,
  FiscalProductionActivationPostClosureRoadmap,
  FiscalProductionActivationFinalBlockerRegister,
  FiscalProductionActivationFinalRiskRegister,
  FiscalProductionActivationClosureEvaluationService,
  FiscalProductionActivationClosureDecisionService,
  FiscalProductionActivationClosureReportService,
  FiscalProductionActivationClosureAuditService,
  FiscalProductionActivationClosureValidator,
  FiscalProductionActivationClosureInput
} from '../dedicated-homologation/production-activation-control-plane/closure';

export class FiscalProductionActivationControlPlaneClosureController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.logAdminRead('getPolicy');
    res.status(200).json({ policy: FiscalProductionActivationClosurePolicy.getPolicyMessage() });
  }

  public static getClosureInventory(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.logAdminRead('getClosureInventory');
    res.status(200).json({ inventory: FiscalProductionActivationClosureInventory.getInventory() });
  }

  public static getFinalChecklist(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.logAdminRead('getFinalChecklist');
    res.status(200).json({ checklist: FiscalProductionActivationFinalChecklist.getChecklist() });
  }

  public static getEvidencePackage(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.logAdminRead('getEvidencePackage');
    res.status(200).json({ package: FiscalProductionActivationEvidencePackageService.getPackage() });
  }

  public static getNoActivationHandoff(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.logAdminRead('getNoActivationHandoff');
    res.status(200).json({ handoff: FiscalProductionActivationNoActivationHandoffService.getHandoff() });
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.logAdminRead('getPostClosureRoadmap');
    res.status(200).json({ roadmap: FiscalProductionActivationPostClosureRoadmap.getRoadmap() });
  }

  public static getFinalBlockers(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.logAdminRead('getFinalBlockers');
    res.status(200).json({ blockers: FiscalProductionActivationFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.logAdminRead('getFinalRisks');
    res.status(200).json({ risks: FiscalProductionActivationFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
      try {
          const input: FiscalProductionActivationClosureInput = req.body;
          FiscalProductionActivationClosureValidator.validate(input);
          FiscalProductionActivationClosureAuditService.logAdminRead('validate', { success: true });
          res.status(200).json({ valid: true });
      } catch (error: any) {
          FiscalProductionActivationClosureAuditService.logAdminRead('validate', { success: false, error: error.message });
          res.status(400).json({ valid: false, error: error.message });
      }
  }

  public static evaluate(req: Request, res: Response) {
      try {
        const input: FiscalProductionActivationClosureInput = req.body;
        const evaluation = FiscalProductionActivationClosureEvaluationService.evaluate(input);
        FiscalProductionActivationClosureAuditService.logAdminRead('evaluate', { success: true });
        res.status(200).json({ evaluation });
      } catch (error: any) {
        FiscalProductionActivationClosureAuditService.logAdminRead('evaluate', { success: false, error: error.message });
        res.status(400).json({ valid: false, error: error.message });
      }
  }

  public static simulateDecision(req: Request, res: Response) {
      try {
        const input: FiscalProductionActivationClosureInput = req.body;
        FiscalProductionActivationClosureValidator.validate(input);
        const decision = FiscalProductionActivationClosureDecisionService.simulateDecision(input);
        FiscalProductionActivationClosureAuditService.logAdminRead('simulateDecision', { success: true });
        res.status(200).json({ decision });
      } catch (error: any) {
        FiscalProductionActivationClosureAuditService.logAdminRead('simulateDecision', { success: false, error: error.message });
        res.status(400).json({ error: error.message });
      }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.logAdminRead('getReport');
    res.status(200).json({ report: FiscalProductionActivationClosureReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionActivationClosureAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '33.5',
      description: 'Production Activation Control Plane Governance Closure',
      realClosureExecuted: false,
      realProductionActivationExecuted: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false
    });
  }
}
