import { Router } from 'express';
import { FiscalProductionFinalStateIntegrityController } from './FiscalProductionFinalStateIntegrityController';

const router = Router();

router.get('/policy', FiscalProductionFinalStateIntegrityController.getPolicy);
router.get('/integrity-review-blueprint', FiscalProductionFinalStateIntegrityController.getIntegrityReviewBlueprint);
router.get('/reconciliation-simulation-matrix', FiscalProductionFinalStateIntegrityController.getReconciliationSimulationMatrix);
router.get('/consistency-drift-no-verification-matrix', FiscalProductionFinalStateIntegrityController.getConsistencyDriftNoVerificationMatrix);
router.get('/snapshot-to-ledger-consistency-no-read-plan', FiscalProductionFinalStateIntegrityController.getSnapshotToLedgerConsistencyNoReadPlan);
router.get('/attestation-consistency-no-persistence-review', FiscalProductionFinalStateIntegrityController.getAttestationConsistencyNoPersistenceReview);
router.get('/final-state-diff-no-payload-matrix', FiscalProductionFinalStateIntegrityController.getFinalStateDiffNoPayloadMatrix);
router.get('/final-state-completeness-no-read-matrix', FiscalProductionFinalStateIntegrityController.getFinalStateCompletenessNoReadMatrix);
router.get('/final-state-lineage-no-external-verify-plan', FiscalProductionFinalStateIntegrityController.getFinalStateLineageNoExternalVerifyPlan);
router.get('/final-state-digest-no-hash-plan', FiscalProductionFinalStateIntegrityController.getFinalStateDigestNoHashPlan);
router.get('/final-state-signature-no-verify-plan', FiscalProductionFinalStateIntegrityController.getFinalStateSignatureNoVerifyPlan);
router.get('/final-state-proof-no-create-plan', FiscalProductionFinalStateIntegrityController.getFinalStateProofNoCreatePlan);
router.get('/no-real-integrity-verification-evidence', FiscalProductionFinalStateIntegrityController.getNoRealIntegrityVerificationEvidence);
router.get('/no-real-consistency-persistence-evidence', FiscalProductionFinalStateIntegrityController.getNoRealConsistencyPersistenceEvidence);
router.get('/no-real-final-state-proof-evidence', FiscalProductionFinalStateIntegrityController.getNoRealFinalStateProofEvidence);
router.get('/dependency-matrix', FiscalProductionFinalStateIntegrityController.getDependencyMatrix);
router.get('/blockers', FiscalProductionFinalStateIntegrityController.getBlockers);
router.get('/risks', FiscalProductionFinalStateIntegrityController.getRisks);
router.post('/validate', FiscalProductionFinalStateIntegrityController.validate);
router.post('/evaluate', FiscalProductionFinalStateIntegrityController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalStateIntegrityController.simulateDecision);
router.get('/report', FiscalProductionFinalStateIntegrityController.getReport);
router.get('/audit', FiscalProductionFinalStateIntegrityController.getAudit);
router.get('/health', FiscalProductionFinalStateIntegrityController.getHealth);

export const fiscalProductionFinalStateIntegrityRoutes = router;
