import { Router } from 'express';
import { FiscalProductionGoLiveCutoverClosureController } from './FiscalProductionGoLiveCutoverClosureController';

const router = Router();

router.get('/policy', FiscalProductionGoLiveCutoverClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionGoLiveCutoverClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionGoLiveCutoverClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionGoLiveCutoverClosureController.getEvidencePackage);
router.get('/no-activation-handoff', FiscalProductionGoLiveCutoverClosureController.getNoActivationHandoff);
router.get('/post-closure-roadmap', FiscalProductionGoLiveCutoverClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalProductionGoLiveCutoverClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionGoLiveCutoverClosureController.getFinalRisks);
router.post('/validate', FiscalProductionGoLiveCutoverClosureController.validate);
router.post('/evaluate', FiscalProductionGoLiveCutoverClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionGoLiveCutoverClosureController.simulateDecision);
router.get('/report', FiscalProductionGoLiveCutoverClosureController.getReport);
router.get('/audit', FiscalProductionGoLiveCutoverClosureController.getAudit);
router.get('/health', FiscalProductionGoLiveCutoverClosureController.getHealth);

export const fiscalProductionGoLiveCutoverClosureRoutes = router;
