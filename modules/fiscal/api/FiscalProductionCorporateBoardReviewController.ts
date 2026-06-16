import { Request, Response } from 'express';
import {
  FiscalProductionCorporateBoardReviewPolicy,
  FiscalProductionCorporateBoardReviewBlueprint,
  FiscalProductionExecutiveAcknowledgementNonBindingMatrix,
  FiscalProductionBoardQuorumSimulationMatrix,
  FiscalProductionBoardMemberEligibilityNoAuthorityMatrix,
  FiscalProductionArchiveReviewNoReadMatrix,
  FiscalProductionBoardDecisionNoApprovalMatrix,
  FiscalProductionBoardMinutesNoFilePlan,
  FiscalProductionExecutiveAcknowledgementNoPersistencePlan,
  FiscalProductionBoardNotificationNoSendPlan,
  FiscalProductionBoardNoLegalEffectNotice,
  FiscalProductionNoRealBoardApprovalEvidence,
  FiscalProductionNoRealAcknowledgementEvidence,
  FiscalProductionNoRealBoardNotificationEvidence,
  FiscalProductionCorporateBoardReviewDependencyMatrix,
  FiscalProductionCorporateBoardReviewBlockerRegister,
  FiscalProductionCorporateBoardReviewRiskRegister,
  FiscalProductionCorporateBoardReviewValidator,
  FiscalProductionCorporateBoardReviewEvaluationService,
  FiscalProductionCorporateBoardReviewDecisionService,
  FiscalProductionCorporateBoardReviewReportService,
  FiscalProductionCorporateBoardReviewAuditService
} from '../dedicated-homologation/production-corporate-governance-archive/board-review-dry-run';

export class FiscalProductionCorporateBoardReviewController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionCorporateBoardReviewPolicy.getPolicy());
  }

  public static getBoardReviewBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionCorporateBoardReviewBlueprint.getBlueprint());
  }

  public static getExecutiveAcknowledgementNonBindingMatrix(req: Request, res: Response) {
    res.json(FiscalProductionExecutiveAcknowledgementNonBindingMatrix.getMatrix());
  }

  public static getBoardQuorumSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionBoardQuorumSimulationMatrix.getMatrix());
  }

  public static getBoardMemberEligibilityNoAuthorityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionBoardMemberEligibilityNoAuthorityMatrix.getMatrix());
  }

  public static getArchiveReviewNoReadMatrix(req: Request, res: Response) {
    res.json(FiscalProductionArchiveReviewNoReadMatrix.getMatrix());
  }

  public static getBoardDecisionNoApprovalMatrix(req: Request, res: Response) {
    res.json(FiscalProductionBoardDecisionNoApprovalMatrix.getMatrix());
  }

  public static getBoardMinutesNoFilePlan(req: Request, res: Response) {
    res.json(FiscalProductionBoardMinutesNoFilePlan.getPlan());
  }

  public static getExecutiveAcknowledgementNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionExecutiveAcknowledgementNoPersistencePlan.getPlan());
  }

  public static getBoardNotificationNoSendPlan(req: Request, res: Response) {
    res.json(FiscalProductionBoardNotificationNoSendPlan.getPlan());
  }

  public static getBoardNoLegalEffectNotice(req: Request, res: Response) {
    res.json(FiscalProductionBoardNoLegalEffectNotice.getNotice());
  }

  public static getNoRealBoardApprovalEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealBoardApprovalEvidence.getEvidence());
  }

  public static getNoRealAcknowledgementEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealAcknowledgementEvidence.getEvidence());
  }

  public static getNoRealBoardNotificationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealBoardNotificationEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionCorporateBoardReviewDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionCorporateBoardReviewBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionCorporateBoardReviewRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionCorporateBoardReviewValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionCorporateBoardReviewEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCorporateBoardReviewDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCorporateBoardReviewDecisionService.simulateDecision(input);
    res.json(FiscalProductionCorporateBoardReviewReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCorporateBoardReviewDecisionService.simulateDecision(input);
    res.json(FiscalProductionCorporateBoardReviewAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Corporate Board Review', readOnly: true });
  }
}
