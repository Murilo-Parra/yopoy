import { DanfeCreateRequestDTO, DanfeAuditRequestDTO } from "../dto/danfe.dto";
import { DanfeDocumentType } from "../types/danfe.types";
import { ValidationResult } from "./fiscalDocument.validators";

export function validateDanfeCreate(dto: DanfeCreateRequestDTO): ValidationResult {
  const errors: string[] = [];

  if (!dto.documentId || dto.documentId.trim() === "") {
    errors.push("O ID do documento fiscal a ser impresso é obrigatório.");
  }

  if (!dto.documentType) {
    errors.push("O tipo de documento (documentType) é obrigatório.");
  } else if (!Object.values(DanfeDocumentType).includes(dto.documentType)) {
    errors.push(`Tipo de documento DANFE inválido. Tipos aceitos: ${Object.values(DanfeDocumentType).join(", ")}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateDanfeAudit(dto: DanfeAuditRequestDTO): ValidationResult {
  const errors: string[] = [];

  if (!dto.danfeId || dto.danfeId.trim() === "") {
    errors.push("O ID do DANFE (danfeId) é obrigatório para auditoria.");
  }

  if (dto.notes && dto.notes.trim().length > 1000) {
    errors.push("Observações de auditoria não podem exceder 1000 caracteres.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateDanfeSave(dto: any): ValidationResult {
  const errors: string[] = [];

  if (!dto.pdfPath || dto.pdfPath.trim() === "") {
    errors.push("Caminho do arquivo PDF (pdfPath) é obrigatório.");
  }

  if (!dto.documentType) {
    errors.push("Tipo de documento DANFE (documentType) é obrigatório.");
  } else if (!Object.values(DanfeDocumentType).includes(dto.documentType)) {
    errors.push(`Tipo de documento DANFE inválido. Tipos aceitos: ${Object.values(DanfeDocumentType).join(", ")}`);
  }

  if (!dto.nfeId && !dto.nfceId && !dto.nfseId) {
    errors.push("A DANFE deve estar associada a pelo menos um documento (nfeId, nfceId ou nfseId).");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
