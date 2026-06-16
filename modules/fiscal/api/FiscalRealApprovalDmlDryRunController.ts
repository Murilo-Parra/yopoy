import { Request, Response } from 'express';
import { FiscalRealApprovalDmlPolicy } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalDmlPolicy';
import { FiscalRealApprovalSeedPlan } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalSeedPlan';
import { FiscalRealApprovalControlledInsertSimulator } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalControlledInsertSimulator';
import { FiscalRealApprovalControlledUpdateSimulator } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalControlledUpdateSimulator';
import { FiscalRealApprovalControlledDeleteSimulator } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalControlledDeleteSimulator';
import { FiscalRealApprovalCommitSimulationPlan } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalCommitSimulationPlan';
import { FiscalRealApprovalMutationDiffService } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalMutationDiffService';
import { FiscalRealApprovalDmlBlockerRegister } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalDmlBlockerRegister';
import { FiscalRealApprovalDmlRiskRegister } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalDmlRiskRegister';
import { FiscalRealApprovalDmlValidator } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalDmlValidator';
import { FiscalRealApprovalDmlEvaluationService } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalDmlEvaluationService';
import { FiscalRealApprovalDmlDecisionService } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalDmlDecisionService';
import { FiscalRealApprovalDmlReportService } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalDmlReportService';
import { FiscalRealApprovalDmlAuditService } from '../dedicated-homologation/real-approval-records/dml-dry-run/FiscalRealApprovalDmlAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealApprovalDmlDryRunController {
  public static async getPolicy(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_POLICY' });
        res.json(FiscalRealApprovalDmlPolicy.getBaseResult());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSeedPlan(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SEED_PLAN' });
        res.json(FiscalRealApprovalSeedPlan.generatePlan());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getInsertSimulation(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_INSERT_SIMULATION' });
        res.json(FiscalRealApprovalControlledInsertSimulator.simulateInsert());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getUpdateSimulation(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_UPDATE_SIMULATION' });
        res.json(FiscalRealApprovalControlledUpdateSimulator.simulateUpdate());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getDeleteSimulation(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DELETE_SIMULATION' });
        res.json(FiscalRealApprovalControlledDeleteSimulator.simulateDelete());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCommitPlan(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_COMMIT_PLAN' });
        res.json(FiscalRealApprovalCommitSimulationPlan.generatePlan());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getMutationDiff(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_MUTATION_DIFF' });
        res.json(FiscalRealApprovalMutationDiffService.generateDiff());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalRealApprovalDmlBlockerRegister.getBlockers(), readOnly: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });
        res.json({ risks: FiscalRealApprovalDmlRiskRegister.getRisks(), readOnly: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validate(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_VALIDATE' });
        res.json(FiscalRealApprovalDmlValidator.validate(req.body));
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE' });
        res.json(FiscalRealApprovalDmlEvaluationService.evaluate(req.body));
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDecision(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_DECISION' });
        res.json(FiscalRealApprovalDmlDecisionService.simulateDecision(req.body));
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalRealApprovalDmlReportService.getReport());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalDmlAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalRealApprovalDmlAuditService.getLogs(), readOnly: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json(FiscalRealApprovalDmlPolicy.getBaseResult());
  }
}
