import { Request, Response } from 'express';
import {
  FiscalLegalSignatureDryRunPolicy,
  FiscalLegalSignerEligibilityMatrix,
  FiscalLegalSignatureIntentEnvelope,
  FiscalLegalMockSignatureWorkflow,
  FiscalLegalSignerQuorumSimulation,
  FiscalLegalSignOffSoDReview,
  FiscalLegalSignatureEvidenceReview,
  FiscalLegalSignatureDryRunBlockerRegister,
  FiscalLegalSignatureDryRunRiskRegister,
  FiscalLegalSignatureDryRunValidator,
  FiscalLegalSignatureDryRunEvaluationService,
  FiscalLegalSignatureDryRunDecisionService,
  FiscalLegalSignatureDryRunReportService,
  FiscalLegalSignatureDryRunAuditService
} from '../dedicated-homologation/legal-signoff/signature-dry-run';

export class FiscalLegalSignatureDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalLegalSignatureDryRunPolicy.getBaseResult();
    FiscalLegalSignatureDryRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getSignerEligibility(req: Request, res: Response) {
    const result = FiscalLegalSignerEligibilityMatrix.generateMatrix();
    FiscalLegalSignatureDryRunAuditService.audit('GET_SIGNER_ELIGIBILITY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSignatureIntentEnvelope(req: Request, res: Response) {
    const result = FiscalLegalSignatureIntentEnvelope.generateEnvelope();
    FiscalLegalSignatureDryRunAuditService.audit('GET_SIGNATURE_INTENT_ENVELOPE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getMockSignatureWorkflow(req: Request, res: Response) {
    const result = FiscalLegalMockSignatureWorkflow.simulateWorkflow();
    FiscalLegalSignatureDryRunAuditService.audit('GET_MOCK_SIGNATURE_WORKFLOW', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getQuorumSimulation(req: Request, res: Response) {
    const result = FiscalLegalSignerQuorumSimulation.simulateQuorum();
    FiscalLegalSignatureDryRunAuditService.audit('GET_QUORUM_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSodReview(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalLegalSignOffSoDReview.simulateReview(input);
    FiscalLegalSignatureDryRunAuditService.audit('GET_SOD_REVIEW', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEvidenceReview(req: Request, res: Response) {
    const result = FiscalLegalSignatureEvidenceReview.simulateReview();
    FiscalLegalSignatureDryRunAuditService.audit('GET_EVIDENCE_REVIEW', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalLegalSignatureDryRunBlockerRegister.getBlockers();
    FiscalLegalSignatureDryRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalLegalSignatureDryRunRiskRegister.getRisks();
    FiscalLegalSignatureDryRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalLegalSignatureDryRunValidator.validate(input);
    FiscalLegalSignatureDryRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalLegalSignatureDryRunEvaluationService.evaluate(input);
    FiscalLegalSignatureDryRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalLegalSignatureDryRunDecisionService.simulateDecision(input);
    FiscalLegalSignatureDryRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalLegalSignatureDryRunReportService.getReport();
    FiscalLegalSignatureDryRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalLegalSignatureDryRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', legalSignoffSimulationGateOnly: true, mockSignatureWorkflowOnly: true });
  }
}
