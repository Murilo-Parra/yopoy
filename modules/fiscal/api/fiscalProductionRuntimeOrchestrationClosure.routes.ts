import { Router } from 'express';
import { FiscalProductionRuntimeOrchestrationClosureController } from './FiscalProductionRuntimeOrchestrationClosureController';

const router = Router();

router.get('/policy', FiscalProductionRuntimeOrchestrationClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionRuntimeOrchestrationClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionRuntimeOrchestrationClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionRuntimeOrchestrationClosureController.getEvidencePackage);
router.get('/no-execution-handoff', FiscalProductionRuntimeOrchestrationClosureController.getNoExecutionHandoff);
router.get('/post-closure-roadmap', FiscalProductionRuntimeOrchestrationClosureController.getPostClosureRoadmap);
router.get('/namespace-collision-review', FiscalProductionRuntimeOrchestrationClosureController.getNamespaceCollisionReview);
router.get('/lint-ts2308-known-issues', FiscalProductionRuntimeOrchestrationClosureController.getLintTs2308KnownIssues);
router.get('/final-blockers', FiscalProductionRuntimeOrchestrationClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionRuntimeOrchestrationClosureController.getFinalRisks);
router.post('/validate', FiscalProductionRuntimeOrchestrationClosureController.validate);
router.post('/evaluate', FiscalProductionRuntimeOrchestrationClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionRuntimeOrchestrationClosureController.simulateDecision);
router.get('/report', FiscalProductionRuntimeOrchestrationClosureController.getReport);
router.get('/audit', FiscalProductionRuntimeOrchestrationClosureController.getAudit);
router.get('/health', FiscalProductionRuntimeOrchestrationClosureController.getHealth);

export const fiscalProductionRuntimeOrchestrationClosureRoutes = router;
