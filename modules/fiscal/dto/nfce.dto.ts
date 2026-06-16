import { FiscalDocumentStatus, FiscalEnvironment } from "../types/fiscal.types";

export interface NfceDTO {
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
  environment: FiscalEnvironment;
  createdAt: string;
  updatedAt: string;
}

export interface NfceCreateRequestDTO {
  number: number;
  series: number;
  totalValue: number;
  xmlContent: string;
}

export interface NfceCancelRequestDTO {
  justification: string;
}

export interface NfceSyncRequestDTO {
  payloads: NfceCreateRequestDTO[];
}

export interface NfceDashboardResponseDTO {
  totalAuthorized: number;
  totalCancelled: number;
  totalValue: number;
  dailyStats: Array<{
    date: string;
    count: number;
    value: number;
  }>;
}

export interface NfceListResponseDTO {
  nfceList: NfceDTO[];
  total: number;
}

export interface NfceResponseDTO {
  success: boolean;
  message?: string;
  nfce?: NfceDTO;
}
