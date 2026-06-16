import { FiscalProductionEvidenceDisclosureInput } from './FiscalProductionEvidenceDisclosureTypes';
import { FiscalProductionEvidenceDisclosurePolicy } from './FiscalProductionEvidenceDisclosurePolicy';
import { FiscalProductionEvidenceDisclosureValidator } from './FiscalProductionEvidenceDisclosureValidator';
import { FiscalProductionEvidenceDisclosureReviewBlueprint } from './FiscalProductionEvidenceDisclosureReviewBlueprint';
import { FiscalProductionEvidenceSanitizedDisclosurePackagePlan } from './FiscalProductionEvidenceSanitizedDisclosurePackagePlan';
import { FiscalProductionEvidenceDisclosureRecipientEligibilityMatrix } from './FiscalProductionEvidenceDisclosureRecipientEligibilityMatrix';
import { FiscalProductionEvidenceExternalAuditExportNoOpPlan } from './FiscalProductionEvidenceExternalAuditExportNoOpPlan';
import { FiscalProductionEvidenceRedactionNoReadMatrix } from './FiscalProductionEvidenceRedactionNoReadMatrix';
import { FiscalProductionEvidenceLegalHoldNoPersistencePlan } from './FiscalProductionEvidenceLegalHoldNoPersistencePlan';
import { FiscalProductionEvidenceDisclosureScopeMetadataMatrix } from './FiscalProductionEvidenceDisclosureScopeMetadataMatrix';
import { FiscalProductionEvidenceDisclosureApprovalNoOpPlan } from './FiscalProductionEvidenceDisclosureApprovalNoOpPlan';
import { FiscalProductionEvidenceNoExternalExportEvidence } from './FiscalProductionEvidenceNoExternalExportEvidence';
import { FiscalProductionEvidenceNoPayloadDisclosureEvidence } from './FiscalProductionEvidenceNoPayloadDisclosureEvidence';
import { FiscalProductionEvidenceDisclosureDependencyMatrix } from './FiscalProductionEvidenceDisclosureDependencyMatrix';
import { FiscalProductionEvidenceDisclosureBlockerRegister } from './FiscalProductionEvidenceDisclosureBlockerRegister';
import { FiscalProductionEvidenceDisclosureRiskRegister } from './FiscalProductionEvidenceDisclosureRiskRegister';

export class FiscalProductionEvidenceDisclosureEvaluationService {
  public static evaluate(input: FiscalProductionEvidenceDisclosureInput) {
    FiscalProductionEvidenceDisclosureValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionEvidenceDisclosurePolicy.getPolicyMessage(),
      disclosureReviewBlueprint: FiscalProductionEvidenceDisclosureReviewBlueprint.getBlueprint(),
      sanitizedDisclosurePackagePlan: FiscalProductionEvidenceSanitizedDisclosurePackagePlan.getPlan(),
      recipientEligibilityMatrix: FiscalProductionEvidenceDisclosureRecipientEligibilityMatrix.getMatrix(),
      externalAuditExportNoOpPlan: FiscalProductionEvidenceExternalAuditExportNoOpPlan.getPlan(),
      redactionNoReadMatrix: FiscalProductionEvidenceRedactionNoReadMatrix.getMatrix(),
      legalHoldNoPersistencePlan: FiscalProductionEvidenceLegalHoldNoPersistencePlan.getPlan(),
      disclosureScopeMetadataMatrix: FiscalProductionEvidenceDisclosureScopeMetadataMatrix.getMatrix(),
      disclosureApprovalNoOpPlan: FiscalProductionEvidenceDisclosureApprovalNoOpPlan.getPlan(),
      noExternalExportEvidence: FiscalProductionEvidenceNoExternalExportEvidence.getEvidence(),
      noPayloadDisclosureEvidence: FiscalProductionEvidenceNoPayloadDisclosureEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionEvidenceDisclosureDependencyMatrix.getMatrix(),
      blockers: FiscalProductionEvidenceDisclosureBlockerRegister.getBlockers(),
      risks: FiscalProductionEvidenceDisclosureRiskRegister.getRisks(),
    };
  }
}
