import { Request, Response } from 'express';
import { 
  FiscalProductionActivationClosurePolicy,
  FiscalProductionActivationClosureInventory,
  FiscalProductionActivationFinalChecklist,
  FiscalProductionActivationEvidencePackageService,
  FiscalProductionFinalReadinessReview,
  FiscalProductionFinalReleaseHandoffService,
  FiscalProductionPostClosureRoadmap,
  FiscalProductionActivationFinalBlockerRegister,
  FiscalProductionActivationFinalRiskRegister,
  FiscalProductionActivationClosureEvaluationService,
  FiscalProductionActivationClosureDecisionService,
  FiscalProductionActivationClosureReportService,
  FiscalProductionActivationClosureAuditService,
  FiscalProductionActivationClosureValidator,
  FiscalProductionActivationClosureInput
} from '../dedicated-homologation/production-activation/closure';

export class FiscalProductionActivationClosureController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.audit('getPolicy', {});
    res.status(200).json({ policy: FiscalProductionActivationClosurePolicy.getBaseResult() });
  }

  public static getClosureInventory(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.audit('getClosureInventory', {});
    res.status(200).json({ inventory: FiscalProductionActivationClosureInventory.generateInventory() });
  }

  public static getFinalChecklist(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.audit('getFinalChecklist', {});
    res.status(200).json({ checklist: FiscalProductionActivationFinalChecklist.generateChecklist() });
  }

  public static getEvidencePackage(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.audit('getEvidencePackage', {});
    res.status(200).json({ package: FiscalProductionActivationEvidencePackageService.generatePackage() });
  }

  public static getFinalReadinessReview(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.audit('getFinalReadinessReview', {});
    res.status(200).json({ review: FiscalProductionFinalReadinessReview.generateReview() });
  }

  public static getFinalReleaseHandoff(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.audit('getFinalReleaseHandoff', {});
    res.status(200).json({ handoff: FiscalProductionFinalReleaseHandoffService.generateHandoff() });
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.audit('getPostClosureRoadmap', {});
    res.status(200).json({ roadmap: FiscalProductionPostClosureRoadmap.generateRoadmap() });
  }

  public static getFinalBlockers(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.audit('getFinalBlockers', {});
    res.status(200).json({ blockers: FiscalProductionActivationFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.audit('getFinalRisks', {});
    res.status(200).json({ risks: FiscalProductionActivationFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
      try {
          const input: FiscalProductionActivationClosureInput = req.body;
          FiscalProductionActivationClosureValidator.validate(input);
          FiscalProductionActivationClosureAuditService.audit('validate', { success: true });
          res.status(200).json({ valid: true });
      } catch (error: any) {
          FiscalProductionActivationClosureAuditService.audit('validate', { success: false, error: error.message });
          res.status(400).json({ valid: false, error: error.message });
      }
  }

  public static evaluate(req: Request, res: Response) {
      try {
        const input: FiscalProductionActivationClosureInput = req.body;
        const evaluation = FiscalProductionActivationClosureEvaluationService.evaluate(input);
        FiscalProductionActivationClosureAuditService.audit('evaluate', { success: true });
        res.status(200).json({ evaluation });
      } catch (error: any) {
        FiscalProductionActivationClosureAuditService.audit('evaluate', { success: false, error: error.message });
        res.status(400).json({ valid: false, error: error.message });
      }
  }

  public static simulateDecision(req: Request, res: Response) {
      try {
        const input: FiscalProductionActivationClosureInput = req.body;
        FiscalProductionActivationClosureValidator.validate(input);
        const decision = FiscalProductionActivationClosureDecisionService.simulateDecision(input);
        FiscalProductionActivationClosureAuditService.audit('simulateDecision', { success: true });
        res.status(200).json({ decision });
      } catch (error: any) {
        FiscalProductionActivationClosureAuditService.audit('simulateDecision', { success: false, error: error.message });
        res.status(400).json({ error: error.message });
      }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionActivationClosureAuditService.audit('getReport', {});
    res.status(200).json({ report: FiscalProductionActivationClosureReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionActivationClosureAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '32.5',
      description: 'Production Activation Closure',
      realClosureExecuted: false,
      realProductionActivationExecuted: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false
    });
  }
}
