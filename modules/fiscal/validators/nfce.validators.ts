import { NfceCreateRequestDTO, NfceCancelRequestDTO, NfceSyncRequestDTO } from "../dto/nfce.dto";
import { ValidationResult } from "./fiscalDocument.validators";

export function validateNfceCreate(dto: NfceCreateRequestDTO): ValidationResult {
  const errors: string[] = [];

  if (!dto.number || dto.number <= 0) {
    errors.push("Número da NFCe deve ser maior que zero.");
  }

  if (dto.series === undefined || dto.series === null || dto.series < 0) {
    errors.push("Série da NFCe deve ser maior ou igual a zero.");
  }

  if (dto.totalValue === undefined || dto.totalValue === null || dto.totalValue < 0) {
    errors.push("Valor total do cupom (NFCe) deve ser maior ou igual a zero.");
  }

  if (!dto.xmlContent || dto.xmlContent.trim() === "") {
    errors.push("Conteúdo XML da NFCe é obrigatório.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateNfceCancel(dto: NfceCancelRequestDTO): ValidationResult {
  const errors: string[] = [];

  if (!dto.justification || dto.justification.trim().length < 15) {
    errors.push("Justificativa de cancelamento é obrigatória e deve ter pelo menos 15 caracteres.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateNfceSync(dto: NfceSyncRequestDTO): ValidationResult {
  const errors: string[] = [];

  if (!dto.payloads || !Array.isArray(dto.payloads) || dto.payloads.length === 0) {
    errors.push("O lote de sincronização deve conter pelo menos uma NFCe em payloads.");
  } else {
    dto.payloads.forEach((payload, index) => {
      const payloadResult = validateNfceCreate(payload);
      if (!payloadResult.valid) {
        errors.push(`Erro no item [${index}]: ${payloadResult.errors.join("; ")}`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
