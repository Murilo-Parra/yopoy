import { FiscalDedicatedReplayPolicy } from './FiscalDedicatedReplayPolicy';
import { FiscalDedicatedReplayInput, FiscalDedicatedReplayResult, FiscalDedicatedReplayDomain } from './FiscalDedicatedReplayTypes';

export class FiscalDedicatedReplayValidator {
  public static validate(input: FiscalDedicatedReplayInput): FiscalDedicatedReplayResult {
    const policyResult = FiscalDedicatedReplayPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedReplayResult;

    const result = FiscalDedicatedReplayPolicy.getBaseResult(input.domain || FiscalDedicatedReplayDomain.FULL_STACK);
    
    if (input.syntheticOnly === false) {
      result.warnings.push('syntheticOnly false was provided but forced to true.');
    }

    const strObj = JSON.stringify(input || {});
    if (strObj.match(/password|token|privateKey|pfx|certificate/i) && strObj.length > 50) {
      result.blockers.push('Input blocked by Validator due to password/token/privateKey/pfx/certificate in clear text.');
      (result as any).validationPassed = false;
    }
    
    if (strObj.includes('<?xml')) {
      result.blockers.push('Input blocked by Validator due to raw XML content.');
      (result as any).validationPassed = false;
    }
    
    if (strObj.length > 10000) {
      result.blockers.push('Input blocked by Validator due to giant strings.');
      (result as any).validationPassed = false;
    }

    if (strObj.match(/endpoint|sefazUrl|handler/i)) {
      result.blockers.push('Input blocked by Validator due to productive routes/actions intent.');
      (result as any).validationPassed = false;
    }

    if (result.blockers.length > 1) { // more than just the mandatory message
       result.success = false;
    } else {
       (result as any).validationPassed = true;
    }

    return result;
  }
}
