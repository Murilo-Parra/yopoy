import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealProvisioningController } from './FiscalRealProvisioningController';
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

router.get('/policy', FiscalRealProvisioningController.getPolicy);
router.get('/resources', FiscalRealProvisioningController.getResources);
router.get('/state-backend', FiscalRealProvisioningController.getStateBackend);
router.get('/variables', FiscalRealProvisioningController.getVariables);
router.get('/vault-contract', FiscalRealProvisioningController.getVaultContract);
router.post('/validate-iac-plan', FiscalRealProvisioningController.validateIacPlan);
router.post('/validate-secrets', FiscalRealProvisioningController.validateSecrets);
router.post('/validate-certificate-secret', FiscalRealProvisioningController.validateCertificateSecret);
router.post('/validate-access-policy', FiscalRealProvisioningController.validateAccessPolicy);
router.post('/validate-rotation-policy', FiscalRealProvisioningController.validateRotationPolicy);
router.post('/validate-audit-policy', FiscalRealProvisioningController.validateAuditPolicy);
router.post('/dry-run', FiscalRealProvisioningController.dryRun);
router.get('/report', FiscalRealProvisioningController.getReport);
router.get('/audit', FiscalRealProvisioningController.getAudit);
router.get('/health', FiscalRealProvisioningController.getHealth);

export { router as fiscalRealProvisioningRoutes };
