import { Request, Response } from 'express';
import {
  FiscalRealApprovalDualConclusionSimulator,
  FiscalRealApprovalDualSoDReview,
  FiscalRealApprovalGovernanceClosureInventory,
  FiscalRealApprovalGovernanceFinalChecklist,
  FiscalRealApprovalGovernanceEvidencePackageService,
  FiscalRealApprovalDualClosurePolicy,
  FiscalRealApprovalDualClosureValidator,
  FiscalRealApprovalDualClosureBlockerRegister,
  FiscalRealApprovalDualClosureRiskRegister,
  FiscalRealApprovalDualClosureEvaluationService,
  FiscalRealApprovalDualClosureDecisionService,
  FiscalRealApprovalDualClosureReportService,
  FiscalRealApprovalDualClosureAuditService
} from '../dedicated-homologation/real-approval-records/dual-approval-closure';

export class FiscalRealApprovalDualClosureController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalRealApprovalDualClosurePolicy.getBaseResult();
    FiscalRealApprovalDualClosureAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getConclusionSimulation(req: Request, res: Response) {
    const input = req.query || {};
    const sim = FiscalRealApprovalDualConclusionSimulator.simulateConclusion(input);
    FiscalRealApprovalDualClosureAuditService.audit('GET_CONCLUSION_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(sim);
  }

  public static getSodReview(req: Request, res: Response) {
    const input = req.query || {};
    const sod = FiscalRealApprovalDualSoDReview.review(input);
    FiscalRealApprovalDualClosureAuditService.audit('GET_SOD_REVIEW', { caller: (req as any).user?.id || 'admin' });
    res.json(sod);
  }

  public static getInventory(req: Request, res: Response) {
    const inv = FiscalRealApprovalGovernanceClosureInventory.generateInventory();
    FiscalRealApprovalDualClosureAuditService.audit('GET_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(inv);
  }

  public static getFinalChecklist(req: Request, res: Response) {
    const chk = FiscalRealApprovalGovernanceFinalChecklist.generateChecklist();
    FiscalRealApprovalDualClosureAuditService.audit('GET_FINAL_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(chk);
  }

  public static getEvidencePackage(req: Request, res: Response) {
    const evp = FiscalRealApprovalGovernanceEvidencePackageService.generatePackage();
    FiscalRealApprovalDualClosureAuditService.audit('GET_EVIDENCE_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(evp);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalRealApprovalDualClosureBlockerRegister.getBlockers();
    FiscalRealApprovalDualClosureAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalRealApprovalDualClosureRiskRegister.getRisks();
    FiscalRealApprovalDualClosureAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalRealApprovalDualClosureValidator.validate(input);
    FiscalRealApprovalDualClosureAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalRealApprovalDualClosureEvaluationService.evaluate(input);
    FiscalRealApprovalDualClosureAuditService.audit('EVALUATE_DUAL_CLOSURE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalRealApprovalDualClosureDecisionService.simulateDecision(input);
    FiscalRealApprovalDualClosureAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalRealApprovalDualClosureReportService.getReport();
    FiscalRealApprovalDualClosureAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalRealApprovalDualClosureAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', dualApprovalConclusionSimulationOnly: true, approvalRecordGovernanceClosureOnly: true });
  }
}
