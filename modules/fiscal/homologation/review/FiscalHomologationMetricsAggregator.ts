import { FiscalHomologationReviewMetrics } from './FiscalHomologationReviewTypes';
import { FiscalHomologationMockResultReadModel } from './FiscalHomologationMockResultReadModel';

export class FiscalHomologationMetricsAggregator {
  public static aggregateMetrics(): FiscalHomologationReviewMetrics {
    const readModel = FiscalHomologationMockResultReadModel.getReadModel();
    
    return {
      generatedAt: new Date().toISOString(),
      totalMockScenarios: 7,
      totalMockExecutions: 0,
      validationFailures: 0,
      blockedSensitivePayloads: 0,
      unknownScenariosBlocked: 0,
      forceRealExecutionBlocked: 0,
      mockSefazResponses: 0,
      mockCertificateResponses: 0,
      mockXmlResponses: 0,
      mockDanfeResponses: 0,
      realHomologationExecutions: readModel.realHomologationExecutions,
      realSefazCalls: readModel.realSefazCalls,
      realCertificatesLoaded: readModel.realCertificatesLoaded,
      realPfxReads: readModel.realPfxReads,
      realCertificatePasswordReads: readModel.realCertificatePasswordReads,
      realXmlSigned: readModel.realXmlSigned,
      realPdfGenerated: readModel.realPdfGenerated,
      realTrafficChanges: readModel.realTrafficChanges,
      realDmlExecutions: readModel.realDmlExecutions,
      payloadIncluded: readModel.payloadIncluded,
      sensitiveDataIncluded: readModel.sensitiveDataIncluded
    };
  }
}
