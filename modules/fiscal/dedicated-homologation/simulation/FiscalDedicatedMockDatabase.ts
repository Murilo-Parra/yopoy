import { FiscalDedicatedSimulationDomain, FiscalDedicatedSimulationInput, FiscalDedicatedSimulationResult } from './FiscalDedicatedSimulationTypes';
import { FiscalDedicatedSimulationPolicy } from './FiscalDedicatedSimulationPolicy';

export class FiscalDedicatedMockDatabase {
  public static simulate(input: FiscalDedicatedSimulationInput): FiscalDedicatedSimulationResult {
    const policyResult = FiscalDedicatedSimulationPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedSimulationResult;

    const result = FiscalDedicatedSimulationPolicy.getBaseResult(FiscalDedicatedSimulationDomain.DATABASE);
    
    return {
      ...result,
      ...{
        databaseReady: true,
        databaseProvisioned: false,
        realDatabaseConnected: false,
        dmlExecuted: false
      } as any
    };
  }
}
