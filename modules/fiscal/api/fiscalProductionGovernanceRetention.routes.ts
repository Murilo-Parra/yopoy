import { Router } from 'express';
import { FiscalProductionGovernanceRetentionController } from './FiscalProductionGovernanceRetentionController';

const router = Router();

router.get('/policy', FiscalProductionGovernanceRetentionController.getPolicy);
router.get('/retention-blueprint', FiscalProductionGovernanceRetentionController.getRetentionBlueprint);
router.get('/dormant-custody-non-mutation-contract', FiscalProductionGovernanceRetentionController.getDormantCustodyNonMutationContract);
router.get('/retention-scope-inventory', FiscalProductionGovernanceRetentionController.getRetentionScopeInventory);
router.get('/dormancy-scope-inventory', FiscalProductionGovernanceRetentionController.getDormancyScopeInventory);
router.get('/retention-lifecycle-no-mutation-matrix', FiscalProductionGovernanceRetentionController.getRetentionLifecycleNoMutationMatrix);
router.get('/custody-state-no-persistence-plan', FiscalProductionGovernanceRetentionController.getCustodyStateNoPersistencePlan);
router.get('/legal-hold-no-apply-plan', FiscalProductionGovernanceRetentionController.getLegalHoldNoApplyPlan);
router.get('/expiration-deletion-no-execute-matrix', FiscalProductionGovernanceRetentionController.getExpirationDeletionNoExecuteMatrix);
router.get('/archive-movement-no-op-plan', FiscalProductionGovernanceRetentionController.getArchiveMovementNoOpPlan);
router.get('/retention-evidence-reference-no-read-matrix', FiscalProductionGovernanceRetentionController.getRetentionEvidenceReferenceNoReadMatrix);
router.get('/retention-no-hash-no-signature-plan', FiscalProductionGovernanceRetentionController.getRetentionNoHashNoSignaturePlan);
router.get('/no-real-retention-evidence', FiscalProductionGovernanceRetentionController.getNoRealRetentionEvidence);
router.get('/no-real-custody-evidence', FiscalProductionGovernanceRetentionController.getNoRealCustodyEvidence);
router.get('/no-real-lifecycle-mutation-evidence', FiscalProductionGovernanceRetentionController.getNoRealLifecycleMutationEvidence);
router.get('/dependency-matrix', FiscalProductionGovernanceRetentionController.getDependencyMatrix);
router.get('/blockers', FiscalProductionGovernanceRetentionController.getBlockers);
router.get('/risks', FiscalProductionGovernanceRetentionController.getRisks);
router.post('/validate', FiscalProductionGovernanceRetentionController.validate);
router.post('/evaluate', FiscalProductionGovernanceRetentionController.evaluate);
router.post('/simulate-decision', FiscalProductionGovernanceRetentionController.simulateDecision);
router.get('/report', FiscalProductionGovernanceRetentionController.getReport);
router.get('/audit', FiscalProductionGovernanceRetentionController.getAudit);
router.get('/health', FiscalProductionGovernanceRetentionController.getHealth);

export const fiscalProductionGovernanceRetentionRoutes = router;
