import { Request, Response } from 'express';
import {
  FiscalFinalGoLiveClosurePolicy,
  FiscalFinalGoLiveClosureInventory,
  FiscalFinalGoLiveFinalChecklist,
  FiscalFinalGoLiveEvidencePackageService,
  FiscalFinalGoLiveNoActivationHandoffService,
  FiscalFinalGoLivePostClosureRoadmap,
  FiscalFinalGoLiveFinalReadinessReview,
  FiscalFinalGoLiveFinalBlockerRegister,
  FiscalFinalGoLiveFinalRiskRegister,
  FiscalFinalGoLiveClosureValidator,
  FiscalFinalGoLiveClosureEvaluationService,
  FiscalFinalGoLiveClosureDecisionService,
  FiscalFinalGoLiveClosureReportService,
  FiscalFinalGoLiveClosureAuditService
} from '../dedicated-homologation/final-golive/closure';

export class FiscalFinalGoLiveClosureController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalFinalGoLiveClosurePolicy.getBaseResult();
    FiscalFinalGoLiveClosureAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getInventory(req: Request, res: Response) {
    const result = FiscalFinalGoLiveClosureInventory.generateInventory();
    FiscalFinalGoLiveClosureAuditService.audit('GET_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalChecklist(req: Request, res: Response) {
    const result = FiscalFinalGoLiveFinalChecklist.getChecklist();
    FiscalFinalGoLiveClosureAuditService.audit('GET_FINAL_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEvidencePackage(req: Request, res: Response) {
    const result = FiscalFinalGoLiveEvidencePackageService.generatePackage();
    FiscalFinalGoLiveClosureAuditService.audit('GET_EVIDENCE_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoActivationHandoff(req: Request, res: Response) {
    const result = FiscalFinalGoLiveNoActivationHandoffService.generateHandoff();
    FiscalFinalGoLiveClosureAuditService.audit('GET_NO_ACTIVATION_HANDOFF', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    const result = FiscalFinalGoLivePostClosureRoadmap.generateRoadmap();
    FiscalFinalGoLiveClosureAuditService.audit('GET_POST_CLOSURE_ROADMAP', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalReadinessReview(req: Request, res: Response) {
    const result = FiscalFinalGoLiveFinalReadinessReview.review();
    FiscalFinalGoLiveClosureAuditService.audit('GET_FINAL_READINESS_REVIEW', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalFinalGoLiveFinalBlockerRegister.getBlockers();
    FiscalFinalGoLiveClosureAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalFinalGoLiveFinalRiskRegister.getRisks();
    FiscalFinalGoLiveClosureAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalFinalGoLiveClosureValidator.validate(input);
    FiscalFinalGoLiveClosureAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalFinalGoLiveClosureEvaluationService.evaluate(input);
    FiscalFinalGoLiveClosureAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalFinalGoLiveClosureDecisionService.simulateDecision(input);
    FiscalFinalGoLiveClosureAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalFinalGoLiveClosureReportService.getReport();
    FiscalFinalGoLiveClosureAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalFinalGoLiveClosureAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', finalGoLiveGovernanceClosureOnly: true, noActivationHandoffEvidenceOnly: true });
  }
}
