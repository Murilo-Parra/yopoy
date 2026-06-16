import { Request, Response } from 'express';
import { FiscalDay2ObservabilityDriftPolicy } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityDriftPolicy';
import { FiscalDay2ObservabilityReadinessSimulation } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityReadinessSimulation';
import { FiscalDay2OperationalSignalCatalog } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2OperationalSignalCatalog';
import { FiscalDay2LiveMetricsNoCapturePlan } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2LiveMetricsNoCapturePlan';
import { FiscalDay2MetricsDriftDetectionSimulation } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2MetricsDriftDetectionSimulation';
import { FiscalDay2DashboardNoOpPlan } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2DashboardNoOpPlan';
import { FiscalDay2AlertRuleNoActivationPlan } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2AlertRuleNoActivationPlan';
import { FiscalDay2SloSlaDriftSimulationMatrix } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2SloSlaDriftSimulationMatrix';
import { FiscalDay2TelemetrySourceNoReadPlan } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2TelemetrySourceNoReadPlan';
import { FiscalDay2MetricsRetentionNoPersistencePlan } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2MetricsRetentionNoPersistencePlan';
import { FiscalDay2ObservabilityDriftSafetyChecklist } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityDriftSafetyChecklist';
import { FiscalDay2ObservabilityDriftDependencyMatrix } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityDriftDependencyMatrix';
import { FiscalDay2ObservabilityDriftBlockerRegister } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityDriftBlockerRegister';
import { FiscalDay2ObservabilityDriftRiskRegister } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityDriftRiskRegister';
import { FiscalDay2ObservabilityDriftValidator } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityDriftValidator';
import { FiscalDay2ObservabilityDriftEvaluationService } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityDriftEvaluationService';
import { FiscalDay2ObservabilityDriftDecisionService } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityDriftDecisionService';
import { FiscalDay2ObservabilityDriftReportService } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityDriftReportService';
import { FiscalDay2ObservabilityDriftAuditService } from '../dedicated-homologation/day2-operations-governance/observability-drift-dry-run/FiscalDay2ObservabilityDriftAuditService';

export class FiscalDay2ObservabilityDriftController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2ObservabilityDriftPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalDay2ObservabilityDriftPolicy.getBaseResult());
  }

  public getObservabilityReadinessSimulation(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2ObservabilityReadinessSimulation.getSimulation());
  }

  public getOperationalSignalCatalog(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OperationalSignalCatalog.getCatalog());
  }

  public getLiveMetricsNoCapturePlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2LiveMetricsNoCapturePlan.getPlan());
  }

  public getMetricsDriftDetectionSimulation(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2MetricsDriftDetectionSimulation.getSimulation());
  }

  public getDashboardNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2DashboardNoOpPlan.getPlan());
  }

  public getAlertRuleNoActivationPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2AlertRuleNoActivationPlan.getPlan());
  }

  public getSloSlaDriftSimulationMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SloSlaDriftSimulationMatrix.getMatrix());
  }

  public getTelemetrySourceNoReadPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2TelemetrySourceNoReadPlan.getPlan());
  }

  public getMetricsRetentionNoPersistencePlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2MetricsRetentionNoPersistencePlan.getPlan());
  }

  public getObservabilityDriftSafetyChecklist(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2ObservabilityDriftSafetyChecklist.getChecklist());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2ObservabilityDriftDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalDay2ObservabilityDriftBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalDay2ObservabilityDriftRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2ObservabilityDriftValidator.validate(input);
    FiscalDay2ObservabilityDriftAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2ObservabilityDriftEvaluationService.evaluate(input);
    FiscalDay2ObservabilityDriftAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2ObservabilityDriftDecisionService.simulateDecision(input);
    FiscalDay2ObservabilityDriftAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2ObservabilityDriftReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalDay2ObservabilityDriftAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'Day2ObservabilityDriftDryRun' });
  }
}
