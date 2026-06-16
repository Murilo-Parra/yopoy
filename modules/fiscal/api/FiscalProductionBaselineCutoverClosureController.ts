import { Request, Response } from 'express';
import { FiscalProductionBaselineCutoverClosurePolicy } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverClosurePolicy';
import { FiscalProductionBaselineCutoverClosureInventory } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverClosureInventory';
import { FiscalProductionBaselineCutoverFinalChecklist } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverFinalChecklist';
import { FiscalProductionBaselineCutoverEvidencePackageService } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverEvidencePackageService';
import { FiscalProductionBaselineNoActivationHandoffService } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineNoActivationHandoffService';
import { FiscalProductionBaselinePostClosureRoadmap } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselinePostClosureRoadmap';
import { FiscalProductionBaselineCutoverFinalBlockerRegister } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverFinalBlockerRegister';
import { FiscalProductionBaselineCutoverFinalRiskRegister } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverFinalRiskRegister';
import { FiscalProductionBaselineCutoverClosureValidator } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverClosureValidator';
import { FiscalProductionBaselineCutoverClosureEvaluationService } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverClosureEvaluationService';
import { FiscalProductionBaselineCutoverClosureDecisionService } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverClosureDecisionService';
import { FiscalProductionBaselineCutoverClosureReportService } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverClosureReportService';
import { FiscalProductionBaselineCutoverClosureAuditService } from '../dedicated-homologation/production-baseline-cutover/closure/FiscalProductionBaselineCutoverClosureAuditService';

export class FiscalProductionBaselineCutoverClosureController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionBaselineCutoverClosurePolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionBaselineCutoverClosurePolicy.getBaseResult());
  }

  public getInventory(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineCutoverClosureInventory.getInventory());
  }

  public getFinalChecklist(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineCutoverFinalChecklist.getChecklist());
  }

  public getEvidencePackage(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineCutoverEvidencePackageService.getPackage());
  }

  public getNoActivationHandoff(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineNoActivationHandoffService.getHandoff());
  }

  public getPostClosureRoadmap(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselinePostClosureRoadmap.getRoadmap());
  }

  public getFinalBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionBaselineCutoverFinalBlockerRegister.getBlockers() });
  }

  public getFinalRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionBaselineCutoverFinalRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionBaselineCutoverClosureValidator.validate(input);
    FiscalProductionBaselineCutoverClosureAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionBaselineCutoverClosureEvaluationService.evaluate(input);
    FiscalProductionBaselineCutoverClosureAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionBaselineCutoverClosureDecisionService.simulateDecision(input);
    FiscalProductionBaselineCutoverClosureAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineCutoverClosureReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionBaselineCutoverClosureAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionBaselineCutoverClosure' });
  }
}
