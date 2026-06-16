import { Request, Response } from 'express';
import { 
  FiscalProductionComplianceFindingPolicy,
  FiscalProductionComplianceFindingReviewBlueprint,
  FiscalProductionComplianceFindingClassificationMatrix,
  FiscalProductionComplianceFindingSeverityImpactMatrix,
  FiscalProductionComplianceRemediationActionNoOpPlan,
  FiscalProductionComplianceOwnerAssignmentNoNotificationMatrix,
  FiscalProductionComplianceExceptionWaiverNoPersistencePlan,
  FiscalProductionComplianceEvidenceToFindingNoReadMatrix,
  FiscalProductionComplianceRemediationVerificationNoExecutePlan,
  FiscalProductionComplianceNoFindingPersistenceEvidence,
  FiscalProductionComplianceNoRemediationExecutionEvidence,
  FiscalProductionComplianceFindingDependencyMatrix,
  FiscalProductionComplianceFindingBlockerRegister,
  FiscalProductionComplianceFindingRiskRegister,
  FiscalProductionComplianceFindingValidator,
  FiscalProductionComplianceFindingEvaluationService,
  FiscalProductionComplianceFindingDecisionService,
  FiscalProductionComplianceFindingReportService,
  FiscalProductionComplianceFindingAuditService
} from '../dedicated-homologation/production-compliance-audit-governance/finding-remediation-dry-run';

export class FiscalProductionComplianceFindingController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getPolicy');
    res.status(200).json({ policy: FiscalProductionComplianceFindingPolicy.getPolicyMessage() });
  }

  public static getFindingReviewBlueprint(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getFindingReviewBlueprint');
    res.status(200).json({ blueprint: FiscalProductionComplianceFindingReviewBlueprint.getBlueprint() });
  }

  public static getFindingClassificationMatrix(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getFindingClassificationMatrix');
    res.status(200).json({ matrix: FiscalProductionComplianceFindingClassificationMatrix.getMatrix() });
  }

  public static getSeverityImpactMatrix(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getSeverityImpactMatrix');
    res.status(200).json({ matrix: FiscalProductionComplianceFindingSeverityImpactMatrix.getMatrix() });
  }

  public static getRemediationActionNoOpPlan(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getRemediationActionNoOpPlan');
    res.status(200).json({ plan: FiscalProductionComplianceRemediationActionNoOpPlan.getPlan() });
  }

  public static getOwnerAssignmentNoNotificationMatrix(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getOwnerAssignmentNoNotificationMatrix');
    res.status(200).json({ matrix: FiscalProductionComplianceOwnerAssignmentNoNotificationMatrix.getMatrix() });
  }

  public static getExceptionWaiverNoPersistencePlan(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getExceptionWaiverNoPersistencePlan');
    res.status(200).json({ plan: FiscalProductionComplianceExceptionWaiverNoPersistencePlan.getPlan() });
  }

  public static getEvidenceToFindingNoReadMatrix(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getEvidenceToFindingNoReadMatrix');
    res.status(200).json({ matrix: FiscalProductionComplianceEvidenceToFindingNoReadMatrix.getMatrix() });
  }

  public static getRemediationVerificationNoExecutePlan(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getRemediationVerificationNoExecutePlan');
    res.status(200).json({ plan: FiscalProductionComplianceRemediationVerificationNoExecutePlan.getPlan() });
  }

  public static getNoFindingPersistenceEvidence(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getNoFindingPersistenceEvidence');
    res.status(200).json({ evidence: FiscalProductionComplianceNoFindingPersistenceEvidence.getEvidence() });
  }

  public static getNoRemediationExecutionEvidence(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getNoRemediationExecutionEvidence');
    res.status(200).json({ evidence: FiscalProductionComplianceNoRemediationExecutionEvidence.getEvidence() });
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getDependencyMatrix');
    res.status(200).json({ matrix: FiscalProductionComplianceFindingDependencyMatrix.getMatrix() });
  }

  public static getBlockers(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getBlockers');
    res.status(200).json({ blockers: FiscalProductionComplianceFindingBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getRisks');
    res.status(200).json({ risks: FiscalProductionComplianceFindingRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    try {
      FiscalProductionComplianceFindingValidator.validate(req.body);
      FiscalProductionComplianceFindingAuditService.audit('validate', { success: true });
      res.status(200).json({ valid: true });
    } catch (error: any) {
      FiscalProductionComplianceFindingAuditService.audit('validate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static evaluate(req: Request, res: Response) {
    try {
      const evaluation = FiscalProductionComplianceFindingEvaluationService.evaluate(req.body);
      FiscalProductionComplianceFindingAuditService.audit('evaluate', { success: true });
      res.status(200).json({ evaluation });
    } catch (error: any) {
      FiscalProductionComplianceFindingAuditService.audit('evaluate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static simulateDecision(req: Request, res: Response) {
    try {
      FiscalProductionComplianceFindingValidator.validate(req.body);
      const decision = FiscalProductionComplianceFindingDecisionService.simulateDecision(req.body);
      FiscalProductionComplianceFindingAuditService.audit('simulateDecision', { success: true });
      res.status(200).json({ decision });
    } catch (error: any) {
      FiscalProductionComplianceFindingAuditService.audit('simulateDecision', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionComplianceFindingAuditService.audit('getReport');
    res.status(200).json({ report: FiscalProductionComplianceFindingReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionComplianceFindingAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '36.3',
      realFindingCreated: false,
      realTicketCreated: false,
      realRemediationExecuted: false
    });
  }
}
