/**
 * DTOs FOR COMPANIES MODULE
 * This defines the precise schemas and types used for requests and responses of company endpoints.
 */

export interface CompanyDetailsDTO {
  id: string;
  corporate_name?: string;
  trade_name?: string;
  cnpj?: string;
  ie?: string;
  im?: string;
  address_street?: string;
  address_number?: string;
  address_neighborhood?: string;
  city?: string;
  state_uf?: string;
  cep?: string;
  phone?: string;
  tax_regime?: string;
  tax_rate?: number;
  digital_certificate?: string;
  cert_valid_until?: string;
  sefaz_env?: string;
  next_nfe?: number;
  bank_info?: string;
  logo_url?: string;
  state_registration?: string;
  municipal_registration?: string;
  crt?: string;
  cnae_primary?: string;
  cnae_secondary?: string;
  fiscal_email?: string;
  website?: string;
  legal_representative_name?: string;
  legal_representative_cpf?: string;
  legal_representative_email?: string;
  legal_representative_phone?: string;
  ibge_code?: string;
  fiscal_environment?: string;
  foundation_date?: string;
  phone_primary?: string;
  phone_secondary?: string;
  email_primary?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  country?: string;
  series_nfe?: number;
  series_nfce?: number;
  series_cte?: number;
  series_mdfe?: number;
  next_number_nfe?: number;
  next_number_nfce?: number;
  next_number_cte?: number;
  next_number_mdfe?: number;
  resolved_state?: string;
  resolved_ibge?: string;
  resolved_nfse_provider?: string;
  resolved_sefaz?: string;
  resolved_region?: string;
  last_resolution_date?: string;
  plan?: string;
  status?: string;
  expires_at?: string;
  [key: string]: any; // Allow indexing dynamically safely
}

export interface CompanyUpdateRequestDTO {
  corporate_name?: string;
  trade_name?: string;
  cnpj?: string;
  ie?: string;
  im?: string;
  address_street?: string;
  address_number?: string;
  address_neighborhood?: string;
  city?: string;
  state_uf?: string;
  cep?: string;
  phone?: string;
  tax_regime?: string;
  tax_rate?: number;
  digital_certificate?: string;
  cert_valid_until?: string;
  sefaz_env?: string;
  next_nfe?: number;
  bank_info?: string;
  logo_url?: string;
  state_registration?: string;
  municipal_registration?: string;
  crt?: string;
  cnae_primary?: string;
  cnae_secondary?: string;
  fiscal_email?: string;
  website?: string;
  legal_representative_name?: string;
  legal_representative_cpf?: string;
  legal_representative_email?: string;
  legal_representative_phone?: string;
  ibge_code?: string;
  fiscal_environment?: string;
  foundation_date?: string;
  phone_primary?: string;
  phone_secondary?: string;
  email_primary?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  country?: string;
  series_nfe?: number;
  series_nfce?: number;
  series_cte?: number;
  series_mdfe?: number;
  next_number_nfe?: number;
  next_number_nfce?: number;
  next_number_cte?: number;
  next_number_mdfe?: number;
  resolved_state?: string;
  resolved_ibge?: string;
  resolved_nfse_provider?: string;
  resolved_sefaz?: string;
  resolved_region?: string;
  last_resolution_date?: string;
}

export interface CompanyUpdateResponseDTO {
  success: boolean;
  message: string;
}
