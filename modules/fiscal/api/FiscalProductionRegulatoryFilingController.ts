import { Request, Response } from 'express';
import { 
  FiscalProductionRegulatoryFilingPolicy,
  FiscalProductionRegulatoryFilingSimulationProfile,
  FiscalProductionRegulatorySubmissionPayloadNoOpPlan,
  FiscalProductionRegulatoryRecipientSimulationMatrix,
  FiscalProductionRegulatoryProtocolNoIssuePlan,
  FiscalProductionRegulatoryFilingPayloadMetadataMatrix,
  FiscalProductionRegulatoryAttachmentNoFilePlan,
  FiscalProductionRegulatoryValidationRulesNoExecuteMatrix,
  FiscalProductionRegulatoryNoSubmissionEvidence,
  FiscalProductionRegulatoryNoProtocolEvidence,
  FiscalProductionRegulatoryFilingDependencyMatrix,
  FiscalProductionRegulatoryFilingBlockerRegister,
  FiscalProductionRegulatoryFilingRiskRegister,
  FiscalProductionRegulatoryFilingValidator,
  FiscalProductionRegulatoryFilingEvaluationService,
  FiscalProductionRegulatoryFilingDecisionService,
  FiscalProductionRegulatoryFilingReportService,
  FiscalProductionRegulatoryFilingAuditService
} from '../dedicated-homologation/production-compliance-audit-governance/regulatory-filing-dry-run';

export class FiscalProductionRegulatoryFilingController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getPolicy');
    res.status(200).json({ policy: FiscalProductionRegulatoryFilingPolicy.getPolicyMessage() });
  }

  public static getFilingSimulationProfile(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getFilingSimulationProfile');
    res.status(200).json({ profile: FiscalProductionRegulatoryFilingSimulationProfile.getProfile() });
  }

  public static getSubmissionPayloadNoOpPlan(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getSubmissionPayloadNoOpPlan');
    res.status(200).json({ plan: FiscalProductionRegulatorySubmissionPayloadNoOpPlan.getPlan() });
  }

  public static getRecipientSimulationMatrix(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getRecipientSimulationMatrix');
    res.status(200).json({ matrix: FiscalProductionRegulatoryRecipientSimulationMatrix.getMatrix() });
  }

  public static getProtocolNoIssuePlan(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getProtocolNoIssuePlan');
    res.status(200).json({ plan: FiscalProductionRegulatoryProtocolNoIssuePlan.getPlan() });
  }

  public static getFilingPayloadMetadataMatrix(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getFilingPayloadMetadataMatrix');
    res.status(200).json({ matrix: FiscalProductionRegulatoryFilingPayloadMetadataMatrix.getMatrix() });
  }

  public static getAttachmentNoFilePlan(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getAttachmentNoFilePlan');
    res.status(200).json({ plan: FiscalProductionRegulatoryAttachmentNoFilePlan.getPlan() });
  }

  public static getValidationRulesNoExecuteMatrix(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getValidationRulesNoExecuteMatrix');
    res.status(200).json({ matrix: FiscalProductionRegulatoryValidationRulesNoExecuteMatrix.getMatrix() });
  }

  public static getNoSubmissionEvidence(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getNoSubmissionEvidence');
    res.status(200).json({ evidence: FiscalProductionRegulatoryNoSubmissionEvidence.getEvidence() });
  }

  public static getNoProtocolEvidence(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getNoProtocolEvidence');
    res.status(200).json({ evidence: FiscalProductionRegulatoryNoProtocolEvidence.getEvidence() });
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getDependencyMatrix');
    res.status(200).json({ matrix: FiscalProductionRegulatoryFilingDependencyMatrix.getMatrix() });
  }

  public static getBlockers(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getBlockers');
    res.status(200).json({ blockers: FiscalProductionRegulatoryFilingBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getRisks');
    res.status(200).json({ risks: FiscalProductionRegulatoryFilingRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    try {
      FiscalProductionRegulatoryFilingValidator.validate(req.body);
      FiscalProductionRegulatoryFilingAuditService.audit('validate', { success: true });
      res.status(200).json({ valid: true });
    } catch (error: any) {
      FiscalProductionRegulatoryFilingAuditService.audit('validate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static evaluate(req: Request, res: Response) {
    try {
      const evaluation = FiscalProductionRegulatoryFilingEvaluationService.evaluate(req.body);
      FiscalProductionRegulatoryFilingAuditService.audit('evaluate', { success: true });
      res.status(200).json({ evaluation });
    } catch (error: any) {
      FiscalProductionRegulatoryFilingAuditService.audit('evaluate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static simulateDecision(req: Request, res: Response) {
    try {
      FiscalProductionRegulatoryFilingValidator.validate(req.body);
      const decision = FiscalProductionRegulatoryFilingDecisionService.simulateDecision(req.body);
      FiscalProductionRegulatoryFilingAuditService.audit('simulateDecision', { success: true });
      res.status(200).json({ decision });
    } catch (error: any) {
      FiscalProductionRegulatoryFilingAuditService.audit('simulateDecision', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionRegulatoryFilingAuditService.audit('getReport');
    res.status(200).json({ report: FiscalProductionRegulatoryFilingReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionRegulatoryFilingAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '36.2',
      realRegulatoryFilingSubmitted: false,
      realSubmissionPayloadSent: false,
      realProtocolNumberGenerated: false
    });
  }
}
