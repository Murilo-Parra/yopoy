import { Request, Response } from 'express';
import {
  FiscalLegalAuditSchemaPolicy,
  FiscalLegalAuditLedgerSchemaPlan,
  FiscalLegalAuditControlledDdlSimulator,
  FiscalLegalAuditRlsSimulationPlan,
  FiscalLegalAuditRetentionDdlPlan,
  FiscalLegalAuditIndexPlan,
  FiscalLegalAuditSchemaDiffService,
  FiscalLegalAuditSchemaValidator,
  FiscalLegalAuditSchemaBlockerRegister,
  FiscalLegalAuditSchemaRiskRegister,
  FiscalLegalAuditSchemaEvaluationService,
  FiscalLegalAuditSchemaDecisionService,
  FiscalLegalAuditSchemaReportService,
  FiscalLegalAuditSchemaAuditService
} from '../dedicated-homologation/legal-audit-trail/schema-dry-run';

export class FiscalLegalAuditSchemaDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalLegalAuditSchemaPolicy.getBaseResult();
    FiscalLegalAuditSchemaAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getLedgerSchemaPlan(req: Request, res: Response) {
    const plan = FiscalLegalAuditLedgerSchemaPlan.generatePlan();
    FiscalLegalAuditSchemaAuditService.audit('GET_LEDGER_SCHEMA_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getDdlSimulation(req: Request, res: Response) {
    const sim = FiscalLegalAuditControlledDdlSimulator.simulateDdl();
    FiscalLegalAuditSchemaAuditService.audit('GET_DDL_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(sim);
  }

  public static getRlsPlan(req: Request, res: Response) {
    const plan = FiscalLegalAuditRlsSimulationPlan.generatePlan();
    FiscalLegalAuditSchemaAuditService.audit('GET_RLS_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getRetentionDdlPlan(req: Request, res: Response) {
    const plan = FiscalLegalAuditRetentionDdlPlan.generatePlan();
    FiscalLegalAuditSchemaAuditService.audit('GET_RETENTION_DDL_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getIndexPlan(req: Request, res: Response) {
    const plan = FiscalLegalAuditIndexPlan.generatePlan();
    FiscalLegalAuditSchemaAuditService.audit('GET_INDEX_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(plan);
  }

  public static getSchemaDiff(req: Request, res: Response) {
    const diff = FiscalLegalAuditSchemaDiffService.generateDiff();
    FiscalLegalAuditSchemaAuditService.audit('GET_SCHEMA_DIFF', { caller: (req as any).user?.id || 'admin' });
    res.json(diff);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalLegalAuditSchemaBlockerRegister.getBlockers();
    FiscalLegalAuditSchemaAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalLegalAuditSchemaRiskRegister.getRisks();
    FiscalLegalAuditSchemaAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalLegalAuditSchemaValidator.validate(input);
    FiscalLegalAuditSchemaAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalLegalAuditSchemaEvaluationService.evaluate(input);
    FiscalLegalAuditSchemaAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalLegalAuditSchemaDecisionService.simulateDecision(input);
    FiscalLegalAuditSchemaAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalLegalAuditSchemaReportService.getReport();
    FiscalLegalAuditSchemaAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalLegalAuditSchemaAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', legalAuditSchemaDryRunOnly: true, retentionRlsDdlSimulationOnly: true });
  }
}
