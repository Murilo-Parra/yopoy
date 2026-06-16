import { FiscalDedicatedSimulationDomain, FiscalDedicatedSimulationInput, FiscalDedicatedSimulationResult } from './FiscalDedicatedSimulationTypes';
import { FiscalDedicatedSimulationPolicy } from './FiscalDedicatedSimulationPolicy';

export class FiscalDedicatedMockRuntime {
  public static simulate(input: FiscalDedicatedSimulationInput): FiscalDedicatedSimulationResult {
    const policyResult = FiscalDedicatedSimulationPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedSimulationResult;

    const result = FiscalDedicatedSimulationPolicy.getBaseResult(FiscalDedicatedSimulationDomain.RUNTIME);
    
    return {
      ...result,
      ...{
        runtimeReady: true,
        realRuntimeStarted: false,
        trafficChanged: false,
        endpointsCalled: false,
        environmentActivated: false
      } as any
    };
  }
}
