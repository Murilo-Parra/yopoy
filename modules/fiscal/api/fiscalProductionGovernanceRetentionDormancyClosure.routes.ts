import { Router } from 'express';
import { FiscalProductionGovernanceRetentionDormancyClosureController } from './FiscalProductionGovernanceRetentionDormancyClosureController';

const router = Router();

router.get('/policy', FiscalProductionGovernanceRetentionDormancyClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionGovernanceRetentionDormancyClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionGovernanceRetentionDormancyClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionGovernanceRetentionDormancyClosureController.getEvidencePackage);
router.get('/no-retention-no-custody-handoff', FiscalProductionGovernanceRetentionDormancyClosureController.getNoRetentionNoCustodyHandoff);
router.get('/no-lifecycle-mutation-handoff', FiscalProductionGovernanceRetentionDormancyClosureController.getNoLifecycleMutationHandoff);
router.get('/no-access-no-retrieval-handoff', FiscalProductionGovernanceRetentionDormancyClosureController.getNoAccessNoRetrievalHandoff);
router.get('/no-disclosure-no-export-handoff', FiscalProductionGovernanceRetentionDormancyClosureController.getNoDisclosureNoExportHandoff);
router.get('/post-closure-roadmap', FiscalProductionGovernanceRetentionDormancyClosureController.getPostClosureRoadmap);
router.get('/dependency-matrix', FiscalProductionGovernanceRetentionDormancyClosureController.getDependencyMatrix);
router.get('/final-blockers', FiscalProductionGovernanceRetentionDormancyClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionGovernanceRetentionDormancyClosureController.getFinalRisks);
router.post('/validate', FiscalProductionGovernanceRetentionDormancyClosureController.validate);
router.post('/evaluate', FiscalProductionGovernanceRetentionDormancyClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionGovernanceRetentionDormancyClosureController.simulateDecision);
router.get('/report', FiscalProductionGovernanceRetentionDormancyClosureController.getReport);
router.get('/audit', FiscalProductionGovernanceRetentionDormancyClosureController.getAudit);
router.get('/health', FiscalProductionGovernanceRetentionDormancyClosureController.getHealth);

export const fiscalProductionGovernanceRetentionDormancyClosureRoutes = router;
