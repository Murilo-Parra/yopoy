import { Request, Response } from 'express';
import {
  FiscalLegalCommitteeDryRunPolicy,
  FiscalLegalCommitteeCharter,
  FiscalLegalCommitteeApprovalMatrix,
  FiscalLegalCommitteeQuorumSimulation,
  FiscalLegalRiskAcceptanceReview,
  FiscalLegalWaiverReview,
  FiscalLegalSignatureEvidenceReviewMatrix,
  FiscalLegalCommitteeFinalRecommendation,
  FiscalLegalCommitteeDryRunBlockerRegister,
  FiscalLegalCommitteeDryRunRiskRegister,
  FiscalLegalCommitteeDryRunValidator,
  FiscalLegalCommitteeDryRunEvaluationService,
  FiscalLegalCommitteeDryRunDecisionService,
  FiscalLegalCommitteeDryRunReportService,
  FiscalLegalCommitteeDryRunAuditService
} from '../dedicated-homologation/legal-signoff/committee-dry-run';

export class FiscalLegalCommitteeDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalLegalCommitteeDryRunPolicy.getBaseResult();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getCommitteeCharter(req: Request, res: Response) {
    const result = FiscalLegalCommitteeCharter.generateCharter();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_COMMITTEE_CHARTER', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getApprovalMatrix(req: Request, res: Response) {
    const result = FiscalLegalCommitteeApprovalMatrix.generateMatrix();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_APPROVAL_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getQuorumSimulation(req: Request, res: Response) {
    const result = FiscalLegalCommitteeQuorumSimulation.simulateQuorum();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_QUORUM_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRiskAcceptanceReview(req: Request, res: Response) {
    const result = FiscalLegalRiskAcceptanceReview.simulateReview();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_RISK_ACCEPTANCE_REVIEW', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getWaiverReview(req: Request, res: Response) {
    const result = FiscalLegalWaiverReview.simulateReview();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_WAIVER_REVIEW', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSignatureEvidenceReview(req: Request, res: Response) {
    const result = FiscalLegalSignatureEvidenceReviewMatrix.simulateReview();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_SIGNATURE_EVIDENCE_REVIEW', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalRecommendation(req: Request, res: Response) {
    const result = FiscalLegalCommitteeFinalRecommendation.generateRecommendation();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_FINAL_RECOMMENDATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalLegalCommitteeDryRunBlockerRegister.getBlockers();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalLegalCommitteeDryRunRiskRegister.getRisks();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalLegalCommitteeDryRunValidator.validate(input);
    FiscalLegalCommitteeDryRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalLegalCommitteeDryRunEvaluationService.evaluate(input);
    FiscalLegalCommitteeDryRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalLegalCommitteeDryRunDecisionService.simulateDecision(input);
    FiscalLegalCommitteeDryRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalLegalCommitteeDryRunReportService.getReport();
    FiscalLegalCommitteeDryRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalLegalCommitteeDryRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', legalSignoffCommitteeDryRunOnly: true, legalRiskAcceptanceReviewOnly: true });
  }
}
