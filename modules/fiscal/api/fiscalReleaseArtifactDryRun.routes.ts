import { Router, Request, Response, NextFunction } from 'express';
import { FiscalReleaseArtifactDryRunController } from './FiscalReleaseArtifactDryRunController';
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

router.get('/policy', FiscalReleaseArtifactDryRunController.getPolicy);
router.get('/release-artifact-manifest', FiscalReleaseArtifactDryRunController.getReleaseArtifactManifest);
router.get('/deployment-package-manifest', FiscalReleaseArtifactDryRunController.getDeploymentPackageManifest);
router.get('/artifact-integrity-plan', FiscalReleaseArtifactDryRunController.getArtifactIntegrityPlan);
router.get('/package-shape-validator', FiscalReleaseArtifactDryRunController.getPackageShapeValidator);
router.get('/non-executable-contract', FiscalReleaseArtifactDryRunController.getNonExecutableContract);
router.get('/package-boundary-plan', FiscalReleaseArtifactDryRunController.getPackageBoundaryPlan);
router.get('/dependency-matrix', FiscalReleaseArtifactDryRunController.getDependencyMatrix);
router.get('/blockers', FiscalReleaseArtifactDryRunController.getBlockers);
router.get('/risks', FiscalReleaseArtifactDryRunController.getRisks);
router.post('/validate', FiscalReleaseArtifactDryRunController.validate);
router.post('/evaluate', FiscalReleaseArtifactDryRunController.evaluate);
router.post('/simulate-decision', FiscalReleaseArtifactDryRunController.simulateDecision);
router.get('/report', FiscalReleaseArtifactDryRunController.getReport);
router.get('/audit', FiscalReleaseArtifactDryRunController.getAudit);
router.get('/health', FiscalReleaseArtifactDryRunController.getHealth);

export default router;
