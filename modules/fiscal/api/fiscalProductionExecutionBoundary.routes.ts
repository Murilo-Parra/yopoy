import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionExecutionBoundaryController } from './FiscalProductionExecutionBoundaryController';
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

router.get('/policy', FiscalProductionExecutionBoundaryController.getPolicy);
router.get('/boundary-blueprint', FiscalProductionExecutionBoundaryController.getBoundaryBlueprint);
router.get('/no-op-activation-gate', FiscalProductionExecutionBoundaryController.getNoOpActivationGate);
router.get('/authorization-contract', FiscalProductionExecutionBoundaryController.getAuthorizationContract);
router.get('/eligibility-matrix', FiscalProductionExecutionBoundaryController.getEligibilityMatrix);
router.get('/dependency-inventory', FiscalProductionExecutionBoundaryController.getDependencyInventory);
router.get('/prerequisite-checklist', FiscalProductionExecutionBoundaryController.getPrerequisiteChecklist);
router.get('/no-side-effect-evidence', FiscalProductionExecutionBoundaryController.getNoSideEffectEvidence);
router.get('/blockers', FiscalProductionExecutionBoundaryController.getBlockers);
router.get('/risks', FiscalProductionExecutionBoundaryController.getRisks);
router.post('/validate', FiscalProductionExecutionBoundaryController.validate);
router.post('/evaluate', FiscalProductionExecutionBoundaryController.evaluate);
router.post('/simulate-decision', FiscalProductionExecutionBoundaryController.simulateDecision);
router.get('/report', FiscalProductionExecutionBoundaryController.getReport);
router.get('/audit', FiscalProductionExecutionBoundaryController.getAudit);
router.get('/health', FiscalProductionExecutionBoundaryController.getHealth);

export default router;
