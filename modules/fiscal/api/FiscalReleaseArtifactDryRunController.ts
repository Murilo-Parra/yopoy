import { Request, Response } from 'express';
import {
  FiscalReleaseArtifactDryRunPolicy,
  FiscalReleaseArtifactManifest,
  FiscalDeploymentPackageManifest,
  FiscalReleaseArtifactIntegrityPlan,
  FiscalDeploymentPackageShapeValidator,
  FiscalReleaseArtifactNonExecutableContract,
  FiscalDeploymentPackageBoundaryPlan,
  FiscalReleaseArtifactDependencyMatrix,
  FiscalReleaseArtifactDryRunBlockerRegister,
  FiscalReleaseArtifactDryRunRiskRegister,
  FiscalReleaseArtifactDryRunValidator,
  FiscalReleaseArtifactDryRunEvaluationService,
  FiscalReleaseArtifactDryRunDecisionService,
  FiscalReleaseArtifactDryRunReportService,
  FiscalReleaseArtifactDryRunAuditService
} from '../dedicated-homologation/production-deployment-isolation/artifact-dry-run';

export class FiscalReleaseArtifactDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalReleaseArtifactDryRunPolicy.getBaseResult();
    FiscalReleaseArtifactDryRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getReleaseArtifactManifest(req: Request, res: Response) {
    const result = FiscalReleaseArtifactManifest.generateManifest();
    FiscalReleaseArtifactDryRunAuditService.audit('GET_RELEASE_ARTIFACT_MANIFEST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDeploymentPackageManifest(req: Request, res: Response) {
    const result = FiscalDeploymentPackageManifest.generateManifest();
    FiscalReleaseArtifactDryRunAuditService.audit('GET_DEPLOYMENT_PACKAGE_MANIFEST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getArtifactIntegrityPlan(req: Request, res: Response) {
    const result = FiscalReleaseArtifactIntegrityPlan.generatePlan();
    FiscalReleaseArtifactDryRunAuditService.audit('GET_ARTIFACT_INTEGRITY_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPackageShapeValidator(req: Request, res: Response) {
    const result = FiscalDeploymentPackageShapeValidator.validateShape({});
    FiscalReleaseArtifactDryRunAuditService.audit('GET_PACKAGE_SHAPE_VALIDATOR', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNonExecutableContract(req: Request, res: Response) {
    const result = FiscalReleaseArtifactNonExecutableContract.generateContract();
    FiscalReleaseArtifactDryRunAuditService.audit('GET_NON_EXECUTABLE_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPackageBoundaryPlan(req: Request, res: Response) {
    const result = FiscalDeploymentPackageBoundaryPlan.generatePlan();
    FiscalReleaseArtifactDryRunAuditService.audit('GET_PACKAGE_BOUNDARY_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalReleaseArtifactDependencyMatrix.generateMatrix();
    FiscalReleaseArtifactDryRunAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalReleaseArtifactDryRunBlockerRegister.getBlockers();
    FiscalReleaseArtifactDryRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalReleaseArtifactDryRunRiskRegister.getRisks();
    FiscalReleaseArtifactDryRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalReleaseArtifactDryRunValidator.validate(input);
    FiscalReleaseArtifactDryRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalReleaseArtifactDryRunEvaluationService.evaluate(input);
    FiscalReleaseArtifactDryRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalReleaseArtifactDryRunDecisionService.simulateDecision(input);
    FiscalReleaseArtifactDryRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalReleaseArtifactDryRunReportService.getReport();
    FiscalReleaseArtifactDryRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalReleaseArtifactDryRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', releaseArtifactManifestOnly: true, deploymentPackageDryRunOnly: true });
  }
}
