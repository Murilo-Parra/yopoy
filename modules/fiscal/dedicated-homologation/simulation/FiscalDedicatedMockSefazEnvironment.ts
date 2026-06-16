import { FiscalDedicatedSimulationDomain, FiscalDedicatedSimulationInput, FiscalDedicatedSimulationResult } from './FiscalDedicatedSimulationTypes';
import { FiscalDedicatedSimulationPolicy } from './FiscalDedicatedSimulationPolicy';

export class FiscalDedicatedMockSefazEnvironment {
  public static simulate(input: FiscalDedicatedSimulationInput): FiscalDedicatedSimulationResult {
    const policyResult = FiscalDedicatedSimulationPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedSimulationResult;

    const result = FiscalDedicatedSimulationPolicy.getBaseResult(FiscalDedicatedSimulationDomain.SEFAZ);
    
    return {
      ...result,
      ...{
        sefazMockReady: true,
        realSefazCalled: false,
        endpointCalled: false,
        responseSynthetic: true
      } as any
    };
  }
}
