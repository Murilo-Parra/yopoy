import { Router } from 'express';
import { FiscalProductionActivationControlPlaneController } from './FiscalProductionActivationControlPlaneController';

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

router.get('/policy', FiscalProductionActivationControlPlaneController.getPolicy);
router.get('/control-plane-blueprint', FiscalProductionActivationControlPlaneController.getControlPlaneBlueprint);
router.get('/physical-execution-prohibition-contract', FiscalProductionActivationControlPlaneController.getPhysicalExecutionProhibitionContract);
router.get('/dependency-inventory', FiscalProductionActivationControlPlaneController.getDependencyInventory);
router.get('/authorization-no-op-matrix', FiscalProductionActivationControlPlaneController.getAuthorizationNoOpMatrix);
router.get('/traffic-mutation-prohibition-plan', FiscalProductionActivationControlPlaneController.getTrafficMutationProhibitionPlan);
router.get('/runtime-execution-prohibition-plan', FiscalProductionActivationControlPlaneController.getRuntimeExecutionProhibitionPlan);
router.get('/data-mutation-prohibition-plan', FiscalProductionActivationControlPlaneController.getDataMutationProhibitionPlan);
router.get('/external-integration-prohibition-plan', FiscalProductionActivationControlPlaneController.getExternalIntegrationProhibitionPlan);
router.get('/activation-precondition-matrix', FiscalProductionActivationControlPlaneController.getActivationPreconditionMatrix);
router.get('/no-physical-execution-evidence', FiscalProductionActivationControlPlaneController.getNoPhysicalExecutionEvidence);
router.get('/blockers', FiscalProductionActivationControlPlaneController.getBlockers);
router.get('/risks', FiscalProductionActivationControlPlaneController.getRisks);
router.post('/validate', FiscalProductionActivationControlPlaneController.validate);
router.post('/evaluate', FiscalProductionActivationControlPlaneController.evaluate);
router.post('/simulate-decision', FiscalProductionActivationControlPlaneController.simulateDecision);
router.get('/report', FiscalProductionActivationControlPlaneController.getReport);
router.get('/audit', FiscalProductionActivationControlPlaneController.getAudit);
router.get('/health', FiscalProductionActivationControlPlaneController.getHealth);

export default router;
