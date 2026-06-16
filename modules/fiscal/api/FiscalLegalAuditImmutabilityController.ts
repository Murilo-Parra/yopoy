import { Request, Response } from 'express';
import {
  FiscalLegalAuditImmutabilityPolicy,
  FiscalLegalAuditHashChainPlan,
  FiscalLegalAuditMockHashProvider,
  FiscalLegalAuditEvidenceDigestBuilder,
  FiscalLegalAuditMockEvidenceSignatureEnvelope,
  FiscalLegalAuditMockIntegrityVerifier,
  FiscalLegalAuditImmutabilityEvidencePackage,
  FiscalLegalAuditImmutabilityValidator,
  FiscalLegalAuditImmutabilityBlockerRegister,
  FiscalLegalAuditImmutabilityRiskRegister,
  FiscalLegalAuditImmutabilityEvaluationService,
  FiscalLegalAuditImmutabilityDecisionService,
  FiscalLegalAuditImmutabilityReportService,
  FiscalLegalAuditImmutabilityAuditService
} from '../dedicated-homologation/legal-audit-trail/immutability-simulation';

export class FiscalLegalAuditImmutabilityController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalLegalAuditImmutabilityPolicy.getBaseResult();
    FiscalLegalAuditImmutabilityAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getHashChainPlan(req: Request, res: Response) {
    const plan = FiscalLegalAuditHashChainPlan.generatePlan();
    FiscalLegalAuditImmutabilityAuditService.audit('GET_HASH_CHAIN_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getMockHashProvider(req: Request, res: Response) {
    const plan = FiscalLegalAuditMockHashProvider.generateMockHash();
    FiscalLegalAuditImmutabilityAuditService.audit('GET_MOCK_HASH_PROVIDER', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getEvidenceDigest(req: Request, res: Response) {
    const plan = FiscalLegalAuditEvidenceDigestBuilder.buildDigest();
    FiscalLegalAuditImmutabilityAuditService.audit('GET_EVIDENCE_DIGEST', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getMockSignatureEnvelope(req: Request, res: Response) {
    const plan = FiscalLegalAuditMockEvidenceSignatureEnvelope.generateEnvelope();
    FiscalLegalAuditImmutabilityAuditService.audit('GET_MOCK_SIGNATURE_ENVELOPE', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getIntegrityVerifier(req: Request, res: Response) {
    const plan = FiscalLegalAuditMockIntegrityVerifier.verify();
    FiscalLegalAuditImmutabilityAuditService.audit('GET_INTEGRITY_VERIFIER', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getEvidencePackage(req: Request, res: Response) {
    const payload = FiscalLegalAuditImmutabilityEvidencePackage.generatePackage();
    FiscalLegalAuditImmutabilityAuditService.audit('GET_EVIDENCE_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(payload);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalLegalAuditImmutabilityBlockerRegister.getBlockers();
    FiscalLegalAuditImmutabilityAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalLegalAuditImmutabilityRiskRegister.getRisks();
    FiscalLegalAuditImmutabilityAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalLegalAuditImmutabilityValidator.validate(input);
    FiscalLegalAuditImmutabilityAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalLegalAuditImmutabilityEvaluationService.evaluate(input);
    FiscalLegalAuditImmutabilityAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalLegalAuditImmutabilityDecisionService.simulateDecision(input);
    FiscalLegalAuditImmutabilityAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalLegalAuditImmutabilityReportService.getReport();
    FiscalLegalAuditImmutabilityAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalLegalAuditImmutabilityAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', legalAuditImmutabilitySimulationOnly: true, mockEvidenceSignatureOnly: true });
  }
}
