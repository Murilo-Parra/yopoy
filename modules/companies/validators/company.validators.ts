import { CompanyUpdateRequestDTO } from "../dto/company.dto";

export class CompanyValidators {
  /**
   * List of exactly allowed fields corresponding to legacy rules
   */
  public static readonly ALLOWED_FIELDS = [
    "corporate_name", "trade_name", "cnpj", "ie", "im", 
    "address_street", "address_number", "address_neighborhood",
    "city", "state_uf", "cep", "phone", "tax_regime", "tax_rate",
    "digital_certificate", "cert_valid_until", "sefaz_env", "next_nfe",
    "bank_info", "logo_url",
    "state_registration", "municipal_registration", "crt",
    "cnae_primary", "cnae_secondary", "fiscal_email", "website",
    "legal_representative_name", "legal_representative_cpf", "legal_representative_email", "legal_representative_phone",
    "ibge_code", "fiscal_environment", "foundation_date", "phone_primary", "phone_secondary", "email_primary",
    "street", "number", "complement", "neighborhood", "country",
    "series_nfe", "series_nfce", "series_cte", "series_mdfe",
    "next_number_nfe", "next_number_nfce", "next_number_cte", "next_number_mdfe",
    "resolved_state", "resolved_ibge", "resolved_nfse_provider", "resolved_sefaz", "resolved_region", "last_resolution_date"
  ];

  /**
   * Sanitizes and validates the company update request body.
   * Strips administrative / routing fields.
   */
  public static validateUpdate(body: any): { success: boolean; data?: CompanyUpdateRequestDTO; error?: string } {
    if (!body || typeof body !== "object") {
      return { success: false, error: "Dados corporativos ausentes ou mal formatados." };
    }

    // Explicitly reject if attempting to manipulate central authorities
    const forbiddenFields = ["id", "company_id", "plan", "status", "expires_at", "created_at", "updated_at"];
    for (const field of forbiddenFields) {
      if (body[field] !== undefined) {
        return { 
          success: false, 
          error: `O campo '${field}' não pode ser alterado por este endpoint.` 
        };
      }
    }

    // Filter properties to allowed set only
    const updatePayload: CompanyUpdateRequestDTO & Record<string, any> = {};
    let hasValidField = false;

    Object.keys(body).forEach(key => {
      if (this.ALLOWED_FIELDS.includes(key)) {
        updatePayload[key] = body[key];
        hasValidField = true;
      }
    });

    if (!hasValidField) {
      return { success: false, error: "Nenhum campo de configuração empresarial válido foi fornecido." };
    }

    return {
      success: true,
      data: updatePayload
    };
  }
}
