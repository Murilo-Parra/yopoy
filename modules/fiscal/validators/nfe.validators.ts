import { NfeCreateRequestDTO, NfeUpdateStatusRequestDTO } from "../dto/nfe.dto";
import { FiscalDocumentStatus } from "../types/fiscal.types";
import { ValidationResult } from "./fiscalDocument.validators";

export function validateNfeCreate(dto: NfeCreateRequestDTO): ValidationResult {
  const errors: string[] = [];

  if (!dto.number || dto.number <= 0) {
    errors.push("Número da NFe deve ser maior que zero.");
  }

  if (dto.series === undefined || dto.series === null || dto.series < 0) {
    errors.push("Série da NFe deve ser maior ou igual a zero.");
  }

  if (!dto.customerName || dto.customerName.trim() === "") {
    errors.push("Nome do cliente é obrigatório.");
  }

  if (!dto.customerCnpjCpf || dto.customerCnpjCpf.trim() === "") {
    errors.push("CNPJ/CPF do cliente é obrigatório.");
  }

  if (dto.totalValue === undefined || dto.totalValue === null || dto.totalValue < 0) {
    errors.push("Valor total da NFe deve ser maior ou igual a zero.");
  }

  if (!dto.xmlContent || dto.xmlContent.trim() === "") {
    errors.push("Conteúdo XML da NFe é obrigatório.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateNfeUpdateStatus(dto: NfeUpdateStatusRequestDTO): ValidationResult {
  const errors: string[] = [];

  if (!dto.status) {
    errors.push("Status é obrigatório para atualização.");
  } else if (!Object.values(FiscalDocumentStatus).includes(dto.status)) {
    errors.push(`Status inválido: ${dto.status}.`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateNfeStatusUpdate(dto: any): ValidationResult {
  return validateNfeUpdateStatus(dto);
}
