import { 
  getCompanyDetails as legacyGetCompanyDetails, 
  saveCompanyDetails as legacySaveCompanyDetails 
} from "../../../db";
import { CompanyDetailsDTO, CompanyUpdateRequestDTO } from "../dto/company.dto";

export class CompanyRepository {
  /**
   * Fetches full company details from persistent / local DB fallback
   */
  public async getCompanyDetails(companyId: string): Promise<CompanyDetailsDTO | null> {
    const data = await legacyGetCompanyDetails(companyId);
    return data || null;
  }

  /**
   * Saves updated company details fields securely
   */
  public async saveCompanyDetails(companyId: string, payload: CompanyUpdateRequestDTO): Promise<void> {
    await legacySaveCompanyDetails(companyId, payload);
  }
}
