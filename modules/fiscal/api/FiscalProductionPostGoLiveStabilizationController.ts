import { Request, Response } from 'express';
import {
  FiscalProductionPostGoLiveStabilizationPolicy,
  FiscalProductionPostGoLiveStabilizationBlueprint,
  FiscalProductionNoActivationObservationContract,
  FiscalProductionStabilizationWindowSimulationPlan,
  FiscalProductionOperationalHealthNoCaptureMatrix,
  FiscalProductionLegacyContinuityPostGoLivePlan,
  FiscalProductionV2InactiveObservationMatrix,
  FiscalProductionTrafficInvariantPostGoLiveMatrix,
  FiscalProductionRollbackReadinessNoExecutePlan,
  FiscalProductionIncidentReadinessNoOpenPlan,
  FiscalProductionNoRealObservationEvidence,
  FiscalProductionNoActivationPostGoLiveEvidence,
  FiscalProductionPostGoLiveStabilizationDependencyMatrix,
  FiscalProductionPostGoLiveStabilizationBlockerRegister,
  FiscalProductionPostGoLiveStabilizationRiskRegister,
  FiscalProductionPostGoLiveStabilizationValidator,
  FiscalProductionPostGoLiveStabilizationEvaluationService,
  FiscalProductionPostGoLiveStabilizationDecisionService,
  FiscalProductionPostGoLiveStabilizationReportService,
  FiscalProductionPostGoLiveStabilizationAuditService
} from '../dedicated-homologation/production-post-go-live-stabilization';

export class FiscalProductionPostGoLiveStabilizationController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveStabilizationPolicy.getPolicy());
  }

  public static getStabilizationBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveStabilizationBlueprint.getBlueprint());
  }

  public static getNoActivationObservationContract(req: Request, res: Response) {
    res.json(FiscalProductionNoActivationObservationContract.getContract());
  }

  public static getStabilizationWindowSimulationPlan(req: Request, res: Response) {
    res.json(FiscalProductionStabilizationWindowSimulationPlan.getPlan());
  }

  public static getOperationalHealthNoCaptureMatrix(req: Request, res: Response) {
    res.json(FiscalProductionOperationalHealthNoCaptureMatrix.getMatrix());
  }

  public static getLegacyContinuityPostGoLivePlan(req: Request, res: Response) {
    res.json(FiscalProductionLegacyContinuityPostGoLivePlan.getPlan());
  }

  public static getV2InactiveObservationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionV2InactiveObservationMatrix.getMatrix());
  }

  public static getTrafficInvariantPostGoLiveMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficInvariantPostGoLiveMatrix.getMatrix());
  }

  public static getRollbackReadinessNoExecutePlan(req: Request, res: Response) {
    res.json(FiscalProductionRollbackReadinessNoExecutePlan.getPlan());
  }

  public static getIncidentReadinessNoOpenPlan(req: Request, res: Response) {
    res.json(FiscalProductionIncidentReadinessNoOpenPlan.getPlan());
  }

  public static getNoRealObservationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealObservationEvidence.getEvidence());
  }

  public static getNoActivationPostGoLiveEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoActivationPostGoLiveEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveStabilizationDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionPostGoLiveStabilizationBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionPostGoLiveStabilizationRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionPostGoLiveStabilizationValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionPostGoLiveStabilizationEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveStabilizationDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveStabilizationDecisionService.simulateDecision(input);
    const report = FiscalProductionPostGoLiveStabilizationReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveStabilizationDecisionService.simulateDecision(input);
    const audit = FiscalProductionPostGoLiveStabilizationAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Post-Go-Live Stabilization Governance Blueprint & No-Activation Observation Contract', readOnly: true });
  }
}
