import { Request, Response } from 'express';
import {
  FiscalProductionRuntimeExecutionClosurePolicy,
  FiscalProductionRuntimeExecutionClosureInventory,
  FiscalProductionRuntimeExecutionFinalChecklist,
  FiscalProductionRuntimeExecutionEvidencePackageService,
  FiscalProductionRuntimeNoExecutionHandoffService,
  FiscalProductionRuntimePostClosureRoadmap,
  FiscalProductionRuntimeExecutionFinalBlockerRegister,
  FiscalProductionRuntimeExecutionFinalRiskRegister,
  FiscalProductionRuntimeExecutionClosureValidator,
  FiscalProductionRuntimeExecutionClosureEvaluationService,
  FiscalProductionRuntimeExecutionClosureDecisionService,
  FiscalProductionRuntimeExecutionClosureReportService,
  FiscalProductionRuntimeExecutionClosureAuditService
} from '../dedicated-homologation/production-execution-orchestration/closure';

export class FiscalProductionRuntimeExecutionClosureController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionRuntimeExecutionClosurePolicy.getBaseResult();
    FiscalProductionRuntimeExecutionClosureAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getClosureInventory(req: Request, res: Response) {
    const result = FiscalProductionRuntimeExecutionClosureInventory.getInventory();
    FiscalProductionRuntimeExecutionClosureAuditService.audit('GET_CLOSURE_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalChecklist(req: Request, res: Response) {
    const result = FiscalProductionRuntimeExecutionFinalChecklist.getChecklist();
    FiscalProductionRuntimeExecutionClosureAuditService.audit('GET_FINAL_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEvidencePackage(req: Request, res: Response) {
    const result = FiscalProductionRuntimeExecutionEvidencePackageService.generatePackage();
    FiscalProductionRuntimeExecutionClosureAuditService.audit('GET_EVIDENCE_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoExecutionHandoff(req: Request, res: Response) {
    const result = FiscalProductionRuntimeNoExecutionHandoffService.generateHandoff();
    FiscalProductionRuntimeExecutionClosureAuditService.audit('GET_NO_EXECUTION_HANDOFF', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    const result = FiscalProductionRuntimePostClosureRoadmap.getRoadmap();
    FiscalProductionRuntimeExecutionClosureAuditService.audit('GET_POST_CLOSURE_ROADMAP', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionRuntimeExecutionFinalBlockerRegister.getBlockers();
    FiscalProductionRuntimeExecutionClosureAuditService.audit('GET_FINAL_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getFinalRisks(req: Request, res: Response) {
    const risks = FiscalProductionRuntimeExecutionFinalRiskRegister.getRisks();
    FiscalProductionRuntimeExecutionClosureAuditService.audit('GET_FINAL_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionRuntimeExecutionClosureValidator.validate(input);
    FiscalProductionRuntimeExecutionClosureAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionRuntimeExecutionClosureEvaluationService.evaluate(input);
    FiscalProductionRuntimeExecutionClosureAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionRuntimeExecutionClosureDecisionService.simulateDecision(input);
    FiscalProductionRuntimeExecutionClosureAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionRuntimeExecutionClosureReportService.getReport();
    FiscalProductionRuntimeExecutionClosureAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionRuntimeExecutionClosureAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', runtimeExecutionGovernanceClosureOnly: true });
  }
}
