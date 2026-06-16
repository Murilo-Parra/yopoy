import { Router, Request, Response, NextFunction } from 'express';
import { FiscalSyntheticRouteDryRunController } from './FiscalSyntheticRouteDryRunController';
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

router.get('/policy', FiscalSyntheticRouteDryRunController.getPolicy);
router.get('/scenario-catalog', FiscalSyntheticRouteDryRunController.getScenarioCatalog);
router.get('/legacy-response-shapes', FiscalSyntheticRouteDryRunController.getLegacyResponseShapes);
router.get('/v2-response-shapes', FiscalSyntheticRouteDryRunController.getV2ResponseShapes);
router.get('/shape-comparator', FiscalSyntheticRouteDryRunController.getShapeComparator);
router.get('/compatibility-matrix', FiscalSyntheticRouteDryRunController.getCompatibilityMatrix);
router.get('/contract-diff', FiscalSyntheticRouteDryRunController.getContractDiff);
router.get('/no-handler-call-evidence', FiscalSyntheticRouteDryRunController.getNoHandlerCallEvidence);
router.get('/blockers', FiscalSyntheticRouteDryRunController.getBlockers);
router.get('/risks', FiscalSyntheticRouteDryRunController.getRisks);
router.post('/validate', FiscalSyntheticRouteDryRunController.validate);
router.post('/evaluate', FiscalSyntheticRouteDryRunController.evaluate);
router.post('/simulate-decision', FiscalSyntheticRouteDryRunController.simulateDecision);
router.get('/report', FiscalSyntheticRouteDryRunController.getReport);
router.get('/audit', FiscalSyntheticRouteDryRunController.getAudit);
router.get('/health', FiscalSyntheticRouteDryRunController.getHealth);

export default router;
