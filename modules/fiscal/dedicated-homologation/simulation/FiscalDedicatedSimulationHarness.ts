import { FiscalDedicatedSimulationInput, FiscalDedicatedSimulationResult, FiscalDedicatedSimulationDomain } from './FiscalDedicatedSimulationTypes';
import { FiscalDedicatedSimulationPolicy } from './FiscalDedicatedSimulationPolicy';
import { FiscalDedicatedMockRuntime } from './FiscalDedicatedMockRuntime';
import { FiscalDedicatedMockDatabase } from './FiscalDedicatedMockDatabase';
import { FiscalDedicatedMockVault } from './FiscalDedicatedMockVault';
import { FiscalDedicatedMockCertificateProvider } from './FiscalDedicatedMockCertificateProvider';
import { FiscalDedicatedMockSefazEnvironment } from './FiscalDedicatedMockSefazEnvironment';
import { FiscalDedicatedMockXmlSigner } from './FiscalDedicatedMockXmlSigner';
import { FiscalDedicatedMockDanfeRenderer } from './FiscalDedicatedMockDanfeRenderer';
import { FiscalDedicatedMockObservability } from './FiscalDedicatedMockObservability';
import { FiscalDedicatedMockRollback } from './FiscalDedicatedMockRollback';

export class FiscalDedicatedSimulationHarness {
  public static executeSimulation(input: FiscalDedicatedSimulationInput): FiscalDedicatedSimulationResult {
    const policyResult = FiscalDedicatedSimulationPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedSimulationResult;

    const simulations = [
      FiscalDedicatedMockRuntime.simulate({ ...input, domain: FiscalDedicatedSimulationDomain.RUNTIME }),
      FiscalDedicatedMockDatabase.simulate({ ...input, domain: FiscalDedicatedSimulationDomain.DATABASE }),
      FiscalDedicatedMockVault.simulate({ ...input, domain: FiscalDedicatedSimulationDomain.VAULT }),
      FiscalDedicatedMockCertificateProvider.simulate({ ...input, domain: FiscalDedicatedSimulationDomain.CERTIFICATE }),
      FiscalDedicatedMockSefazEnvironment.simulate({ ...input, domain: FiscalDedicatedSimulationDomain.SEFAZ }),
      FiscalDedicatedMockXmlSigner.simulate({ ...input, domain: FiscalDedicatedSimulationDomain.XML_SIGNER }),
      FiscalDedicatedMockDanfeRenderer.simulate({ ...input, domain: FiscalDedicatedSimulationDomain.DANFE }),
      FiscalDedicatedMockObservability.simulate({ ...input, domain: FiscalDedicatedSimulationDomain.OBSERVABILITY }),
      FiscalDedicatedMockRollback.simulate({ ...input, domain: FiscalDedicatedSimulationDomain.ROLLBACK })
    ];

    const blockers = simulations.flatMap(s => s.blockers).filter((value, index, self) => self.indexOf(value) === index);
    const warnings = simulations.flatMap(s => s.warnings).filter((value, index, self) => self.indexOf(value) === index);

    const base = FiscalDedicatedSimulationPolicy.getBaseResult(FiscalDedicatedSimulationDomain.FULL_STACK);
    base.blockers = blockers.length > 0 ? blockers : base.blockers;
    base.warnings = warnings;

    return base;
  }
}
