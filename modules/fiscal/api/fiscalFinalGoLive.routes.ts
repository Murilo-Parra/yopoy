import { Router, Request, Response, NextFunction } from 'express';
import { FiscalFinalGoLiveController } from './FiscalFinalGoLiveController';
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

router.get('/policy', FiscalFinalGoLiveController.getPolicy);
router.get('/blueprint', FiscalFinalGoLiveController.getBlueprint);
router.get('/dependency-inventory', FiscalFinalGoLiveController.getDependencyInventory);
router.get('/readiness-checklist', FiscalFinalGoLiveController.getReadinessChecklist);
router.get('/activation-contract', FiscalFinalGoLiveController.getActivationContract);
router.get('/traffic-freeze-plan', FiscalFinalGoLiveController.getTrafficFreezePlan);
router.get('/legal-dependencies', FiscalFinalGoLiveController.getLegalDependencies);
router.get('/operational-dependencies', FiscalFinalGoLiveController.getOperationalDependencies);
router.get('/production-dependencies', FiscalFinalGoLiveController.getProductionDependencies);
router.get('/blockers', FiscalFinalGoLiveController.getBlockers);
router.get('/risks', FiscalFinalGoLiveController.getRisks);
router.post('/validate', FiscalFinalGoLiveController.validate);
router.post('/evaluate', FiscalFinalGoLiveController.evaluate);
router.post('/simulate-decision', FiscalFinalGoLiveController.simulateDecision);
router.get('/report', FiscalFinalGoLiveController.getReport);
router.get('/audit', FiscalFinalGoLiveController.getAudit);
router.get('/health', FiscalFinalGoLiveController.getHealth);

export default router;
