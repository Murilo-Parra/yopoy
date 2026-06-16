import { Request, Response } from 'express';
import {
  FiscalProductionFinalAuthorizationPolicy,
  FiscalProductionFinalAuthorizationPackage,
  FiscalProductionNonExecutableAuthorizationEnvelope,
  FiscalProductionLockedGateReadinessReview,
  FiscalProductionGateUnlockNoOpEvidence,
  FiscalProductionAuthorizationSoDFinalCheck,
  FiscalProductionAuthorizationDecisionPackage,
  FiscalProductionLockedGateHandoffService,
  FiscalProductionFinalAuthorizationDependencyMatrix,
  FiscalProductionFinalAuthorizationBlockerRegister,
  FiscalProductionFinalAuthorizationRiskRegister,
  FiscalProductionFinalAuthorizationValidator,
  FiscalProductionFinalAuthorizationEvaluationService,
  FiscalProductionFinalAuthorizationDecisionService,
  FiscalProductionFinalAuthorizationReportService,
  FiscalProductionFinalAuthorizationAuditService
} from '../dedicated-homologation/production-execution-boundary/final-authorization-dry-run';

export class FiscalProductionFinalAuthorizationController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionFinalAuthorizationPolicy.getBaseResult();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getFinalAuthorizationPackage(req: Request, res: Response) {
    const result = FiscalProductionFinalAuthorizationPackage.generatePackage();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_FINAL_AUTHORIZATION_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getAuthorizationEnvelope(req: Request, res: Response) {
    const result = FiscalProductionNonExecutableAuthorizationEnvelope.generateEnvelope();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_AUTHORIZATION_ENVELOPE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLockedGateReadinessReview(req: Request, res: Response) {
    const result = FiscalProductionLockedGateReadinessReview.generateReview();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_LOCKED_GATE_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getGateUnlockNoOpEvidence(req: Request, res: Response) {
    const result = FiscalProductionGateUnlockNoOpEvidence.generateEvidence();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_GATE_UNLOCK_NO_OP', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSoDFinalCheck(req: Request, res: Response) {
    const result = FiscalProductionAuthorizationSoDFinalCheck.generateCheck();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_SOD_FINAL_CHECK', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getAuthorizationDecisionPackage(req: Request, res: Response) {
    const result = FiscalProductionAuthorizationDecisionPackage.generatePackage();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_DECISION_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLockedGateHandoff(req: Request, res: Response) {
    const result = FiscalProductionLockedGateHandoffService.generateHandoff();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_LOCKED_GATE_HANDOFF', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionFinalAuthorizationDependencyMatrix.generateMatrix();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionFinalAuthorizationBlockerRegister.getBlockers();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionFinalAuthorizationRiskRegister.getRisks();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionFinalAuthorizationValidator.validate(input);
    FiscalProductionFinalAuthorizationAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionFinalAuthorizationEvaluationService.evaluate(input);
    FiscalProductionFinalAuthorizationAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionFinalAuthorizationDecisionService.simulateDecision(input);
    FiscalProductionFinalAuthorizationAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionFinalAuthorizationReportService.getReport();
    FiscalProductionFinalAuthorizationAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionFinalAuthorizationAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', finalAuthorizationPackageOnly: true });
  }
}
