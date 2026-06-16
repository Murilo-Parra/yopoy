import { Request, Response } from 'express';
import {
  FiscalProductionPreflightPolicy,
  FiscalProductionDeploymentReadinessChecklist,
  FiscalProductionPreflightEnvironmentReadiness,
  FiscalProductionPreflightArtifactReadiness,
  FiscalProductionPreflightCutoverReadiness,
  FiscalProductionPreflightRollbackReadiness,
  FiscalProductionPreflightTrafficReadiness,
  FiscalProductionPreflightSecurityBoundaryCheck,
  FiscalProductionPreflightDependencyMatrix,
  FiscalProductionPreflightBlockerRegister,
  FiscalProductionPreflightRiskRegister,
  FiscalProductionPreflightValidator,
  FiscalProductionPreflightEvaluationService,
  FiscalProductionPreflightDecisionService,
  FiscalProductionPreflightReportService,
  FiscalProductionPreflightAuditService
} from '../dedicated-homologation/production-deployment-isolation/preflight-dry-run';

export class FiscalProductionPreflightController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionPreflightPolicy.getBaseResult();
    FiscalProductionPreflightAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getDeploymentReadinessChecklist(req: Request, res: Response) {
    const result = FiscalProductionDeploymentReadinessChecklist.generateChecklist();
    FiscalProductionPreflightAuditService.audit('GET_DEPLOYMENT_READINESS_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEnvironmentReadiness(req: Request, res: Response) {
    const result = FiscalProductionPreflightEnvironmentReadiness.generateReadiness();
    FiscalProductionPreflightAuditService.audit('GET_ENVIRONMENT_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getArtifactReadiness(req: Request, res: Response) {
    const result = FiscalProductionPreflightArtifactReadiness.generateReadiness();
    FiscalProductionPreflightAuditService.audit('GET_ARTIFACT_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCutoverReadiness(req: Request, res: Response) {
    const result = FiscalProductionPreflightCutoverReadiness.generateReadiness();
    FiscalProductionPreflightAuditService.audit('GET_CUTOVER_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRollbackReadiness(req: Request, res: Response) {
    const result = FiscalProductionPreflightRollbackReadiness.generateReadiness();
    FiscalProductionPreflightAuditService.audit('GET_ROLLBACK_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTrafficReadiness(req: Request, res: Response) {
    const result = FiscalProductionPreflightTrafficReadiness.generateReadiness();
    FiscalProductionPreflightAuditService.audit('GET_TRAFFIC_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSecurityBoundaryCheck(req: Request, res: Response) {
    const result = FiscalProductionPreflightSecurityBoundaryCheck.checkBoundary();
    FiscalProductionPreflightAuditService.audit('GET_SECURITY_BOUNDARY_CHECK', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionPreflightDependencyMatrix.generateMatrix();
    FiscalProductionPreflightAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionPreflightBlockerRegister.getBlockers();
    FiscalProductionPreflightAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionPreflightRiskRegister.getRisks();
    FiscalProductionPreflightAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionPreflightValidator.validate(input);
    FiscalProductionPreflightAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionPreflightEvaluationService.evaluate(input);
    FiscalProductionPreflightAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionPreflightDecisionService.simulateDecision(input);
    FiscalProductionPreflightAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionPreflightReportService.getReport();
    FiscalProductionPreflightAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionPreflightAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionDeploymentPreflightOnly: true, deploymentReadinessDryRunOnly: true });
  }
}
