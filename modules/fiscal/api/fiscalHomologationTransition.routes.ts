import { Router, Request, Response, NextFunction } from 'express';
import { FiscalHomologationTransitionController } from './FiscalHomologationTransitionController';
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

router.get('/inventory', FiscalHomologationTransitionController.getInventory);
router.get('/mock-phase-out', FiscalHomologationTransitionController.getMockPhaseOut);
router.get('/dedicated-environment', FiscalHomologationTransitionController.getDedicatedEnvironment);
router.get('/criteria', FiscalHomologationTransitionController.getCriteria);
router.get('/blockers', FiscalHomologationTransitionController.getBlockers);
router.post('/evaluate', FiscalHomologationTransitionController.evaluate);
router.get('/handoff', FiscalHomologationTransitionController.getHandoff);
router.get('/final-report', FiscalHomologationTransitionController.getFinalReport);
router.get('/audit', FiscalHomologationTransitionController.getAudit);
router.get('/health', FiscalHomologationTransitionController.getHealth);

export { router as fiscalHomologationTransitionRoutes };
