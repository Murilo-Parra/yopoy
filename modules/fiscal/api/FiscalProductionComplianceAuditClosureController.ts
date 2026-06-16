import { Request, Response } from 'express';
import {
  FiscalProductionComplianceAuditClosurePolicy,
  FiscalProductionComplianceAuditClosureInventory,
  FiscalProductionComplianceAuditFinalChecklist,
  FiscalProductionComplianceAuditEvidencePackageService,
  FiscalProductionComplianceNoSubmissionHandoffService,
  FiscalProductionCompliancePostClosureRoadmap,
  FiscalProductionComplianceAuditFinalBlockerRegister,
  FiscalProductionComplianceAuditFinalRiskRegister,
  FiscalProductionComplianceAuditClosureValidator,
  FiscalProductionComplianceAuditClosureEvaluationService,
  FiscalProductionComplianceAuditClosureDecisionService,
  FiscalProductionComplianceAuditClosureReportService,
  FiscalProductionComplianceAuditClosureAuditService
} from '../dedicated-homologation/production-compliance-audit-governance/closure';

export class FiscalProductionComplianceAuditClosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionComplianceAuditClosurePolicy.getPolicy());
  }

  public static getClosureInventory(req: Request, res: Response) {
    res.json(FiscalProductionComplianceAuditClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response) {
    res.json(FiscalProductionComplianceAuditFinalChecklist.getChecklist());
  }

  public static getEvidencePackage(req: Request, res: Response) {
    res.json(FiscalProductionComplianceAuditEvidencePackageService.generatePackage());
  }

  public static getNoSubmissionHandoff(req: Request, res: Response) {
    res.json(FiscalProductionComplianceNoSubmissionHandoffService.simulateHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    res.json(FiscalProductionCompliancePostClosureRoadmap.getRoadmap());
  }

  public static getFinalBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionComplianceAuditFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionComplianceAuditFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionComplianceAuditClosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionComplianceAuditClosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionComplianceAuditClosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionComplianceAuditClosureDecisionService.simulateDecision(input);
    const report = FiscalProductionComplianceAuditClosureReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionComplianceAuditClosureDecisionService.simulateDecision(input);
    const audit = FiscalProductionComplianceAuditClosureAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Compliance Audit Governance Closure', readOnly: true });
  }
}
