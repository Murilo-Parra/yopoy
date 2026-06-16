import { Request, Response } from 'express';
import { 
  FiscalProductionActivationApprovalPolicy,
  FiscalProductionActivationApprovalCharter,
  FiscalProductionActivationStakeholderMatrix,
  FiscalProductionActivationPreApprovalMatrix,
  FiscalProductionActivationEvidenceReviewMatrix,
  FiscalProductionActivationQuorumSimulation,
  FiscalProductionActivationVoteSimulation,
  FiscalProductionActivationGoNoGoNoOpMatrix,
  FiscalProductionActivationRiskAcceptanceNoOpReview,
  FiscalProductionActivationWaiverNoOpReview,
  FiscalProductionActivationNoRealAuthorizationEvidence,
  FiscalProductionActivationNoGateUnlockEvidence,
  FiscalProductionActivationApprovalDependencyMatrix,
  FiscalProductionActivationApprovalBlockerRegister,
  FiscalProductionActivationApprovalRiskRegister,
  FiscalProductionActivationApprovalEvaluationService,
  FiscalProductionActivationApprovalDecisionService,
  FiscalProductionActivationApprovalReportService,
  FiscalProductionActivationApprovalAuditService,
  FiscalProductionActivationApprovalValidator,
  FiscalProductionActivationApprovalInput
} from '../dedicated-homologation/production-activation-control-plane/approval-governance-dry-run';

export class FiscalProductionActivationApprovalController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getPolicy');
    res.status(200).json({ policy: FiscalProductionActivationApprovalPolicy.getPolicyMessage() });
  }

  public static getApprovalCharter(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getApprovalCharter');
    res.status(200).json({ charter: FiscalProductionActivationApprovalCharter.getCharter() });
  }

  public static getStakeholderMatrix(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getStakeholderMatrix');
    res.status(200).json({ matrix: FiscalProductionActivationStakeholderMatrix.getMatrix() });
  }

  public static getPreApprovalMatrix(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getPreApprovalMatrix');
    res.status(200).json({ matrix: FiscalProductionActivationPreApprovalMatrix.getMatrix() });
  }

  public static getEvidenceReviewMatrix(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getEvidenceReviewMatrix');
    res.status(200).json({ matrix: FiscalProductionActivationEvidenceReviewMatrix.getMatrix() });
  }

  public static getQuorumSimulation(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getQuorumSimulation');
    res.status(200).json({ simulation: FiscalProductionActivationQuorumSimulation.simulate() });
  }

  public static getVoteSimulation(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getVoteSimulation');
    res.status(200).json({ simulation: FiscalProductionActivationVoteSimulation.simulate() });
  }

  public static getGoNoGoNoOpMatrix(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getGoNoGoNoOpMatrix');
    res.status(200).json({ matrix: FiscalProductionActivationGoNoGoNoOpMatrix.getMatrix() });
  }

  public static getRiskAcceptanceNoOpReview(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getRiskAcceptanceNoOpReview');
    res.status(200).json({ review: FiscalProductionActivationRiskAcceptanceNoOpReview.simulate() });
  }

  public static getWaiverNoOpReview(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getWaiverNoOpReview');
    res.status(200).json({ review: FiscalProductionActivationWaiverNoOpReview.simulate() });
  }

  public static getNoRealAuthorizationEvidence(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getNoRealAuthorizationEvidence');
    res.status(200).json({ evidence: FiscalProductionActivationNoRealAuthorizationEvidence.getEvidence() });
  }

  public static getNoGateUnlockEvidence(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getNoGateUnlockEvidence');
    res.status(200).json({ evidence: FiscalProductionActivationNoGateUnlockEvidence.getEvidence() });
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getDependencyMatrix');
    res.status(200).json({ matrix: FiscalProductionActivationApprovalDependencyMatrix.getMatrix() });
  }

  public static getBlockers(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getBlockers');
    res.status(200).json({ blockers: FiscalProductionActivationApprovalBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getRisks');
    res.status(200).json({ risks: FiscalProductionActivationApprovalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
      try {
          const input: FiscalProductionActivationApprovalInput = req.body;
          FiscalProductionActivationApprovalValidator.validate(input);
          FiscalProductionActivationApprovalAuditService.logAdminRead('validate', { success: true });
          res.status(200).json({ valid: true });
      } catch (error: any) {
          FiscalProductionActivationApprovalAuditService.logAdminRead('validate', { success: false, error: error.message });
          res.status(400).json({ valid: false, error: error.message });
      }
  }

  public static evaluate(req: Request, res: Response) {
      try {
        const input: FiscalProductionActivationApprovalInput = req.body;
        const evaluation = FiscalProductionActivationApprovalEvaluationService.evaluate(input);
        FiscalProductionActivationApprovalAuditService.logAdminRead('evaluate', { success: true });
        res.status(200).json({ evaluation });
      } catch (error: any) {
        FiscalProductionActivationApprovalAuditService.logAdminRead('evaluate', { success: false, error: error.message });
        res.status(400).json({ valid: false, error: error.message });
      }
  }

  public static simulateDecision(req: Request, res: Response) {
      try {
        const input: FiscalProductionActivationApprovalInput = req.body;
        FiscalProductionActivationApprovalValidator.validate(input);
        const decision = FiscalProductionActivationApprovalDecisionService.simulateDecision(input);
        FiscalProductionActivationApprovalAuditService.logAdminRead('simulateDecision', { success: true });
        res.status(200).json({ decision });
      } catch (error: any) {
        FiscalProductionActivationApprovalAuditService.logAdminRead('simulateDecision', { success: false, error: error.message });
        res.status(400).json({ error: error.message });
      }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionActivationApprovalAuditService.logAdminRead('getReport');
    res.status(200).json({ report: FiscalProductionActivationApprovalReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionActivationApprovalAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '33.2',
      description: 'Production Activation Approval Governance',
      realApprovalConcluded: false,
      realApprovalRecordPersisted: false,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false,
      realExecutionGateUnlocked: false,
      realProductionActivationExecuted: false
    });
  }
}
