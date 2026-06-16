import { Request, Response } from 'express';
import {
  FiscalProductionActivationPolicy,
  FiscalProductionActivationBlueprint,
  FiscalProductionReleaseContract,
  FiscalProductionTrafficSwitchPlan,
  FiscalProductionCanaryActivationPlan,
  FiscalProductionRollbackPlan,
  FiscalProductionKillSwitchPlan,
  FiscalProductionReadinessChecklist,
  FiscalProductionDependencyInventory,
  FiscalProductionActivationBlockerRegister,
  FiscalProductionActivationRiskRegister,
  FiscalProductionActivationValidator,
  FiscalProductionActivationEvaluationService,
  FiscalProductionActivationDecisionService,
  FiscalProductionActivationReportService,
  FiscalProductionActivationAuditService
} from '../dedicated-homologation/production-activation';

export class FiscalProductionActivationController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionActivationPolicy.getBaseResult();
    FiscalProductionActivationAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getBlueprint(req: Request, res: Response) {
    const result = FiscalProductionActivationBlueprint.generateBlueprint();
    FiscalProductionActivationAuditService.audit('GET_BLUEPRINT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReleaseContract(req: Request, res: Response) {
    const result = FiscalProductionReleaseContract.generateContract();
    FiscalProductionActivationAuditService.audit('GET_RELEASE_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTrafficSwitchPlan(req: Request, res: Response) {
    const result = FiscalProductionTrafficSwitchPlan.generatePlan();
    FiscalProductionActivationAuditService.audit('GET_TRAFFIC_SWITCH_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCanaryPlan(req: Request, res: Response) {
    const result = FiscalProductionCanaryActivationPlan.generatePlan();
    FiscalProductionActivationAuditService.audit('GET_CANARY_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRollbackPlan(req: Request, res: Response) {
    const result = FiscalProductionRollbackPlan.generatePlan();
    FiscalProductionActivationAuditService.audit('GET_ROLLBACK_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getKillSwitchPlan(req: Request, res: Response) {
    const result = FiscalProductionKillSwitchPlan.generatePlan();
    FiscalProductionActivationAuditService.audit('GET_KILL_SWITCH_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReadinessChecklist(req: Request, res: Response) {
    const result = FiscalProductionReadinessChecklist.generateChecklist();
    FiscalProductionActivationAuditService.audit('GET_READINESS_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyInventory(req: Request, res: Response) {
    const result = FiscalProductionDependencyInventory.generateInventory();
    FiscalProductionActivationAuditService.audit('GET_DEPENDENCY_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionActivationBlockerRegister.getBlockers();
    FiscalProductionActivationAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionActivationRiskRegister.getRisks();
    FiscalProductionActivationAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionActivationValidator.validate(input);
    FiscalProductionActivationAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionActivationEvaluationService.evaluate(input);
    FiscalProductionActivationAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionActivationDecisionService.simulateDecision(input);
    FiscalProductionActivationAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionActivationReportService.getReport();
    FiscalProductionActivationAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionActivationAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionActivationBlueprintOnly: true, zeroExecutionReleaseContractOnly: true });
  }
}
