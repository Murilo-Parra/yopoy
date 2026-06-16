import { Request, Response } from 'express';
import {
  FiscalLegalAuditEventPolicy,
  FiscalLegalAuditEventModelPlan,
  FiscalLegalAuditControlledAppendSimulator,
  FiscalLegalAuditCorrectionEventSimulator,
  FiscalLegalAuditRetentionEventSimulator,
  FiscalLegalAuditEventLinkagePlan,
  FiscalLegalAuditLedgerMutationDiffService,
  FiscalLegalAuditEventValidator,
  FiscalLegalAuditEventBlockerRegister,
  FiscalLegalAuditEventRiskRegister,
  FiscalLegalAuditEventEvaluationService,
  FiscalLegalAuditEventDecisionService,
  FiscalLegalAuditEventReportService,
  FiscalLegalAuditEventAuditService
} from '../dedicated-homologation/legal-audit-trail/event-dry-run';

export class FiscalLegalAuditEventDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalLegalAuditEventPolicy.getBaseResult();
    FiscalLegalAuditEventAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getEventModelPlan(req: Request, res: Response) {
    const plan = FiscalLegalAuditEventModelPlan.generatePlan();
    FiscalLegalAuditEventAuditService.audit('GET_EVENT_MODEL_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getAppendSimulation(req: Request, res: Response) {
    const sim = FiscalLegalAuditControlledAppendSimulator.simulateAppend();
    FiscalLegalAuditEventAuditService.audit('GET_APPEND_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(sim);
  }

  public static getCorrectionSimulation(req: Request, res: Response) {
    const sim = FiscalLegalAuditCorrectionEventSimulator.simulateCorrection();
    FiscalLegalAuditEventAuditService.audit('GET_CORRECTION_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(sim);
  }

  public static getRetentionEventSimulation(req: Request, res: Response) {
    const sim = FiscalLegalAuditRetentionEventSimulator.simulateRetention();
    FiscalLegalAuditEventAuditService.audit('GET_RETENTION_EVENT_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(sim);
  }

  public static getLinkagePlan(req: Request, res: Response) {
    const plan = FiscalLegalAuditEventLinkagePlan.simulateLinkage();
    FiscalLegalAuditEventAuditService.audit('GET_LINKAGE_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getMutationDiff(req: Request, res: Response) {
    const diff = FiscalLegalAuditLedgerMutationDiffService.generateDiff();
    FiscalLegalAuditEventAuditService.audit('GET_MUTATION_DIFF', { caller: (req as any).user?.id || 'admin' });
    res.json(diff);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalLegalAuditEventBlockerRegister.getBlockers();
    FiscalLegalAuditEventAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalLegalAuditEventRiskRegister.getRisks();
    FiscalLegalAuditEventAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalLegalAuditEventValidator.validate(input);
    FiscalLegalAuditEventAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalLegalAuditEventEvaluationService.evaluate(input);
    FiscalLegalAuditEventAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalLegalAuditEventDecisionService.simulateDecision(input);
    FiscalLegalAuditEventAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalLegalAuditEventReportService.getReport();
    FiscalLegalAuditEventAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalLegalAuditEventAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', legalAuditEventDryRunOnly: true, controlledLedgerDmlSimulationOnly: true });
  }
}
