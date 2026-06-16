import { Request, Response } from 'express';
import {
  FiscalProductionAuthorizationRequestPolicy,
  FiscalProductionAuthorizationRequestIntake,
  FiscalProductionAuthorizationRequestSanitizer,
  FiscalProductionStakeholderSubmissionEnvelope,
  FiscalProductionStakeholderResponsibilityMatrix,
  FiscalProductionStakeholderEligibilityChecklist,
  FiscalProductionSubmissionNoNotificationEvidence,
  FiscalProductionAuthorizationRequestDependencyMatrix,
  FiscalProductionAuthorizationRequestBlockerRegister,
  FiscalProductionAuthorizationRequestRiskRegister,
  FiscalProductionAuthorizationRequestValidator,
  FiscalProductionAuthorizationRequestEvaluationService,
  FiscalProductionAuthorizationRequestDecisionService,
  FiscalProductionAuthorizationRequestReportService,
  FiscalProductionAuthorizationRequestAuditService
} from '../dedicated-homologation/production-execution-boundary/authorization-request-dry-run';

export class FiscalProductionAuthorizationRequestController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionAuthorizationRequestPolicy.getBaseResult();
    FiscalProductionAuthorizationRequestAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getRequestIntake(req: Request, res: Response) {
    const result = FiscalProductionAuthorizationRequestIntake.generateIntake();
    FiscalProductionAuthorizationRequestAuditService.audit('GET_REQUEST_INTAKE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSanitizer(req: Request, res: Response) {
    const result = FiscalProductionAuthorizationRequestSanitizer.sanitize({});
    FiscalProductionAuthorizationRequestAuditService.audit('GET_SANITIZER', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSubmissionEnvelope(req: Request, res: Response) {
    const result = FiscalProductionStakeholderSubmissionEnvelope.generateEnvelope();
    FiscalProductionAuthorizationRequestAuditService.audit('GET_SUBMISSION_ENVELOPE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getStakeholderResponsibilityMatrix(req: Request, res: Response) {
    const result = FiscalProductionStakeholderResponsibilityMatrix.generateMatrix();
    FiscalProductionAuthorizationRequestAuditService.audit('GET_STAKEHOLDER_RESPONSIBILITY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getStakeholderEligibilityChecklist(req: Request, res: Response) {
    const result = FiscalProductionStakeholderEligibilityChecklist.generateChecklist();
    FiscalProductionAuthorizationRequestAuditService.audit('GET_STAKEHOLDER_ELIGIBILITY_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoNotificationEvidence(req: Request, res: Response) {
    const result = FiscalProductionSubmissionNoNotificationEvidence.generateEvidence();
    FiscalProductionAuthorizationRequestAuditService.audit('GET_NO_NOTIFICATION_EVIDENCE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionAuthorizationRequestDependencyMatrix.generateMatrix();
    FiscalProductionAuthorizationRequestAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionAuthorizationRequestBlockerRegister.getBlockers();
    FiscalProductionAuthorizationRequestAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionAuthorizationRequestRiskRegister.getRisks();
    FiscalProductionAuthorizationRequestAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionAuthorizationRequestValidator.validate(input);
    FiscalProductionAuthorizationRequestAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionAuthorizationRequestEvaluationService.evaluate(input);
    FiscalProductionAuthorizationRequestAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionAuthorizationRequestDecisionService.simulateDecision(input);
    FiscalProductionAuthorizationRequestAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionAuthorizationRequestReportService.getReport();
    FiscalProductionAuthorizationRequestAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionAuthorizationRequestAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', authorizationRequestIntakeOnly: true });
  }
}
