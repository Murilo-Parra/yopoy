import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionFinalAuthorizationController } from './FiscalProductionFinalAuthorizationController';
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

router.get('/policy', FiscalProductionFinalAuthorizationController.getPolicy);
router.get('/final-authorization-package', FiscalProductionFinalAuthorizationController.getFinalAuthorizationPackage);
router.get('/authorization-envelope', FiscalProductionFinalAuthorizationController.getAuthorizationEnvelope);
router.get('/locked-gate-readiness-review', FiscalProductionFinalAuthorizationController.getLockedGateReadinessReview);
router.get('/gate-unlock-no-op-evidence', FiscalProductionFinalAuthorizationController.getGateUnlockNoOpEvidence);
router.get('/sod-final-check', FiscalProductionFinalAuthorizationController.getSoDFinalCheck);
router.get('/authorization-decision-package', FiscalProductionFinalAuthorizationController.getAuthorizationDecisionPackage);
router.get('/locked-gate-handoff', FiscalProductionFinalAuthorizationController.getLockedGateHandoff);
router.get('/dependency-matrix', FiscalProductionFinalAuthorizationController.getDependencyMatrix);
router.get('/blockers', FiscalProductionFinalAuthorizationController.getBlockers);
router.get('/risks', FiscalProductionFinalAuthorizationController.getRisks);
router.post('/validate', FiscalProductionFinalAuthorizationController.validate);
router.post('/evaluate', FiscalProductionFinalAuthorizationController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalAuthorizationController.simulateDecision);
router.get('/report', FiscalProductionFinalAuthorizationController.getReport);
router.get('/audit', FiscalProductionFinalAuthorizationController.getAudit);
router.get('/health', FiscalProductionFinalAuthorizationController.getHealth);

export default router;
