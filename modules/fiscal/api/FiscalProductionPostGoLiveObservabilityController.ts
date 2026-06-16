import { Request, Response } from 'express';
import {
  FiscalProductionPostGoLiveObservabilityPolicy,
  FiscalProductionObservabilityReviewNoInstallBlueprint,
  FiscalProductionOperationalSignalNoCaptureCatalog,
  FiscalProductionHealthDriftSimulationMatrix,
  FiscalProductionSloSlaReviewNoMetricPlan,
  FiscalProductionLiveTelemetryNoReadPlan,
  FiscalProductionDashboardNoCreationPlan,
  FiscalProductionAlertRuleNoActivationMatrix,
  FiscalProductionMetricsRetentionNoPersistencePlan,
  FiscalProductionObservabilityToolNoConnectionMatrix,
  FiscalProductionNoRealMetricsCaptureEvidence,
  FiscalProductionNoRealAlertDashboardEvidence,
  FiscalProductionPostGoLiveObservabilityDependencyMatrix,
  FiscalProductionPostGoLiveObservabilityBlockerRegister,
  FiscalProductionPostGoLiveObservabilityRiskRegister,
  FiscalProductionPostGoLiveObservabilityValidator,
  FiscalProductionPostGoLiveObservabilityEvaluationService,
  FiscalProductionPostGoLiveObservabilityDecisionService,
  FiscalProductionPostGoLiveObservabilityReportService,
  FiscalProductionPostGoLiveObservabilityAuditService
} from '../dedicated-homologation/production-post-go-live-stabilization/observability-health-drift-dry-run';

export class FiscalProductionPostGoLiveObservabilityController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveObservabilityPolicy.getPolicy());
  }

  public static getObservabilityReviewNoInstallBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionObservabilityReviewNoInstallBlueprint.getBlueprint());
  }

  public static getOperationalSignalNoCaptureCatalog(req: Request, res: Response) {
    res.json(FiscalProductionOperationalSignalNoCaptureCatalog.getCatalog());
  }

  public static getHealthDriftSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionHealthDriftSimulationMatrix.getMatrix());
  }

  public static getSloSlaReviewNoMetricPlan(req: Request, res: Response) {
    res.json(FiscalProductionSloSlaReviewNoMetricPlan.getPlan());
  }

  public static getLiveTelemetryNoReadPlan(req: Request, res: Response) {
    res.json(FiscalProductionLiveTelemetryNoReadPlan.getPlan());
  }

  public static getDashboardNoCreationPlan(req: Request, res: Response) {
    res.json(FiscalProductionDashboardNoCreationPlan.getPlan());
  }

  public static getAlertRuleNoActivationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionAlertRuleNoActivationMatrix.getMatrix());
  }

  public static getMetricsRetentionNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionMetricsRetentionNoPersistencePlan.getPlan());
  }

  public static getObservabilityToolNoConnectionMatrix(req: Request, res: Response) {
    res.json(FiscalProductionObservabilityToolNoConnectionMatrix.getMatrix());
  }

  public static getNoRealMetricsCaptureEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealMetricsCaptureEvidence.getEvidence());
  }

  public static getNoRealAlertDashboardEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealAlertDashboardEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveObservabilityDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionPostGoLiveObservabilityBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionPostGoLiveObservabilityRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionPostGoLiveObservabilityValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionPostGoLiveObservabilityEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveObservabilityDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveObservabilityDecisionService.simulateDecision(input);
    const report = FiscalProductionPostGoLiveObservabilityReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveObservabilityDecisionService.simulateDecision(input);
    const audit = FiscalProductionPostGoLiveObservabilityAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Post-Go-Live Observability, Health Drift & SLO/SLA Review No-Capture Dry-Run', readOnly: true });
  }
}
