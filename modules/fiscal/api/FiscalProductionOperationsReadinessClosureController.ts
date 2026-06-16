import { Request, Response } from 'express';
import { 
  FiscalProductionOperationsReadinessClosurePolicy,
  FiscalProductionOperationsReadinessClosureInventory,
  FiscalProductionOperationsReadinessFinalChecklist,
  FiscalProductionOperationsReadinessEvidencePackageService,
  FiscalProductionOperationsReadinessNoActivationHandoffService,
  FiscalProductionOperationsReadinessPostClosureRoadmap,
  FiscalProductionOperationsReadinessFinalBlockerRegister,
  FiscalProductionOperationsReadinessFinalRiskRegister,
  FiscalProductionOperationsReadinessClosureValidator,
  FiscalProductionOperationsReadinessClosureEvaluationService,
  FiscalProductionOperationsReadinessClosureDecisionService,
  FiscalProductionOperationsReadinessClosureReportService,
  FiscalProductionOperationsReadinessClosureAuditService,
  FiscalProductionOperationsReadinessClosureInput
} from '../dedicated-homologation/production-operations-readiness/closure';

export class FiscalProductionOperationsReadinessClosureController {
  
  public getPolicy(req: Request, res: Response) {
    FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'getPolicy' });
    return res.json({ policy: FiscalProductionOperationsReadinessClosurePolicy.getPolicyMessage() });
  }

  public getClosureInventory(req: Request, res: Response) {
    FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'getClosureInventory' });
    return res.json(FiscalProductionOperationsReadinessClosureInventory.getInventory());
  }

  public getFinalChecklist(req: Request, res: Response) {
    FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'getFinalChecklist' });
    return res.json(FiscalProductionOperationsReadinessFinalChecklist.getChecklist());
  }

  public getEvidencePackage(req: Request, res: Response) {
    FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'getEvidencePackage' });
    return res.json(FiscalProductionOperationsReadinessEvidencePackageService.generatePackage());
  }

  public getNoActivationHandoff(req: Request, res: Response) {
    FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'getNoActivationHandoff' });
    return res.json(FiscalProductionOperationsReadinessNoActivationHandoffService.simulateHandoff());
  }

  public getPostClosureRoadmap(req: Request, res: Response) {
    FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'getPostClosureRoadmap' });
    return res.json(FiscalProductionOperationsReadinessPostClosureRoadmap.getRoadmap());
  }

  public getBlockers(req: Request, res: Response) {
    FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'getBlockers' });
    return res.json({ blockers: FiscalProductionOperationsReadinessFinalBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'getRisks' });
    return res.json({ risks: FiscalProductionOperationsReadinessFinalRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input: FiscalProductionOperationsReadinessClosureInput = req.body;
    try {
      FiscalProductionOperationsReadinessClosureValidator.validate(input);
      FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'validate', success: true });
      return res.json({ success: true, message: 'Validação concluída.' });
    } catch (e: any) {
      FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'validate', success: false });
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public evaluate(req: Request, res: Response) {
    const input: FiscalProductionOperationsReadinessClosureInput = req.body;
    try {
      const evaluation = FiscalProductionOperationsReadinessClosureEvaluationService.evaluate(input);
      FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'evaluate', success: true });
      return res.json({ success: true, evaluation });
    } catch (e: any) {
      FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'evaluate', success: false });
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public simulateDecision(req: Request, res: Response) {
    FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'simulateDecision' });
    return res.json(FiscalProductionOperationsReadinessClosureDecisionService.simulateDecision());
  }

  public getReport(req: Request, res: Response) {
    FiscalProductionOperationsReadinessClosureAuditService.logAdminRead({ action: 'getReport' });
    return res.json({ report: FiscalProductionOperationsReadinessClosureReportService.getReportMessage() });
  }

  public getAudit(req: Request, res: Response) {
    return res.json({ audit: FiscalProductionOperationsReadinessClosureAuditService.getEvents() });
  }

  public getHealth(req: Request, res: Response) {
    return res.json({ status: 'ok', component: 'FiscalProductionOperationsReadinessClosure' });
  }
}
