import { Request, Response } from 'express';
import {
  FiscalRouteCutoverPolicy,
  FiscalRouteCutoverWindowPlan,
  FiscalRouteCutoverSimulationPlan,
  FiscalRouteLegacyFallbackGovernancePlan,
  FiscalRouteShadowRollbackPlan,
  FiscalRouteCutoverAbortCriteria,
  FiscalRouteCutoverDecisionMatrix,
  FiscalRouteCutoverReadinessChecklist,
  FiscalRouteCutoverDependencyMatrix,
  FiscalRouteCutoverBlockerRegister,
  FiscalRouteCutoverRiskRegister,
  FiscalRouteCutoverValidator,
  FiscalRouteCutoverEvaluationService,
  FiscalRouteCutoverDecisionService,
  FiscalRouteCutoverReportService,
  FiscalRouteCutoverAuditService
} from '../dedicated-homologation/route-transition/cutover-dry-run';

export class FiscalRouteCutoverController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalRouteCutoverPolicy.getBaseResult();
    FiscalRouteCutoverAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getCutoverWindowPlan(req: Request, res: Response) {
    const result = FiscalRouteCutoverWindowPlan.generatePlan();
    FiscalRouteCutoverAuditService.audit('GET_CUTOVER_WINDOW_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCutoverSimulationPlan(req: Request, res: Response) {
    const result = FiscalRouteCutoverSimulationPlan.simulate();
    FiscalRouteCutoverAuditService.audit('GET_CUTOVER_SIMULATION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegacyFallbackGovernance(req: Request, res: Response) {
    const result = FiscalRouteLegacyFallbackGovernancePlan.generateGovernance();
    FiscalRouteCutoverAuditService.audit('GET_LEGACY_FALLBACK_GOVERNANCE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getShadowRollbackPlan(req: Request, res: Response) {
    const result = FiscalRouteShadowRollbackPlan.generatePlan();
    FiscalRouteCutoverAuditService.audit('GET_SHADOW_ROLLBACK_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getAbortCriteria(req: Request, res: Response) {
    const result = FiscalRouteCutoverAbortCriteria.generateCriteria();
    FiscalRouteCutoverAuditService.audit('GET_ABORT_CRITERIA', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDecisionMatrix(req: Request, res: Response) {
    const result = FiscalRouteCutoverDecisionMatrix.generateMatrix();
    FiscalRouteCutoverAuditService.audit('GET_DECISION_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReadinessChecklist(req: Request, res: Response) {
    const result = FiscalRouteCutoverReadinessChecklist.generateChecklist();
    FiscalRouteCutoverAuditService.audit('GET_READINESS_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalRouteCutoverDependencyMatrix.generateMatrix();
    FiscalRouteCutoverAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalRouteCutoverBlockerRegister.getBlockers();
    FiscalRouteCutoverAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalRouteCutoverRiskRegister.getRisks();
    FiscalRouteCutoverAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalRouteCutoverValidator.validate(input);
    FiscalRouteCutoverAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalRouteCutoverEvaluationService.evaluate(input);
    FiscalRouteCutoverAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalRouteCutoverDecisionService.simulateDecision(input);
    FiscalRouteCutoverAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalRouteCutoverReportService.getReport();
    FiscalRouteCutoverAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalRouteCutoverAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', routeCutoverDryRunOnly: true, shadowRollbackGovernanceOnly: true });
  }
}
