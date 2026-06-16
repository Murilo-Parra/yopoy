import { Request, Response } from 'express';
import {
  FiscalProductionDeploymentIsolationPolicy,
  FiscalProductionActivationBlueprint,
  FiscalReleaseDeploymentIsolationContract,
  FiscalReleaseArtifactInventory,
  FiscalDeploymentBoundaryPlan,
  FiscalProductionTrafficNonActivationPlan,
  FiscalReleaseRolloutIsolationPlan,
  FiscalDeploymentRollbackIsolationPlan,
  FiscalProductionDeploymentDependencyMatrix,
  FiscalProductionDeploymentIsolationBlockerRegister,
  FiscalProductionDeploymentIsolationRiskRegister,
  FiscalProductionDeploymentIsolationValidator,
  FiscalProductionDeploymentIsolationEvaluationService,
  FiscalProductionDeploymentIsolationDecisionService,
  FiscalProductionDeploymentIsolationReportService,
  FiscalProductionDeploymentIsolationAuditService
} from '../dedicated-homologation/production-deployment-isolation';

export class FiscalProductionDeploymentIsolationController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionDeploymentIsolationPolicy.getBaseResult();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getProductionActivationBlueprint(req: Request, res: Response) {
    const result = FiscalProductionActivationBlueprint.generateBlueprint();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_PRODUCTION_ACTIVATION_BLUEPRINT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReleaseDeploymentIsolationContract(req: Request, res: Response) {
    const result = FiscalReleaseDeploymentIsolationContract.generateContract();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_RELEASE_DEPLOYMENT_ISOLATION_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReleaseArtifactInventory(req: Request, res: Response) {
    const result = FiscalReleaseArtifactInventory.generateInventory();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_RELEASE_ARTIFACT_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDeploymentBoundaryPlan(req: Request, res: Response) {
    const result = FiscalDeploymentBoundaryPlan.generatePlan();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_DEPLOYMENT_BOUNDARY_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTrafficNonActivationPlan(req: Request, res: Response) {
    const result = FiscalProductionTrafficNonActivationPlan.generatePlan();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_TRAFFIC_NON_ACTIVATION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRolloutIsolationPlan(req: Request, res: Response) {
    const result = FiscalReleaseRolloutIsolationPlan.generatePlan();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_ROLLOUT_ISOLATION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRollbackIsolationPlan(req: Request, res: Response) {
    const result = FiscalDeploymentRollbackIsolationPlan.generatePlan();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_ROLLBACK_ISOLATION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionDeploymentDependencyMatrix.generateMatrix();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionDeploymentIsolationBlockerRegister.getBlockers();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionDeploymentIsolationRiskRegister.getRisks();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionDeploymentIsolationValidator.validate(input);
    FiscalProductionDeploymentIsolationAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionDeploymentIsolationEvaluationService.evaluate(input);
    FiscalProductionDeploymentIsolationAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionDeploymentIsolationDecisionService.simulateDecision(input);
    FiscalProductionDeploymentIsolationAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionDeploymentIsolationReportService.getReport();
    FiscalProductionDeploymentIsolationAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionDeploymentIsolationAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionActivationBlueprintOnly: true, releaseDeploymentIsolationOnly: true });
  }
}
