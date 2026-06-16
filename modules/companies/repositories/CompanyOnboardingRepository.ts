import { createTenant } from "../../../db";
import { CreateTenantWithAdminRequestDTO, CreateTenantWithAdminResultDTO } from "../dto/companyOnboarding.dto";

export class CompanyOnboardingRepository {
  /**
   * Encapsulates the legacy createTenant function from db.ts
   */
  public async createTenantWithAdmin(payload: CreateTenantWithAdminRequestDTO): Promise<CreateTenantWithAdminResultDTO> {
    const result = await createTenant(
      payload.companyName,
      payload.adminName,
      payload.email,
      payload.password,
      payload.plan || "media"
    );

    return result;
  }
}
