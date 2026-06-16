import { NfseQueryRequestDTO, NfseProviderConfigDTO } from "../dto/nfse.dto";
import { NfseProviderType } from "../types/nfse.types";
import { ValidationResult } from "./fiscalDocument.validators";

export function validateNfseQuery(dto: NfseQueryRequestDTO): ValidationResult {
  const errors: string[] = [];

  if (dto.startDate && isNaN(Date.parse(dto.startDate))) {
    errors.push("Data de início (startDate) deve estar em um formato de data válido.");
  }

  if (dto.endDate && isNaN(Date.parse(dto.endDate))) {
    errors.push("Data de término (endDate) deve estar em um formato de data válido.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateNfseProviderConfig(dto: NfseProviderConfigDTO): ValidationResult {
  const errors: string[] = [];

  if (!dto.providerType) {
    errors.push("Tipo de provedor (providerType) é obrigatório.");
  } else if (!Object.values(NfseProviderType).includes(dto.providerType)) {
    errors.push(`Provedor inválido. Esperado um de: ${Object.values(NfseProviderType).join(", ")}`);
  }

  if (!dto.endpointUrl || dto.endpointUrl.trim() === "") {
    errors.push("URL do endpoint é obrigatória.");
  }

  if (dto.certificateRequired && dto.providerType !== NfseProviderType.CUSTOM) {
    // Certificado obrigatório para a maioria dos provedores padrões
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
