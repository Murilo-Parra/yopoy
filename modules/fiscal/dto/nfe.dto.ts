import { FiscalDocumentStatus, FiscalEnvironment } from "../types/fiscal.types";

export interface NfeDTO {
  id: string;
  companyId: string;
  key: string;
  number: number;
  series: number;
  status: FiscalDocumentStatus;
  xmlContent?: string;
  authorizedXml?: string;
  protocolNumber?: string;
  totalValue: number;
  customerName: string;
  customerCnpjCpf: string;
  environment: FiscalEnvironment;
  createdAt: string;
  updatedAt: string;
}

export interface NfeCreateRequestDTO {
  number: number;
  series: number;
  customerName: string;
  customerCnpjCpf: string;
  totalValue: number;
  xmlContent: string;
}

export interface NfeUpdateStatusRequestDTO {
  status: FiscalDocumentStatus;
  authorizedXml?: string;
  protocolNumber?: string;
  errorMessage?: string;
}

export interface NfeListResponseDTO {
  nfeList: NfeDTO[];
  total: number;
}

export interface NfeResponseDTO {
  success: boolean;
  message?: string;
  nfe?: NfeDTO;
}

export interface NfeDownloadResponseDTO {
  success: boolean;
  xmlContent: string;
  fileName: string;
}
