import { Request, Response } from 'express';
import {
  FiscalRouteTransitionClosurePolicy,
  FiscalRouteTransitionClosureInventory,
  FiscalRouteTransitionFinalChecklist,
  FiscalRouteTransitionEvidencePackageService,
  FiscalRouteTransitionProductionHandoffService,
  FiscalRouteTransitionPostClosureRoadmap,
  FiscalRouteTransitionFinalBlockerRegister,
  FiscalRouteTransitionFinalRiskRegister,
  FiscalRouteTransitionClosureValidator,
  FiscalRouteTransitionClosureEvaluationService,
  FiscalRouteTransitionClosureDecisionService,
  FiscalRouteTransitionClosureReportService,
  FiscalRouteTransitionClosureAuditService
} from '../dedicated-homologation/route-transition/closure';

export class FiscalRouteTransitionClosureController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalRouteTransitionClosurePolicy.getBaseResult();
    FiscalRouteTransitionClosureAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getClosureInventory(req: Request, res: Response) {
    const result = FiscalRouteTransitionClosureInventory.generateInventory();
    FiscalRouteTransitionClosureAuditService.audit('GET_CLOSURE_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalChecklist(req: Request, res: Response) {
    const result = FiscalRouteTransitionFinalChecklist.generateChecklist();
    FiscalRouteTransitionClosureAuditService.audit('GET_FINAL_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getEvidencePackage(req: Request, res: Response) {
    const result = FiscalRouteTransitionEvidencePackageService.generatePackage();
    FiscalRouteTransitionClosureAuditService.audit('GET_EVIDENCE_PACKAGE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getProductionHandoff(req: Request, res: Response) {
    const result = FiscalRouteTransitionProductionHandoffService.generateHandoff();
    FiscalRouteTransitionClosureAuditService.audit('GET_PRODUCTION_HANDOFF', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    const result = FiscalRouteTransitionPostClosureRoadmap.generateRoadmap();
    FiscalRouteTransitionClosureAuditService.audit('GET_POST_CLOSURE_ROADMAP', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFinalBlockers(req: Request, res: Response) {
    const blockers = FiscalRouteTransitionFinalBlockerRegister.getBlockers();
    FiscalRouteTransitionClosureAuditService.audit('GET_FINAL_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getFinalRisks(req: Request, res: Response) {
    const risks = FiscalRouteTransitionFinalRiskRegister.getRisks();
    FiscalRouteTransitionClosureAuditService.audit('GET_FINAL_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalRouteTransitionClosureValidator.validate(input);
    FiscalRouteTransitionClosureAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalRouteTransitionClosureEvaluationService.evaluate(input);
    FiscalRouteTransitionClosureAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalRouteTransitionClosureDecisionService.simulateDecision(input);
    FiscalRouteTransitionClosureAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalRouteTransitionClosureReportService.getReport();
    FiscalRouteTransitionClosureAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalRouteTransitionClosureAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', routeTransitionHandoffOnly: true, finalEvidenceClosureOnly: true });
  }
}
