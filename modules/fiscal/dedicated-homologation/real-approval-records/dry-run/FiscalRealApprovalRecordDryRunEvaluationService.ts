import { FiscalRealApprovalRecordDryRunInput, FiscalRealApprovalRecordDryRunResult, FiscalRealApprovalRecordDryRunStatus } from './FiscalRealApprovalRecordDryRunTypes';
import { FiscalRealApprovalRecordDryRunPolicy } from './FiscalRealApprovalRecordDryRunPolicy';
import { FiscalRealApprovalRecordDryRunRepository } from './FiscalRealApprovalRecordDryRunRepository';
import { FiscalRealApprovalRecordVersioningPlan } from './FiscalRealApprovalRecordVersioningPlan';
import { FiscalRealApprovalRecordAuditTrailSimulator } from './FiscalRealApprovalRecordAuditTrailSimulator';

export class FiscalRealApprovalRecordDryRunEvaluationService {
  public static evaluate(input: FiscalRealApprovalRecordDryRunInput): FiscalRealApprovalRecordDryRunResult {
    const policyResult = FiscalRealApprovalRecordDryRunPolicy.enforce(input);
    if (policyResult && policyResult.success === false) {
      return policyResult as FiscalRealApprovalRecordDryRunResult;
    }

    FiscalRealApprovalRecordDryRunRepository.simulateStore(input);
    FiscalRealApprovalRecordAuditTrailSimulator.simulate(input);
    const versioningPlan = FiscalRealApprovalRecordVersioningPlan.generate();
    
    const result = FiscalRealApprovalRecordDryRunPolicy.getBaseResult();

    return {
      ...result,
      status: FiscalRealApprovalRecordDryRunStatus.DRY_RUN_PERSISTENCE_READY,
      validationExecuted: true,
      dryRunPersistenceSimulated: true,
      auditTrailSimulated: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
