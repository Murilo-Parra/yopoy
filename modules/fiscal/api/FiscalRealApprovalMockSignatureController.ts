import { Request, Response } from 'express';
import {
  FiscalRealApprovalMockSignatureEnvelope,
  FiscalRealApprovalMockCertificateProvider,
  FiscalRealApprovalMockSigner,
  FiscalRealApprovalExternalAuthorizationSimulator,
  FiscalRealApprovalSignaturePolicy,
  FiscalRealApprovalSignatureValidator,
  FiscalRealApprovalSignatureBlockerRegister,
  FiscalRealApprovalSignatureRiskRegister,
  FiscalRealApprovalSignatureEvaluationService,
  FiscalRealApprovalSignatureDecisionService,
  FiscalRealApprovalSignatureReportService,
  FiscalRealApprovalSignatureAuditService
} from '../dedicated-homologation/real-approval-records/mock-signature';

export class FiscalRealApprovalMockSignatureController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalRealApprovalSignaturePolicy.getBaseResult();
    FiscalRealApprovalSignatureAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getEnvelope(req: Request, res: Response) {
    const envelope = FiscalRealApprovalMockSignatureEnvelope.generateEnvelope();
    FiscalRealApprovalSignatureAuditService.audit('GET_ENVELOPE', { caller: (req as any).user?.id || 'admin' });
    res.json(envelope);
  }

  public static getMockCertificate(req: Request, res: Response) {
    const cert = FiscalRealApprovalMockCertificateProvider.getMockCertificate();
    FiscalRealApprovalSignatureAuditService.audit('GET_MOCK_CERT', { caller: (req as any).user?.id || 'admin' });
    res.json(cert);
  }

  public static getMockSigner(req: Request, res: Response) {
    const signer = FiscalRealApprovalMockSigner.simulateSignature();
    FiscalRealApprovalSignatureAuditService.audit('GET_MOCK_SIGNER', { caller: (req as any).user?.id || 'admin' });
    res.json(signer);
  }

  public static getExternalAuthorizationSimulator(req: Request, res: Response) {
    const sim = FiscalRealApprovalExternalAuthorizationSimulator.simulateAuthorization();
    FiscalRealApprovalSignatureAuditService.audit('GET_EXT_AUTH_SIM', { caller: (req as any).user?.id || 'admin' });
    res.json(sim);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalRealApprovalSignatureBlockerRegister.getBlockers();
    FiscalRealApprovalSignatureAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalRealApprovalSignatureRiskRegister.getRisks();
    FiscalRealApprovalSignatureAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalRealApprovalSignatureValidator.validate(input);
    FiscalRealApprovalSignatureAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalRealApprovalSignatureEvaluationService.evaluate(input);
    FiscalRealApprovalSignatureAuditService.audit('EVALUATE_MOCK_SIGNATURE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalRealApprovalSignatureDecisionService.simulateDecision(input);
    FiscalRealApprovalSignatureAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalRealApprovalSignatureReportService.getReport();
    FiscalRealApprovalSignatureAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalRealApprovalSignatureAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', mockSignatureOnly: true, externalAuthorizationSimulationOnly: true });
  }
}
