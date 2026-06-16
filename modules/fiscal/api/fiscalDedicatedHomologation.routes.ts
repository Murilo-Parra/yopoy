import { Router, Request, Response, NextFunction } from 'express';
import { FiscalDedicatedHomologationController } from './FiscalDedicatedHomologationController';
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

router.get('/inventory', FiscalDedicatedHomologationController.getInventory);
router.get('/network', FiscalDedicatedHomologationController.getNetwork);
router.get('/database', FiscalDedicatedHomologationController.getDatabase);
router.get('/secrets', FiscalDedicatedHomologationController.getSecrets);
router.get('/certificates', FiscalDedicatedHomologationController.getCertificates);
router.get('/sefaz', FiscalDedicatedHomologationController.getSefaz);
router.get('/xml-signer', FiscalDedicatedHomologationController.getXmlSigner);
router.get('/danfe', FiscalDedicatedHomologationController.getDanfe);
router.get('/observability', FiscalDedicatedHomologationController.getObservability);
router.get('/rollback', FiscalDedicatedHomologationController.getRollback);
router.get('/criteria', FiscalDedicatedHomologationController.getCriteria);
router.get('/blockers', FiscalDedicatedHomologationController.getBlockers);
router.post('/evaluate', FiscalDedicatedHomologationController.evaluate);
router.get('/report', FiscalDedicatedHomologationController.getReport);
router.get('/audit', FiscalDedicatedHomologationController.getAudit);
router.get('/health', FiscalDedicatedHomologationController.getHealth);

export { router as fiscalDedicatedHomologationRoutes };
