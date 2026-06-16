import { Request, Response } from 'express';
import { FiscalDay2OperationsPolicy } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationsPolicy';
import { FiscalDay2OperationsGovernanceBlueprint } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationsGovernanceBlueprint';
import { FiscalDay2NoActivationOperationalReadinessContract } from '../dedicated-homologation/day2-operations-governance/FiscalDay2NoActivationOperationalReadinessContract';
import { FiscalDay2SupportRunbookReadinessPlan } from '../dedicated-homologation/day2-operations-governance/FiscalDay2SupportRunbookReadinessPlan';
import { FiscalDay2IncidentManagementReadinessPlan } from '../dedicated-homologation/day2-operations-governance/FiscalDay2IncidentManagementReadinessPlan';
import { FiscalDay2OperationalMonitoringNoOpPlan } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationalMonitoringNoOpPlan';
import { FiscalDay2AlertingNoOpPlan } from '../dedicated-homologation/day2-operations-governance/FiscalDay2AlertingNoOpPlan';
import { FiscalDay2EscalationNoNotificationMatrix } from '../dedicated-homologation/day2-operations-governance/FiscalDay2EscalationNoNotificationMatrix';
import { FiscalDay2ChangeControlReadinessMatrix } from '../dedicated-homologation/day2-operations-governance/FiscalDay2ChangeControlReadinessMatrix';
import { FiscalDay2RollbackEscalationMatrix } from '../dedicated-homologation/day2-operations-governance/FiscalDay2RollbackEscalationMatrix';
import { FiscalDay2ServiceContinuityNoOpPlan } from '../dedicated-homologation/day2-operations-governance/FiscalDay2ServiceContinuityNoOpPlan';
import { FiscalDay2OperationsDependencyMatrix } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationsDependencyMatrix';
import { FiscalDay2OperationsBlockerRegister } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationsBlockerRegister';
import { FiscalDay2OperationsRiskRegister } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationsRiskRegister';
import { FiscalDay2OperationsValidator } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationsValidator';
import { FiscalDay2OperationsEvaluationService } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationsEvaluationService';
import { FiscalDay2OperationsDecisionService } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationsDecisionService';
import { FiscalDay2OperationsReportService } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationsReportService';
import { FiscalDay2OperationsAuditService } from '../dedicated-homologation/day2-operations-governance/FiscalDay2OperationsAuditService';

export class FiscalDay2OperationsController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2OperationsPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalDay2OperationsPolicy.getBaseResult());
  }

  public getGovernanceBlueprint(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OperationsGovernanceBlueprint.getBlueprint());
  }

  public getNoActivationOperationalReadinessContract(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2NoActivationOperationalReadinessContract.getContract());
  }

  public getSupportRunbookReadinessPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SupportRunbookReadinessPlan.getPlan());
  }

  public getIncidentManagementReadinessPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2IncidentManagementReadinessPlan.getPlan());
  }

  public getOperationalMonitoringNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OperationalMonitoringNoOpPlan.getPlan());
  }

  public getAlertingNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2AlertingNoOpPlan.getPlan());
  }

  public getEscalationNoNotificationMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2EscalationNoNotificationMatrix.getMatrix());
  }

  public getChangeControlReadinessMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2ChangeControlReadinessMatrix.getMatrix());
  }

  public getRollbackEscalationMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2RollbackEscalationMatrix.getMatrix());
  }

  public getServiceContinuityNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2ServiceContinuityNoOpPlan.getPlan());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OperationsDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalDay2OperationsBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalDay2OperationsRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2OperationsValidator.validate(input);
    FiscalDay2OperationsAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2OperationsEvaluationService.evaluate(input);
    FiscalDay2OperationsAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2OperationsDecisionService.simulateDecision(input);
    FiscalDay2OperationsAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OperationsReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalDay2OperationsAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'Day2OperationsGovernance' });
  }
}
