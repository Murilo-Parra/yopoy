import { Request, Response } from 'express';
import {
  FiscalProductionRetentionAccessDisclosurePolicy,
  FiscalProductionRetentionDormancyAccessReviewBlueprint,
  FiscalProductionDormantRecordAccessNoGrantMatrix,
  FiscalProductionRetrievalSuppressionNoReadPlan,
  FiscalProductionDisclosureEligibilityNoApproveMatrix,
  FiscalProductionExportPackageNoCreatePlan,
  FiscalProductionDownloadLinkNoIssueMatrix,
  FiscalProductionPresignedUrlNoGeneratePlan,
  FiscalProductionRecipientDisclosureNoNotifyMatrix,
  FiscalProductionRedactionNoReadNoApplyPlan,
  FiscalProductionAccessAuditNoPersistencePlan,
  FiscalProductionRetentionDisclosureNoLegalEffectNotice,
  FiscalProductionNoRealAccessGrantEvidence,
  FiscalProductionNoRealRetrievalEvidence,
  FiscalProductionNoRealDisclosureExportEvidence,
  FiscalProductionRetentionAccessDisclosureDependencyMatrix,
  FiscalProductionRetentionAccessDisclosureBlockerRegister,
  FiscalProductionRetentionAccessDisclosureRiskRegister,
  FiscalProductionRetentionAccessDisclosureValidator,
  FiscalProductionRetentionAccessDisclosureEvaluationService,
  FiscalProductionRetentionAccessDisclosureDecisionService,
  FiscalProductionRetentionAccessDisclosureReportService,
  FiscalProductionRetentionAccessDisclosureAuditService
} from '../dedicated-homologation/production-governance-retention-dormancy/access-disclosure-dry-run';

export class FiscalProductionRetentionAccessDisclosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionRetentionAccessDisclosurePolicy.getPolicy());
  }

  public static getRetentionDormancyAccessReviewBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionRetentionDormancyAccessReviewBlueprint.getBlueprint());
  }

  public static getDormantRecordAccessNoGrantMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDormantRecordAccessNoGrantMatrix.getMatrix());
  }

  public static getRetrievalSuppressionNoReadPlan(req: Request, res: Response) {
    res.json(FiscalProductionRetrievalSuppressionNoReadPlan.getPlan());
  }

  public static getDisclosureEligibilityNoApproveMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDisclosureEligibilityNoApproveMatrix.getMatrix());
  }

  public static getExportPackageNoCreatePlan(req: Request, res: Response) {
    res.json(FiscalProductionExportPackageNoCreatePlan.getPlan());
  }

  public static getDownloadLinkNoIssueMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDownloadLinkNoIssueMatrix.getMatrix());
  }

  public static getPresignedUrlNoGeneratePlan(req: Request, res: Response) {
    res.json(FiscalProductionPresignedUrlNoGeneratePlan.getPlan());
  }

  public static getRecipientDisclosureNoNotifyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRecipientDisclosureNoNotifyMatrix.getMatrix());
  }

  public static getRedactionNoReadNoApplyPlan(req: Request, res: Response) {
    res.json(FiscalProductionRedactionNoReadNoApplyPlan.getPlan());
  }

  public static getAccessAuditNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionAccessAuditNoPersistencePlan.getPlan());
  }

  public static getRetentionDisclosureNoLegalEffectNotice(req: Request, res: Response) {
    res.json(FiscalProductionRetentionDisclosureNoLegalEffectNotice.getNotice());
  }

  public static getNoRealAccessGrantEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealAccessGrantEvidence.getEvidence());
  }

  public static getNoRealRetrievalEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealRetrievalEvidence.getEvidence());
  }

  public static getNoRealDisclosureExportEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealDisclosureExportEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRetentionAccessDisclosureDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionRetentionAccessDisclosureBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionRetentionAccessDisclosureRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionRetentionAccessDisclosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionRetentionAccessDisclosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRetentionAccessDisclosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRetentionAccessDisclosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionRetentionAccessDisclosureReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRetentionAccessDisclosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionRetentionAccessDisclosureAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Retention Access Disclosure', readOnly: true });
  }
}
