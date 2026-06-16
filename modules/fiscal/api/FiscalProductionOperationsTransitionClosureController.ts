import { Request, Response } from 'express';
import { FiscalProductionOperationsTransitionClosurePolicy } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionClosurePolicy';
import { FiscalProductionOperationsTransitionClosureInventory } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionClosureInventory';
import { FiscalProductionOperationsTransitionFinalChecklist } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionFinalChecklist';
import { FiscalProductionOperationsTransitionEvidencePackageService } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionEvidencePackageService';
import { FiscalProductionOperationsNoActivationHandoffService } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsNoActivationHandoffService';
import { FiscalProductionOperationsPostClosureRoadmap } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsPostClosureRoadmap';
import { FiscalProductionOperationsTransitionFinalBlockerRegister } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionFinalBlockerRegister';
import { FiscalProductionOperationsTransitionFinalRiskRegister } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionFinalRiskRegister';
import { FiscalProductionOperationsTransitionClosureValidator } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionClosureValidator';
import { FiscalProductionOperationsTransitionClosureEvaluationService } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionClosureEvaluationService';
import { FiscalProductionOperationsTransitionClosureDecisionService } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionClosureDecisionService';
import { FiscalProductionOperationsTransitionClosureReportService } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionClosureReportService';
import { FiscalProductionOperationsTransitionClosureAuditService } from '../dedicated-homologation/production-operations-transition/closure/FiscalProductionOperationsTransitionClosureAuditService';

export class FiscalProductionOperationsTransitionClosureController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsTransitionClosurePolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionOperationsTransitionClosurePolicy.getBaseResult());
  }

  public getClosureInventory(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTransitionClosureInventory.getInventory());
  }

  public getFinalChecklist(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTransitionFinalChecklist.getChecklist());
  }

  public getEvidencePackage(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTransitionEvidencePackageService.getPackage());
  }

  public getNoActivationHandoff(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsNoActivationHandoffService.getHandoff());
  }

  public getPostClosureRoadmap(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsPostClosureRoadmap.getRoadmap());
  }

  public getFinalBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionOperationsTransitionFinalBlockerRegister.getBlockers() });
  }

  public getFinalRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionOperationsTransitionFinalRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsTransitionClosureValidator.validate(input);
    FiscalProductionOperationsTransitionClosureAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsTransitionClosureEvaluationService.evaluate(input);
    FiscalProductionOperationsTransitionClosureAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsTransitionClosureDecisionService.simulateDecision(input);
    FiscalProductionOperationsTransitionClosureAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTransitionClosureReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionOperationsTransitionClosureAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionOperationsTransitionClosure' });
  }
}
