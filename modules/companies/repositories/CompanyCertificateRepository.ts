import { 
  getCompanyCertificates as legacyGetCompanyCertificates,
  saveCertificate as legacySaveCertificate,
  deleteCertificate as legacyDeleteCertificate
} from "../../../db";
import { CertificateDetailsDTO } from "../dto/companyCertificate.dto";

export class CompanyCertificateRepository {
  /**
   * Reads all registered certificates associated with a given company ID
   */
  public async getCompanyCertificates(companyId: string): Promise<CertificateDetailsDTO[]> {
    const list = await legacyGetCompanyCertificates(companyId);
    return list || [];
  }

  /**
   * Crud save / update action for certificates
   */
  public async saveCertificate(companyId: string, payload: any): Promise<void> {
    await legacySaveCertificate(companyId, payload);
  }

  /**
   * Delete action for specific certificate ID ensuring company isolation
   */
  public async deleteCertificate(companyId: string, id: string): Promise<boolean> {
    return legacyDeleteCertificate(companyId, id);
  }
}
