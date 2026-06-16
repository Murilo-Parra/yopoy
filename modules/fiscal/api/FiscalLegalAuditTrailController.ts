import { Request, Response } from 'express';
import {
  FiscalLegalAuditTrailLedgerBlueprint,
  FiscalLegalAuditTrailPersistenceIsolationContract,
  FiscalLegalAuditTrailImmutabilityContract,
  FiscalLegalAuditTrailRetentionPolicy,
  FiscalLegalAuditTrailAccessControlMatrix,
  FiscalLegalAuditTrailEvidenceModel,
  FiscalLegalAuditTrailPolicy,
  FiscalLegalAuditTrailValidator,
  FiscalLegalAuditTrailBlockerRegister,
  FiscalLegalAuditTrailRiskRegister,
  FiscalLegalAuditTrailEvaluationService,
  FiscalLegalAuditTrailDecisionService,
  FiscalLegalAuditTrailReportService,
  FiscalLegalAuditTrailAuditService
} from '../dedicated-homologation/legal-audit-trail';

export class FiscalLegalAuditTrailController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalLegalAuditTrailPolicy.getBaseResult();
    FiscalLegalAuditTrailAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getLedgerBlueprint(req: Request, res: Response) {
    const bp = FiscalLegalAuditTrailLedgerBlueprint.generateBlueprint();
    FiscalLegalAuditTrailAuditService.audit('GET_LEDGER_BLUEPRINT', { caller: (req as any).user?.id || 'admin' });
    res.json(bp);
  }

  public static getPersistenceIsolationContract(req: Request, res: Response) {
    const pic = FiscalLegalAuditTrailPersistenceIsolationContract.generateContract();
    FiscalLegalAuditTrailAuditService.audit('GET_PERSISTENCE_ISOLATION_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(pic);
  }

  public static getImmutabilityContract(req: Request, res: Response) {
    const imm = FiscalLegalAuditTrailImmutabilityContract.generateContract();
    FiscalLegalAuditTrailAuditService.audit('GET_IMMUTABILITY_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(imm);
  }

  public static getRetentionPolicy(req: Request, res: Response) {
    const ret = FiscalLegalAuditTrailRetentionPolicy.generatePolicy();
    FiscalLegalAuditTrailAuditService.audit('GET_RETENTION_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(ret);
  }

  public static getAccessControlMatrix(req: Request, res: Response) {
    const acm = FiscalLegalAuditTrailAccessControlMatrix.generateMatrix();
    FiscalLegalAuditTrailAuditService.audit('GET_ACCESS_CONTROL_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(acm);
  }

  public static getEvidenceModel(req: Request, res: Response) {
    const evm = FiscalLegalAuditTrailEvidenceModel.generateModel();
    FiscalLegalAuditTrailAuditService.audit('GET_EVIDENCE_MODEL', { caller: (req as any).user?.id || 'admin' });
    res.json(evm);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalLegalAuditTrailBlockerRegister.getBlockers();
    FiscalLegalAuditTrailAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalLegalAuditTrailRiskRegister.getRisks();
    FiscalLegalAuditTrailAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalLegalAuditTrailValidator.validate(input);
    FiscalLegalAuditTrailAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalLegalAuditTrailEvaluationService.evaluate(input);
    FiscalLegalAuditTrailAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalLegalAuditTrailDecisionService.simulateDecision(input);
    FiscalLegalAuditTrailAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalLegalAuditTrailReportService.getReport();
    FiscalLegalAuditTrailAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalLegalAuditTrailAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', legalAuditLedgerBlueprintOnly: true, persistenceIsolationContractOnly: true });
  }
}
