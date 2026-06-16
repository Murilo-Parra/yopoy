import { Request, Response } from 'express';
import { FiscalDay2SupportAccessPolicy } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAccessPolicy';
import { FiscalDay2SupportTeamAccessBlueprint } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportTeamAccessBlueprint';
import { FiscalDay2SupportResponsibilityMatrix } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportResponsibilityMatrix';
import { FiscalDay2SupportRbacSimulationMatrix } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportRbacSimulationMatrix';
import { FiscalDay2NoPrivilegeEscalationBoundary } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2NoPrivilegeEscalationBoundary';
import { FiscalDay2SupportDataAccessNoReadPlan } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportDataAccessNoReadPlan';
import { FiscalDay2AssistedSessionNoOpPlan } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2AssistedSessionNoOpPlan';
import { FiscalDay2SupportAuditNoPersistencePlan } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAuditNoPersistencePlan';
import { FiscalDay2InternalEscalationNoNotificationPlan } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2InternalEscalationNoNotificationPlan';
import { FiscalDay2SupportAccessSafetyChecklist } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAccessSafetyChecklist';
import { FiscalDay2SupportAccessDependencyMatrix } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAccessDependencyMatrix';
import { FiscalDay2SupportAccessBlockerRegister } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAccessBlockerRegister';
import { FiscalDay2SupportAccessRiskRegister } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAccessRiskRegister';
import { FiscalDay2SupportAccessValidator } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAccessValidator';
import { FiscalDay2SupportAccessEvaluationService } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAccessEvaluationService';
import { FiscalDay2SupportAccessDecisionService } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAccessDecisionService';
import { FiscalDay2SupportAccessReportService } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAccessReportService';
import { FiscalDay2SupportAccessAuditService } from '../dedicated-homologation/day2-operations-governance/support-access-dry-run/FiscalDay2SupportAccessAuditService';

export class FiscalDay2SupportAccessController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2SupportAccessPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalDay2SupportAccessPolicy.getBaseResult());
  }

  public getSupportTeamAccessBlueprint(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SupportTeamAccessBlueprint.getBlueprint());
  }

  public getSupportResponsibilityMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SupportResponsibilityMatrix.getMatrix());
  }

  public getSupportRbacSimulationMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SupportRbacSimulationMatrix.getMatrix());
  }

  public getNoPrivilegeEscalationBoundary(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2NoPrivilegeEscalationBoundary.getBoundary());
  }

  public getSupportDataAccessNoReadPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SupportDataAccessNoReadPlan.getPlan());
  }

  public getAssistedSessionNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2AssistedSessionNoOpPlan.getPlan());
  }

  public getSupportAuditNoPersistencePlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SupportAuditNoPersistencePlan.getPlan());
  }

  public getInternalEscalationNoNotificationPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2InternalEscalationNoNotificationPlan.getPlan());
  }

  public getSupportAccessSafetyChecklist(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SupportAccessSafetyChecklist.getChecklist());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SupportAccessDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalDay2SupportAccessBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalDay2SupportAccessRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2SupportAccessValidator.validate(input);
    FiscalDay2SupportAccessAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2SupportAccessEvaluationService.evaluate(input);
    FiscalDay2SupportAccessAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2SupportAccessDecisionService.simulateDecision(input);
    FiscalDay2SupportAccessAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SupportAccessReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalDay2SupportAccessAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'Day2SupportAccessDryRun' });
  }
}
