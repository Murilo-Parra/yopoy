import { Router } from 'express';
import { FiscalProductionFinalStateSnapshotController } from './FiscalProductionFinalStateSnapshotController';

const router = Router();

router.get('/policy', FiscalProductionFinalStateSnapshotController.getPolicy);
router.get('/final-state-snapshot-blueprint', FiscalProductionFinalStateSnapshotController.getFinalStateSnapshotBlueprint);
router.get('/virtual-ledger-entry-simulation', FiscalProductionFinalStateSnapshotController.getVirtualLedgerEntrySimulation);
router.get('/no-activation-attestation-envelope', FiscalProductionFinalStateSnapshotController.getNoActivationAttestationEnvelope);
router.get('/snapshot-timestamp-no-authority-matrix', FiscalProductionFinalStateSnapshotController.getSnapshotTimestampNoAuthorityMatrix);
router.get('/snapshot-completeness-review-matrix', FiscalProductionFinalStateSnapshotController.getSnapshotCompletenessReviewMatrix);
router.get('/snapshot-lineage-no-verify-matrix', FiscalProductionFinalStateSnapshotController.getSnapshotLineageNoVerifyMatrix);
router.get('/snapshot-no-persistence-plan', FiscalProductionFinalStateSnapshotController.getSnapshotNoPersistencePlan);
router.get('/attestation-no-persistence-plan', FiscalProductionFinalStateSnapshotController.getAttestationNoPersistencePlan);
router.get('/snapshot-no-real-hash-plan', FiscalProductionFinalStateSnapshotController.getSnapshotNoRealHashPlan);
router.get('/snapshot-no-real-signature-plan', FiscalProductionFinalStateSnapshotController.getSnapshotNoRealSignaturePlan);
router.get('/snapshot-no-legal-proof-notice', FiscalProductionFinalStateSnapshotController.getSnapshotNoLegalProofNotice);
router.get('/no-real-ledger-entry-evidence', FiscalProductionFinalStateSnapshotController.getNoRealLedgerEntryEvidence);
router.get('/no-real-snapshot-persistence-evidence', FiscalProductionFinalStateSnapshotController.getNoRealSnapshotPersistenceEvidence);
router.get('/no-real-attestation-persistence-evidence', FiscalProductionFinalStateSnapshotController.getNoRealAttestationPersistenceEvidence);
router.get('/dependency-matrix', FiscalProductionFinalStateSnapshotController.getDependencyMatrix);
router.get('/blockers', FiscalProductionFinalStateSnapshotController.getBlockers);
router.get('/risks', FiscalProductionFinalStateSnapshotController.getRisks);
router.post('/validate', FiscalProductionFinalStateSnapshotController.validate);
router.post('/evaluate', FiscalProductionFinalStateSnapshotController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalStateSnapshotController.simulateDecision);
router.get('/report', FiscalProductionFinalStateSnapshotController.getReport);
router.get('/audit', FiscalProductionFinalStateSnapshotController.getAudit);
router.get('/health', FiscalProductionFinalStateSnapshotController.getHealth);

export const fiscalProductionFinalStateSnapshotRoutes = router;
