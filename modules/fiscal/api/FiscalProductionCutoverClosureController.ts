import { Request, Response } from 'express';
import { FiscalProductionCutoverClosurePolicy } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverClosurePolicy';
import { FiscalProductionCutoverClosureInventory } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverClosureInventory';
import { FiscalProductionCutoverFinalChecklist } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverFinalChecklist';
import { FiscalProductionCutoverEvidencePackageService } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverEvidencePackageService';
import { FiscalProductionNoActivationHandoffService } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionNoActivationHandoffService';
import { FiscalProductionCutoverPostClosureRoadmap } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverPostClosureRoadmap';
import { FiscalProductionCutoverFinalBlockerRegister } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverFinalBlockerRegister';
import { FiscalProductionCutoverFinalRiskRegister } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverFinalRiskRegister';
import { FiscalProductionCutoverClosureValidator } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverClosureValidator';
import { FiscalProductionCutoverClosureEvaluationService } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverClosureEvaluationService';
import { FiscalProductionCutoverClosureDecisionService } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverClosureDecisionService';
import { FiscalProductionCutoverClosureReportService } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverClosureReportService';
import { FiscalProductionCutoverClosureAuditService } from '../dedicated-homologation/production-cutover-governance/closure/FiscalProductionCutoverClosureAuditService';

export class FiscalProductionCutoverClosureController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCutoverClosurePolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionCutoverClosurePolicy.getBaseResult());
  }

  public getClosureInventory(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionCutoverClosureInventory.getInventory());
  }

  public getFinalChecklist(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionCutoverFinalChecklist.getChecklist());
  }

  public getEvidencePackage(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionCutoverEvidencePackageService.getEvidencePackage());
  }

  public getNoActivationHandoff(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionNoActivationHandoffService.getHandoff());
  }

  public getPostClosureRoadmap(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionCutoverPostClosureRoadmap.getRoadmap());
  }

  public getFinalBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionCutoverFinalBlockerRegister.getBlockers() });
  }

  public getFinalRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionCutoverFinalRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCutoverClosureValidator.validate(input);
    FiscalProductionCutoverClosureAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCutoverClosureEvaluationService.evaluate(input);
    FiscalProductionCutoverClosureAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCutoverClosureDecisionService.simulateDecision(input);
    FiscalProductionCutoverClosureAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionCutoverClosureReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionCutoverClosureAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionCutoverClosure' });
  }
}
