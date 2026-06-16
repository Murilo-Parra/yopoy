import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionDeploymentClosureController } from './FiscalProductionDeploymentClosureController';
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

router.get('/policy', FiscalProductionDeploymentClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionDeploymentClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionDeploymentClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionDeploymentClosureController.getEvidencePackage);
router.get('/final-readiness-review', FiscalProductionDeploymentClosureController.getFinalReadinessReview);
router.get('/no-activation-handoff', FiscalProductionDeploymentClosureController.getNoActivationHandoff);
router.get('/post-closure-roadmap', FiscalProductionDeploymentClosureController.getPostClosureRoadmap);
router.get('/blockers', FiscalProductionDeploymentClosureController.getBlockers);
router.get('/risks', FiscalProductionDeploymentClosureController.getRisks);
router.post('/validate', FiscalProductionDeploymentClosureController.validate);
router.post('/evaluate', FiscalProductionDeploymentClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionDeploymentClosureController.simulateDecision);
router.get('/report', FiscalProductionDeploymentClosureController.getReport);
router.get('/audit', FiscalProductionDeploymentClosureController.getAudit);
router.get('/health', FiscalProductionDeploymentClosureController.getHealth);

export default router;
