import { FiscalSandboxEvidenceCertificationService } from './FiscalSandboxEvidenceCertificationService';
import { FiscalSandboxEvidenceSerializer } from './FiscalSandboxEvidenceSerializer';

export class FiscalSandboxEvidenceExportService {
  private certService: FiscalSandboxEvidenceCertificationService;

  constructor() {
    this.certService = new FiscalSandboxEvidenceCertificationService();
  }

  public async exportJson(companyId: string): Promise<string> {
    const cert = await this.certService.getCertification(companyId);
    return FiscalSandboxEvidenceSerializer.serializeToJson(cert);
  }

  public async exportText(companyId: string): Promise<string> {
    const cert = await this.certService.getCertification(companyId);
    return FiscalSandboxEvidenceSerializer.serializeToText(cert);
  }
}
