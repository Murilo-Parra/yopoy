import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRouteSandboxController } from './FiscalRouteSandboxController';
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

router.get('/policy', FiscalRouteSandboxController.getPolicy);
router.get('/sandbox-blueprint', FiscalRouteSandboxController.getSandboxBlueprint);
router.get('/walled-garden-isolation', FiscalRouteSandboxController.getWalledGardenIsolation);
router.get('/network-plan', FiscalRouteSandboxController.getNetworkPlan);
router.get('/tenant-isolation-plan', FiscalRouteSandboxController.getTenantIsolationPlan);
router.get('/data-boundary-plan', FiscalRouteSandboxController.getDataBoundaryPlan);
router.get('/no-runtime-execution-evidence', FiscalRouteSandboxController.getNoRuntimeExecutionEvidence);
router.get('/synthetic-only-contract', FiscalRouteSandboxController.getSyntheticOnlyContract);
router.get('/dependency-matrix', FiscalRouteSandboxController.getDependencyMatrix);
router.get('/blockers', FiscalRouteSandboxController.getBlockers);
router.get('/risks', FiscalRouteSandboxController.getRisks);
router.post('/validate', FiscalRouteSandboxController.validate);
router.post('/evaluate', FiscalRouteSandboxController.evaluate);
router.post('/simulate-decision', FiscalRouteSandboxController.simulateDecision);
router.get('/report', FiscalRouteSandboxController.getReport);
router.get('/audit', FiscalRouteSandboxController.getAudit);
router.get('/health', FiscalRouteSandboxController.getHealth);

export default router;
