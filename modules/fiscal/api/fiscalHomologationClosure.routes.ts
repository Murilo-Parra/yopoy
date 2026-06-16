import { Router, Request, Response, NextFunction } from 'express';
import { FiscalHomologationClosureController } from './FiscalHomologationClosureController';
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

router.get('/inventory', FiscalHomologationClosureController.getInventory);
router.get('/criteria', FiscalHomologationClosureController.getCriteria);
router.get('/evidence-package', FiscalHomologationClosureController.getEvidencePackage);
router.get('/risks', FiscalHomologationClosureController.getRisks);
router.get('/handoff', FiscalHomologationClosureController.getHandoff);
router.get('/final-report', FiscalHomologationClosureController.getFinalReport);
router.get('/audit', FiscalHomologationClosureController.getAudit);
router.get('/health', FiscalHomologationClosureController.getHealth);

export { router as fiscalHomologationClosureRoutes };
