import { FiscalEnvironment } from "./fiscal.types";

export type SefazUF = 
  | "AC" | "AL" | "AP" | "AM" | "BA" | "CE" | "DF" | "ES" | "GO" 
  | "MA" | "MT" | "MS" | "MG" | "PA" | "PB" | "PR" | "PE" | "PI" 
  | "RJ" | "RN" | "RS" | "RO" | "RR" | "SC" | "SP" | "SE" | "TO";

export enum SefazServiceType {
  AUTORIZACAO = "AUTORIZACAO",
  RET_AUTORIZACAO = "RET_AUTORIZACAO",
  CONSULTA_PROTOCOLO = "CONSULTA_PROTOCOLO",
  STATUS_SERVICO = "STATUS_SERVICO",
  EVENTO_CANCELAMENTO = "EVENTO_CANCELAMENTO",
  EVENTO_CCE = "EVENTO_CCE",
  EVENTO_MANIF_DEST = "EVENTO_MANIF_DEST",
  DISTRIBUICAO_DFE = "DISTRIBUICAO_DFE",
  INUTILIZACAO = "INUTILIZACAO"
}

export interface SefazEndpointConfig {
  uf: SefazUF;
  service: SefazServiceType;
  environment: FiscalEnvironment;
  url: string;
  version: string;
}

export interface SefazTransmissionResult {
  success: boolean;
  xmlSent: string;
  xmlReceived?: string;
  statusCode?: string;
  statusMessage?: string;
  protocolNumber?: string;
  authorizedAt?: string;
  digestValue?: string;
  errors?: string[];
}

export interface SefazProtocolResult {
  success: boolean;
  statusCode: string;
  statusMessage: string;
  protocolNumber?: string;
  xmlReceived?: string;
  errors?: string[];
}

export interface SefazCancelResult {
  success: boolean;
  statusCode: string;
  statusMessage: string;
  protocolNumber?: string;
  cancelledAt?: string;
  xmlReceived?: string;
  errors?: string[];
}

export interface SefazDistributionResult {
  success: boolean;
  statusCode: string;
  statusMessage: string;
  maxNSU: string;
  ultNSU: string;
  documents: Array<{
    schema: string;
    nsu: string;
    xml: string;
  }>;
  xmlReceived?: string;
  errors?: string[];
}

export enum SefazEventQueueStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  PROCESSED = "PROCESSED",
  FAILED = "FAILED"
}

export enum SefazManifestationType {
  CONFIRMACAO = "210200",
  CIENCIA = "210210",
  DESCONHECIMENTO = "210220",
  NAO_REALIZADA = "210240"
}
