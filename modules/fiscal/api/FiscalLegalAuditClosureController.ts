import { Request, Response } from 'express';
import {
  FiscalLegalAuditClosurePolicy,
  FiscalLegalAuditClosureInventory,
  FiscalLegalAuditFinalChecklist,
  FiscalLegalAuditClosureEvidencePackageService,
  FiscalLegalAuditAuditorHandoffService,
  FiscalLegalAuditRetentionHandoffPlan,
  FiscalLegalAuditFinalBlockerRegister,
  FiscalLegalAuditFinalRiskRegister,
  FiscalLegalAuditClosureValidator,
  FiscalLegalAuditClosureEvaluationService,
  FiscalLegalAuditClosureDecisionService,
  FiscalLegalAuditClosureReportService,
  FiscalLegalAuditClosureAuditService
} from '../dedicated-homologation/legal-audit-trail/closure';

export class FiscalLegalAuditClosureController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalLegalAuditClosurePolicy.getBaseResult();
    FiscalLegalAuditClosureAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getInventory(req: Request, res: Response) {
    const plan = FiscalLegalAuditClosureInventory.generateInventory();
    FiscalLegalAuditClosureAuditService.audit('GET_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getFinalChecklist(req: Request, res: Response) {
    const plan = FiscalLegalAuditFinalChecklist.generateChecklist();
    FiscalLegalAuditClosureAuditService.audit('GET_FINAL_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getEvidencePackage(req: Request, res: Response) {
    const plan = FiscalLegalAuditClosureEvidencePackageService.generatePackage();
    FiscalLegalAuditClosureAuditService.audit('GET_EVIDENCE_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getAuditorHandoff(req: Request, res: Response) {
    const plan = FiscalLegalAuditAuditorHandoffService.generateHandoff();
    FiscalLegalAuditClosureAuditService.audit('GET_AUDITOR_HANDOFF', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getRetentionHandoff(req: Request, res: Response) {
    const plan = FiscalLegalAuditRetentionHandoffPlan.generatePlan();
    FiscalLegalAuditClosureAuditService.audit('GET_RETENTION_HANDOFF', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalLegalAuditFinalBlockerRegister.getBlockers();
    FiscalLegalAuditClosureAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalLegalAuditFinalRiskRegister.getRisks();
    FiscalLegalAuditClosureAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalLegalAuditClosureValidator.validate(input);
    FiscalLegalAuditClosureAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalLegalAuditClosureEvaluationService.evaluate(input);
    FiscalLegalAuditClosureAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalLegalAuditClosureDecisionService.simulateDecision(input);
    FiscalLegalAuditClosureAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalLegalAuditClosureReportService.getReport();
    FiscalLegalAuditClosureAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalLegalAuditClosureAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', legalAuditGovernanceClosureOnly: true, auditorHandoffEvidenceOnly: true });
  }
}
