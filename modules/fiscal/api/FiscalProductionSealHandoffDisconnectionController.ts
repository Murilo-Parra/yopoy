import { Request, Response } from 'express';
import { FiscalProductionSealHandoffDisconnectionPolicy } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionSealHandoffDisconnectionPolicy';
import { FiscalProductionSystemWideSealHandoffDisconnectionBlueprint } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionSystemWideSealHandoffDisconnectionBlueprint';
import { FiscalProductionOperationalContinuationSuppressionMatrix } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionOperationalContinuationSuppressionMatrix';
import { FiscalProductionAuthorityPropagationNoOpContract } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionAuthorityPropagationNoOpContract';
import { FiscalProductionFinalActivationPathDisconnectionPlan } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionFinalActivationPathDisconnectionPlan';
import { FiscalProductionPostSealNoExecutionBoundaryMatrix } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionPostSealNoExecutionBoundaryMatrix';
import { FiscalProductionVirtualSealOutputNoHandoffPlan } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionVirtualSealOutputNoHandoffPlan';
import { FiscalProductionFinalCommandChannelNoOpenMatrix } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionFinalCommandChannelNoOpenMatrix';
import { FiscalProductionProductionV2PathNoCreateEvidence } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionProductionV2PathNoCreateEvidence';
import { FiscalProductionNoRealHandoffEvidence } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionNoRealHandoffEvidence';
import { FiscalProductionNoRealContinuationEvidence } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionNoRealContinuationEvidence';
import { FiscalProductionNoRealAuthorityPropagationEvidence } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionNoRealAuthorityPropagationEvidence';
import { FiscalProductionNoRealActivationPathEvidence } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionNoRealActivationPathEvidence';
import { FiscalProductionSealHandoffDisconnectionDependencyMatrix } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionSealHandoffDisconnectionDependencyMatrix';
import { FiscalProductionSealHandoffDisconnectionBlockerRegister } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionSealHandoffDisconnectionBlockerRegister';
import { FiscalProductionSealHandoffDisconnectionRiskRegister } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionSealHandoffDisconnectionRiskRegister';
import { FiscalProductionSealHandoffDisconnectionEvaluationService } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionSealHandoffDisconnectionEvaluationService';
import { FiscalProductionSealHandoffDisconnectionDecisionService } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionSealHandoffDisconnectionDecisionService';
import { FiscalProductionSealHandoffDisconnectionReportService } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionSealHandoffDisconnectionReportService';
import { FiscalProductionSealHandoffDisconnectionAuditService } from '../dedicated-homologation/production-system-wide-non-operational-seal/handoff-disconnection-dry-run/FiscalProductionSealHandoffDisconnectionAuditService';

export class FiscalProductionSealHandoffDisconnectionController {
  public static getPolicy(req: Request, res: Response): void {
    res.json({ policy: FiscalProductionSealHandoffDisconnectionPolicy.getMessage() });
  }

  public static getSealHandoffDisconnectionBlueprint(req: Request, res: Response): void {
    res.json(FiscalProductionSystemWideSealHandoffDisconnectionBlueprint.getBlueprint());
  }

  public static getOperationalContinuationSuppressionMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionOperationalContinuationSuppressionMatrix.getMatrix());
  }

  public static getAuthorityPropagationNoOpContract(req: Request, res: Response): void {
    res.json(FiscalProductionAuthorityPropagationNoOpContract.getContract());
  }

  public static getFinalActivationPathDisconnectionPlan(req: Request, res: Response): void {
    res.json(FiscalProductionFinalActivationPathDisconnectionPlan.getPlan());
  }

  public static getPostSealNoExecutionBoundaryMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionPostSealNoExecutionBoundaryMatrix.getMatrix());
  }

  public static getVirtualSealOutputNoHandoffPlan(req: Request, res: Response): void {
    res.json(FiscalProductionVirtualSealOutputNoHandoffPlan.getPlan());
  }

  public static getFinalCommandChannelNoOpenMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionFinalCommandChannelNoOpenMatrix.getMatrix());
  }

  public static getProductionV2PathNoCreateEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionProductionV2PathNoCreateEvidence.getEvidence());
  }

  public static getNoRealHandoffEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionNoRealHandoffEvidence.getEvidence());
  }

  public static getNoRealContinuationEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionNoRealContinuationEvidence.getEvidence());
  }

  public static getNoRealAuthorityPropagationEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionNoRealAuthorityPropagationEvidence.getEvidence());
  }

  public static getNoRealActivationPathEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionNoRealActivationPathEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionSealHandoffDisconnectionDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response): void {
    res.json({ blockers: FiscalProductionSealHandoffDisconnectionBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response): void {
    res.json({ risks: FiscalProductionSealHandoffDisconnectionRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response): void {
    FiscalProductionSealHandoffDisconnectionAuditService.audit('Validation requested', { user: (req as any).user, body: req.body });
    const evaluation = FiscalProductionSealHandoffDisconnectionEvaluationService.evaluate(req.body);
    if (evaluation.blockers && evaluation.blockers.length > 0) {
      res.status(403).json(evaluation);
    } else {
      res.json(evaluation);
    }
  }

  public static evaluate(req: Request, res: Response): void {
    FiscalProductionSealHandoffDisconnectionAuditService.audit('Evaluation requested', { user: (req as any).user, body: req.body });
    const evaluation = FiscalProductionSealHandoffDisconnectionEvaluationService.evaluate(req.body);
    if (evaluation.blockers && evaluation.blockers.length > 0) {
      res.status(403).json(evaluation);
    } else {
      res.json(evaluation);
    }
  }

  public static simulateDecision(req: Request, res: Response): void {
    FiscalProductionSealHandoffDisconnectionAuditService.audit('Decision simulated', { user: (req as any).user, body: req.body });
    const blockers = FiscalProductionSealHandoffDisconnectionEvaluationService.evaluate(req.body).blockers;
    if (blockers && blockers.length > 0) {
      res.status(403).json({ status: 'FAILED_SAFE', blockers, validationExecuted: true, evaluationExecuted: false });
      return;
    }
    res.json(FiscalProductionSealHandoffDisconnectionDecisionService.simulateDecision(req.body));
  }

  public static getReport(req: Request, res: Response): void {
    FiscalProductionSealHandoffDisconnectionAuditService.audit('Report requested', { user: (req as any).user });
    res.json({ report: FiscalProductionSealHandoffDisconnectionReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response): void {
    FiscalProductionSealHandoffDisconnectionAuditService.audit('Audit records requested', { user: (req as any).user });
    res.json({ message: 'Audit events are logged to the console.' });
  }

  public static getHealth(req: Request, res: Response): void {
    res.json({ status: 'healthy', module: 'production-system-wide-seal-handoff-disconnection-dry-run' });
  }
}
