import { FiscalRealApprovalPersistenceGateInput, FiscalRealApprovalPersistenceGateResult } from './FiscalRealApprovalPersistenceGateTypes';
import { FiscalRealApprovalPersistenceGatePolicy } from './FiscalRealApprovalPersistenceGatePolicy';
import { FiscalRealApprovalPersistenceSchemaContract } from './FiscalRealApprovalPersistenceSchemaContract';
import { FiscalRealApprovalLegalAuditTrailContract } from './FiscalRealApprovalLegalAuditTrailContract';
import { FiscalRealApprovalPersistenceReadinessChecklist } from './FiscalRealApprovalPersistenceReadinessChecklist';
import { FiscalRealApprovalPersistenceBlockerRegister } from './FiscalRealApprovalPersistenceBlockerRegister';
import { FiscalRealApprovalPersistenceRiskRegister } from './FiscalRealApprovalPersistenceRiskRegister';

export class FiscalRealApprovalPersistenceEvaluationService {
  public static evaluate(input: FiscalRealApprovalPersistenceGateInput): FiscalRealApprovalPersistenceGateResult | Partial<FiscalRealApprovalPersistenceGateResult> {
    const policyResult = FiscalRealApprovalPersistenceGatePolicy.enforce(input);
    if (policyResult) {
      if (!policyResult.success) {
        return policyResult;
      }
    }
    
    const base = FiscalRealApprovalPersistenceGatePolicy.getBaseResult();
    
    return {
      ...base,
      evaluationExecuted: true,
      schemaContractGenerated: FiscalRealApprovalPersistenceSchemaContract.generateContract().schemaContractGenerated,
      legalAuditTrailContractGenerated: FiscalRealApprovalLegalAuditTrailContract.generateContract().legalAuditTrailContractGenerated,
      readinessChecklistGenerated: FiscalRealApprovalPersistenceReadinessChecklist.getChecklist().length > 0,
    };
  }
}
