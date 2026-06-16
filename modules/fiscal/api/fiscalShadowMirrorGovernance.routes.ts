import { Router, Request, Response, NextFunction } from 'express';
import { FiscalShadowMirrorGovernanceController } from './FiscalShadowMirrorGovernanceController';
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

router.get('/inventory', FiscalShadowMirrorGovernanceController.getInventory);
router.get('/guardrails', FiscalShadowMirrorGovernanceController.getGuardrails);
router.get('/risks', FiscalShadowMirrorGovernanceController.getRisks);
router.get('/handoff', FiscalShadowMirrorGovernanceController.getHandoff);
router.get('/final-report', FiscalShadowMirrorGovernanceController.getFinalReport);
router.get('/audit', FiscalShadowMirrorGovernanceController.getAudit);
router.get('/health', FiscalShadowMirrorGovernanceController.getHealth);

export { router as fiscalShadowMirrorGovernanceRoutes };
