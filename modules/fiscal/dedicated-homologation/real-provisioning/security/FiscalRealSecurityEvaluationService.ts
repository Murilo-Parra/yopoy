import { FiscalRealProvisioningSecurityInput, FiscalRealProvisioningSecurityResult } from './FiscalRealProvisioningSecurityTypes';
import { FiscalRealSecurityPolicy } from './FiscalRealSecurityPolicy';
import { FiscalRealSecurityReviewChecklist } from './FiscalRealSecurityReviewChecklist';
import { FiscalRealSecurityApprovalMatrix } from './FiscalRealSecurityApprovalMatrix';
import { FiscalRealSegregationOfDutiesMatrix } from './FiscalRealSegregationOfDutiesMatrix';
import { FiscalRealSecurityBlockerRegister } from './FiscalRealSecurityBlockerRegister';
import { FiscalRealSecurityRiskRegister } from './FiscalRealSecurityRiskRegister';

export class FiscalRealSecurityEvaluationService {
  public static evaluate(input: FiscalRealProvisioningSecurityInput): FiscalRealProvisioningSecurityResult {
    const policyResult = FiscalRealSecurityPolicy.enforce(input);
    if (policyResult) {
       return policyResult as FiscalRealProvisioningSecurityResult;
    }

    const result = FiscalRealSecurityPolicy.getBaseResult();
    result.success = true;
    result.go = false;
    result.noGo = true;

    return result;
  }
}
