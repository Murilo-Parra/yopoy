import { Request, Response } from 'express';
import {
  FiscalProductionRollbackKillSwitchPolicy,
  FiscalProductionRollbackDryRunPlan,
  FiscalProductionKillSwitchDryRunPlan,
  FiscalProductionLegacyFallbackPlan,
  FiscalProductionReleaseFreezePlan,
  FiscalProductionTrafficReversionPlan,
  FiscalProductionRollbackDependencyMatrix,
  FiscalProductionKillSwitchReadinessMatrix,
  FiscalProductionRollbackKillSwitchBlockerRegister,
  FiscalProductionRollbackKillSwitchRiskRegister,
  FiscalProductionRollbackKillSwitchValidator,
  FiscalProductionRollbackKillSwitchEvaluationService,
  FiscalProductionRollbackKillSwitchDecisionService,
  FiscalProductionRollbackKillSwitchReportService,
  FiscalProductionRollbackKillSwitchAuditService
} from '../dedicated-homologation/production-activation/rollback-killswitch-dry-run';

export class FiscalProductionRollbackKillSwitchController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionRollbackKillSwitchPolicy.getBaseResult();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getRollbackPlan(req: Request, res: Response) {
    const result = FiscalProductionRollbackDryRunPlan.generatePlan();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_ROLLBACK_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getKillSwitchPlan(req: Request, res: Response) {
    const result = FiscalProductionKillSwitchDryRunPlan.generatePlan();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_KILL_SWITCH_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegacyFallbackPlan(req: Request, res: Response) {
    const result = FiscalProductionLegacyFallbackPlan.generatePlan();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_LEGACY_FALLBACK_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReleaseFreezePlan(req: Request, res: Response) {
    const result = FiscalProductionReleaseFreezePlan.generatePlan();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_RELEASE_FREEZE_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTrafficReversionPlan(req: Request, res: Response) {
    const result = FiscalProductionTrafficReversionPlan.generatePlan();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_TRAFFIC_REVERSION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionRollbackDependencyMatrix.generateMatrix();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReadinessMatrix(req: Request, res: Response) {
    const result = FiscalProductionKillSwitchReadinessMatrix.generateMatrix();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_READINESS_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionRollbackKillSwitchBlockerRegister.getBlockers();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionRollbackKillSwitchRiskRegister.getRisks();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionRollbackKillSwitchValidator.validate(input);
    FiscalProductionRollbackKillSwitchAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionRollbackKillSwitchEvaluationService.evaluate(input);
    FiscalProductionRollbackKillSwitchAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionRollbackKillSwitchDecisionService.simulateDecision(input);
    FiscalProductionRollbackKillSwitchAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionRollbackKillSwitchReportService.getReport();
    FiscalProductionRollbackKillSwitchAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionRollbackKillSwitchAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionRollbackDryRunOnly: true, killSwitchGovernanceDryRunOnly: true });
  }
}
