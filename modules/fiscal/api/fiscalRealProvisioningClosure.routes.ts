import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealProvisioningClosureController } from './FiscalRealProvisioningClosureController';
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

router.get('/inventory', FiscalRealProvisioningClosureController.getInventory);
router.get('/final-checklist', FiscalRealProvisioningClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalRealProvisioningClosureController.getEvidencePackage);
router.get('/authorization-wrapper', FiscalRealProvisioningClosureController.getAuthorizationWrapper);
router.get('/blockers', FiscalRealProvisioningClosureController.getBlockers);
router.get('/risks', FiscalRealProvisioningClosureController.getRisks);
router.post('/simulate-authorization', FiscalRealProvisioningClosureController.simulateAuthorization);
router.get('/handoff', FiscalRealProvisioningClosureController.getHandoff);
router.get('/report', FiscalRealProvisioningClosureController.getReport);
router.get('/audit', FiscalRealProvisioningClosureController.getAudit);
router.get('/health', FiscalRealProvisioningClosureController.getHealth);

export { router as fiscalRealProvisioningClosureRoutes };
