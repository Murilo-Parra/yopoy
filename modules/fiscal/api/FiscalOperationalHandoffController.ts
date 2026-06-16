import { Request, Response } from 'express';
import {
  FiscalOperationalHandoffPolicy,
  FiscalOperationalRunbookBlueprint,
  FiscalOperationalResponsibilityMatrix,
  FiscalOperationalSupportEscalationPlan,
  FiscalOperationalIncidentResponsePlan,
  FiscalOperationalObservabilityReadiness,
  FiscalOperationalChangeFreezePlan,
  FiscalOperationalCommunicationMatrix,
  FiscalOperationalHandoffBlockerRegister,
  FiscalOperationalHandoffRiskRegister,
  FiscalOperationalHandoffValidator,
  FiscalOperationalHandoffEvaluationService,
  FiscalOperationalHandoffDecisionService,
  FiscalOperationalHandoffReportService,
  FiscalOperationalHandoffAuditService
} from '../dedicated-homologation/operational-handoff';

export class FiscalOperationalHandoffController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalOperationalHandoffPolicy.getBaseResult();
    FiscalOperationalHandoffAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getRunbookBlueprint(req: Request, res: Response) {
    const result = FiscalOperationalRunbookBlueprint.generateBlueprint();
    FiscalOperationalHandoffAuditService.audit('GET_RUNBOOK_BLUEPRINT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getResponsibilityMatrix(req: Request, res: Response) {
    const result = FiscalOperationalResponsibilityMatrix.generateMatrix();
    FiscalOperationalHandoffAuditService.audit('GET_RESPONSIBILITY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSupportEscalation(req: Request, res: Response) {
    const result = FiscalOperationalSupportEscalationPlan.generatePlan();
    FiscalOperationalHandoffAuditService.audit('GET_SUPPORT_ESCALATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getIncidentResponse(req: Request, res: Response) {
    const result = FiscalOperationalIncidentResponsePlan.generatePlan();
    FiscalOperationalHandoffAuditService.audit('GET_INCIDENT_RESPONSE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getObservabilityReadiness(req: Request, res: Response) {
    const result = FiscalOperationalObservabilityReadiness.generateReadiness();
    FiscalOperationalHandoffAuditService.audit('GET_OBSERVABILITY_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getChangeFreeze(req: Request, res: Response) {
    const result = FiscalOperationalChangeFreezePlan.generatePlan();
    FiscalOperationalHandoffAuditService.audit('GET_CHANGE_FREEZE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCommunicationMatrix(req: Request, res: Response) {
    const result = FiscalOperationalCommunicationMatrix.generateMatrix();
    FiscalOperationalHandoffAuditService.audit('GET_COMMUNICATION_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalOperationalHandoffBlockerRegister.getBlockers();
    FiscalOperationalHandoffAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalOperationalHandoffRiskRegister.getRisks();
    FiscalOperationalHandoffAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalOperationalHandoffValidator.validate(input);
    FiscalOperationalHandoffAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalOperationalHandoffEvaluationService.evaluate(input);
    FiscalOperationalHandoffAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalOperationalHandoffDecisionService.simulateDecision(input);
    FiscalOperationalHandoffAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalOperationalHandoffReportService.getReport();
    FiscalOperationalHandoffAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalOperationalHandoffAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', operationalHandoffBlueprintOnly: true, runbookReadinessContractOnly: true });
  }
}
