import { Request, Response } from 'express';
import {
  FiscalLegalSignOffPolicy,
  FiscalLegalSignOffCharter,
  FiscalLegalSignerResponsibilityMatrix,
  FiscalLegalNonExecutableSignatureEnvelope,
  FiscalLegalEvidenceDependencyMatrix,
  FiscalLegalSignOffReadinessChecklist,
  FiscalLegalSignOffBlockerRegister,
  FiscalLegalSignOffRiskRegister,
  FiscalLegalSignOffValidator,
  FiscalLegalSignOffEvaluationService,
  FiscalLegalSignOffDecisionService,
  FiscalLegalSignOffReportService,
  FiscalLegalSignOffAuditService
} from '../dedicated-homologation/legal-signoff';

export class FiscalLegalSignOffController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalLegalSignOffPolicy.getBaseResult();
    FiscalLegalSignOffAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getCharter(req: Request, res: Response) {
    const result = FiscalLegalSignOffCharter.generateCharter();
    FiscalLegalSignOffAuditService.audit('GET_CHARTER', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSignerResponsibilityMatrix(req: Request, res: Response) {
    const result = FiscalLegalSignerResponsibilityMatrix.generateMatrix();
    FiscalLegalSignOffAuditService.audit('GET_SIGNER_RESPONSIBILITY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSignatureEnvelope(req: Request, res: Response) {
    const result = FiscalLegalNonExecutableSignatureEnvelope.generateEnvelope();
    FiscalLegalSignOffAuditService.audit('GET_SIGNATURE_ENVELOPE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEvidenceDependencies(req: Request, res: Response) {
    const result = FiscalLegalEvidenceDependencyMatrix.generateMatrix();
    FiscalLegalSignOffAuditService.audit('GET_EVIDENCE_DEPENDENCIES', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReadinessChecklist(req: Request, res: Response) {
    const result = FiscalLegalSignOffReadinessChecklist.generateChecklist();
    FiscalLegalSignOffAuditService.audit('GET_READINESS_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalLegalSignOffBlockerRegister.getBlockers();
    FiscalLegalSignOffAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalLegalSignOffRiskRegister.getRisks();
    FiscalLegalSignOffAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalLegalSignOffValidator.validate(input);
    FiscalLegalSignOffAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalLegalSignOffEvaluationService.evaluate(input);
    FiscalLegalSignOffAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalLegalSignOffDecisionService.simulateDecision(input);
    FiscalLegalSignOffAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalLegalSignOffReportService.getReport();
    FiscalLegalSignOffAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalLegalSignOffAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', legalSignoffBlueprintOnly: true, nonExecutableSignatureContractOnly: true });
  }
}
