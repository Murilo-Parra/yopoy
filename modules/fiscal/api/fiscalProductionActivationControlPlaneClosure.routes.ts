import { Router } from 'express';
import { FiscalProductionActivationControlPlaneClosureController } from './FiscalProductionActivationControlPlaneClosureController';

const router = Router();

// Middleware de autenticação mockado para simular exigência
router.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer master-admin-token') {
        const header = req.headers.authorization || '';
        if (!header.includes('master-admin-token')) {
             if (!(req as any).session?.is_admin && !(req as any).user?.is_admin) {
                 return res.status(401).json({ error: 'Unauthorized. Master Admin required.' });
             } 
        }
    }
    next();
});

router.get('/policy', FiscalProductionActivationControlPlaneClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionActivationControlPlaneClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionActivationControlPlaneClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionActivationControlPlaneClosureController.getEvidencePackage);
router.get('/no-activation-handoff', FiscalProductionActivationControlPlaneClosureController.getNoActivationHandoff);
router.get('/post-closure-roadmap', FiscalProductionActivationControlPlaneClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalProductionActivationControlPlaneClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionActivationControlPlaneClosureController.getFinalRisks);
router.post('/validate', FiscalProductionActivationControlPlaneClosureController.validate);
router.post('/evaluate', FiscalProductionActivationControlPlaneClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionActivationControlPlaneClosureController.simulateDecision);
router.get('/report', FiscalProductionActivationControlPlaneClosureController.getReport);
router.get('/audit', FiscalProductionActivationControlPlaneClosureController.getAudit);
router.get('/health', FiscalProductionActivationControlPlaneClosureController.getHealth);

export default router;
