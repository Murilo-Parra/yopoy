import { Router, Request, Response, NextFunction } from 'express';
import { FiscalHomologationMockController } from './FiscalHomologationMockController';
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

router.get('/scenarios', FiscalHomologationMockController.getScenarios);
router.post('/validate', FiscalHomologationMockController.validate);
router.post('/simulate-nfe', FiscalHomologationMockController.simulateNfe);
router.post('/simulate-nfce', FiscalHomologationMockController.simulateNfce);
router.post('/simulate-cancel', FiscalHomologationMockController.simulateCancel);
router.post('/simulate-inutilization', FiscalHomologationMockController.simulateInutilization);
router.post('/simulate-contingency', FiscalHomologationMockController.simulateContingency);
router.get('/report', FiscalHomologationMockController.getReport);
router.get('/audit', FiscalHomologationMockController.getAudit);
router.get('/health', FiscalHomologationMockController.getHealth);

export { router as fiscalHomologationMockRoutes };
