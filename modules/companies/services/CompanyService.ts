import { CompanyRepository } from "../repositories/CompanyRepository";
import { CompanyFiscalService } from "./CompanyFiscalService";
import { CompanyDetailsDTO, CompanyUpdateRequestDTO, CompanyUpdateResponseDTO } from "../dto/company.dto";
import { AuditLogger, AuditCategory } from "../../../shared/audit";

export class CompanyService {
  private companyRepository: CompanyRepository;
  private companyFiscalService: CompanyFiscalService;

  constructor(
    companyRepository = new CompanyRepository(),
    companyFiscalService = new CompanyFiscalService()
  ) {
    this.companyRepository = companyRepository;
    this.companyFiscalService = companyFiscalService;
  }

  /**
   * Safe fetch of single company configuration
   */
  public async getCompanyDetails(companyId: string): Promise<CompanyDetailsDTO | null> {
    return this.companyRepository.getCompanyDetails(companyId);
  }

  /**
   * Safe save with smart geolocation coordinates updating and complete audit trails
   */
  public async updateCompany(
    companyId: string,
    userId: string,
    payload: CompanyUpdateRequestDTO,
    ip: string
  ): Promise<CompanyUpdateResponseDTO> {
    const currentCompany = await this.companyRepository.getCompanyDetails(companyId);

    const targetCity = payload.city !== undefined ? payload.city : (currentCompany?.city || "");
    const targetState = payload.state_uf !== undefined ? payload.state_uf : (currentCompany?.state_uf || "");
    const targetIbge = payload.ibge_code !== undefined ? payload.ibge_code : (currentCompany?.ibge_code || "");

    if (targetCity || targetState || targetIbge) {
      const resolved = this.companyFiscalService.resolveFiscalLocation(targetState, targetCity, targetIbge);

      payload.resolved_state = resolved.state_uf;
      payload.resolved_ibge = resolved.ibge_code;
      payload.resolved_nfse_provider = resolved.nfse_provider;
      payload.resolved_sefaz = resolved.sefaz_responsible;
      payload.resolved_region = resolved.region;
      payload.last_resolution_date = new Date().toISOString();

      // Synchronize the resolved IBGE code if not provided by the user
      if (resolved.ibge_code && !payload.ibge_code) {
        payload.ibge_code = resolved.ibge_code;
      }

      if (currentCompany) {
        if (payload.city && currentCompany.city !== payload.city) {
          await AuditLogger.info(
            AuditCategory.TENANT,
            "ALTERAR_MUNICIPIO",
            `Alteração de município: de '${currentCompany.city || 'N/A'}' para '${payload.city}' (Cadastro)`,
            null,
            { companyId, userId, ip }
          );
        }
        if (payload.state_uf && currentCompany.state_uf !== payload.state_uf) {
          await AuditLogger.info(
            AuditCategory.TENANT,
            "ALTERAR_UF",
            `Alteração de UF: de '${currentCompany.state_uf || 'N/A'}' para '${payload.state_uf}' (Cadastro)`,
            null,
            { companyId, userId, ip }
          );
        }
        if (payload.ibge_code && currentCompany.ibge_code !== payload.ibge_code) {
          await AuditLogger.info(
            AuditCategory.TENANT,
            "ALTERAR_CODIGO_IBGE",
            `Alteração de código IBGE: de '${currentCompany.ibge_code || 'N/A'}' para '${payload.ibge_code}' (Cadastro)`,
            null,
            { companyId, userId, ip }
          );
        }
        await AuditLogger.info(
          AuditCategory.TENANT,
          "REPROCESSAR_LOCALIZACAO",
          `Reprocessamento inteligente de localização fiscal: ${resolved.city}/${resolved.state_uf} (${resolved.region}) - SEFAZ: ${resolved.sefaz_responsible}, Provedor: ${resolved.nfse_provider}`,
          null,
          { companyId, userId, ip }
        );
      }
    }

    await this.companyRepository.saveCompanyDetails(companyId, payload);

    await AuditLogger.info(
      AuditCategory.TENANT,
      "ATUALIZAR_EMPRESA",
      `Atualização de parâmetros fiscais/cadastrais: ${Object.keys(payload).join(', ')}`,
      null,
      { companyId, userId, ip }
    );

    return {
      success: true,
      message: "Parâmetros empresariais e tributários atualizados com sucesso!"
    };
  }
}
