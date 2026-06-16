import { FiscalDedicatedSimulationDomain, FiscalDedicatedSimulationInput, FiscalDedicatedSimulationResult } from './FiscalDedicatedSimulationTypes';
import { FiscalDedicatedSimulationPolicy } from './FiscalDedicatedSimulationPolicy';

export class FiscalDedicatedMockXmlSigner {
  public static simulate(input: FiscalDedicatedSimulationInput): FiscalDedicatedSimulationResult {
    const policyResult = FiscalDedicatedSimulationPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedSimulationResult;

    const result = FiscalDedicatedSimulationPolicy.getBaseResult(FiscalDedicatedSimulationDomain.XML_SIGNER);
    
    return {
      ...result,
      ...{
        xmlSignerMockReady: true,
        xmlSigned: false,
        realXmlSigned: false,
        signatureSynthetic: true
      } as any
    };
  }
}
