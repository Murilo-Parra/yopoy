import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionDeploymentIsolationController } from './FiscalProductionDeploymentIsolationController';
import { requireFiscalAuth } from './helpers';

const router = Router();

function requireAdminRole(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  const user = (req as any).user;
  
  const isAdmin = session?.is_admin === true || session?.is_admin === 1 || 
                  user?.is_admin === true || user?.is_admin === 1 || 
                  session?.role === 'Proprietário' || session?.role === 'Administrador' ||
                  user?.role === 'Proprietário' || user?.role === 'Administrador';
  
  if (!isAdmin) {
    res.status(403).json({ error: 'Acesso restrito. Privilégios administrativos necessários.' });
    return;
  }
  next();
}

router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', FiscalProductionDeploymentIsolationController.getPolicy);
router.get('/production-activation-blueprint', FiscalProductionDeploymentIsolationController.getProductionActivationBlueprint);
router.get('/release-deployment-isolation-contract', FiscalProductionDeploymentIsolationController.getReleaseDeploymentIsolationContract);
router.get('/release-artifact-inventory', FiscalProductionDeploymentIsolationController.getReleaseArtifactInventory);
router.get('/deployment-boundary-plan', FiscalProductionDeploymentIsolationController.getDeploymentBoundaryPlan);
router.get('/traffic-non-activation-plan', FiscalProductionDeploymentIsolationController.getTrafficNonActivationPlan);
router.get('/rollout-isolation-plan', FiscalProductionDeploymentIsolationController.getRolloutIsolationPlan);
router.get('/rollback-isolation-plan', FiscalProductionDeploymentIsolationController.getRollbackIsolationPlan);
router.get('/dependency-matrix', FiscalProductionDeploymentIsolationController.getDependencyMatrix);
router.get('/blockers', FiscalProductionDeploymentIsolationController.getBlockers);
router.get('/risks', FiscalProductionDeploymentIsolationController.getRisks);
router.post('/validate', FiscalProductionDeploymentIsolationController.validate);
router.post('/evaluate', FiscalProductionDeploymentIsolationController.evaluate);
router.post('/simulate-decision', FiscalProductionDeploymentIsolationController.simulateDecision);
router.get('/report', FiscalProductionDeploymentIsolationController.getReport);
router.get('/audit', FiscalProductionDeploymentIsolationController.getAudit);
router.get('/health', FiscalProductionDeploymentIsolationController.getHealth);

export default router;
