import { Request, Response } from 'express';
import {
  FiscalRouteSandboxPolicy,
  FiscalRouteSandboxBlueprint,
  FiscalWalledGardenIsolationPlan,
  FiscalRouteSandboxNetworkPlan,
  FiscalRouteSandboxTenantIsolationPlan,
  FiscalRouteSandboxDataBoundaryPlan,
  FiscalRouteSandboxNoRuntimeExecutionEvidence,
  FiscalRouteSandboxSyntheticOnlyContract,
  FiscalRouteSandboxDependencyMatrix,
  FiscalRouteSandboxBlockerRegister,
  FiscalRouteSandboxRiskRegister,
  FiscalRouteSandboxValidator,
  FiscalRouteSandboxEvaluationService,
  FiscalRouteSandboxDecisionService,
  FiscalRouteSandboxReportService,
  FiscalRouteSandboxAuditService
} from '../dedicated-homologation/route-transition/route-sandbox';

export class FiscalRouteSandboxController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalRouteSandboxPolicy.getBaseResult();
    FiscalRouteSandboxAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getSandboxBlueprint(req: Request, res: Response) {
    const result = FiscalRouteSandboxBlueprint.generateBlueprint();
    FiscalRouteSandboxAuditService.audit('GET_SANDBOX_BLUEPRINT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getWalledGardenIsolation(req: Request, res: Response) {
    const result = FiscalWalledGardenIsolationPlan.generatePlan();
    FiscalRouteSandboxAuditService.audit('GET_WALLED_GARDEN_ISOLATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNetworkPlan(req: Request, res: Response) {
    const result = FiscalRouteSandboxNetworkPlan.generatePlan();
    FiscalRouteSandboxAuditService.audit('GET_NETWORK_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTenantIsolationPlan(req: Request, res: Response) {
    const result = FiscalRouteSandboxTenantIsolationPlan.generatePlan();
    FiscalRouteSandboxAuditService.audit('GET_TENANT_ISOLATION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDataBoundaryPlan(req: Request, res: Response) {
    const result = FiscalRouteSandboxDataBoundaryPlan.generatePlan();
    FiscalRouteSandboxAuditService.audit('GET_DATA_BOUNDARY_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoRuntimeExecutionEvidence(req: Request, res: Response) {
    const result = FiscalRouteSandboxNoRuntimeExecutionEvidence.generateEvidence();
    FiscalRouteSandboxAuditService.audit('GET_NO_RUNTIME_EXECUTION_EVIDENCE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSyntheticOnlyContract(req: Request, res: Response) {
    const result = FiscalRouteSandboxSyntheticOnlyContract.generateContract();
    FiscalRouteSandboxAuditService.audit('GET_SYNTHETIC_ONLY_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalRouteSandboxDependencyMatrix.generateMatrix();
    FiscalRouteSandboxAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalRouteSandboxBlockerRegister.getBlockers();
    FiscalRouteSandboxAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalRouteSandboxRiskRegister.getRisks();
    FiscalRouteSandboxAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalRouteSandboxValidator.validate(input);
    FiscalRouteSandboxAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalRouteSandboxEvaluationService.evaluate(input);
    FiscalRouteSandboxAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalRouteSandboxDecisionService.simulateDecision(input);
    FiscalRouteSandboxAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalRouteSandboxReportService.getReport();
    FiscalRouteSandboxAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalRouteSandboxAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', routeSandboxBlueprintOnly: true, walledGardenIsolationOnly: true });
  }
}
