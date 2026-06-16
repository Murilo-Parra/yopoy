import { Request, Response } from 'express';
import {
  FiscalProductionCommitteeDeliberationPolicy,
  FiscalProductionCommitteeCharter,
  FiscalProductionCommitteeQuorumMatrix,
  FiscalProductionCommitteeVoteSimulation,
  FiscalProductionCommitteePolicyReview,
  FiscalProductionPolicyEvidenceRecorder,
  FiscalProductionCommitteeGoNoGoMatrix,
  FiscalProductionCommitteeDeliberationTrail,
  FiscalProductionCommitteeDependencyMatrix,
  FiscalProductionCommitteeDeliberationBlockerRegister,
  FiscalProductionCommitteeDeliberationRiskRegister,
  FiscalProductionCommitteeDeliberationValidator,
  FiscalProductionCommitteeDeliberationEvaluationService,
  FiscalProductionCommitteeDeliberationDecisionService,
  FiscalProductionCommitteeDeliberationReportService,
  FiscalProductionCommitteeDeliberationAuditService
} from '../dedicated-homologation/production-execution-boundary/committee-deliberation-dry-run';

export class FiscalProductionCommitteeDeliberationController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionCommitteeDeliberationPolicy.getBaseResult();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getCommitteeCharter(req: Request, res: Response) {
    const result = FiscalProductionCommitteeCharter.generateCharter();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_COMMITTEE_CHARTER', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getQuorumMatrix(req: Request, res: Response) {
    const result = FiscalProductionCommitteeQuorumMatrix.generateMatrix();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_QUORUM_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getVoteSimulation(req: Request, res: Response) {
    const result = FiscalProductionCommitteeVoteSimulation.simulateVotes();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_VOTE_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPolicyReview(req: Request, res: Response) {
    const result = FiscalProductionCommitteePolicyReview.generateReview();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_POLICY_REVIEW', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPolicyEvidence(req: Request, res: Response) {
    const result = FiscalProductionPolicyEvidenceRecorder.recordEvidence();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_POLICY_EVIDENCE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getGoNoGoMatrix(req: Request, res: Response) {
    const result = FiscalProductionCommitteeGoNoGoMatrix.generateMatrix();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_GO_NO_GO_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDeliberationTrail(req: Request, res: Response) {
    const result = FiscalProductionCommitteeDeliberationTrail.generateTrail();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_DELIBERATION_TRAIL', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionCommitteeDependencyMatrix.generateMatrix();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionCommitteeDeliberationBlockerRegister.getBlockers();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionCommitteeDeliberationRiskRegister.getRisks();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionCommitteeDeliberationValidator.validate(input);
    FiscalProductionCommitteeDeliberationAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionCommitteeDeliberationEvaluationService.evaluate(input);
    FiscalProductionCommitteeDeliberationAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionCommitteeDeliberationDecisionService.simulateDecision(input);
    FiscalProductionCommitteeDeliberationAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionCommitteeDeliberationReportService.getReport();
    FiscalProductionCommitteeDeliberationAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionCommitteeDeliberationAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', committeeDeliberationDryRunOnly: true });
  }
}
