import { Request, Response } from 'express';
import { 
  FiscalProductionEvidenceDisclosurePolicy,
  FiscalProductionEvidenceDisclosureReviewBlueprint,
  FiscalProductionEvidenceSanitizedDisclosurePackagePlan,
  FiscalProductionEvidenceDisclosureRecipientEligibilityMatrix,
  FiscalProductionEvidenceExternalAuditExportNoOpPlan,
  FiscalProductionEvidenceRedactionNoReadMatrix,
  FiscalProductionEvidenceLegalHoldNoPersistencePlan,
  FiscalProductionEvidenceDisclosureScopeMetadataMatrix,
  FiscalProductionEvidenceDisclosureApprovalNoOpPlan,
  FiscalProductionEvidenceNoExternalExportEvidence,
  FiscalProductionEvidenceNoPayloadDisclosureEvidence,
  FiscalProductionEvidenceDisclosureDependencyMatrix,
  FiscalProductionEvidenceDisclosureBlockerRegister,
  FiscalProductionEvidenceDisclosureRiskRegister,
  FiscalProductionEvidenceDisclosureValidator,
  FiscalProductionEvidenceDisclosureEvaluationService,
  FiscalProductionEvidenceDisclosureDecisionService,
  FiscalProductionEvidenceDisclosureReportService,
  FiscalProductionEvidenceDisclosureAuditService
} from '../dedicated-homologation/production-evidence-vault-governance/disclosure-export-dry-run';

export class FiscalProductionEvidenceDisclosureController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getPolicy');
    res.status(200).json({ policy: FiscalProductionEvidenceDisclosurePolicy.getPolicyMessage() });
  }

  public static getDisclosureReviewBlueprint(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getDisclosureReviewBlueprint');
    res.status(200).json({ blueprint: FiscalProductionEvidenceDisclosureReviewBlueprint.getBlueprint() });
  }

  public static getSanitizedDisclosurePackagePlan(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getSanitizedDisclosurePackagePlan');
    res.status(200).json({ plan: FiscalProductionEvidenceSanitizedDisclosurePackagePlan.getPlan() });
  }

  public static getRecipientEligibilityMatrix(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getRecipientEligibilityMatrix');
    res.status(200).json({ matrix: FiscalProductionEvidenceDisclosureRecipientEligibilityMatrix.getMatrix() });
  }

  public static getExternalAuditExportNoOpPlan(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getExternalAuditExportNoOpPlan');
    res.status(200).json({ plan: FiscalProductionEvidenceExternalAuditExportNoOpPlan.getPlan() });
  }

  public static getRedactionNoReadMatrix(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getRedactionNoReadMatrix');
    res.status(200).json({ matrix: FiscalProductionEvidenceRedactionNoReadMatrix.getMatrix() });
  }

  public static getLegalHoldNoPersistencePlan(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getLegalHoldNoPersistencePlan');
    res.status(200).json({ plan: FiscalProductionEvidenceLegalHoldNoPersistencePlan.getPlan() });
  }

  public static getDisclosureScopeMetadataMatrix(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getDisclosureScopeMetadataMatrix');
    res.status(200).json({ matrix: FiscalProductionEvidenceDisclosureScopeMetadataMatrix.getMatrix() });
  }

  public static getDisclosureApprovalNoOpPlan(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getDisclosureApprovalNoOpPlan');
    res.status(200).json({ plan: FiscalProductionEvidenceDisclosureApprovalNoOpPlan.getPlan() });
  }

  public static getNoExternalExportEvidence(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getNoExternalExportEvidence');
    res.status(200).json({ evidence: FiscalProductionEvidenceNoExternalExportEvidence.getEvidence() });
  }

  public static getNoPayloadDisclosureEvidence(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getNoPayloadDisclosureEvidence');
    res.status(200).json({ evidence: FiscalProductionEvidenceNoPayloadDisclosureEvidence.getEvidence() });
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getDependencyMatrix');
    res.status(200).json({ matrix: FiscalProductionEvidenceDisclosureDependencyMatrix.getMatrix() });
  }

  public static getBlockers(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getBlockers');
    res.status(200).json({ blockers: FiscalProductionEvidenceDisclosureBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getRisks');
    res.status(200).json({ risks: FiscalProductionEvidenceDisclosureRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    try {
      FiscalProductionEvidenceDisclosureValidator.validate(req.body);
      FiscalProductionEvidenceDisclosureAuditService.audit('validate', { success: true });
      res.status(200).json({ valid: true });
    } catch (error: any) {
      FiscalProductionEvidenceDisclosureAuditService.audit('validate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static evaluate(req: Request, res: Response) {
    try {
      const evaluation = FiscalProductionEvidenceDisclosureEvaluationService.evaluate(req.body);
      FiscalProductionEvidenceDisclosureAuditService.audit('evaluate', { success: true });
      res.status(200).json({ evaluation });
    } catch (error: any) {
      FiscalProductionEvidenceDisclosureAuditService.audit('evaluate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static simulateDecision(req: Request, res: Response) {
    try {
      FiscalProductionEvidenceDisclosureValidator.validate(req.body);
      const decision = FiscalProductionEvidenceDisclosureDecisionService.simulateDecision(req.body);
      FiscalProductionEvidenceDisclosureAuditService.audit('simulateDecision', { success: true });
      res.status(200).json({ decision });
    } catch (error: any) {
      FiscalProductionEvidenceDisclosureAuditService.audit('simulateDecision', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionEvidenceDisclosureAuditService.audit('getReport');
    res.status(200).json({ report: FiscalProductionEvidenceDisclosureReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionEvidenceDisclosureAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '35.4',
      realEvidenceExported: false,
      realAuditPackageCreated: false,
      realDisclosureFileGenerated: false
    });
  }
}
