import { FiscalProductionRegulatoryFilingInput } from './FiscalProductionRegulatoryFilingTypes';
import { FiscalProductionRegulatoryFilingPolicy } from './FiscalProductionRegulatoryFilingPolicy';
import { FiscalProductionRegulatoryFilingValidator } from './FiscalProductionRegulatoryFilingValidator';
import { FiscalProductionRegulatoryFilingSimulationProfile } from './FiscalProductionRegulatoryFilingSimulationProfile';
import { FiscalProductionRegulatorySubmissionPayloadNoOpPlan } from './FiscalProductionRegulatorySubmissionPayloadNoOpPlan';
import { FiscalProductionRegulatoryRecipientSimulationMatrix } from './FiscalProductionRegulatoryRecipientSimulationMatrix';
import { FiscalProductionRegulatoryProtocolNoIssuePlan } from './FiscalProductionRegulatoryProtocolNoIssuePlan';
import { FiscalProductionRegulatoryFilingPayloadMetadataMatrix } from './FiscalProductionRegulatoryFilingPayloadMetadataMatrix';
import { FiscalProductionRegulatoryAttachmentNoFilePlan } from './FiscalProductionRegulatoryAttachmentNoFilePlan';
import { FiscalProductionRegulatoryValidationRulesNoExecuteMatrix } from './FiscalProductionRegulatoryValidationRulesNoExecuteMatrix';
import { FiscalProductionRegulatoryNoSubmissionEvidence } from './FiscalProductionRegulatoryNoSubmissionEvidence';
import { FiscalProductionRegulatoryNoProtocolEvidence } from './FiscalProductionRegulatoryNoProtocolEvidence';
import { FiscalProductionRegulatoryFilingDependencyMatrix } from './FiscalProductionRegulatoryFilingDependencyMatrix';
import { FiscalProductionRegulatoryFilingBlockerRegister } from './FiscalProductionRegulatoryFilingBlockerRegister';
import { FiscalProductionRegulatoryFilingRiskRegister } from './FiscalProductionRegulatoryFilingRiskRegister';

export class FiscalProductionRegulatoryFilingEvaluationService {
  public static evaluate(input: FiscalProductionRegulatoryFilingInput) {
    FiscalProductionRegulatoryFilingValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionRegulatoryFilingPolicy.getPolicyMessage(),
      filingSimulationProfile: FiscalProductionRegulatoryFilingSimulationProfile.getProfile(),
      submissionPayloadNoOpPlan: FiscalProductionRegulatorySubmissionPayloadNoOpPlan.getPlan(),
      recipientSimulationMatrix: FiscalProductionRegulatoryRecipientSimulationMatrix.getMatrix(),
      protocolNoIssuePlan: FiscalProductionRegulatoryProtocolNoIssuePlan.getPlan(),
      filingPayloadMetadataMatrix: FiscalProductionRegulatoryFilingPayloadMetadataMatrix.getMatrix(),
      attachmentNoFilePlan: FiscalProductionRegulatoryAttachmentNoFilePlan.getPlan(),
      validationRulesNoExecuteMatrix: FiscalProductionRegulatoryValidationRulesNoExecuteMatrix.getMatrix(),
      noSubmissionEvidence: FiscalProductionRegulatoryNoSubmissionEvidence.getEvidence(),
      noProtocolEvidence: FiscalProductionRegulatoryNoProtocolEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionRegulatoryFilingDependencyMatrix.getMatrix(),
      blockers: FiscalProductionRegulatoryFilingBlockerRegister.getBlockers(),
      risks: FiscalProductionRegulatoryFilingRiskRegister.getRisks(),
    };
  }
}
