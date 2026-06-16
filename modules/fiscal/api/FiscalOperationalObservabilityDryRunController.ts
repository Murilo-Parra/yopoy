import { Request, Response } from 'express';
import {
  FiscalOperationalObservabilityDryRunPolicy,
  FiscalOperationalSignalCatalog,
  FiscalOperationalAlertingDryRunPlan,
  FiscalOperationalDashboardReadinessPlan,
  FiscalOperationalSloSlaMatrix,
  FiscalOperationalIncidentTriggerSimulation,
  FiscalOperationalTelemetryRetentionPlan,
  FiscalOperationalEscalationSignalMatrix,
  FiscalOperationalObservabilityDryRunBlockerRegister,
  FiscalOperationalObservabilityDryRunRiskRegister,
  FiscalOperationalObservabilityDryRunValidator,
  FiscalOperationalObservabilityDryRunEvaluationService,
  FiscalOperationalObservabilityDryRunDecisionService,
  FiscalOperationalObservabilityDryRunReportService,
  FiscalOperationalObservabilityDryRunAuditService
} from '../dedicated-homologation/operational-handoff/observability-dry-run';

export class FiscalOperationalObservabilityDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalOperationalObservabilityDryRunPolicy.getBaseResult();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getSignalCatalog(req: Request, res: Response) {
    const result = FiscalOperationalSignalCatalog.generateCatalog();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_SIGNAL_CATALOG', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getAlertingPlan(req: Request, res: Response) {
    const result = FiscalOperationalAlertingDryRunPlan.generatePlan();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_ALERTING_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDashboardReadiness(req: Request, res: Response) {
    const result = FiscalOperationalDashboardReadinessPlan.generatePlan();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_DASHBOARD_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSloSlaMatrix(req: Request, res: Response) {
    const result = FiscalOperationalSloSlaMatrix.generateMatrix();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_SLO_SLA_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getIncidentTriggerSimulation(req: Request, res: Response) {
    const result = FiscalOperationalIncidentTriggerSimulation.generateSimulation();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_INCIDENT_TRIGGER_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTelemetryRetention(req: Request, res: Response) {
    const result = FiscalOperationalTelemetryRetentionPlan.generatePlan();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_TELEMETRY_RETENTION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEscalationSignalMatrix(req: Request, res: Response) {
    const result = FiscalOperationalEscalationSignalMatrix.generateMatrix();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_ESCALATION_SIGNAL_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalOperationalObservabilityDryRunBlockerRegister.getBlockers();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalOperationalObservabilityDryRunRiskRegister.getRisks();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalOperationalObservabilityDryRunValidator.validate(input);
    FiscalOperationalObservabilityDryRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalOperationalObservabilityDryRunEvaluationService.evaluate(input);
    FiscalOperationalObservabilityDryRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalOperationalObservabilityDryRunDecisionService.simulateDecision(input);
    FiscalOperationalObservabilityDryRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalOperationalObservabilityDryRunReportService.getReport();
    FiscalOperationalObservabilityDryRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalOperationalObservabilityDryRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', operationalObservabilityDryRunOnly: true, alertingGovernanceDryRunOnly: true });
  }
}
