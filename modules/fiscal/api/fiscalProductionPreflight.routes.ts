import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionPreflightController } from './FiscalProductionPreflightController';
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

router.get('/policy', FiscalProductionPreflightController.getPolicy);
router.get('/deployment-readiness-checklist', FiscalProductionPreflightController.getDeploymentReadinessChecklist);
router.get('/environment-readiness', FiscalProductionPreflightController.getEnvironmentReadiness);
router.get('/artifact-readiness', FiscalProductionPreflightController.getArtifactReadiness);
router.get('/cutover-readiness', FiscalProductionPreflightController.getCutoverReadiness);
router.get('/rollback-readiness', FiscalProductionPreflightController.getRollbackReadiness);
router.get('/traffic-readiness', FiscalProductionPreflightController.getTrafficReadiness);
router.get('/security-boundary-check', FiscalProductionPreflightController.getSecurityBoundaryCheck);
router.get('/dependency-matrix', FiscalProductionPreflightController.getDependencyMatrix);
router.get('/blockers', FiscalProductionPreflightController.getBlockers);
router.get('/risks', FiscalProductionPreflightController.getRisks);
router.post('/validate', FiscalProductionPreflightController.validate);
router.post('/evaluate', FiscalProductionPreflightController.evaluate);
router.post('/simulate-decision', FiscalProductionPreflightController.simulateDecision);
router.get('/report', FiscalProductionPreflightController.getReport);
router.get('/audit', FiscalProductionPreflightController.getAudit);
router.get('/health', FiscalProductionPreflightController.getHealth);

export default router;
