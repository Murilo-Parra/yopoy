import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionAuthorizationRequestController } from './FiscalProductionAuthorizationRequestController';
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

router.get('/policy', FiscalProductionAuthorizationRequestController.getPolicy);
router.get('/request-intake', FiscalProductionAuthorizationRequestController.getRequestIntake);
router.get('/sanitizer', FiscalProductionAuthorizationRequestController.getSanitizer);
router.get('/submission-envelope', FiscalProductionAuthorizationRequestController.getSubmissionEnvelope);
router.get('/stakeholder-responsibility-matrix', FiscalProductionAuthorizationRequestController.getStakeholderResponsibilityMatrix);
router.get('/stakeholder-eligibility-checklist', FiscalProductionAuthorizationRequestController.getStakeholderEligibilityChecklist);
router.get('/no-notification-evidence', FiscalProductionAuthorizationRequestController.getNoNotificationEvidence);
router.get('/dependency-matrix', FiscalProductionAuthorizationRequestController.getDependencyMatrix);
router.get('/blockers', FiscalProductionAuthorizationRequestController.getBlockers);
router.get('/risks', FiscalProductionAuthorizationRequestController.getRisks);
router.post('/validate', FiscalProductionAuthorizationRequestController.validate);
router.post('/evaluate', FiscalProductionAuthorizationRequestController.evaluate);
router.post('/simulate-decision', FiscalProductionAuthorizationRequestController.simulateDecision);
router.get('/report', FiscalProductionAuthorizationRequestController.getReport);
router.get('/audit', FiscalProductionAuthorizationRequestController.getAudit);
router.get('/health', FiscalProductionAuthorizationRequestController.getHealth);

export default router;
