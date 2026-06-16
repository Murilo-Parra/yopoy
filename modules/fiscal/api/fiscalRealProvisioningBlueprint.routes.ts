import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealProvisioningBlueprintController } from './FiscalRealProvisioningBlueprintController';
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

router.get('/inventory', FiscalRealProvisioningBlueprintController.getInventory);
router.get('/network', FiscalRealProvisioningBlueprintController.getNetwork);
router.get('/database', FiscalRealProvisioningBlueprintController.getDatabase);
router.get('/secrets', FiscalRealProvisioningBlueprintController.getSecrets);
router.get('/certificate', FiscalRealProvisioningBlueprintController.getCertificate);
router.get('/sefaz', FiscalRealProvisioningBlueprintController.getSefaz);
router.get('/xml-signer', FiscalRealProvisioningBlueprintController.getXmlSigner);
router.get('/danfe', FiscalRealProvisioningBlueprintController.getDanfe);
router.get('/observability', FiscalRealProvisioningBlueprintController.getObservability);
router.get('/rollback', FiscalRealProvisioningBlueprintController.getRollback);
router.get('/responsibilities', FiscalRealProvisioningBlueprintController.getResponsibilities);
router.get('/criteria', FiscalRealProvisioningBlueprintController.getCriteria);
router.get('/blockers', FiscalRealProvisioningBlueprintController.getBlockers);
router.post('/evaluate', FiscalRealProvisioningBlueprintController.evaluate);
router.get('/report', FiscalRealProvisioningBlueprintController.getReport);
router.get('/audit', FiscalRealProvisioningBlueprintController.getAudit);
router.get('/health', FiscalRealProvisioningBlueprintController.getHealth);

export { router as fiscalRealProvisioningBlueprintRoutes };
