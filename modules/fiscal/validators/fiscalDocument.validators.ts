import { FiscalDocumentCreateRequestDTO, FiscalDocumentUpdateRequestDTO } from "../dto/fiscalDocument.dto";
import { FiscalDocumentType, FiscalDocumentStatus } from "../types/fiscal.types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateFiscalDocumentCreate(dto: FiscalDocumentCreateRequestDTO): ValidationResult {
  const errors: string[] = [];

  if (!dto.documentType) {
    errors.push("Tipo de documento é obrigatório (documentType).");
  } else if (!Object.values(FiscalDocumentType).includes(dto.documentType)) {
    errors.push(`Tipo de documento inválido. Esperado um dos valores: ${Object.values(FiscalDocumentType).join(", ")}`);
  }

  if (dto.documentNumber === undefined || dto.documentNumber === null) {
    errors.push("Número do documento é obrigatório (documentNumber).");
  } else if (typeof dto.documentNumber !== "number" || dto.documentNumber <= 0) {
    errors.push("Número do documento deve ser um número inteiro positivo.");
  }

  if (dto.documentSeries === undefined || dto.documentSeries === null) {
    errors.push("Série do documento é obrigatória (documentSeries).");
  } else if (typeof dto.documentSeries !== "number" || dto.documentSeries < 0) {
    errors.push("Série do documento deve ser um número inteiro não-negativo.");
  }

  if (!dto.xmlContent || dto.xmlContent.trim() === "") {
    errors.push("Conteúdo XML é obrigatório (xmlContent).");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateFiscalDocumentUpdate(dto: FiscalDocumentUpdateRequestDTO): ValidationResult {
  const errors: string[] = [];

  if (dto.status !== undefined) {
    if (!Object.values(FiscalDocumentStatus).includes(dto.status)) {
      errors.push(`Status de documento inválido. Esperado um dos seguintes: ${Object.values(FiscalDocumentStatus).join(", ")}`);
    }
  }

  if (dto.xmlContent !== undefined && (dto.xmlContent === null || dto.xmlContent.trim() === "")) {
    errors.push("Conteúdo XML não pode ser vazio.");
  }

  if (dto.version !== undefined && (typeof dto.version !== "number" || dto.version <= 0)) {
    errors.push("Versão deve ser um número inteiro positivo.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
