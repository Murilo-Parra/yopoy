import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRouteProxyDryRunController } from './FiscalRouteProxyDryRunController';
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

router.get('/policy', FiscalRouteProxyDryRunController.getPolicy);
router.get('/proxy-blueprint', FiscalRouteProxyDryRunController.getProxyBlueprint);
router.get('/middleware-simulation', FiscalRouteProxyDryRunController.getMiddlewareSimulation);
router.get('/tap-simulation', FiscalRouteProxyDryRunController.getTapSimulation);
router.get('/conditional-routing-simulation', FiscalRouteProxyDryRunController.getConditionalRoutingSimulation);
router.get('/no-interception-evidence', FiscalRouteProxyDryRunController.getNoInterceptionEvidence);
router.get('/fallback-simulation', FiscalRouteProxyDryRunController.getFallbackSimulation);
router.get('/dependency-matrix', FiscalRouteProxyDryRunController.getDependencyMatrix);
router.get('/blockers', FiscalRouteProxyDryRunController.getBlockers);
router.get('/risks', FiscalRouteProxyDryRunController.getRisks);
router.post('/validate', FiscalRouteProxyDryRunController.validate);
router.post('/evaluate', FiscalRouteProxyDryRunController.evaluate);
router.post('/simulate-decision', FiscalRouteProxyDryRunController.simulateDecision);
router.get('/report', FiscalRouteProxyDryRunController.getReport);
router.get('/audit', FiscalRouteProxyDryRunController.getAudit);
router.get('/health', FiscalRouteProxyDryRunController.getHealth);

export default router;
