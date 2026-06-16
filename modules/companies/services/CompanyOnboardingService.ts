import { CompanyOnboardingRepository } from "../repositories/CompanyOnboardingRepository";
import { CreateTenantWithAdminRequestDTO, CreateTenantWithAdminResultDTO } from "../dto/companyOnboarding.dto";
import { CompanyOnboardingValidators } from "../validators/companyOnboarding.validators";

export class CompanyOnboardingService {
  private repository: CompanyOnboardingRepository;

  constructor(repository = new CompanyOnboardingRepository()) {
    this.repository = repository;
  }

  /**
   * Process company onboarding / tenant creation and returns structural results
   */
  public async createTenantWithAdmin(payload: CreateTenantWithAdminRequestDTO): Promise<CreateTenantWithAdminResultDTO> {
    const validation = CompanyOnboardingValidators.validateOnboarding(payload);
    if (!validation.success) {
      throw new Error(validation.error || "Dados de onboarding inválidos.");
    }

    return this.repository.createTenantWithAdmin(payload);
  }
}
