import { Request, Response } from 'express';
import {
  FiscalProductionCutoverGovernancePolicy,
  FiscalProductionCutoverGovernanceBlueprint,
  FiscalProductionReversibleGoLiveNoOpContract,
  FiscalProductionCutoverWindowPlan,
  FiscalProductionLegacyPreservationPlan,
  FiscalProductionTrafficSwitchNoOpPlan,
  FiscalProductionReversionPathPlan,
  FiscalProductionCutoverAbortCriteria,
  FiscalProductionCutoverReadinessMatrix,
  FiscalProductionCutoverDependencyMatrix,
  FiscalProductionCutoverGovernanceBlockerRegister,
  FiscalProductionCutoverGovernanceRiskRegister,
  FiscalProductionCutoverGovernanceValidator,
  FiscalProductionCutoverGovernanceEvaluationService,
  FiscalProductionCutoverGovernanceDecisionService,
  FiscalProductionCutoverGovernanceReportService,
  FiscalProductionCutoverGovernanceAuditService
} from '../dedicated-homologation/production-cutover-governance';

export class FiscalProductionCutoverGovernanceController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionCutoverGovernancePolicy.getBaseResult();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getCutoverGovernanceBlueprint(req: Request, res: Response) {
    const result = FiscalProductionCutoverGovernanceBlueprint.generateBlueprint();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_CUTOVER_GOVERNANCE_BLUEPRINT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReversibleGoLiveNoOpContract(req: Request, res: Response) {
    const result = FiscalProductionReversibleGoLiveNoOpContract.getContract();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_REVERSIBLE_GOLIVE_NO_OP_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCutoverWindowPlan(req: Request, res: Response) {
    const result = FiscalProductionCutoverWindowPlan.getPlan();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_CUTOVER_WINDOW_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegacyPreservationPlan(req: Request, res: Response) {
    const result = FiscalProductionLegacyPreservationPlan.getPlan();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_LEGACY_PRESERVATION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTrafficSwitchNoOpPlan(req: Request, res: Response) {
    const result = FiscalProductionTrafficSwitchNoOpPlan.getPlan();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_TRAFFIC_SWITCH_NO_OP_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReversionPathPlan(req: Request, res: Response) {
    const result = FiscalProductionReversionPathPlan.getPlan();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_REVERSION_PATH_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getAbortCriteria(req: Request, res: Response) {
    const result = FiscalProductionCutoverAbortCriteria.getCriteria();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_ABORT_CRITERIA', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReadinessMatrix(req: Request, res: Response) {
    const result = FiscalProductionCutoverReadinessMatrix.getMatrix();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_READINESS_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionCutoverDependencyMatrix.getMatrix();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionCutoverGovernanceBlockerRegister.getBlockers();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionCutoverGovernanceRiskRegister.getRisks();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionCutoverGovernanceValidator.validate(input);
    FiscalProductionCutoverGovernanceAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionCutoverGovernanceEvaluationService.evaluate(input);
    FiscalProductionCutoverGovernanceAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionCutoverGovernanceDecisionService.simulateDecision(input);
    FiscalProductionCutoverGovernanceAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionCutoverGovernanceReportService.getReport();
    FiscalProductionCutoverGovernanceAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionCutoverGovernanceAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionCutoverGovernanceBlueprintOnly: true });
  }
}
