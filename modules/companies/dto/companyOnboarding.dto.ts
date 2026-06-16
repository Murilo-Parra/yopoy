/**
 * DTOs FOR COMPANY ONBOARDING / TENANT CREATION
 * Maps exactly to the parameters required by the registration and initial tenant generation.
 */

export interface CreateTenantWithAdminRequestDTO {
  companyName: string;
  adminName: string;
  email: string;
  password: string; // Hashed password passed from AuthService
  plan?: string;
}

export interface CreateTenantWithAdminResultDTO {
  companyId: string;
  userId: string;
  corporate_name: string;
  name: string;
  email: string;
  plan: string;
}
