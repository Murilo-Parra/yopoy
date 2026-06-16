import { FiscalDocumentType, FiscalDocumentStatus, FiscalEnvironment } from "../types/fiscal.types";

export interface FiscalDocumentDTO {
  id: string;
  companyId: string;
  documentType: FiscalDocumentType;
  documentNumber: number;
  documentSeries: number;
  status: FiscalDocumentStatus;
  version: number;
  xmlContent: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface FiscalDocumentCreateRequestDTO {
  documentType: FiscalDocumentType;
  documentNumber: number;
  documentSeries: number;
  xmlContent: string;
}

export interface FiscalDocumentUpdateRequestDTO {
  status?: FiscalDocumentStatus;
  xmlContent?: string;
  version?: number;
}

export interface FiscalDocumentListResponseDTO {
  documents: FiscalDocumentDTO[];
  total: number;
}

export interface FiscalDocumentResponseDTO {
  success: boolean;
  message?: string;
  document?: FiscalDocumentDTO;
}

export interface FiscalDocumentValidationResponseDTO {
  valid: boolean;
  errors: string[];
}
