import { Request, Response } from 'express';
import { FiscalDay2OperationsClosurePolicy } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsClosurePolicy';
import { FiscalDay2OperationsClosureSignOff } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsClosureSignOff';
import { FiscalDay2OperationsHandoffNoOpEvidence } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsHandoffNoOpEvidence';
import { FiscalDay2OperationsFinalChecklist } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsFinalChecklist';
import { FiscalDay2OperationsClosureDependencyMatrix } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsClosureDependencyMatrix';
import { FiscalDay2OperationsClosureBlockerRegister } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsClosureBlockerRegister';
import { FiscalDay2OperationsClosureRiskRegister } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsClosureRiskRegister';
import { FiscalDay2OperationsClosureValidator } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsClosureValidator';
import { FiscalDay2OperationsClosureEvaluationService } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsClosureEvaluationService';
import { FiscalDay2OperationsClosureDecisionService } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsClosureDecisionService';
import { FiscalDay2OperationsClosureReportService } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsClosureReportService';
import { FiscalDay2OperationsClosureAuditService } from '../dedicated-homologation/day2-operations-governance/closure/FiscalDay2OperationsClosureAuditService';

export class FiscalDay2OperationsClosureController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2OperationsClosurePolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalDay2OperationsClosurePolicy.getBaseResult());
  }

  public getSignOff(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OperationsClosureSignOff.getSignOff());
  }

  public getHandoffNoOpEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OperationsHandoffNoOpEvidence.getEvidence());
  }

  public getFinalChecklist(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OperationsFinalChecklist.getChecklist());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OperationsClosureDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalDay2OperationsClosureBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalDay2OperationsClosureRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2OperationsClosureValidator.validate(input);
    FiscalDay2OperationsClosureAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2OperationsClosureEvaluationService.evaluate(input);
    FiscalDay2OperationsClosureAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2OperationsClosureDecisionService.simulateDecision(input);
    FiscalDay2OperationsClosureAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OperationsClosureReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalDay2OperationsClosureAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'Day2OperationsClosureDryRun' });
  }
}
