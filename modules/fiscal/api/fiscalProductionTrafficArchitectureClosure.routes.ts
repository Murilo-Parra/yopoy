import { Router } from 'express';
import { FiscalProductionTrafficArchitectureClosureController } from './FiscalProductionTrafficArchitectureClosureController';

const router = Router();

router.get('/policy', FiscalProductionTrafficArchitectureClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionTrafficArchitectureClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionTrafficArchitectureClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionTrafficArchitectureClosureController.getEvidencePackage);
router.get('/no-routing-handoff', FiscalProductionTrafficArchitectureClosureController.getNoRoutingHandoff);
router.get('/post-closure-roadmap', FiscalProductionTrafficArchitectureClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalProductionTrafficArchitectureClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionTrafficArchitectureClosureController.getFinalRisks);
router.post('/validate', FiscalProductionTrafficArchitectureClosureController.validate);
router.post('/evaluate', FiscalProductionTrafficArchitectureClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionTrafficArchitectureClosureController.simulateDecision);
router.get('/report', FiscalProductionTrafficArchitectureClosureController.getReport);
router.get('/audit', FiscalProductionTrafficArchitectureClosureController.getAudit);
router.get('/health', FiscalProductionTrafficArchitectureClosureController.getHealth);

export const fiscalProductionTrafficArchitectureClosureRoutes = router;
