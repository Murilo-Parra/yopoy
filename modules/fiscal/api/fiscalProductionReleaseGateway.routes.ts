import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionReleaseGatewayController } from './FiscalProductionReleaseGatewayController';
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

// Exigir autenticação e papel administrativo
router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', FiscalProductionReleaseGatewayController.getPolicy);
router.get('/handshake-plan', FiscalProductionReleaseGatewayController.getHandshakePlan);
router.get('/authorization-dependency', FiscalProductionReleaseGatewayController.getAuthorizationDependency);
router.get('/legal-audit-dependency', FiscalProductionReleaseGatewayController.getLegalAuditDependency);
router.get('/canary-dependency', FiscalProductionReleaseGatewayController.getCanaryDependency);
router.get('/rollback-dependency', FiscalProductionReleaseGatewayController.getRollbackDependency);
router.get('/kill-switch-dependency', FiscalProductionReleaseGatewayController.getKillSwitchDependency);
router.get('/sefaz-readiness', FiscalProductionReleaseGatewayController.getSefazReadiness);
router.get('/blockers', FiscalProductionReleaseGatewayController.getBlockers);
router.get('/risks', FiscalProductionReleaseGatewayController.getRisks);
router.post('/validate', FiscalProductionReleaseGatewayController.validate);
router.post('/evaluate', FiscalProductionReleaseGatewayController.evaluate);
router.post('/simulate-decision', FiscalProductionReleaseGatewayController.simulateDecision);
router.get('/report', FiscalProductionReleaseGatewayController.getReport);
router.get('/audit', FiscalProductionReleaseGatewayController.getAudit);
router.get('/health', FiscalProductionReleaseGatewayController.getHealth);

export default router;
