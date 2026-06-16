import { Request, Response } from 'express';
import { FiscalProductionOperationsObservabilityPolicy } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsObservabilityPolicy';
import { FiscalProductionOperationsObservabilityReadinessSimulation } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsObservabilityReadinessSimulation';
import { FiscalProductionOperationsSignalCatalog } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsSignalCatalog';
import { FiscalProductionOperationsTelemetryNoCapturePlan } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsTelemetryNoCapturePlan';
import { FiscalProductionOperationsLiveMetricsDriftSimulation } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsLiveMetricsDriftSimulation';
import { FiscalProductionOperationsDashboardNoOpPlan } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsDashboardNoOpPlan';
import { FiscalProductionOperationsSloSlaSimulationMatrix } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsSloSlaSimulationMatrix';
import { FiscalProductionOperationsAlertRuleNoActivationPlan } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsAlertRuleNoActivationPlan';
import { FiscalProductionOperationsTelemetrySourceNoReadPlan } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsTelemetrySourceNoReadPlan';
import { FiscalProductionOperationsMetricsRetentionNoPersistencePlan } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsMetricsRetentionNoPersistencePlan';
import { FiscalProductionOperationsNoRealMetricsCaptureEvidence } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsNoRealMetricsCaptureEvidence';
import { FiscalProductionOperationsNoRealAlertEvidence } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsNoRealAlertEvidence';
import { FiscalProductionOperationsObservabilityDependencyMatrix } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsObservabilityDependencyMatrix';
import { FiscalProductionOperationsObservabilityBlockerRegister } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsObservabilityBlockerRegister';
import { FiscalProductionOperationsObservabilityRiskRegister } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsObservabilityRiskRegister';
import { FiscalProductionOperationsObservabilityValidator } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsObservabilityValidator';
import { FiscalProductionOperationsObservabilityEvaluationService } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsObservabilityEvaluationService';
import { FiscalProductionOperationsObservabilityDecisionService } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsObservabilityDecisionService';
import { FiscalProductionOperationsObservabilityReportService } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsObservabilityReportService';
import { FiscalProductionOperationsObservabilityAuditService } from '../dedicated-homologation/production-operations-readiness/observability-telemetry-dry-run/FiscalProductionOperationsObservabilityAuditService';

export class FiscalProductionOperationsObservabilityController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsObservabilityPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionOperationsObservabilityPolicy.getBaseResult());
  }

  public getObservabilityReadinessSimulation(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsObservabilityReadinessSimulation.getSimulation());
  }

  public getSignalCatalog(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsSignalCatalog.getCatalog());
  }

  public getTelemetryNoCapturePlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTelemetryNoCapturePlan.getPlan());
  }

  public getLiveMetricsDriftSimulation(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsLiveMetricsDriftSimulation.getSimulation());
  }

  public getDashboardNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsDashboardNoOpPlan.getPlan());
  }

  public getSloSlaSimulationMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsSloSlaSimulationMatrix.getMatrix());
  }

  public getAlertRuleNoActivationPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsAlertRuleNoActivationPlan.getPlan());
  }

  public getTelemetrySourceNoReadPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTelemetrySourceNoReadPlan.getPlan());
  }

  public getMetricsRetentionNoPersistencePlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsMetricsRetentionNoPersistencePlan.getPlan());
  }

  public getNoRealMetricsCaptureEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsNoRealMetricsCaptureEvidence.getEvidence());
  }

  public getNoRealAlertEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsNoRealAlertEvidence.getEvidence());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsObservabilityDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionOperationsObservabilityBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionOperationsObservabilityRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsObservabilityValidator.validate(input);
    FiscalProductionOperationsObservabilityAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsObservabilityEvaluationService.evaluate(input);
    FiscalProductionOperationsObservabilityAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsObservabilityDecisionService.simulateDecision(input);
    FiscalProductionOperationsObservabilityAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsObservabilityReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionOperationsObservabilityAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionOperationsObservabilityDryRun' });
  }
}
