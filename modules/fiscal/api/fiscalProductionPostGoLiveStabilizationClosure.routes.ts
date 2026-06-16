import { Router } from 'express';
import { FiscalProductionPostGoLiveStabilizationClosureController } from './FiscalProductionPostGoLiveStabilizationClosureController';

const router = Router();

router.get('/policy', FiscalProductionPostGoLiveStabilizationClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionPostGoLiveStabilizationClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionPostGoLiveStabilizationClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionPostGoLiveStabilizationClosureController.getEvidencePackage);
router.get('/no-activation-handoff', FiscalProductionPostGoLiveStabilizationClosureController.getNoActivationHandoff);
router.get('/post-closure-roadmap', FiscalProductionPostGoLiveStabilizationClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalProductionPostGoLiveStabilizationClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionPostGoLiveStabilizationClosureController.getFinalRisks);
router.post('/validate', FiscalProductionPostGoLiveStabilizationClosureController.validate);
router.post('/evaluate', FiscalProductionPostGoLiveStabilizationClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionPostGoLiveStabilizationClosureController.simulateDecision);
router.get('/report', FiscalProductionPostGoLiveStabilizationClosureController.getReport);
router.get('/audit', FiscalProductionPostGoLiveStabilizationClosureController.getAudit);
router.get('/health', FiscalProductionPostGoLiveStabilizationClosureController.getHealth);

export const fiscalProductionPostGoLiveStabilizationClosureRoutes = router;
