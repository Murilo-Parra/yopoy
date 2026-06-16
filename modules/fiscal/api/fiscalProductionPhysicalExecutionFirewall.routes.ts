import { Router } from 'express';
import { FiscalProductionPhysicalExecutionFirewallController } from './FiscalProductionPhysicalExecutionFirewallController';

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

router.get('/policy', FiscalProductionPhysicalExecutionFirewallController.getPolicy);
router.get('/firewall-blueprint', FiscalProductionPhysicalExecutionFirewallController.getFirewallBlueprint);
router.get('/runtime-interlock-contract', FiscalProductionPhysicalExecutionFirewallController.getRuntimeInterlockContract);
router.get('/dependency-inventory', FiscalProductionPhysicalExecutionFirewallController.getDependencyInventory);
router.get('/physical-execution-block-matrix', FiscalProductionPhysicalExecutionFirewallController.getPhysicalExecutionBlockMatrix);
router.get('/runtime-interlock-matrix', FiscalProductionPhysicalExecutionFirewallController.getRuntimeInterlockMatrix);
router.get('/database-transaction-interlock-matrix', FiscalProductionPhysicalExecutionFirewallController.getDatabaseTransactionInterlockMatrix);
router.get('/external-integration-interlock-matrix', FiscalProductionPhysicalExecutionFirewallController.getExternalIntegrationInterlockMatrix);
router.get('/traffic-route-interlock-matrix', FiscalProductionPhysicalExecutionFirewallController.getTrafficRouteInterlockMatrix);
router.get('/authorization-gate-interlock-matrix', FiscalProductionPhysicalExecutionFirewallController.getAuthorizationGateInterlockMatrix);
router.get('/no-physical-runtime-evidence', FiscalProductionPhysicalExecutionFirewallController.getNoPhysicalRuntimeEvidence);
router.get('/blockers', FiscalProductionPhysicalExecutionFirewallController.getBlockers);
router.get('/risks', FiscalProductionPhysicalExecutionFirewallController.getRisks);
router.post('/validate', FiscalProductionPhysicalExecutionFirewallController.validate);
router.post('/evaluate', FiscalProductionPhysicalExecutionFirewallController.evaluate);
router.post('/simulate-decision', FiscalProductionPhysicalExecutionFirewallController.simulateDecision);
router.get('/report', FiscalProductionPhysicalExecutionFirewallController.getReport);
router.get('/audit', FiscalProductionPhysicalExecutionFirewallController.getAudit);
router.get('/health', FiscalProductionPhysicalExecutionFirewallController.getHealth);

export default router;
