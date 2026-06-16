import { Router, Request, Response, NextFunction } from 'express';
import { FiscalHomologationBlueprintController } from './FiscalHomologationBlueprintController';
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

router.get('/environments', FiscalHomologationBlueprintController.getEnvironments);
router.get('/isolation', FiscalHomologationBlueprintController.getIsolation);
router.get('/certificates', FiscalHomologationBlueprintController.getCertificates);
router.get('/xml', FiscalHomologationBlueprintController.getXml);
router.get('/danfe', FiscalHomologationBlueprintController.getDanfe);
router.get('/runbook', FiscalHomologationBlueprintController.getRunbook);
router.get('/risks', FiscalHomologationBlueprintController.getRisks);
router.post('/evaluate', FiscalHomologationBlueprintController.evaluate);
router.get('/handoff', FiscalHomologationBlueprintController.getHandoff);
router.get('/final-report', FiscalHomologationBlueprintController.getFinalReport);
router.get('/audit', FiscalHomologationBlueprintController.getAudit);
router.get('/health', FiscalHomologationBlueprintController.getHealth);

export { router as fiscalHomologationBlueprintRoutes };
