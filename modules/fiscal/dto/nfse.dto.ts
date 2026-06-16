import { NfseProviderType, NfseQueueStatus } from "../types/nfse.types";
import { FiscalDocumentStatus } from "../types/fiscal.types";

export interface NfseDTO {
  id: string;
  companyId: string;
  invoiceNumber: string;
  verificationCode?: string;
  status: FiscalDocumentStatus;
  customerId: string;
  customerName: string;
  totalServiceValue: number;
  xmlContent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NfseQueryRequestDTO {
  startDate?: string;
  endDate?: string;
  invoiceNumber?: string;
  customerCnpjCpf?: string;
}

export interface NfseQueryResponseDTO {
  success: boolean;
  message?: string;
  invoices: NfseDTO[];
}

export interface NfseProviderConfigDTO {
  providerType: NfseProviderType;
  endpointUrl: string;
  clientId?: string;
  clientSecret?: string;
  username?: string;
  password?: string;
  token?: string;
  signInvoices: boolean;
  signRps: boolean;
  certificateRequired: boolean;
}

export interface NfseServiceDTO {
  id: string;
  code: string;
  name: string;
  aliquot: number;
  taxable: boolean;
  itemCnae?: string;
  nationalCode?: string;
}
