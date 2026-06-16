import { Request, Response } from 'express';
import { FiscalProductionCutoverAbortNoOpPlan } from '../dedicated-homologation/production-go-live-cutover/rollback-fallback-dry-run/FiscalProductionCutoverAbortNoOpPlan';
import { FiscalProductionNoRealRollbackEvidence } from '../dedicated-homologation/production-go-live-cutover/rollback-fallback-dry-run/FiscalProductionNoRealRollbackEvidence';
import {
  FiscalProductionGoLiveRollbackPolicy,
  FiscalProductionGoLiveRollbackNoOpBlueprint,
  FiscalProductionLegacyFallbackSafetyPlan,
  FiscalProductionRollbackEligibilitySimulationMatrix,
  FiscalProductionTrafficReversionNoOpMatrix,
  FiscalProductionV2ShutdownNoOpMatrix,
  FiscalProductionRollbackTriggerNoExecuteMatrix,
  FiscalProductionPostAbortContinuityMatrix,
  FiscalProductionNoRealFallbackEvidence,
  FiscalProductionGoLiveRollbackDependencyMatrix,
  FiscalProductionGoLiveRollbackBlockerRegister,
  FiscalProductionGoLiveRollbackRiskRegister,
  FiscalProductionGoLiveRollbackValidator,
  FiscalProductionGoLiveRollbackEvaluationService,
  FiscalProductionGoLiveRollbackDecisionService,
  FiscalProductionGoLiveRollbackReportService,
  FiscalProductionGoLiveRollbackAuditService
} from '../dedicated-homologation/production-go-live-cutover/rollback-fallback-dry-run';

export class FiscalProductionGoLiveRollbackController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveRollbackPolicy.getPolicy());
  }

  public static getRollbackNoOpBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveRollbackNoOpBlueprint.getBlueprint());
  }

  public static getCutoverAbortNoOpPlan(req: Request, res: Response) {
    res.json(FiscalProductionCutoverAbortNoOpPlan.getPlan());
  }

  public static getLegacyFallbackSafetyPlan(req: Request, res: Response) {
    res.json(FiscalProductionLegacyFallbackSafetyPlan.getPlan());
  }

  public static getRollbackEligibilitySimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRollbackEligibilitySimulationMatrix.getMatrix());
  }

  public static getTrafficReversionNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficReversionNoOpMatrix.getMatrix());
  }

  public static getV2ShutdownNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionV2ShutdownNoOpMatrix.getMatrix());
  }

  public static getRollbackTriggerNoExecuteMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRollbackTriggerNoExecuteMatrix.getMatrix());
  }

  public static getPostAbortContinuityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionPostAbortContinuityMatrix.getMatrix());
  }

  public static getNoRealRollbackEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealRollbackEvidence.getEvidence());
  }

  public static getNoRealFallbackEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealFallbackEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveRollbackDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionGoLiveRollbackBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionGoLiveRollbackRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionGoLiveRollbackValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionGoLiveRollbackEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveRollbackDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveRollbackDecisionService.simulateDecision(input);
    const report = FiscalProductionGoLiveRollbackReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveRollbackDecisionService.simulateDecision(input);
    const audit = FiscalProductionGoLiveRollbackAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Go-Live Rollback, Abort & Legacy Fallback Safety No-Op Dry-Run', readOnly: true });
  }
}
