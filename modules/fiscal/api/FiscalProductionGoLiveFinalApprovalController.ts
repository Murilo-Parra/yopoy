import { Request, Response } from 'express';
import { FiscalProductionExecutiveSignOffSimulationMatrix } from '../dedicated-homologation/production-go-live-cutover/final-approval-dry-run/FiscalProductionExecutiveSignOffSimulationMatrix';
import {
  FiscalProductionGoLiveFinalApprovalPolicy,
  FiscalProductionGoLiveFinalApprovalPackage,
  FiscalProductionFinalReadinessEvidenceReviewMatrix,
  FiscalProductionNoActivationDecisionMatrix,
  FiscalProductionAuthorizationNoGrantPlan,
  FiscalProductionGoLiveApprovalNoOpPlan,
  FiscalProductionCutoverDecisionNoExecuteMatrix,
  FiscalProductionRollbackFallbackEvidenceReviewMatrix,
  FiscalProductionNoRealApprovalEvidence,
  FiscalProductionNoRealAuthorizationEvidence,
  FiscalProductionGoLiveFinalApprovalDependencyMatrix,
  FiscalProductionGoLiveFinalApprovalBlockerRegister,
  FiscalProductionGoLiveFinalApprovalRiskRegister,
  FiscalProductionGoLiveFinalApprovalValidator,
  FiscalProductionGoLiveFinalApprovalEvaluationService,
  FiscalProductionGoLiveFinalApprovalDecisionService,
  FiscalProductionGoLiveFinalApprovalReportService,
  FiscalProductionGoLiveFinalApprovalAuditService
} from '../dedicated-homologation/production-go-live-cutover/final-approval-dry-run';

export class FiscalProductionGoLiveFinalApprovalController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveFinalApprovalPolicy.getPolicy());
  }

  public static getFinalApprovalPackage(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveFinalApprovalPackage.getPackage());
  }

  public static getExecutiveSignOffSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionExecutiveSignOffSimulationMatrix.getMatrix());
  }

  public static getFinalReadinessEvidenceReviewMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalReadinessEvidenceReviewMatrix.getMatrix());
  }

  public static getNoActivationDecisionMatrix(req: Request, res: Response) {
    res.json(FiscalProductionNoActivationDecisionMatrix.getMatrix());
  }

  public static getAuthorizationNoGrantPlan(req: Request, res: Response) {
    res.json(FiscalProductionAuthorizationNoGrantPlan.getPlan());
  }

  public static getGoLiveApprovalNoOpPlan(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveApprovalNoOpPlan.getPlan());
  }

  public static getCutoverDecisionNoExecuteMatrix(req: Request, res: Response) {
    res.json(FiscalProductionCutoverDecisionNoExecuteMatrix.getMatrix());
  }

  public static getRollbackFallbackEvidenceReviewMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRollbackFallbackEvidenceReviewMatrix.getMatrix());
  }

  public static getNoRealApprovalEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealApprovalEvidence.getEvidence());
  }

  public static getNoRealAuthorizationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealAuthorizationEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveFinalApprovalDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionGoLiveFinalApprovalBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionGoLiveFinalApprovalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionGoLiveFinalApprovalValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionGoLiveFinalApprovalEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveFinalApprovalDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveFinalApprovalDecisionService.simulateDecision(input);
    const report = FiscalProductionGoLiveFinalApprovalReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveFinalApprovalDecisionService.simulateDecision(input);
    const audit = FiscalProductionGoLiveFinalApprovalAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Go-Live Final Approval, Executive Sign-Off & No-Activation Decision Dry-Run', readOnly: true });
  }
}
