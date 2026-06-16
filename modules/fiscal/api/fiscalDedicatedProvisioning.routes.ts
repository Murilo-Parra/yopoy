import { Router, Request, Response, NextFunction } from 'express';
import { FiscalDedicatedProvisioningController } from './FiscalDedicatedProvisioningController';
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

router.get('/policy', FiscalDedicatedProvisioningController.getPolicy);
router.post('/validate-network', FiscalDedicatedProvisioningController.validateNetwork);
router.post('/validate-database', FiscalDedicatedProvisioningController.validateDatabase);
router.post('/validate-secrets', FiscalDedicatedProvisioningController.validateSecrets);
router.post('/validate-certificates', FiscalDedicatedProvisioningController.validateCertificates);
router.post('/validate-sefaz', FiscalDedicatedProvisioningController.validateSefaz);
router.post('/validate-xml-signer', FiscalDedicatedProvisioningController.validateXmlSigner);
router.post('/validate-danfe', FiscalDedicatedProvisioningController.validateDanfe);
router.post('/validate-observability', FiscalDedicatedProvisioningController.validateObservability);
router.post('/validate-rollback', FiscalDedicatedProvisioningController.validateRollback);
router.post('/dry-run', FiscalDedicatedProvisioningController.dryRun);
router.get('/report', FiscalDedicatedProvisioningController.getReport);
router.get('/audit', FiscalDedicatedProvisioningController.getAudit);
router.get('/health', FiscalDedicatedProvisioningController.getHealth);

export { router as fiscalDedicatedProvisioningRoutes };
