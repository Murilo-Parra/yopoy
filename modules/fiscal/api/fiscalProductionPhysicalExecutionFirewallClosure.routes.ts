import { Router } from 'express';
import { FiscalProductionPhysicalExecutionFirewallClosureController } from './FiscalProductionPhysicalExecutionFirewallClosureController';

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

router.get('/policy', FiscalProductionPhysicalExecutionFirewallClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionPhysicalExecutionFirewallClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionPhysicalExecutionFirewallClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionPhysicalExecutionFirewallClosureController.getEvidencePackage);
router.get('/no-activation-handoff', FiscalProductionPhysicalExecutionFirewallClosureController.getNoActivationHandoff);
router.get('/post-closure-roadmap', FiscalProductionPhysicalExecutionFirewallClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalProductionPhysicalExecutionFirewallClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionPhysicalExecutionFirewallClosureController.getFinalRisks);
router.post('/validate', FiscalProductionPhysicalExecutionFirewallClosureController.validate);
router.post('/evaluate', FiscalProductionPhysicalExecutionFirewallClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionPhysicalExecutionFirewallClosureController.simulateDecision);
router.get('/report', FiscalProductionPhysicalExecutionFirewallClosureController.getReport);
router.get('/audit', FiscalProductionPhysicalExecutionFirewallClosureController.getAudit);
router.get('/health', FiscalProductionPhysicalExecutionFirewallClosureController.getHealth);

export default router;
