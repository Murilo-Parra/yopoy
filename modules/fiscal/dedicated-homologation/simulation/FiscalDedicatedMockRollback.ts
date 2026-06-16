import { FiscalDedicatedSimulationDomain, FiscalDedicatedSimulationInput, FiscalDedicatedSimulationResult } from './FiscalDedicatedSimulationTypes';
import { FiscalDedicatedSimulationPolicy } from './FiscalDedicatedSimulationPolicy';

export class FiscalDedicatedMockRollback {
  public static simulate(input: FiscalDedicatedSimulationInput): FiscalDedicatedSimulationResult {
    const policyResult = FiscalDedicatedSimulationPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedSimulationResult;

    const result = FiscalDedicatedSimulationPolicy.getBaseResult(FiscalDedicatedSimulationDomain.ROLLBACK);
    
    return {
      ...result,
      ...{
        rollbackMockReady: true,
        rollbackInstalled: false,
        killSwitchInstalled: false,
        circuitBreakerInstalled: false
      } as any
    };
  }
}
