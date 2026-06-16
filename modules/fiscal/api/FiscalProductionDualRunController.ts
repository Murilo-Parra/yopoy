import { Request, Response } from 'express';
import {
  FiscalProductionDualRunPolicy,
  FiscalProductionDualRunPlan,
  FiscalProductionTelemetryReadinessPlan,
  FiscalProductionLegacyVsV2ComparisonPlan,
  FiscalProductionReversibleActivationPlan,
  FiscalProductionActivationObservabilityMatrix,
  FiscalProductionDecisionCheckpointMatrix,
  FiscalProductionDualRunRollbackCriteria,
  FiscalProductionDualRunBlockerRegister,
  FiscalProductionDualRunRiskRegister,
  FiscalProductionDualRunValidator,
  FiscalProductionDualRunEvaluationService,
  FiscalProductionDualRunDecisionService,
  FiscalProductionDualRunReportService,
  FiscalProductionDualRunAuditService
} from '../dedicated-homologation/production-activation/dual-run-dry-run';

export class FiscalProductionDualRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionDualRunPolicy.getBaseResult();
    FiscalProductionDualRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getDualRunPlan(req: Request, res: Response) {
    const result = FiscalProductionDualRunPlan.generatePlan();
    FiscalProductionDualRunAuditService.audit('GET_DUAL_RUN_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTelemetryReadiness(req: Request, res: Response) {
    const result = FiscalProductionTelemetryReadinessPlan.generatePlan();
    FiscalProductionDualRunAuditService.audit('GET_TELEMETRY_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegacyVsV2Comparison(req: Request, res: Response) {
    const result = FiscalProductionLegacyVsV2ComparisonPlan.generatePlan();
    FiscalProductionDualRunAuditService.audit('GET_LEGACY_VS_V2_COMPARISON', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReversibleActivationPlan(req: Request, res: Response) {
    const result = FiscalProductionReversibleActivationPlan.generatePlan();
    FiscalProductionDualRunAuditService.audit('GET_REVERSIBLE_ACTIVATION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getObservabilityMatrix(req: Request, res: Response) {
    const result = FiscalProductionActivationObservabilityMatrix.generateMatrix();
    FiscalProductionDualRunAuditService.audit('GET_OBSERVABILITY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDecisionCheckpoints(req: Request, res: Response) {
    const result = FiscalProductionDecisionCheckpointMatrix.generateMatrix();
    FiscalProductionDualRunAuditService.audit('GET_DECISION_CHECKPOINTS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRollbackCriteria(req: Request, res: Response) {
    const result = FiscalProductionDualRunRollbackCriteria.generateCriteria();
    FiscalProductionDualRunAuditService.audit('GET_ROLLBACK_CRITERIA', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionDualRunBlockerRegister.getBlockers();
    FiscalProductionDualRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionDualRunRiskRegister.getRisks();
    FiscalProductionDualRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionDualRunValidator.validate(input);
    FiscalProductionDualRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionDualRunEvaluationService.evaluate(input);
    FiscalProductionDualRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionDualRunDecisionService.simulateDecision(input);
    FiscalProductionDualRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionDualRunReportService.getReport();
    FiscalProductionDualRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionDualRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionDualRunDryRunOnly: true, reversibleActivationTelemetryOnly: true });
  }
}
