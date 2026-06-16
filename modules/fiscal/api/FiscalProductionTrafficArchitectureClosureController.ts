import { Request, Response } from 'express';
import {
  FiscalProductionTrafficArchitectureClosurePolicy,
  FiscalProductionTrafficArchitectureClosureInventory,
  FiscalProductionTrafficArchitectureFinalChecklist,
  FiscalProductionTrafficArchitectureEvidencePackageService,
  FiscalProductionTrafficNoRoutingHandoffService,
  FiscalProductionTrafficPostClosureRoadmap,
  FiscalProductionTrafficArchitectureFinalBlockerRegister,
  FiscalProductionTrafficArchitectureFinalRiskRegister,
  FiscalProductionTrafficArchitectureClosureValidator,
  FiscalProductionTrafficArchitectureClosureEvaluationService,
  FiscalProductionTrafficArchitectureClosureDecisionService,
  FiscalProductionTrafficArchitectureClosureReportService,
  FiscalProductionTrafficArchitectureClosureAuditService
} from '../dedicated-homologation/production-traffic-architecture-governance/closure';

export class FiscalProductionTrafficArchitectureClosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionTrafficArchitectureClosurePolicy.getPolicy());
  }

  public static getClosureInventory(req: Request, res: Response) {
    res.json(FiscalProductionTrafficArchitectureClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response) {
    res.json(FiscalProductionTrafficArchitectureFinalChecklist.getChecklist());
  }

  public static getEvidencePackage(req: Request, res: Response) {
    res.json(FiscalProductionTrafficArchitectureEvidencePackageService.getPackage());
  }

  public static getNoRoutingHandoff(req: Request, res: Response) {
    res.json(FiscalProductionTrafficNoRoutingHandoffService.getHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    res.json(FiscalProductionTrafficPostClosureRoadmap.getRoadmap());
  }

  public static getFinalBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionTrafficArchitectureFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionTrafficArchitectureFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionTrafficArchitectureClosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionTrafficArchitectureClosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficArchitectureClosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficArchitectureClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionTrafficArchitectureClosureReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficArchitectureClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionTrafficArchitectureClosureAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Traffic Architecture Governance Closure & Final No-Routing Evidence Handoff Package', readOnly: true });
  }
}
