import { CreateTenantWithAdminRequestDTO } from "../dto/companyOnboarding.dto";

export class CompanyOnboardingValidators {
  /**
   * Sanitizes and validates basic onboarding structural requirements.
   */
  public static validateOnboarding(data: CreateTenantWithAdminRequestDTO): { success: boolean; error?: string } {
    if (!data || typeof data !== "object") {
      return { success: false, error: "Dados para onboarding ausentes." };
    }

    const { companyName, adminName, email, password } = data;

    if (!companyName || typeof companyName !== "string" || companyName.trim().length === 0) {
      return { success: false, error: "O nome da empresa é obrigatório." };
    }

    if (!adminName || typeof adminName !== "string" || adminName.trim().length === 0) {
      return { success: false, error: "O nome do administrador é obrigatório." };
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return { success: false, error: "O endereço de e-mail é obrigatório." };
    }

    if (!password || typeof password !== "string" || password.length === 0) {
      return { success: false, error: "A senha criptografada do administrador é obrigatória." };
    }

    return { success: true };
  }
}
