import { Router } from 'express';
import { FiscalProductionOperationsSignatureGovernanceClosureController } from './FiscalProductionOperationsSignatureGovernanceClosureController';

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

router.get('/policy', FiscalProductionOperationsSignatureGovernanceClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionOperationsSignatureGovernanceClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionOperationsSignatureGovernanceClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionOperationsSignatureGovernanceClosureController.getEvidencePackage);
router.get('/no-activation-handoff', FiscalProductionOperationsSignatureGovernanceClosureController.getNoActivationHandoff);
router.get('/post-closure-roadmap', FiscalProductionOperationsSignatureGovernanceClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalProductionOperationsSignatureGovernanceClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionOperationsSignatureGovernanceClosureController.getFinalRisks);
router.post('/validate', FiscalProductionOperationsSignatureGovernanceClosureController.validate);
router.post('/evaluate', FiscalProductionOperationsSignatureGovernanceClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionOperationsSignatureGovernanceClosureController.simulateDecision);
router.get('/report', FiscalProductionOperationsSignatureGovernanceClosureController.getReport);
router.get('/audit', FiscalProductionOperationsSignatureGovernanceClosureController.getAudit);
router.get('/health', FiscalProductionOperationsSignatureGovernanceClosureController.getHealth);

export default router;
