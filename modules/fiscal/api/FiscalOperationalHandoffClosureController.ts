import { Request, Response } from 'express';
import {
  FiscalOperationalHandoffClosurePolicy,
  FiscalOperationalHandoffClosureInventory,
  FiscalOperationalHandoffFinalChecklist,
  FiscalOperationalHandoffEvidencePackageService,
  FiscalOperationalLegalSignOffReadiness,
  FiscalOperationalFinalRunbookHandoffService,
  FiscalOperationalPostHandoffRoadmap,
  FiscalOperationalHandoffFinalBlockerRegister,
  FiscalOperationalHandoffFinalRiskRegister,
  FiscalOperationalHandoffClosureValidator,
  FiscalOperationalHandoffClosureEvaluationService,
  FiscalOperationalHandoffClosureDecisionService,
  FiscalOperationalHandoffClosureReportService,
  FiscalOperationalHandoffClosureAuditService
} from '../dedicated-homologation/operational-handoff/closure';

export class FiscalOperationalHandoffClosureController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalOperationalHandoffClosurePolicy.getBaseResult();
    FiscalOperationalHandoffClosureAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getInventory(req: Request, res: Response) {
    const result = FiscalOperationalHandoffClosureInventory.generateInventory();
    FiscalOperationalHandoffClosureAuditService.audit('GET_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalChecklist(req: Request, res: Response) {
    const result = FiscalOperationalHandoffFinalChecklist.generateChecklist();
    FiscalOperationalHandoffClosureAuditService.audit('GET_FINAL_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEvidencePackage(req: Request, res: Response) {
    const result = FiscalOperationalHandoffEvidencePackageService.generatePackage();
    FiscalOperationalHandoffClosureAuditService.audit('GET_EVIDENCE_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegalSignOffReadiness(req: Request, res: Response) {
    const result = FiscalOperationalLegalSignOffReadiness.generateReadiness();
    FiscalOperationalHandoffClosureAuditService.audit('GET_LEGAL_SIGNOFF_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalRunbookHandoff(req: Request, res: Response) {
    const result = FiscalOperationalFinalRunbookHandoffService.generateHandoff();
    FiscalOperationalHandoffClosureAuditService.audit('GET_FINAL_RUNBOOK_HANDOFF', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPostHandoffRoadmap(req: Request, res: Response) {
    const result = FiscalOperationalPostHandoffRoadmap.generateRoadmap();
    FiscalOperationalHandoffClosureAuditService.audit('GET_POST_HANDOFF_ROADMAP', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalOperationalHandoffFinalBlockerRegister.getBlockers();
    FiscalOperationalHandoffClosureAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalOperationalHandoffFinalRiskRegister.getRisks();
    FiscalOperationalHandoffClosureAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalOperationalHandoffClosureValidator.validate(input);
    FiscalOperationalHandoffClosureAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalOperationalHandoffClosureEvaluationService.evaluate(input);
    FiscalOperationalHandoffClosureAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalOperationalHandoffClosureDecisionService.simulateDecision(input);
    FiscalOperationalHandoffClosureAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalOperationalHandoffClosureReportService.getReport();
    FiscalOperationalHandoffClosureAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalOperationalHandoffClosureAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', operationalHandoffGovernanceClosureOnly: true, legalSignOffReadinessEvidenceOnly: true });
  }
}
