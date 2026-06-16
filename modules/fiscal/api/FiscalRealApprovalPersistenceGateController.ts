import { Request, Response } from 'express';
import { FiscalRealApprovalPersistenceGatePolicy } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalPersistenceGatePolicy';
import { FiscalRealApprovalPersistenceSchemaContract } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalPersistenceSchemaContract';
import { FiscalRealApprovalLegalAuditTrailContract } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalLegalAuditTrailContract';
import { FiscalRealApprovalPersistenceReadinessChecklist } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalPersistenceReadinessChecklist';
import { FiscalRealApprovalPersistenceBlockerRegister } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalPersistenceBlockerRegister';
import { FiscalRealApprovalPersistenceRiskRegister } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalPersistenceRiskRegister';
import { FiscalRealApprovalPersistenceValidator } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalPersistenceValidator';
import { FiscalRealApprovalPersistenceEvaluationService } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalPersistenceEvaluationService';
import { FiscalRealApprovalPersistenceDecisionService } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalPersistenceDecisionService';
import { FiscalRealApprovalPersistenceReportService } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalPersistenceReportService';
import { FiscalRealApprovalPersistenceAuditService } from '../dedicated-homologation/real-approval-records/persistence-gate/FiscalRealApprovalPersistenceAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealApprovalPersistenceGateController {
  public static async getPolicy(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_POLICY' });
        res.json(FiscalRealApprovalPersistenceGatePolicy.getBaseResult());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSchemaContract(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SCHEMA_CONTRACT' });
        res.json(FiscalRealApprovalPersistenceSchemaContract.generateContract());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getLegalAuditTrailContract(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_LEGAL_AUDIT_TRAIL_CONTRACT' });
        res.json(FiscalRealApprovalLegalAuditTrailContract.generateContract());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReadinessChecklist(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_READINESS_CHECKLIST' });
        res.json(FiscalRealApprovalPersistenceReadinessChecklist.getChecklist());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalRealApprovalPersistenceBlockerRegister.getBlockers(), readOnly: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });
        res.json({ risks: FiscalRealApprovalPersistenceRiskRegister.getRisks(), readOnly: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validate(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_VALIDATE' });
        res.json(FiscalRealApprovalPersistenceValidator.validate(req.body));
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE' });
        res.json(FiscalRealApprovalPersistenceEvaluationService.evaluate(req.body));
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDecision(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_DECISION' });
        res.json(FiscalRealApprovalPersistenceDecisionService.simulateDecision(req.body));
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalRealApprovalPersistenceReportService.getReport());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalPersistenceAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalRealApprovalPersistenceAuditService.getLogs(), readOnly: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json(FiscalRealApprovalPersistenceGatePolicy.getBaseResult());
  }
}
