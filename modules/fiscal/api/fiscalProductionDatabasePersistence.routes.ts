import { Router } from 'express';
import { FiscalProductionDatabasePersistenceController } from './FiscalProductionDatabasePersistenceController';

const router = Router();

router.get('/policy', FiscalProductionDatabasePersistenceController.getPolicy);
router.get('/database-connection-no-open-blueprint', FiscalProductionDatabasePersistenceController.getDatabaseConnectionNoOpenBlueprint);
router.get('/connection-pool-no-create-plan', FiscalProductionDatabasePersistenceController.getConnectionPoolNoCreatePlan);
router.get('/transaction-boundary-no-open-matrix', FiscalProductionDatabasePersistenceController.getTransactionBoundaryNoOpenMatrix);
router.get('/query-runner-no-execute-plan', FiscalProductionDatabasePersistenceController.getQueryRunnerNoExecutePlan);
router.get('/dml-ddl-no-execute-matrix', FiscalProductionDatabasePersistenceController.getDmlDdlNoExecuteMatrix);
router.get('/migration-no-run-plan', FiscalProductionDatabasePersistenceController.getMigrationNoRunPlan);
router.get('/repository-no-mutation-matrix', FiscalProductionDatabasePersistenceController.getRepositoryNoMutationMatrix);
router.get('/persistence-adapter-no-bind-plan', FiscalProductionDatabasePersistenceController.getPersistenceAdapterNoBindPlan);
router.get('/database-credential-no-read-plan', FiscalProductionDatabasePersistenceController.getDatabaseCredentialNoReadPlan);
router.get('/tenant-data-no-read-matrix', FiscalProductionDatabasePersistenceController.getTenantDataNoReadMatrix);
router.get('/fiscal-document-no-read-plan', FiscalProductionDatabasePersistenceController.getFiscalDocumentNoReadPlan);
router.get('/database-no-real-connection-evidence', FiscalProductionDatabasePersistenceController.getDatabaseNoRealConnectionEvidence);
router.get('/persistence-no-real-write-evidence', FiscalProductionDatabasePersistenceController.getPersistenceNoRealWriteEvidence);
router.get('/dependency-matrix', FiscalProductionDatabasePersistenceController.getDependencyMatrix);
router.get('/blockers', FiscalProductionDatabasePersistenceController.getBlockers);
router.get('/risks', FiscalProductionDatabasePersistenceController.getRisks);
router.post('/validate', FiscalProductionDatabasePersistenceController.validate);
router.post('/evaluate', FiscalProductionDatabasePersistenceController.evaluate);
router.post('/simulate-decision', FiscalProductionDatabasePersistenceController.simulateDecision);
router.get('/report', FiscalProductionDatabasePersistenceController.getReport);
router.get('/audit', FiscalProductionDatabasePersistenceController.getAudit);
router.get('/health', FiscalProductionDatabasePersistenceController.getHealth);

export const fiscalProductionDatabasePersistenceRoutes = router;
