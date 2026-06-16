import { Request, Response } from 'express';
import { FiscalProductionDormantStateFinalReviewPolicy } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateFinalReviewPolicy';
import { FiscalProductionDormantStateFinalReviewBlueprint } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateFinalReviewBlueprint';
import { FiscalProductionExecutiveNonResumptionAcknowledgementMatrix } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionExecutiveNonResumptionAcknowledgementMatrix';
import { FiscalProductionNoLegalEffectReviewNotice } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionNoLegalEffectReviewNotice';
import { FiscalProductionDormantStateFinalContinuityMatrix } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateFinalContinuityMatrix';
import { FiscalProductionExecutiveReviewNoApprovalMatrix } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionExecutiveReviewNoApprovalMatrix';
import { FiscalProductionAcknowledgementNoBindingPlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionAcknowledgementNoBindingPlan';
import { FiscalProductionDormantStateMinutesNoFilePlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateMinutesNoFilePlan';
import { FiscalProductionFinalReviewNoSignaturePlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionFinalReviewNoSignaturePlan';
import { FiscalProductionFinalReviewNoNotificationPlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionFinalReviewNoNotificationPlan';
import { FiscalProductionFinalReviewNoExportPlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionFinalReviewNoExportPlan';
import { FiscalProductionFinalReviewNoHandoffPlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionFinalReviewNoHandoffPlan';
import { FiscalProductionFinalReviewNoRealApprovalEvidence } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionFinalReviewNoRealApprovalEvidence';
import { FiscalProductionFinalReviewNoRealAcknowledgementEvidence } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionFinalReviewNoRealAcknowledgementEvidence';
import { FiscalProductionNoRealLegalEffectEvidence } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionNoRealLegalEffectEvidence';
import { FiscalProductionNoRealFinalReviewHandoffEvidence } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionNoRealFinalReviewHandoffEvidence';
import { FiscalProductionDormantStateFinalReviewDependencyMatrix } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateFinalReviewDependencyMatrix';
import { FiscalProductionDormantStateFinalReviewBlockerRegister } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateFinalReviewBlockerRegister';
import { FiscalProductionDormantStateFinalReviewRiskRegister } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateFinalReviewRiskRegister';
import { FiscalProductionDormantStateFinalReviewEvaluationService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateFinalReviewEvaluationService';
import { FiscalProductionDormantStateFinalReviewDecisionService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateFinalReviewDecisionService';
import { FiscalProductionDormantStateFinalReviewReportService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateFinalReviewReportService';
import { FiscalProductionDormantStateFinalReviewAuditService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/final-review-dry-run/FiscalProductionDormantStateFinalReviewAuditService';

export class FiscalProductionDormantStateFinalReviewController {
  public static getPolicy(req: Request, res: Response): void {
    res.json({ policy: FiscalProductionDormantStateFinalReviewPolicy.getMessage() });
  }

  public static getFinalReviewBlueprint(req: Request, res: Response): void {
    res.json(FiscalProductionDormantStateFinalReviewBlueprint.getBlueprint());
  }

  public static getExecutiveNonResumptionAcknowledgementMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionExecutiveNonResumptionAcknowledgementMatrix.getMatrix());
  }

  public static getNoLegalEffectReviewNotice(req: Request, res: Response): void {
    res.json(FiscalProductionNoLegalEffectReviewNotice.getNotice());
  }

  public static getDormantStateFinalContinuityMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionDormantStateFinalContinuityMatrix.getMatrix());
  }

  public static getExecutiveReviewNoApprovalMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionExecutiveReviewNoApprovalMatrix.getMatrix());
  }

  public static getAcknowledgementNoBindingPlan(req: Request, res: Response): void {
    res.json(FiscalProductionAcknowledgementNoBindingPlan.getPlan());
  }

  public static getMinutesNoFilePlan(req: Request, res: Response): void {
    res.json(FiscalProductionDormantStateMinutesNoFilePlan.getPlan());
  }

  public static getFinalReviewNoSignaturePlan(req: Request, res: Response): void {
    res.json(FiscalProductionFinalReviewNoSignaturePlan.getPlan());
  }

  public static getFinalReviewNoNotificationPlan(req: Request, res: Response): void {
    res.json(FiscalProductionFinalReviewNoNotificationPlan.getPlan());
  }

  public static getFinalReviewNoExportPlan(req: Request, res: Response): void {
    res.json(FiscalProductionFinalReviewNoExportPlan.getPlan());
  }

  public static getFinalReviewNoHandoffPlan(req: Request, res: Response): void {
    res.json(FiscalProductionFinalReviewNoHandoffPlan.getPlan());
  }

  public static getExecutiveApprovalEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionFinalReviewNoRealApprovalEvidence.getEvidence());
  }

  public static getAcknowledgementEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionFinalReviewNoRealAcknowledgementEvidence.getEvidence());
  }

  public static getNoRealLegalEffectEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionNoRealLegalEffectEvidence.getEvidence());
  }

  public static getNoRealFinalReviewHandoffEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionNoRealFinalReviewHandoffEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionDormantStateFinalReviewDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response): void {
    res.json({ blockers: FiscalProductionDormantStateFinalReviewBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response): void {
    res.json({ risks: FiscalProductionDormantStateFinalReviewRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response): void {
    FiscalProductionDormantStateFinalReviewAuditService.audit('Validation requested', { user: (req as any).user, body: req.body });
    const evaluation = FiscalProductionDormantStateFinalReviewEvaluationService.evaluate(req.body);
    if (evaluation.blockers && evaluation.blockers.length > 0) {
      res.status(403).json(evaluation);
    } else {
      res.json(evaluation);
    }
  }

  public static evaluate(req: Request, res: Response): void {
    FiscalProductionDormantStateFinalReviewAuditService.audit('Evaluation requested', { user: (req as any).user, body: req.body });
    const evaluation = FiscalProductionDormantStateFinalReviewEvaluationService.evaluate(req.body);
    if (evaluation.blockers && evaluation.blockers.length > 0) {
      res.status(403).json(evaluation);
    } else {
      res.json(evaluation);
    }
  }

  public static simulateDecision(req: Request, res: Response): void {
    FiscalProductionDormantStateFinalReviewAuditService.audit('Decision simulated', { user: (req as any).user, body: req.body });
    const blockers = FiscalProductionDormantStateFinalReviewEvaluationService.evaluate(req.body).blockers;
    if (blockers && blockers.length > 0) {
      res.status(403).json({ status: 'FAILED_SAFE', blockers, validationExecuted: true, evaluationExecuted: false });
      return;
    }
    res.json(FiscalProductionDormantStateFinalReviewDecisionService.simulateDecision(req.body));
  }

  public static getReport(req: Request, res: Response): void {
    FiscalProductionDormantStateFinalReviewAuditService.audit('Report requested', { user: (req as any).user });
    res.json({ report: FiscalProductionDormantStateFinalReviewReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response): void {
    FiscalProductionDormantStateFinalReviewAuditService.audit('Audit records requested', { user: (req as any).user });
    res.json({ message: 'Audit events are logged to the console.' });
  }

  public static getHealth(req: Request, res: Response): void {
    res.json({ status: 'healthy', module: 'production-dormant-state-final-review' });
  }
}
