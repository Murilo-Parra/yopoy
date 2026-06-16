import { Router } from 'express';
import { FiscalProductionSystemWideNonOperationalSealController } from './FiscalProductionSystemWideNonOperationalSealController';

const router = Router();

router.get('/policy', FiscalProductionSystemWideNonOperationalSealController.getPolicy);
router.get('/seal-blueprint', FiscalProductionSystemWideNonOperationalSealController.getSealBlueprint);
router.get('/activation-impossibility-contract', FiscalProductionSystemWideNonOperationalSealController.getActivationImpossibilityContract);
router.get('/global-no-authority-scope-inventory', FiscalProductionSystemWideNonOperationalSealController.getGlobalNoAuthorityScopeInventory);
router.get('/domain-closure-read-only-aggregation-matrix', FiscalProductionSystemWideNonOperationalSealController.getDomainClosureReadOnlyAggregationMatrix);
router.get('/no-real-system-seal-evidence', FiscalProductionSystemWideNonOperationalSealController.getNoRealSystemSealEvidence);
router.get('/no-real-activation-authority-evidence', FiscalProductionSystemWideNonOperationalSealController.getNoRealActivationAuthorityEvidence);
router.get('/no-real-go-live-or-cutover-evidence', FiscalProductionSystemWideNonOperationalSealController.getNoRealGoLiveOrCutoverEvidence);
router.get('/no-real-production-v2-evidence', FiscalProductionSystemWideNonOperationalSealController.getNoRealProductionV2Evidence);
router.get('/no-real-routing-runtime-database-evidence', FiscalProductionSystemWideNonOperationalSealController.getNoRealRoutingRuntimeDatabaseEvidence);
router.get('/no-real-external-integration-evidence', FiscalProductionSystemWideNonOperationalSealController.getNoRealExternalIntegrationEvidence);
router.get('/no-real-sensitive-data-access-evidence', FiscalProductionSystemWideNonOperationalSealController.getNoRealSensitiveDataAccessEvidence);
router.get('/dependency-matrix', FiscalProductionSystemWideNonOperationalSealController.getDependencyMatrix);
router.get('/blockers', FiscalProductionSystemWideNonOperationalSealController.getBlockers);
router.get('/risks', FiscalProductionSystemWideNonOperationalSealController.getRisks);
router.post('/validate', FiscalProductionSystemWideNonOperationalSealController.validate);
router.post('/evaluate', FiscalProductionSystemWideNonOperationalSealController.evaluate);
router.post('/simulate-decision', FiscalProductionSystemWideNonOperationalSealController.simulateDecision);
router.get('/report', FiscalProductionSystemWideNonOperationalSealController.getReport);
router.get('/audit', FiscalProductionSystemWideNonOperationalSealController.getAudit);
router.get('/health', FiscalProductionSystemWideNonOperationalSealController.getHealth);

export const fiscalProductionSystemWideNonOperationalSealRoutes = router;
