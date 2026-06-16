import { Request, Response } from 'express';
import {
  FiscalProductionDeploymentClosurePolicy,
  FiscalProductionDeploymentClosureInventory,
  FiscalProductionDeploymentFinalChecklist,
  FiscalProductionDeploymentEvidencePackageService,
  FiscalProductionFinalReleaseReadinessReview,
  FiscalProductionNoActivationHandoffService,
  FiscalProductionDeploymentPostClosureRoadmap,
  FiscalProductionDeploymentFinalBlockerRegister,
  FiscalProductionDeploymentFinalRiskRegister,
  FiscalProductionDeploymentClosureValidator,
  FiscalProductionDeploymentClosureEvaluationService,
  FiscalProductionDeploymentClosureDecisionService,
  FiscalProductionDeploymentClosureReportService,
  FiscalProductionDeploymentClosureAuditService
} from '../dedicated-homologation/production-deployment-isolation/closure';

export class FiscalProductionDeploymentClosureController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionDeploymentClosurePolicy.getBaseResult();
    FiscalProductionDeploymentClosureAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getClosureInventory(req: Request, res: Response) {
    const result = FiscalProductionDeploymentClosureInventory.generateInventory();
    FiscalProductionDeploymentClosureAuditService.audit('GET_CLOSURE_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalChecklist(req: Request, res: Response) {
    const result = FiscalProductionDeploymentFinalChecklist.generateChecklist();
    FiscalProductionDeploymentClosureAuditService.audit('GET_FINAL_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEvidencePackage(req: Request, res: Response) {
    const result = FiscalProductionDeploymentEvidencePackageService.generateEvidencePackage();
    FiscalProductionDeploymentClosureAuditService.audit('GET_EVIDENCE_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalReadinessReview(req: Request, res: Response) {
    const result = FiscalProductionFinalReleaseReadinessReview.generateReview();
    FiscalProductionDeploymentClosureAuditService.audit('GET_FINAL_READINESS_REVIEW', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoActivationHandoff(req: Request, res: Response) {
    const result = FiscalProductionNoActivationHandoffService.generateHandoff();
    FiscalProductionDeploymentClosureAuditService.audit('GET_NO_ACTIVATION_HANDOFF', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    const result = FiscalProductionDeploymentPostClosureRoadmap.generateRoadmap();
    FiscalProductionDeploymentClosureAuditService.audit('GET_POST_CLOSURE_ROADMAP', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionDeploymentFinalBlockerRegister.getBlockers();
    FiscalProductionDeploymentClosureAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionDeploymentFinalRiskRegister.getRisks();
    FiscalProductionDeploymentClosureAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionDeploymentClosureValidator.validate(input);
    FiscalProductionDeploymentClosureAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionDeploymentClosureEvaluationService.evaluate(input);
    FiscalProductionDeploymentClosureAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionDeploymentClosureDecisionService.simulateDecision(input);
    FiscalProductionDeploymentClosureAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionDeploymentClosureReportService.getReport();
    FiscalProductionDeploymentClosureAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionDeploymentClosureAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionDeploymentIsolationClosureOnly: true });
  }
}
