import { FiscalHomologationFinalReviewService } from './FiscalHomologationFinalReviewService';

export class FiscalHomologationReviewReportService {
  public static getReport(): any {
    return {
      ...FiscalHomologationFinalReviewService.getFinalReview()
    };
  }
}
