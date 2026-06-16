import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealProvisioningSecurityController } from './FiscalRealProvisioningSecurityController';
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

router.get('/policy', FiscalRealProvisioningSecurityController.getPolicy);
router.get('/checklist', FiscalRealProvisioningSecurityController.getChecklist);
router.get('/approval-matrix', FiscalRealProvisioningSecurityController.getApprovalMatrix);
router.get('/segregation-of-duties', FiscalRealProvisioningSecurityController.getSegregationOfDuties);
router.get('/blockers', FiscalRealProvisioningSecurityController.getBlockers);
router.get('/risks', FiscalRealProvisioningSecurityController.getRisks);
router.post('/evaluate', FiscalRealProvisioningSecurityController.evaluate);
router.post('/simulate-approval', FiscalRealProvisioningSecurityController.simulateApproval);
router.get('/report', FiscalRealProvisioningSecurityController.getReport);
router.get('/audit', FiscalRealProvisioningSecurityController.getAudit);
router.get('/health', FiscalRealProvisioningSecurityController.getHealth);

export { router as fiscalRealProvisioningSecurityRoutes };
