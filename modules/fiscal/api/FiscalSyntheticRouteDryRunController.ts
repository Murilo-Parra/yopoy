import { Request, Response } from 'express';
import {
  FiscalSyntheticRouteDryRunPolicy,
  FiscalSyntheticRouteScenarioCatalog,
  FiscalSyntheticLegacyResponseShapeCatalog,
  FiscalSyntheticV2ResponseShapeCatalog,
  FiscalResponseShapeComparator,
  FiscalSyntheticRouteCompatibilityMatrix,
  FiscalSyntheticRouteContractDiffService,
  FiscalSyntheticRouteNoHandlerCallEvidence,
  FiscalSyntheticRouteDryRunBlockerRegister,
  FiscalSyntheticRouteDryRunRiskRegister,
  FiscalSyntheticRouteDryRunValidator,
  FiscalSyntheticRouteDryRunEvaluationService,
  FiscalSyntheticRouteDryRunDecisionService,
  FiscalSyntheticRouteDryRunReportService,
  FiscalSyntheticRouteDryRunAuditService
} from '../dedicated-homologation/route-transition/synthetic-route-dry-run';

export class FiscalSyntheticRouteDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalSyntheticRouteDryRunPolicy.getBaseResult();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getScenarioCatalog(req: Request, res: Response) {
    const result = FiscalSyntheticRouteScenarioCatalog.generateCatalog();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_SCENARIO_CATALOG', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegacyResponseShapes(req: Request, res: Response) {
    const result = FiscalSyntheticLegacyResponseShapeCatalog.generateCatalog();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_LEGACY_RESPONSE_SHAPES', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getV2ResponseShapes(req: Request, res: Response) {
    const result = FiscalSyntheticV2ResponseShapeCatalog.generateCatalog();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_V2_RESPONSE_SHAPES', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getShapeComparator(req: Request, res: Response) {
    const result = FiscalResponseShapeComparator.compare();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_SHAPE_COMPARATOR', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCompatibilityMatrix(req: Request, res: Response) {
    const result = FiscalSyntheticRouteCompatibilityMatrix.generateMatrix();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_COMPATIBILITY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getContractDiff(req: Request, res: Response) {
    const result = FiscalSyntheticRouteContractDiffService.generateDiff();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_CONTRACT_DIFF', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoHandlerCallEvidence(req: Request, res: Response) {
    const result = FiscalSyntheticRouteNoHandlerCallEvidence.generateEvidence();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_NO_HANDLER_CALL_EVIDENCE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalSyntheticRouteDryRunBlockerRegister.getBlockers();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalSyntheticRouteDryRunRiskRegister.getRisks();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalSyntheticRouteDryRunValidator.validate(input);
    FiscalSyntheticRouteDryRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalSyntheticRouteDryRunEvaluationService.evaluate(input);
    FiscalSyntheticRouteDryRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalSyntheticRouteDryRunDecisionService.simulateDecision(input);
    FiscalSyntheticRouteDryRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalSyntheticRouteDryRunReportService.getReport();
    FiscalSyntheticRouteDryRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalSyntheticRouteDryRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', syntheticRouteDryRunOnly: true, responseShapeComparatorOnly: true });
  }
}
