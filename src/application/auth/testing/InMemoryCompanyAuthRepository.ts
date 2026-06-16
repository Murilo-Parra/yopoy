import { CompanyAuthRepository } from '../contracts/CompanyAuthRepository';

interface CompanyStatus {
  id: string;
  name: string;
  isActive: boolean;
  subscriptionTier: string | null;
}

export class InMemoryCompanyAuthRepository implements CompanyAuthRepository {
  public companies: CompanyStatus[] = [];

  async isCompanyActive(companyId: string): Promise<boolean> {
    const found = this.companies.find((c) => c.id === companyId);
    return found ? found.isActive : false;
  }

  async getCompanySubscriptionTier(companyId: string): Promise<string | null> {
    const found = this.companies.find((c) => c.id === companyId);
    return found ? found.subscriptionTier : null;
  }

  async lockCompany(companyId: string): Promise<void> {
    const index = this.companies.findIndex((c) => c.id === companyId);
    if (index !== -1) {
      this.companies[index].isActive = false;
    }
  }

  async unlockCompany(companyId: string): Promise<void> {
    const index = this.companies.findIndex((c) => c.id === companyId);
    if (index !== -1) {
      this.companies[index].isActive = true;
    }
  }

  // Testing helper
  async createCompany(id: string, name: string, isActive = true, subscriptionTier: string | null = 'premium'): Promise<void> {
    this.companies.push({ id, name, isActive, subscriptionTier });
  }
}
