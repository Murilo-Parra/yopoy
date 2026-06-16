import { Request, Response } from 'express';
import {
  FiscalFinalGoLivePolicy,
  FiscalFinalGoLiveBlueprint,
  FiscalFinalGoLiveDependencyInventory,
  FiscalFinalGoLiveReadinessChecklist,
  FiscalFinalGoLiveActivationContract,
  FiscalFinalGoLiveTrafficFreezePlan,
  FiscalFinalGoLiveLegalDependencyMatrix,
  FiscalFinalGoLiveOperationalDependencyMatrix,
  FiscalFinalGoLiveProductionDependencyMatrix,
  FiscalFinalGoLiveBlockerRegister,
  FiscalFinalGoLiveRiskRegister,
  FiscalFinalGoLiveValidator,
  FiscalFinalGoLiveEvaluationService,
  FiscalFinalGoLiveDecisionService,
  FiscalFinalGoLiveReportService,
  FiscalFinalGoLiveAuditService
} from '../dedicated-homologation/final-golive';

export class FiscalFinalGoLiveController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalFinalGoLivePolicy.getBaseResult();
    FiscalFinalGoLiveAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getBlueprint(req: Request, res: Response) {
    const result = FiscalFinalGoLiveBlueprint.generateBlueprint();
    FiscalFinalGoLiveAuditService.audit('GET_BLUEPRINT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyInventory(req: Request, res: Response) {
    const result = FiscalFinalGoLiveDependencyInventory.generateInventory();
    FiscalFinalGoLiveAuditService.audit('GET_DEPENDENCY_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReadinessChecklist(req: Request, res: Response) {
    const result = FiscalFinalGoLiveReadinessChecklist.getChecklist();
    FiscalFinalGoLiveAuditService.audit('GET_READINESS_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getActivationContract(req: Request, res: Response) {
    const result = FiscalFinalGoLiveActivationContract.generateContract();
    FiscalFinalGoLiveAuditService.audit('GET_ACTIVATION_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTrafficFreezePlan(req: Request, res: Response) {
    const result = FiscalFinalGoLiveTrafficFreezePlan.generatePlan();
    FiscalFinalGoLiveAuditService.audit('GET_TRAFFIC_FREEZE_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegalDependencies(req: Request, res: Response) {
    const result = FiscalFinalGoLiveLegalDependencyMatrix.generateMatrix();
    FiscalFinalGoLiveAuditService.audit('GET_LEGAL_DEPENDENCIES', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getOperationalDependencies(req: Request, res: Response) {
    const result = FiscalFinalGoLiveOperationalDependencyMatrix.generateMatrix();
    FiscalFinalGoLiveAuditService.audit('GET_OPERATIONAL_DEPENDENCIES', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getProductionDependencies(req: Request, res: Response) {
    const result = FiscalFinalGoLiveProductionDependencyMatrix.generateMatrix();
    FiscalFinalGoLiveAuditService.audit('GET_PRODUCTION_DEPENDENCIES', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalFinalGoLiveBlockerRegister.getBlockers();
    FiscalFinalGoLiveAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalFinalGoLiveRiskRegister.getRisks();
    FiscalFinalGoLiveAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalFinalGoLiveValidator.validate(input);
    FiscalFinalGoLiveAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalFinalGoLiveEvaluationService.evaluate(input);
    FiscalFinalGoLiveAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalFinalGoLiveDecisionService.simulateDecision(input);
    FiscalFinalGoLiveAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalFinalGoLiveReportService.getReport();
    FiscalFinalGoLiveAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalFinalGoLiveAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', finalGoLiveBlueprintOnly: true, zeroExecutionActivationContractOnly: true });
  }
}
