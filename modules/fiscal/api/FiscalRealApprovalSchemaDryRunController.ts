import { Request, Response } from 'express';
import { FiscalRealApprovalSchemaPolicy } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaPolicy';
import { FiscalRealApprovalSchemaMigrationPlan } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaMigrationPlan';
import { FiscalRealApprovalControlledDdlSimulator } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalControlledDdlSimulator';
import { FiscalRealApprovalSchemaDiffService } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaDiffService';
import { FiscalRealApprovalSchemaRlsPlan } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaRlsPlan';
import { FiscalRealApprovalSchemaIndexPlan } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaIndexPlan';
import { FiscalRealApprovalSchemaBlockerRegister } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaBlockerRegister';
import { FiscalRealApprovalSchemaRiskRegister } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaRiskRegister';
import { FiscalRealApprovalSchemaValidator } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaValidator';
import { FiscalRealApprovalSchemaEvaluationService } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaEvaluationService';
import { FiscalRealApprovalSchemaDecisionService } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaDecisionService';
import { FiscalRealApprovalSchemaReportService } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaReportService';
import { FiscalRealApprovalSchemaAuditService } from '../dedicated-homologation/real-approval-records/schema-dry-run/FiscalRealApprovalSchemaAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealApprovalSchemaDryRunController {
  public static async getPolicy(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_POLICY' });
        res.json(FiscalRealApprovalSchemaPolicy.getBaseResult());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getMigrationPlan(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_MIGRATION_PLAN' });
        res.json(FiscalRealApprovalSchemaMigrationPlan.generatePlan());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getDdlSimulation(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DDL_SIMULATION' });
        res.json(FiscalRealApprovalControlledDdlSimulator.simulateDdl());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSchemaDiff(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SCHEMA_DIFF' });
        res.json(FiscalRealApprovalSchemaDiffService.generateDiff());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRlsPlan(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RLS_PLAN' });
        res.json(FiscalRealApprovalSchemaRlsPlan.generatePlan());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getIndexPlan(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_INDEX_PLAN' });
        res.json(FiscalRealApprovalSchemaIndexPlan.generatePlan());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalRealApprovalSchemaBlockerRegister.getBlockers(), readOnly: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });
        res.json({ risks: FiscalRealApprovalSchemaRiskRegister.getRisks(), readOnly: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validate(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_VALIDATE' });
        res.json(FiscalRealApprovalSchemaValidator.validate(req.body));
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE' });
        res.json(FiscalRealApprovalSchemaEvaluationService.evaluate(req.body));
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDecision(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_DECISION' });
        res.json(FiscalRealApprovalSchemaDecisionService.simulateDecision(req.body));
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalRealApprovalSchemaReportService.getReport());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalSchemaAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalRealApprovalSchemaAuditService.getLogs(), readOnly: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json(FiscalRealApprovalSchemaPolicy.getBaseResult());
  }
}
