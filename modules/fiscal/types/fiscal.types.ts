export enum FiscalDocumentType {
  NFE = "NFE",
  NFCE = "NFCE",
  NFSE = "NFSE",
  DANFE = "DANFE",
  CCE = "CCE",
  INUTILIZACAO = "INUTILIZACAO",
  DISTRIBUICAO_DFE = "DISTRIBUICAO_DFE",
  MANIFESTACAO = "MANIFESTACAO"
}

export enum FiscalEnvironment {
  HOMOLOGACAO = "HOMOLOGACAO",
  PRODUCAO = "PRODUCAO"
}

export enum FiscalDocumentStatus {
  DRAFT = "DRAFT",
  VALIDATED = "VALIDATED",
  SIGNED = "SIGNED",
  TRANSMITTED = "TRANSMITTED",
  AUTHORIZED = "AUTHORIZED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  ERROR = "ERROR"
}

export enum FiscalOperationType {
  ENTRADA = "ENTRADA",
  SAIDA = "SAIDA"
}

export enum FiscalTransmissionStatus {
  PENDING = "PENDING",
  TRANSMITTED = "TRANSMITTED",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}

export enum FiscalValidationStatus {
  PENDING = "PENDING",
  VALID = "VALID",
  INVALID = "INVALID"
}

export enum FiscalIssuerType {
  EMISSOR_PROPRIO = "EMISSOR_PROPRIO",
  EMISSOR_TERCEIRO = "EMISSOR_TERCEIRO"
}
