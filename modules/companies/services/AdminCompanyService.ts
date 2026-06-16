import { AdminCompanyRepository } from "../repositories/AdminCompanyRepository";
import { 
  AdminCompanyListItemDTO, 
  AdminCompanyStatsDTO, 
  AdminCompanyUpdateRequestDTO 
} from "../dto/adminCompany.dto";
import { AdminCompanyValidators } from "../validators/adminCompany.validators";

export class AdminCompanyService {
  private repository: AdminCompanyRepository;

  constructor(repository = new AdminCompanyRepository()) {
    this.repository = repository;
  }

  /**
   * Orchestrates fetching Admin Stats
   */
  public async getStats(): Promise<AdminCompanyStatsDTO> {
    return this.repository.getStats();
  }

  /**
   * Orchestrates listing all companies for master admin
   */
  public async listCompanies(): Promise<AdminCompanyListItemDTO[]> {
    return this.repository.listCompanies();
  }

  /**
   * Validates and updates properties of a company
   */
  public async updateCompanyAdmin(companyId: string, payload: AdminCompanyUpdateRequestDTO, ip: string): Promise<void> {
    if (!companyId) {
      throw new Error("ID da empresa é obrigatório.");
    }

    const validation = AdminCompanyValidators.validateUpdate(payload);
    if (!validation.success) {
      throw new Error(validation.error || "Dados de atualização inválidos.");
    }

    await this.repository.updateCompanyAdmin(companyId, payload, ip);
  }

  /**
   * Administrative deletion of a company
   */
  public async deleteCompanyAdmin(companyId: string, ip: string): Promise<void> {
    if (!companyId) {
      throw new Error("ID da empresa é obrigatório.");
    }

    await this.repository.deleteCompanyAdmin(companyId, ip);
  }
}
