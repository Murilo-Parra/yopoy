import { FiscalOperationalHandoffInput, FiscalOperationalHandoffResult } from './FiscalOperationalHandoffTypes';
import { FiscalOperationalHandoffPolicy } from './FiscalOperationalHandoffPolicy';
import { FiscalOperationalRunbookBlueprint } from './FiscalOperationalRunbookBlueprint';
import { FiscalOperationalResponsibilityMatrix } from './FiscalOperationalResponsibilityMatrix';
import { FiscalOperationalSupportEscalationPlan } from './FiscalOperationalSupportEscalationPlan';
import { FiscalOperationalIncidentResponsePlan } from './FiscalOperationalIncidentResponsePlan';
import { FiscalOperationalObservabilityReadiness } from './FiscalOperationalObservabilityReadiness';
import { FiscalOperationalChangeFreezePlan } from './FiscalOperationalChangeFreezePlan';
import { FiscalOperationalCommunicationMatrix } from './FiscalOperationalCommunicationMatrix';
import { FiscalOperationalHandoffBlockerRegister } from './FiscalOperationalHandoffBlockerRegister';
import { FiscalOperationalHandoffRiskRegister } from './FiscalOperationalHandoffRiskRegister';

export class FiscalOperationalHandoffEvaluationService {
  public static evaluate(input: FiscalOperationalHandoffInput): FiscalOperationalHandoffResult {
    const policyResult = FiscalOperationalHandoffPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalOperationalHandoffResult;
    }

    FiscalOperationalRunbookBlueprint.generateBlueprint();
    FiscalOperationalResponsibilityMatrix.generateMatrix();
    FiscalOperationalSupportEscalationPlan.generatePlan();
    FiscalOperationalIncidentResponsePlan.generatePlan();
    FiscalOperationalObservabilityReadiness.generateReadiness();
    FiscalOperationalChangeFreezePlan.generatePlan();
    FiscalOperationalCommunicationMatrix.generateMatrix();

    const baseResult = FiscalOperationalHandoffPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalOperationalHandoffBlockerRegister.getBlockers(),
      warnings: FiscalOperationalHandoffRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
