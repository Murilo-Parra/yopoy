import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRouteTransitionController } from './FiscalRouteTransitionController';
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

router.get('/policy', FiscalRouteTransitionController.getPolicy);
router.get('/blueprint', FiscalRouteTransitionController.getBlueprint);
router.get('/legacy-route-inventory', FiscalRouteTransitionController.getLegacyRouteInventory);
router.get('/v2-route-readiness', FiscalRouteTransitionController.getV2RouteReadiness);
router.get('/legacy-preservation-contract', FiscalRouteTransitionController.getLegacyPreservationContract);
router.get('/no-interception-contract', FiscalRouteTransitionController.getNoInterceptionContract);
router.get('/fallback-plan', FiscalRouteTransitionController.getFallbackPlan);
router.get('/dependency-matrix', FiscalRouteTransitionController.getDependencyMatrix);
router.get('/blockers', FiscalRouteTransitionController.getBlockers);
router.get('/risks', FiscalRouteTransitionController.getRisks);
router.post('/validate', FiscalRouteTransitionController.validate);
router.post('/evaluate', FiscalRouteTransitionController.evaluate);
router.post('/simulate-decision', FiscalRouteTransitionController.simulateDecision);
router.get('/report', FiscalRouteTransitionController.getReport);
router.get('/audit', FiscalRouteTransitionController.getAudit);
router.get('/health', FiscalRouteTransitionController.getHealth);

export default router;
