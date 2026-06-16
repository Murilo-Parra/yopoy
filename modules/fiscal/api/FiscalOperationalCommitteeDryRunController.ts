import { Request, Response } from 'express';
import {
  FiscalOperationalCommitteeDryRunPolicy,
  FiscalOperationalArchitectureCommitteeCharter,
  FiscalOperationalRiskCommitteeApprovalMatrix,
  FiscalOperationalCommitteeQuorumSimulation,
  FiscalOperationalRiskAcceptanceSimulation,
  FiscalOperationalExceptionWaiverSimulation,
  FiscalOperationalEvidenceReviewMatrix,
  FiscalOperationalCommitteeFinalRecommendation,
  FiscalOperationalCommitteeDryRunBlockerRegister,
  FiscalOperationalCommitteeDryRunRiskRegister,
  FiscalOperationalCommitteeDryRunValidator,
  FiscalOperationalCommitteeDryRunEvaluationService,
  FiscalOperationalCommitteeDryRunDecisionService,
  FiscalOperationalCommitteeDryRunReportService,
  FiscalOperationalCommitteeDryRunAuditService
} from '../dedicated-homologation/operational-handoff/committee-dry-run';

export class FiscalOperationalCommitteeDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalOperationalCommitteeDryRunPolicy.getBaseResult();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getArchitectureCharter(req: Request, res: Response) {
    const result = FiscalOperationalArchitectureCommitteeCharter.generateCharter();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_ARCHITECTURE_CHARTER', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getApprovalMatrix(req: Request, res: Response) {
    const result = FiscalOperationalRiskCommitteeApprovalMatrix.generateMatrix();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_APPROVAL_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getQuorumSimulation(req: Request, res: Response) {
    const result = FiscalOperationalCommitteeQuorumSimulation.generateSimulation();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_QUORUM_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRiskAcceptanceSimulation(req: Request, res: Response) {
    const result = FiscalOperationalRiskAcceptanceSimulation.generateSimulation();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_RISK_ACCEPTANCE_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getExceptionWaiverSimulation(req: Request, res: Response) {
    const result = FiscalOperationalExceptionWaiverSimulation.generateSimulation();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_EXCEPTION_WAIVER_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEvidenceReviewMatrix(req: Request, res: Response) {
    const result = FiscalOperationalEvidenceReviewMatrix.generateMatrix();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_EVIDENCE_REVIEW_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalRecommendation(req: Request, res: Response) {
    const result = FiscalOperationalCommitteeFinalRecommendation.generateRecommendation();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_FINAL_RECOMMENDATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalOperationalCommitteeDryRunBlockerRegister.getBlockers();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalOperationalCommitteeDryRunRiskRegister.getRisks();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalOperationalCommitteeDryRunValidator.validate(input);
    FiscalOperationalCommitteeDryRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalOperationalCommitteeDryRunEvaluationService.evaluate(input);
    FiscalOperationalCommitteeDryRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalOperationalCommitteeDryRunDecisionService.simulateDecision(input);
    FiscalOperationalCommitteeDryRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalOperationalCommitteeDryRunReportService.getReport();
    FiscalOperationalCommitteeDryRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalOperationalCommitteeDryRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', architectureRiskCommitteeDryRunOnly: true, committeeApprovalSimulationOnly: true });
  }
}
