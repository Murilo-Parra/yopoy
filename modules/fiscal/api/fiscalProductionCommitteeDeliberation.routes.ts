import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionCommitteeDeliberationController } from './FiscalProductionCommitteeDeliberationController';
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

router.get('/policy', FiscalProductionCommitteeDeliberationController.getPolicy);
router.get('/committee-charter', FiscalProductionCommitteeDeliberationController.getCommitteeCharter);
router.get('/quorum-matrix', FiscalProductionCommitteeDeliberationController.getQuorumMatrix);
router.get('/vote-simulation', FiscalProductionCommitteeDeliberationController.getVoteSimulation);
router.get('/policy-review', FiscalProductionCommitteeDeliberationController.getPolicyReview);
router.get('/policy-evidence', FiscalProductionCommitteeDeliberationController.getPolicyEvidence);
router.get('/go-no-go-matrix', FiscalProductionCommitteeDeliberationController.getGoNoGoMatrix);
router.get('/deliberation-trail', FiscalProductionCommitteeDeliberationController.getDeliberationTrail);
router.get('/dependency-matrix', FiscalProductionCommitteeDeliberationController.getDependencyMatrix);
router.get('/blockers', FiscalProductionCommitteeDeliberationController.getBlockers);
router.get('/risks', FiscalProductionCommitteeDeliberationController.getRisks);
router.post('/validate', FiscalProductionCommitteeDeliberationController.validate);
router.post('/evaluate', FiscalProductionCommitteeDeliberationController.evaluate);
router.post('/simulate-decision', FiscalProductionCommitteeDeliberationController.simulateDecision);
router.get('/report', FiscalProductionCommitteeDeliberationController.getReport);
router.get('/audit', FiscalProductionCommitteeDeliberationController.getAudit);
router.get('/health', FiscalProductionCommitteeDeliberationController.getHealth);

export default router;
