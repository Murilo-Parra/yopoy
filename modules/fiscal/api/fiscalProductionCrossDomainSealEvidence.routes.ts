import { Router } from 'express';
import { FiscalProductionCrossDomainSealEvidenceController } from './FiscalProductionCrossDomainSealEvidenceController';

const router = Router();

router.get('/policy', FiscalProductionCrossDomainSealEvidenceController.getPolicy);
router.get('/cross-domain-seal-evidence-aggregation-blueprint', FiscalProductionCrossDomainSealEvidenceController.getCrossDomainSealEvidenceAggregationBlueprint);
router.get('/authority-absence-revalidation-matrix', FiscalProductionCrossDomainSealEvidenceController.getAuthorityAbsenceRevalidationMatrix);
router.get('/domain-no-authority-continuity-matrix', FiscalProductionCrossDomainSealEvidenceController.getDomainNoAuthorityContinuityMatrix);
router.get('/domain-no-activation-continuity-matrix', FiscalProductionCrossDomainSealEvidenceController.getDomainNoActivationContinuityMatrix);
router.get('/domain-no-routing-continuity-matrix', FiscalProductionCrossDomainSealEvidenceController.getDomainNoRoutingContinuityMatrix);
router.get('/domain-no-runtime-continuity-matrix', FiscalProductionCrossDomainSealEvidenceController.getDomainNoRuntimeContinuityMatrix);
router.get('/domain-no-database-continuity-matrix', FiscalProductionCrossDomainSealEvidenceController.getDomainNoDatabaseContinuityMatrix);
router.get('/domain-no-external-integration-continuity-matrix', FiscalProductionCrossDomainSealEvidenceController.getDomainNoExternalIntegrationContinuityMatrix);
router.get('/domain-no-sensitive-data-continuity-matrix', FiscalProductionCrossDomainSealEvidenceController.getDomainNoSensitiveDataContinuityMatrix);
router.get('/cross-domain-no-real-seal-evidence', FiscalProductionCrossDomainSealEvidenceController.getCrossDomainNoRealSealEvidence);
router.get('/cross-domain-no-real-authority-evidence', FiscalProductionCrossDomainSealEvidenceController.getCrossDomainNoRealAuthorityEvidence);
router.get('/cross-domain-no-real-activation-evidence', FiscalProductionCrossDomainSealEvidenceController.getCrossDomainNoRealActivationEvidence);
router.get('/cross-domain-no-real-execution-evidence', FiscalProductionCrossDomainSealEvidenceController.getCrossDomainNoRealExecutionEvidence);
router.get('/dependency-matrix', FiscalProductionCrossDomainSealEvidenceController.getDependencyMatrix);
router.get('/blockers', FiscalProductionCrossDomainSealEvidenceController.getBlockers);
router.get('/risks', FiscalProductionCrossDomainSealEvidenceController.getRisks);
router.post('/validate', FiscalProductionCrossDomainSealEvidenceController.validate);
router.post('/evaluate', FiscalProductionCrossDomainSealEvidenceController.evaluate);
router.post('/simulate-decision', FiscalProductionCrossDomainSealEvidenceController.simulateDecision);
router.get('/report', FiscalProductionCrossDomainSealEvidenceController.getReport);
router.get('/audit', FiscalProductionCrossDomainSealEvidenceController.getAudit);
router.get('/health', FiscalProductionCrossDomainSealEvidenceController.getHealth);

export const fiscalProductionCrossDomainSealEvidenceRoutes = router;
