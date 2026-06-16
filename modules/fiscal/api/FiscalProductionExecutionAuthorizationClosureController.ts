import { Request, Response } from 'express';
import {
  FiscalProductionExecutionAuthorizationClosurePolicy,
  FiscalProductionExecutionAuthorizationClosureInventory,
  FiscalProductionExecutionAuthorizationFinalChecklist,
  FiscalProductionExecutionAuthorizationEvidencePackageService,
  FiscalProductionExecutionNoExecutionHandoffService,
  FiscalProductionExecutionPostClosureRoadmap,
  FiscalProductionExecutionAuthorizationFinalBlockerRegister,
  FiscalProductionExecutionAuthorizationFinalRiskRegister,
  FiscalProductionExecutionAuthorizationClosureValidator,
  FiscalProductionExecutionAuthorizationClosureEvaluationService,
  FiscalProductionExecutionAuthorizationClosureDecisionService,
  FiscalProductionExecutionAuthorizationClosureReportService,
  FiscalProductionExecutionAuthorizationClosureAuditService
} from '../dedicated-homologation/production-execution-boundary/closure';

export class FiscalProductionExecutionAuthorizationClosureController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionExecutionAuthorizationClosurePolicy.getBaseResult();
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getClosureInventory(req: Request, res: Response) {
    const result = FiscalProductionExecutionAuthorizationClosureInventory.generateInventory();
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('GET_CLOSURE_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalChecklist(req: Request, res: Response) {
    const result = FiscalProductionExecutionAuthorizationFinalChecklist.generateChecklist();
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('GET_FINAL_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEvidencePackage(req: Request, res: Response) {
    const result = FiscalProductionExecutionAuthorizationEvidencePackageService.generatePackage();
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('GET_EVIDENCE_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoExecutionHandoff(req: Request, res: Response) {
    const result = FiscalProductionExecutionNoExecutionHandoffService.generateHandoff();
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('GET_NO_EXECUTION_HANDOFF', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    const result = FiscalProductionExecutionPostClosureRoadmap.generateRoadmap();
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('GET_POST_CLOSURE_ROADMAP', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionExecutionAuthorizationFinalBlockerRegister.getBlockers();
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('GET_FINAL_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getFinalRisks(req: Request, res: Response) {
    const risks = FiscalProductionExecutionAuthorizationFinalRiskRegister.getRisks();
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('GET_FINAL_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionExecutionAuthorizationClosureValidator.validate(input);
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionExecutionAuthorizationClosureEvaluationService.evaluate(input);
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionExecutionAuthorizationClosureDecisionService.simulateDecision(input);
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionExecutionAuthorizationClosureReportService.getReport();
    FiscalProductionExecutionAuthorizationClosureAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionExecutionAuthorizationClosureAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionExecutionAuthorizationClosureOnly: true });
  }
}
