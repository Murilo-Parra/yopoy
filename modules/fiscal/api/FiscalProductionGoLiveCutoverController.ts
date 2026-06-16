import { Request, Response } from 'express';
import {
  FiscalProductionGoLiveCutoverPolicy,
  FiscalProductionGoLiveCutoverInitializationBlueprint,
  FiscalProductionActivationExecutionBoundaryNoOpContract,
  FiscalProductionCutoverInitiationReadinessMatrix,
  FiscalProductionActivationPreconditionSimulationMatrix,
  FiscalProductionLegacyContinuityDuringGoLivePlan,
  FiscalProductionV2ActivationBlockedPlan,
  FiscalProductionTrafficSwitchNoOpMatrix,
  FiscalProductionExecutionAuthorityNoGrantMatrix,
  FiscalProductionNoRealActivationEvidence,
  FiscalProductionNoRealCutoverEvidence,
  FiscalProductionGoLiveCutoverDependencyMatrix,
  FiscalProductionGoLiveCutoverBlockerRegister,
  FiscalProductionGoLiveCutoverRiskRegister,
  FiscalProductionGoLiveCutoverValidator,
  FiscalProductionGoLiveCutoverEvaluationService,
  FiscalProductionGoLiveCutoverDecisionService,
  FiscalProductionGoLiveCutoverReportService,
  FiscalProductionGoLiveCutoverAuditService
} from '../dedicated-homologation/production-go-live-cutover';

export class FiscalProductionGoLiveCutoverController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveCutoverPolicy.getPolicy());
  }

  public static getInitializationBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveCutoverInitializationBlueprint.getBlueprint());
  }

  public static getActivationExecutionBoundaryNoOpContract(req: Request, res: Response) {
    res.json(FiscalProductionActivationExecutionBoundaryNoOpContract.getContract());
  }

  public static getCutoverInitiationReadinessMatrix(req: Request, res: Response) {
    res.json(FiscalProductionCutoverInitiationReadinessMatrix.getMatrix());
  }

  public static getActivationPreconditionSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionActivationPreconditionSimulationMatrix.getMatrix());
  }

  public static getLegacyContinuityDuringGoLivePlan(req: Request, res: Response) {
    res.json(FiscalProductionLegacyContinuityDuringGoLivePlan.getPlan());
  }

  public static getV2ActivationBlockedPlan(req: Request, res: Response) {
    res.json(FiscalProductionV2ActivationBlockedPlan.getPlan());
  }

  public static getTrafficSwitchNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficSwitchNoOpMatrix.getMatrix());
  }

  public static getExecutionAuthorityNoGrantMatrix(req: Request, res: Response) {
    res.json(FiscalProductionExecutionAuthorityNoGrantMatrix.getMatrix());
  }

  public static getNoRealActivationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealActivationEvidence.getEvidence());
  }

  public static getNoRealCutoverEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealCutoverEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveCutoverDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionGoLiveCutoverBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionGoLiveCutoverRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionGoLiveCutoverValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionGoLiveCutoverEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveCutoverDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveCutoverDecisionService.simulateDecision(input);
    const report = FiscalProductionGoLiveCutoverReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveCutoverDecisionService.simulateDecision(input);
    const audit = FiscalProductionGoLiveCutoverAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Go-Live Cutover Initialization Blueprint', readOnly: true });
  }
}
