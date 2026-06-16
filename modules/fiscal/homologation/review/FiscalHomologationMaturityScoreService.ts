import { FiscalHomologationMaturityScore } from './FiscalHomologationReviewTypes';
import { FiscalHomologationMetricsAggregator } from './FiscalHomologationMetricsAggregator';

export class FiscalHomologationMaturityScoreService {
  public static calculateScore(): FiscalHomologationMaturityScore {
    const metrics = FiscalHomologationMetricsAggregator.aggregateMetrics();
    const reasons: string[] = [];
    const blockers: string[] = [];
    
    let score = 0;
    
    if (metrics.totalMockExecutions === 0) {
      reasons.push('Nenhuma execução mock simulada encontrada.');
      blockers.push('Execução de mocks em ambiente sandbox pendente.');
    } else {
      score += 20;
    }
    
    if (metrics.totalMockScenarios > 0) {
      score += 30;
      reasons.push(`Encontrados ${metrics.totalMockScenarios} cenários de mock.`);
    }

    if (score < 50) {
      reasons.push('Membros do time precisam exercitar os mocks para aumentar o score.');
    }

    return {
      score,
      level: score >= 80 ? 'READY_FOR_DEDICATED_HOMOLOGATION_ENVIRONMENT' : (score >= 50 ? 'MOCK_REVIEW_REQUIRED' : 'NOT_READY'),
      reasons,
      blockers,
      approvedForHomologationExecution: false,
      approvedForSefazConnection: false,
      approvedForCertificateLoad: false,
      approvedForXmlSigning: false,
      approvedForPdfGeneration: false,
      approvedForProductionV2: false
    };
  }
}
