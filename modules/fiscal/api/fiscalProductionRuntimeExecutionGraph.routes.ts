import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionRuntimeExecutionGraphController } from './FiscalProductionRuntimeExecutionGraphController';
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

router.get('/policy', FiscalProductionRuntimeExecutionGraphController.getPolicy);
router.get('/execution-graph-plan', FiscalProductionRuntimeExecutionGraphController.getExecutionGraphPlan);
router.get('/transaction-boundary-plan', FiscalProductionRuntimeExecutionGraphController.getTransactionBoundaryPlan);
router.get('/db-transaction-no-op-plan', FiscalProductionRuntimeExecutionGraphController.getDbTransactionNoOpPlan);
router.get('/sefaz-call-no-op-plan', FiscalProductionRuntimeExecutionGraphController.getSefazCallNoOpPlan);
router.get('/signing-no-op-plan', FiscalProductionRuntimeExecutionGraphController.getSigningNoOpPlan);
router.get('/idempotency-checkpoint-plan', FiscalProductionRuntimeExecutionGraphController.getIdempotencyCheckpointPlan);
router.get('/execution-trace-no-op-evidence', FiscalProductionRuntimeExecutionGraphController.getExecutionTraceNoOpEvidence);
router.get('/dependency-matrix', FiscalProductionRuntimeExecutionGraphController.getDependencyMatrix);
router.get('/blockers', FiscalProductionRuntimeExecutionGraphController.getBlockers);
router.get('/risks', FiscalProductionRuntimeExecutionGraphController.getRisks);
router.post('/validate', FiscalProductionRuntimeExecutionGraphController.validate);
router.post('/evaluate', FiscalProductionRuntimeExecutionGraphController.evaluate);
router.post('/simulate-decision', FiscalProductionRuntimeExecutionGraphController.simulateDecision);
router.get('/report', FiscalProductionRuntimeExecutionGraphController.getReport);
router.get('/audit', FiscalProductionRuntimeExecutionGraphController.getAudit);
router.get('/health', FiscalProductionRuntimeExecutionGraphController.getHealth);

export default router;
