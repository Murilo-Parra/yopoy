import { Router } from 'express';
import { FiscalProductionRetentionCustodyAttestationController } from './FiscalProductionRetentionCustodyAttestationController';

const router = Router();

router.get('/policy', FiscalProductionRetentionCustodyAttestationController.getPolicy);
router.get('/custody-attestation-blueprint', FiscalProductionRetentionCustodyAttestationController.getCustodyAttestationBlueprint);
router.get('/custody-attestation-non-binding-matrix', FiscalProductionRetentionCustodyAttestationController.getCustodyAttestationNonBindingMatrix);
router.get('/legal-hold-review-no-apply-matrix', FiscalProductionRetentionCustodyAttestationController.getLegalHoldReviewNoApplyMatrix);
router.get('/no-deletion-handoff-plan', FiscalProductionRetentionCustodyAttestationController.getNoDeletionHandoffPlan);
router.get('/dormant-custody-review-matrix', FiscalProductionRetentionCustodyAttestationController.getDormantCustodyReviewMatrix);
router.get('/retention-eligibility-no-mutation-matrix', FiscalProductionRetentionCustodyAttestationController.getRetentionEligibilityNoMutationMatrix);
router.get('/expiration-suppression-no-execute-plan', FiscalProductionRetentionCustodyAttestationController.getExpirationSuppressionNoExecutePlan);
router.get('/deletion-suppression-no-execute-plan', FiscalProductionRetentionCustodyAttestationController.getDeletionSuppressionNoExecutePlan);
router.get('/archive-reclassification-no-op-matrix', FiscalProductionRetentionCustodyAttestationController.getArchiveReclassificationNoOpMatrix);
router.get('/custody-chain-no-persistence-plan', FiscalProductionRetentionCustodyAttestationController.getCustodyChainNoPersistencePlan);
router.get('/retention-notice-no-notification-plan', FiscalProductionRetentionCustodyAttestationController.getRetentionNoticeNoNotificationPlan);
router.get('/custody-attestation-no-legal-effect-notice', FiscalProductionRetentionCustodyAttestationController.getCustodyAttestationNoLegalEffectNotice);
router.get('/no-real-custody-attestation-evidence', FiscalProductionRetentionCustodyAttestationController.getNoRealCustodyAttestationEvidence);
router.get('/no-real-legal-hold-evidence', FiscalProductionRetentionCustodyAttestationController.getNoRealLegalHoldEvidence);
router.get('/no-real-deletion-evidence', FiscalProductionRetentionCustodyAttestationController.getNoRealDeletionEvidence);
router.get('/dependency-matrix', FiscalProductionRetentionCustodyAttestationController.getDependencyMatrix);
router.get('/blockers', FiscalProductionRetentionCustodyAttestationController.getBlockers);
router.get('/risks', FiscalProductionRetentionCustodyAttestationController.getRisks);
router.post('/validate', FiscalProductionRetentionCustodyAttestationController.validate);
router.post('/evaluate', FiscalProductionRetentionCustodyAttestationController.evaluate);
router.post('/simulate-decision', FiscalProductionRetentionCustodyAttestationController.simulateDecision);
router.get('/report', FiscalProductionRetentionCustodyAttestationController.getReport);
router.get('/audit', FiscalProductionRetentionCustodyAttestationController.getAudit);
router.get('/health', FiscalProductionRetentionCustodyAttestationController.getHealth);

export const fiscalProductionRetentionCustodyAttestationRoutes = router;
