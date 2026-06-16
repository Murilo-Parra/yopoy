import { Router } from 'express';
import { FiscalProductionRetentionLifecycleDriftController } from './FiscalProductionRetentionLifecycleDriftController';

const router = Router();

router.get('/policy', FiscalProductionRetentionLifecycleDriftController.getPolicy);
router.get('/lifecycle-drift-review-blueprint', FiscalProductionRetentionLifecycleDriftController.getLifecycleDriftReviewBlueprint);
router.get('/lifecycle-drift-simulation-matrix', FiscalProductionRetentionLifecycleDriftController.getLifecycleDriftSimulationMatrix);
router.get('/expiration-window-no-evaluate-plan', FiscalProductionRetentionLifecycleDriftController.getExpirationWindowNoEvaluatePlan);
router.get('/deletion-eligibility-no-execute-matrix', FiscalProductionRetentionLifecycleDriftController.getDeletionEligibilityNoExecuteMatrix);
router.get('/dormancy-continuity-no-mutation-plan', FiscalProductionRetentionLifecycleDriftController.getDormancyContinuityNoMutationPlan);
router.get('/retention-policy-version-no-apply-matrix', FiscalProductionRetentionLifecycleDriftController.getRetentionPolicyVersionNoApplyMatrix);
router.get('/archive-state-transition-no-op-plan', FiscalProductionRetentionLifecycleDriftController.getArchiveStateTransitionNoOpPlan);
router.get('/custody-state-drift-no-persistence-matrix', FiscalProductionRetentionLifecycleDriftController.getCustodyStateDriftNoPersistenceMatrix);
router.get('/lifecycle-drift-no-record-plan', FiscalProductionRetentionLifecycleDriftController.getLifecycleDriftNoRecordPlan);
router.get('/retention-drift-notice-no-notification-plan', FiscalProductionRetentionLifecycleDriftController.getRetentionDriftNoticeNoNotificationPlan);
router.get('/no-real-expiration-evidence', FiscalProductionRetentionLifecycleDriftController.getNoRealExpirationEvidence);
router.get('/no-real-deletion-execution-evidence', FiscalProductionRetentionLifecycleDriftController.getNoRealDeletionExecutionEvidence);
router.get('/no-real-lifecycle-drift-mutation-evidence', FiscalProductionRetentionLifecycleDriftController.getNoRealLifecycleDriftMutationEvidence);
router.get('/dependency-matrix', FiscalProductionRetentionLifecycleDriftController.getDependencyMatrix);
router.get('/blockers', FiscalProductionRetentionLifecycleDriftController.getBlockers);
router.get('/risks', FiscalProductionRetentionLifecycleDriftController.getRisks);
router.post('/validate', FiscalProductionRetentionLifecycleDriftController.validate);
router.post('/evaluate', FiscalProductionRetentionLifecycleDriftController.evaluate);
router.post('/simulate-decision', FiscalProductionRetentionLifecycleDriftController.simulateDecision);
router.get('/report', FiscalProductionRetentionLifecycleDriftController.getReport);
router.get('/audit', FiscalProductionRetentionLifecycleDriftController.getAudit);
router.get('/health', FiscalProductionRetentionLifecycleDriftController.getHealth);

export const fiscalProductionRetentionLifecycleDriftRoutes = router;
