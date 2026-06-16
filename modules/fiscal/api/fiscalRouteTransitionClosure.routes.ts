import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRouteTransitionClosureController } from './FiscalRouteTransitionClosureController';
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

router.get('/policy', FiscalRouteTransitionClosureController.getPolicy);
router.get('/closure-inventory', FiscalRouteTransitionClosureController.getClosureInventory);
router.get('/final-checklist', FiscalRouteTransitionClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalRouteTransitionClosureController.getEvidencePackage);
router.get('/production-handoff', FiscalRouteTransitionClosureController.getProductionHandoff);
router.get('/post-closure-roadmap', FiscalRouteTransitionClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalRouteTransitionClosureController.getFinalBlockers);
router.get('/final-risks', FiscalRouteTransitionClosureController.getFinalRisks);
router.post('/validate', FiscalRouteTransitionClosureController.validate);
router.post('/evaluate', FiscalRouteTransitionClosureController.evaluate);
router.post('/simulate-decision', FiscalRouteTransitionClosureController.simulateDecision);
router.get('/report', FiscalRouteTransitionClosureController.getReport);
router.get('/audit', FiscalRouteTransitionClosureController.getAudit);
router.get('/health', FiscalRouteTransitionClosureController.getHealth);

export default router;
