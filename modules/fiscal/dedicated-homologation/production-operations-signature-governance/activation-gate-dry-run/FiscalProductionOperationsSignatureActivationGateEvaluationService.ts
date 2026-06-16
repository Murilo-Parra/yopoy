import { FiscalProductionOperationsSignatureActivationGateSimulation } from './FiscalProductionOperationsSignatureActivationGateSimulation';
import { FiscalProductionOperationsCryptographicBoundaryNoOpPlan } from './FiscalProductionOperationsCryptographicBoundaryNoOpPlan';
import { FiscalProductionOperationsConsentToActivationNoOpMatrix } from './FiscalProductionOperationsConsentToActivationNoOpMatrix';
import { FiscalProductionOperationsGateUnlockSimulationPlan } from './FiscalProductionOperationsGateUnlockSimulationPlan';
import { FiscalProductionOperationsSignatureRecordNoPersistencePlan } from './FiscalProductionOperationsSignatureRecordNoPersistencePlan';
import { FiscalProductionOperationsCertificateAccessNoReadPlan } from './FiscalProductionOperationsCertificateAccessNoReadPlan';
import { FiscalProductionOperationsXmlPdfSigningNoOpPlan } from './FiscalProductionOperationsXmlPdfSigningNoOpPlan';
import { FiscalProductionOperationsAuthorizationTokenNoIssueEvidence } from './FiscalProductionOperationsAuthorizationTokenNoIssueEvidence';
import { FiscalProductionOperationsActivationGateNoUnlockEvidence } from './FiscalProductionOperationsActivationGateNoUnlockEvidence';
import { FiscalProductionOperationsSignatureActivationDependencyMatrix } from './FiscalProductionOperationsSignatureActivationDependencyMatrix';
import { FiscalProductionOperationsSignatureActivationGateBlockerRegister } from './FiscalProductionOperationsSignatureActivationGateBlockerRegister';
import { FiscalProductionOperationsSignatureActivationGateRiskRegister } from './FiscalProductionOperationsSignatureActivationGateRiskRegister';
import { FiscalProductionOperationsSignatureActivationGatePolicy } from './FiscalProductionOperationsSignatureActivationGatePolicy';
import { FiscalProductionOperationsSignatureActivationGateValidator } from './FiscalProductionOperationsSignatureActivationGateValidator';
import { FiscalProductionOperationsSignatureActivationGateInput } from './FiscalProductionOperationsSignatureActivationGateTypes';

export class FiscalProductionOperationsSignatureActivationGateEvaluationService {
  public static evaluate(input: FiscalProductionOperationsSignatureActivationGateInput) {
    FiscalProductionOperationsSignatureActivationGateValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionOperationsSignatureActivationGatePolicy.getPolicyMessage(),
      simulation: FiscalProductionOperationsSignatureActivationGateSimulation.simulate(),
      cryptographicBoundaryNoOpPlan: FiscalProductionOperationsCryptographicBoundaryNoOpPlan.getPlan(),
      consentToActivationNoOpMatrix: FiscalProductionOperationsConsentToActivationNoOpMatrix.getMatrix(),
      gateUnlockSimulationPlan: FiscalProductionOperationsGateUnlockSimulationPlan.getPlan(),
      signatureRecordNoPersistencePlan: FiscalProductionOperationsSignatureRecordNoPersistencePlan.getPlan(),
      certificateAccessNoReadPlan: FiscalProductionOperationsCertificateAccessNoReadPlan.getPlan(),
      xmlPdfSigningNoOpPlan: FiscalProductionOperationsXmlPdfSigningNoOpPlan.getPlan(),
      authorizationTokenNoIssueEvidence: FiscalProductionOperationsAuthorizationTokenNoIssueEvidence.getEvidence(),
      activationGateNoUnlockEvidence: FiscalProductionOperationsActivationGateNoUnlockEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionOperationsSignatureActivationDependencyMatrix.getMatrix(),
      blockers: FiscalProductionOperationsSignatureActivationGateBlockerRegister.getBlockers(),
      risks: FiscalProductionOperationsSignatureActivationGateRiskRegister.getRisks()
    };
  }
}
