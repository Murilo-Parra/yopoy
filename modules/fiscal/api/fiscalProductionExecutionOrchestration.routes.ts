import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionExecutionOrchestrationController } from './FiscalProductionExecutionOrchestrationController';
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

router.get('/policy', FiscalProductionExecutionOrchestrationController.getPolicy);
router.get('/orchestration-blueprint', FiscalProductionExecutionOrchestrationController.getOrchestrationBlueprint);
router.get('/runtime-no-op-safety-contract', FiscalProductionExecutionOrchestrationController.getRuntimeNoOpSafetyContract);
router.get('/runtime-plan', FiscalProductionExecutionOrchestrationController.getRuntimePlan);
router.get('/command-boundary-plan', FiscalProductionExecutionOrchestrationController.getCommandBoundaryPlan);
router.get('/guardrail-matrix', FiscalProductionExecutionOrchestrationController.getGuardrailMatrix);
router.get('/pre-run-checklist', FiscalProductionExecutionOrchestrationController.getPreRunChecklist);
router.get('/no-side-effect-evidence', FiscalProductionExecutionOrchestrationController.getNoSideEffectEvidence);
router.get('/dependency-matrix', FiscalProductionExecutionOrchestrationController.getDependencyMatrix);
router.get('/blockers', FiscalProductionExecutionOrchestrationController.getBlockers);
router.get('/risks', FiscalProductionExecutionOrchestrationController.getRisks);
router.post('/validate', FiscalProductionExecutionOrchestrationController.validate);
router.post('/evaluate', FiscalProductionExecutionOrchestrationController.evaluate);
router.post('/simulate-decision', FiscalProductionExecutionOrchestrationController.simulateDecision);
router.get('/report', FiscalProductionExecutionOrchestrationController.getReport);
router.get('/audit', FiscalProductionExecutionOrchestrationController.getAudit);
router.get('/health', FiscalProductionExecutionOrchestrationController.getHealth);

export default router;
