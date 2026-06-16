import { Router } from 'express';
import { FiscalProductionPostSealDormantStateClosureController } from './FiscalProductionPostSealDormantStateClosureController';

const router = Router();

// Middleware to mock admin authentication and authorization
router.use((req, res, next) => {
  // In a real application, proper JWT and RBAC handling would take place here
  (req as any).user = { id: 'admin-evaluator', role: 'Master Admin' };
  next();
});

router.get('/policy', FiscalProductionPostSealDormantStateClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionPostSealDormantStateClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionPostSealDormantStateClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionPostSealDormantStateClosureController.getEvidencePackage);
router.get('/no-reentry-no-resumption-handoff', FiscalProductionPostSealDormantStateClosureController.getNoReentryNoResumptionHandoff);
router.get('/no-authority-no-activation-handoff', FiscalProductionPostSealDormantStateClosureController.getNoAuthorityNoActivationHandoff);
router.get('/no-runtime-no-database-handoff', FiscalProductionPostSealDormantStateClosureController.getNoRuntimeNoDatabaseHandoff);
router.get('/no-external-integration-no-sensitive-data-handoff', FiscalProductionPostSealDormantStateClosureController.getNoExternalIntegrationNoSensitiveDataHandoff);
router.get('/post-closure-roadmap', FiscalProductionPostSealDormantStateClosureController.getPostClosureRoadmap);
router.get('/dependency-matrix', FiscalProductionPostSealDormantStateClosureController.getDependencyMatrix);
router.get('/final-blockers', FiscalProductionPostSealDormantStateClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionPostSealDormantStateClosureController.getFinalRisks);
router.post('/validate', FiscalProductionPostSealDormantStateClosureController.validate);
router.post('/evaluate', FiscalProductionPostSealDormantStateClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionPostSealDormantStateClosureController.simulateDecision);
router.get('/report', FiscalProductionPostSealDormantStateClosureController.getReport);
router.get('/audit', FiscalProductionPostSealDormantStateClosureController.getAudit);
router.get('/health', FiscalProductionPostSealDormantStateClosureController.getHealth);

export default router;
