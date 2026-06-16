import { Request, Response } from 'express';
import { 
  FiscalProductionActivationControlPlanePolicy,
  FiscalProductionActivationControlPlaneBlueprint,
  FiscalProductionPhysicalExecutionProhibitionContract,
  FiscalProductionActivationDependencyInventory,
  FiscalProductionActivationAuthorizationNoOpMatrix,
  FiscalProductionTrafficMutationProhibitionPlan,
  FiscalProductionRuntimeExecutionProhibitionPlan,
  FiscalProductionDataMutationProhibitionPlan,
  FiscalProductionExternalIntegrationProhibitionPlan,
  FiscalProductionActivationPreconditionMatrix,
  FiscalProductionNoPhysicalExecutionEvidence,
  FiscalProductionActivationControlPlaneBlockerRegister,
  FiscalProductionActivationControlPlaneRiskRegister,
  FiscalProductionActivationControlPlaneEvaluationService,
  FiscalProductionActivationControlPlaneDecisionService,
  FiscalProductionActivationControlPlaneReportService,
  FiscalProductionActivationControlPlaneAuditService,
  FiscalProductionActivationControlPlaneValidator,
  FiscalProductionActivationControlPlaneInput
} from '../dedicated-homologation/production-activation-control-plane';

export class FiscalProductionActivationControlPlaneController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getPolicy');
    res.status(200).json({ policy: FiscalProductionActivationControlPlanePolicy.getPolicyMessage() });
  }

  public static getControlPlaneBlueprint(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getControlPlaneBlueprint');
    res.status(200).json({ blueprint: FiscalProductionActivationControlPlaneBlueprint.getBlueprint() });
  }

  public static getPhysicalExecutionProhibitionContract(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getPhysicalExecutionProhibitionContract');
    res.status(200).json({ contract: FiscalProductionPhysicalExecutionProhibitionContract.getContract() });
  }

  public static getDependencyInventory(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getDependencyInventory');
    res.status(200).json({ inventory: FiscalProductionActivationDependencyInventory.getInventory() });
  }

  public static getAuthorizationNoOpMatrix(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getAuthorizationNoOpMatrix');
    res.status(200).json({ matrix: FiscalProductionActivationAuthorizationNoOpMatrix.getMatrix() });
  }

  public static getTrafficMutationProhibitionPlan(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getTrafficMutationProhibitionPlan');
    res.status(200).json({ plan: FiscalProductionTrafficMutationProhibitionPlan.getPlan() });
  }

  public static getRuntimeExecutionProhibitionPlan(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getRuntimeExecutionProhibitionPlan');
    res.status(200).json({ plan: FiscalProductionRuntimeExecutionProhibitionPlan.getPlan() });
  }

  public static getDataMutationProhibitionPlan(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getDataMutationProhibitionPlan');
    res.status(200).json({ plan: FiscalProductionDataMutationProhibitionPlan.getPlan() });
  }

  public static getExternalIntegrationProhibitionPlan(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getExternalIntegrationProhibitionPlan');
    res.status(200).json({ plan: FiscalProductionExternalIntegrationProhibitionPlan.getPlan() });
  }

  public static getActivationPreconditionMatrix(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getActivationPreconditionMatrix');
    res.status(200).json({ matrix: FiscalProductionActivationPreconditionMatrix.getMatrix() });
  }

  public static getNoPhysicalExecutionEvidence(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getNoPhysicalExecutionEvidence');
    res.status(200).json({ evidence: FiscalProductionNoPhysicalExecutionEvidence.getEvidence() });
  }

  public static getBlockers(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getBlockers');
    res.status(200).json({ blockers: FiscalProductionActivationControlPlaneBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getRisks');
    res.status(200).json({ risks: FiscalProductionActivationControlPlaneRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
      try {
          const input: FiscalProductionActivationControlPlaneInput = req.body;
          FiscalProductionActivationControlPlaneValidator.validate(input);
          FiscalProductionActivationControlPlaneAuditService.logAdminRead('validate', { success: true });
          res.status(200).json({ valid: true });
      } catch (error: any) {
          FiscalProductionActivationControlPlaneAuditService.logAdminRead('validate', { success: false, error: error.message });
          res.status(400).json({ valid: false, error: error.message });
      }
  }

  public static evaluate(req: Request, res: Response) {
      try {
        const input: FiscalProductionActivationControlPlaneInput = req.body;
        const evaluation = FiscalProductionActivationControlPlaneEvaluationService.evaluate(input);
        FiscalProductionActivationControlPlaneAuditService.logAdminRead('evaluate', { success: true });
        res.status(200).json({ evaluation });
      } catch (error: any) {
        FiscalProductionActivationControlPlaneAuditService.logAdminRead('evaluate', { success: false, error: error.message });
        res.status(400).json({ valid: false, error: error.message });
      }
  }

  public static simulateDecision(req: Request, res: Response) {
      try {
        const input: FiscalProductionActivationControlPlaneInput = req.body;
        FiscalProductionActivationControlPlaneValidator.validate(input);
        const decision = FiscalProductionActivationControlPlaneDecisionService.simulateDecision(input);
        FiscalProductionActivationControlPlaneAuditService.logAdminRead('simulateDecision', { success: true });
        res.status(200).json({ decision });
      } catch (error: any) {
        FiscalProductionActivationControlPlaneAuditService.logAdminRead('simulateDecision', { success: false, error: error.message });
        res.status(400).json({ error: error.message });
      }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionActivationControlPlaneAuditService.logAdminRead('getReport');
    res.status(200).json({ report: FiscalProductionActivationControlPlaneReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionActivationControlPlaneAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '33.1',
      description: 'Production Activation Control Plane Blueprint',
      realProductionActivationExecuted: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false
    });
  }
}
