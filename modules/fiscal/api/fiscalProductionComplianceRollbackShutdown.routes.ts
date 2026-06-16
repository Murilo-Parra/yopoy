import { Router } from 'express';
import { FiscalProductionComplianceRollbackShutdownController } from './FiscalProductionComplianceRollbackShutdownController';

const router = Router();

router.get('/policy', FiscalProductionComplianceRollbackShutdownController.getPolicy);
router.get('/rollback-no-op-blueprint', FiscalProductionComplianceRollbackShutdownController.getRollbackNoOpBlueprint);
router.get('/v2-shutdown-no-op-contract', FiscalProductionComplianceRollbackShutdownController.getV2ShutdownNoOpContract);
router.get('/rollback-eligibility-simulation-matrix', FiscalProductionComplianceRollbackShutdownController.getRollbackEligibilitySimulationMatrix);
router.get('/v2-shutdown-trigger-no-execute-matrix', FiscalProductionComplianceRollbackShutdownController.getV2ShutdownTriggerNoExecuteMatrix);
router.get('/legacy-continuity-during-rollback-plan', FiscalProductionComplianceRollbackShutdownController.getLegacyContinuityDuringRollbackPlan);
router.get('/traffic-reversion-no-op-plan', FiscalProductionComplianceRollbackShutdownController.getTrafficReversionNoOpPlan);
router.get('/regulatory-rollback-evidence-simulation-matrix', FiscalProductionComplianceRollbackShutdownController.getRegulatoryRollbackEvidenceSimulationMatrix);
router.get('/post-rollback-compliance-review-no-persistence-plan', FiscalProductionComplianceRollbackShutdownController.getPostRollbackComplianceReviewNoPersistencePlan);
router.get('/no-real-rollback-evidence', FiscalProductionComplianceRollbackShutdownController.getNoRealRollbackEvidence);
router.get('/no-real-v2-shutdown-evidence', FiscalProductionComplianceRollbackShutdownController.getNoRealV2ShutdownEvidence);
router.get('/dependency-matrix', FiscalProductionComplianceRollbackShutdownController.getDependencyMatrix);
router.get('/blockers', FiscalProductionComplianceRollbackShutdownController.getBlockers);
router.get('/risks', FiscalProductionComplianceRollbackShutdownController.getRisks);
router.post('/validate', FiscalProductionComplianceRollbackShutdownController.validate);
router.post('/evaluate', FiscalProductionComplianceRollbackShutdownController.evaluate);
router.post('/simulate-decision', FiscalProductionComplianceRollbackShutdownController.simulateDecision);
router.get('/report', FiscalProductionComplianceRollbackShutdownController.getReport);
router.get('/audit', FiscalProductionComplianceRollbackShutdownController.getAudit);
router.get('/health', FiscalProductionComplianceRollbackShutdownController.getHealth);

export const fiscalProductionComplianceRollbackShutdownRoutes = router;
