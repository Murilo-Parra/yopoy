import { Request, Response } from 'express';
import {
  FiscalLegalSignOffClosurePolicy,
  FiscalLegalSignOffClosureInventory,
  FiscalLegalSignOffFinalChecklist,
  FiscalLegalSignOffEvidencePackageService,
  FiscalLegalFinalSignatureReadiness,
  FiscalLegalFinalCommitteeHandoffService,
  FiscalLegalPostSignOffRoadmap,
  FiscalLegalSignOffFinalBlockerRegister,
  FiscalLegalSignOffFinalRiskRegister,
  FiscalLegalSignOffClosureValidator,
  FiscalLegalSignOffClosureEvaluationService,
  FiscalLegalSignOffClosureDecisionService,
  FiscalLegalSignOffClosureReportService,
  FiscalLegalSignOffClosureAuditService
} from '../dedicated-homologation/legal-signoff/closure';

export class FiscalLegalSignOffClosureController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalLegalSignOffClosurePolicy.getBaseResult();
    FiscalLegalSignOffClosureAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getInventory(req: Request, res: Response) {
    const result = FiscalLegalSignOffClosureInventory.generateInventory();
    FiscalLegalSignOffClosureAuditService.audit('GET_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalChecklist(req: Request, res: Response) {
    const result = FiscalLegalSignOffFinalChecklist.getChecklist();
    FiscalLegalSignOffClosureAuditService.audit('GET_FINAL_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEvidencePackage(req: Request, res: Response) {
    const result = FiscalLegalSignOffEvidencePackageService.generatePackage();
    FiscalLegalSignOffClosureAuditService.audit('GET_EVIDENCE_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalSignatureReadiness(req: Request, res: Response) {
    const result = FiscalLegalFinalSignatureReadiness.generateReadiness();
    FiscalLegalSignOffClosureAuditService.audit('GET_FINAL_SIGNATURE_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalCommitteeHandoff(req: Request, res: Response) {
    const result = FiscalLegalFinalCommitteeHandoffService.generateHandoff();
    FiscalLegalSignOffClosureAuditService.audit('GET_FINAL_COMMITTEE_HANDOFF', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPostSignOffRoadmap(req: Request, res: Response) {
    const result = FiscalLegalPostSignOffRoadmap.generateRoadmap();
    FiscalLegalSignOffClosureAuditService.audit('GET_POST_SIGNOFF_ROADMAP', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalLegalSignOffFinalBlockerRegister.getBlockers();
    FiscalLegalSignOffClosureAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalLegalSignOffFinalRiskRegister.getRisks();
    FiscalLegalSignOffClosureAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalLegalSignOffClosureValidator.validate(input);
    FiscalLegalSignOffClosureAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalLegalSignOffClosureEvaluationService.evaluate(input);
    FiscalLegalSignOffClosureAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalLegalSignOffClosureDecisionService.simulateDecision(input);
    FiscalLegalSignOffClosureAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalLegalSignOffClosureReportService.getReport();
    FiscalLegalSignOffClosureAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalLegalSignOffClosureAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', legalSignoffGovernanceClosureOnly: true, finalLegalEvidenceHandoffOnly: true });
  }
}
