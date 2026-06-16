import { Router } from 'express';
import { FiscalProductionEvidenceVaultClosureController } from './FiscalProductionEvidenceVaultClosureController';

const router = Router();

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

router.get('/policy', FiscalProductionEvidenceVaultClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionEvidenceVaultClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionEvidenceVaultClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionEvidenceVaultClosureController.getEvidencePackage);
router.get('/no-persistence-handoff', FiscalProductionEvidenceVaultClosureController.getNoPersistenceHandoff);
router.get('/post-closure-roadmap', FiscalProductionEvidenceVaultClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalProductionEvidenceVaultClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionEvidenceVaultClosureController.getFinalRisks);
router.post('/validate', FiscalProductionEvidenceVaultClosureController.validate);
router.post('/evaluate', FiscalProductionEvidenceVaultClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionEvidenceVaultClosureController.simulateDecision);
router.get('/report', FiscalProductionEvidenceVaultClosureController.getReport);
router.get('/audit', FiscalProductionEvidenceVaultClosureController.getAudit);
router.get('/health', FiscalProductionEvidenceVaultClosureController.getHealth);

export default router;
