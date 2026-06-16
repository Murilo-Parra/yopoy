import { Router, Request, Response, NextFunction } from 'express';
import { FiscalDedicatedSimulationController } from './FiscalDedicatedSimulationController';
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

router.get('/policy', FiscalDedicatedSimulationController.getPolicy);
router.get('/runtime', FiscalDedicatedSimulationController.getRuntime);
router.get('/database', FiscalDedicatedSimulationController.getDatabase);
router.get('/vault', FiscalDedicatedSimulationController.getVault);
router.get('/certificate', FiscalDedicatedSimulationController.getCertificate);
router.get('/sefaz', FiscalDedicatedSimulationController.getSefaz);
router.get('/xml-signer', FiscalDedicatedSimulationController.getXmlSigner);
router.get('/danfe', FiscalDedicatedSimulationController.getDanfe);
router.get('/observability', FiscalDedicatedSimulationController.getObservability);
router.get('/rollback', FiscalDedicatedSimulationController.getRollback);
router.post('/run', FiscalDedicatedSimulationController.runSimulation);
router.get('/report', FiscalDedicatedSimulationController.getReport);
router.get('/audit', FiscalDedicatedSimulationController.getAudit);
router.get('/health', FiscalDedicatedSimulationController.getHealth);

export { router as fiscalDedicatedSimulationRoutes };
