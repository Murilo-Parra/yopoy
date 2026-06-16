import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRouteCanaryShadowController } from './FiscalRouteCanaryShadowController';
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

router.get('/policy', FiscalRouteCanaryShadowController.getPolicy);
router.get('/canary-scope-simulation', FiscalRouteCanaryShadowController.getCanaryScopeSimulation);
router.get('/shadow-traffic-plan', FiscalRouteCanaryShadowController.getShadowTrafficPlan);
router.get('/traffic-mirror-approval-gate', FiscalRouteCanaryShadowController.getTrafficMirrorApprovalGate);
router.get('/canary-eligibility', FiscalRouteCanaryShadowController.getCanaryEligibility);
router.get('/mirror-safety-checklist', FiscalRouteCanaryShadowController.getMirrorSafetyChecklist);
router.get('/shadow-no-capture-evidence', FiscalRouteCanaryShadowController.getShadowNoCaptureEvidence);
router.get('/canary-rollback-readiness', FiscalRouteCanaryShadowController.getCanaryRollbackReadiness);
router.get('/dependency-matrix', FiscalRouteCanaryShadowController.getDependencyMatrix);
router.get('/blockers', FiscalRouteCanaryShadowController.getBlockers);
router.get('/risks', FiscalRouteCanaryShadowController.getRisks);
router.post('/validate', FiscalRouteCanaryShadowController.validate);
router.post('/evaluate', FiscalRouteCanaryShadowController.evaluate);
router.post('/simulate-decision', FiscalRouteCanaryShadowController.simulateDecision);
router.get('/report', FiscalRouteCanaryShadowController.getReport);
router.get('/audit', FiscalRouteCanaryShadowController.getAudit);
router.get('/health', FiscalRouteCanaryShadowController.getHealth);

export default router;
