export interface CompanyAuthRepository {
  isCompanyActive(companyId: string): Promise<boolean>;
  getCompanySubscriptionTier(companyId: string): Promise<string | null>;
  lockCompany(companyId: string): Promise<void>;
  unlockCompany(companyId: string): Promise<void>;
}
