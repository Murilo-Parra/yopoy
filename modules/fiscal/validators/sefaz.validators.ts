import { 
  SefazTransmitRequestDTO, 
  SefazCancelRequestDTO, 
  SefazInvalidateRequestDTO, 
  SefazCceRequestDTO, 
  SefazQueryRequestDTO, 
  SefazManifestRequestDTO, 
  SefazDistributionRequestDTO 
} from "../dto/sefaz.dto";
import { SefazManifestationType } from "../types/sefaz.types";
import { ValidationResult } from "./fiscalDocument.validators";

export function validateSefazTransmit(dto: SefazTransmitRequestDTO): ValidationResult {
  const errors: string[] = [];
  if (!dto.documentId || dto.documentId.trim() === "") {
    errors.push("O ID do documento fiscal a ser transmitido é obrigatório.");
  }
  return { valid: errors.length === 0, errors };
}

export function validateSefazCancel(dto: SefazCancelRequestDTO): ValidationResult {
  const errors: string[] = [];
  if (!dto.documentId || dto.documentId.trim() === "") {
    errors.push("O ID do documento fiscal a ser cancelado é obrigatório.");
  }
  if (!dto.justification || dto.justification.trim().length < 15) {
    errors.push("A justificativa de cancelamento é obrigatória e deve ter no mínimo 15 caracteres.");
  }
  return { valid: errors.length === 0, errors };
}

export function validateSefazInvalidate(dto: SefazInvalidateRequestDTO): ValidationResult {
  const errors: string[] = [];
  if (!dto.uf) {
    errors.push("A UF emissora é obrigatória.");
  }
  if (!dto.cnpj || dto.cnpj.trim() === "") {
    errors.push("O CNPJ emitente é obrigatório.");
  }
  if (!dto.year || dto.year < 2000 || dto.year > 2100) {
    errors.push("O ano informado é inválido.");
  }
  if (dto.startNumber === undefined || dto.startNumber <= 0) {
    errors.push("Número inicial de inutilização inválido.");
  }
  if (dto.endNumber === undefined || dto.endNumber <= 0) {
    errors.push("Número final de inutilização inválido.");
  }
  if (dto.startNumber !== undefined && dto.endNumber !== undefined && dto.startNumber > dto.endNumber) {
    errors.push("O número inicial não pode ser superior ao número final.");
  }
  if (!dto.justification || dto.justification.trim().length < 15) {
    errors.push("A justificativa de inutilização é obrigatória (mínimo 15 caracteres).");
  }
  return { valid: errors.length === 0, errors };
}

export function validateSefazCce(dto: SefazCceRequestDTO): ValidationResult {
  const errors: string[] = [];
  if (!dto.documentId || dto.documentId.trim() === "") {
    errors.push("O ID do documento fiscal para CC-e é obrigatório.");
  }
  if (!dto.correctionText || dto.correctionText.trim().length < 15) {
    errors.push("O texto de correção é obrigatório e deve possuir no mínimo 15 caracteres.");
  }
  if (dto.sequenceNumber === undefined || dto.sequenceNumber <= 0) {
    errors.push("O número sequencial do evento de CC-e é obrigatório.");
  }
  return { valid: errors.length === 0, errors };
}

export function validateSefazQuery(dto: SefazQueryRequestDTO): ValidationResult {
  const errors: string[] = [];
  if ((!dto.documentId || dto.documentId.trim() === "") && (!dto.key || dto.key.trim() === "")) {
    errors.push("Para consulta na SEFAZ, forneça pelo menos o documentId ou a chave da nota (key).");
  }
  return { valid: errors.length === 0, errors };
}

export function validateSefazManifest(dto: SefazManifestRequestDTO): ValidationResult {
  const errors: string[] = [];
  if (!dto.key || dto.key.trim().length !== 44) {
    errors.push("A chave do documento (key) é obrigatória e deve ter 44 dígitos.");
  }
  if (!dto.type) {
    errors.push("O tipo de manifestação do destinatário é obrigatório.");
  } else if (!Object.values(SefazManifestationType).includes(dto.type)) {
    errors.push("Tipo de manifestação inválido.");
  }
  return { valid: errors.length === 0, errors };
}

export function validateSefazDistribution(dto: SefazDistributionRequestDTO): ValidationResult {
  const errors: string[] = [];
  if (!dto.uf) {
    errors.push("A UF da distribuidora é obrigatória.");
  }
  if (!dto.cnpj || dto.cnpj.trim() === "") {
    errors.push("O CNPJ de interesse é obrigatório.");
  }
  if (!dto.ultNSU && !dto.nsu) {
    errors.push("É obrigatório informar o ultNSU (último NSU recebido) ou um nsu específico.");
  }
  return { valid: errors.length === 0, errors };
}

export function validateSefazProtocolSave(dto: any): ValidationResult {
  const errors: string[] = [];

  if (!dto.documentId || dto.documentId.trim() === "") {
    errors.push("O ID do documento fiscal (documentId) é obrigatório.");
  }

  if (!dto.protocolNumber || dto.protocolNumber.trim() === "") {
    errors.push("Número do protocolo (protocolNumber) é obrigatório.");
  }

  if (!dto.statusCode || dto.statusCode.trim() === "") {
    errors.push("Código de status SEFAZ (statusCode) é obrigatório.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
