import { Router } from 'express';
import { FiscalProductionQueueWorkerController } from './FiscalProductionQueueWorkerController';

const router = Router();

router.get('/policy', FiscalProductionQueueWorkerController.getPolicy);
router.get('/queue-topology-no-start-blueprint', FiscalProductionQueueWorkerController.getQueueTopologyNoStartBlueprint);
router.get('/worker-dispatch-no-op-plan', FiscalProductionQueueWorkerController.getWorkerDispatchNoOpPlan);
router.get('/job-enqueue-no-op-matrix', FiscalProductionQueueWorkerController.getJobEnqueueNoOpMatrix);
router.get('/batch-microbatch-no-execute-plan', FiscalProductionQueueWorkerController.getBatchMicroBatchNoExecutePlan);
router.get('/retry-backoff-no-activation-matrix', FiscalProductionQueueWorkerController.getRetryBackoffNoActivationMatrix);
router.get('/dead-letter-queue-no-create-plan', FiscalProductionQueueWorkerController.getDeadLetterQueueNoCreatePlan);
router.get('/consumer-producer-no-start-matrix', FiscalProductionQueueWorkerController.getConsumerProducerNoStartMatrix);
router.get('/concurrency-pool-no-open-plan', FiscalProductionQueueWorkerController.getConcurrencyPoolNoOpenPlan);
router.get('/job-payload-no-read-plan', FiscalProductionQueueWorkerController.getJobPayloadNoReadPlan);
router.get('/queue-worker-no-real-dispatch-evidence', FiscalProductionQueueWorkerController.getQueueWorkerNoRealDispatchEvidence);
router.get('/queue-worker-no-real-processing-evidence', FiscalProductionQueueWorkerController.getQueueWorkerNoRealProcessingEvidence);
router.get('/dependency-matrix', FiscalProductionQueueWorkerController.getDependencyMatrix);
router.get('/blockers', FiscalProductionQueueWorkerController.getBlockers);
router.get('/risks', FiscalProductionQueueWorkerController.getRisks);
router.post('/validate', FiscalProductionQueueWorkerController.validate);
router.post('/evaluate', FiscalProductionQueueWorkerController.evaluate);
router.post('/simulate-decision', FiscalProductionQueueWorkerController.simulateDecision);
router.get('/report', FiscalProductionQueueWorkerController.getReport);
router.get('/audit', FiscalProductionQueueWorkerController.getAudit);
router.get('/health', FiscalProductionQueueWorkerController.getHealth);

export const fiscalProductionQueueWorkerRoutes = router;
