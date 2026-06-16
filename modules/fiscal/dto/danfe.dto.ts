import { DanfeDocumentType } from "../types/danfe.types";

export interface DanfeDTO {
  id: string;
  companyId: string;
  nfeId?: string;
  nfceId?: string;
  nfseId?: string;
  pdfPath: string;
  fileSize: number;
  pagesCount: number;
  documentType: DanfeDocumentType;
  createdAt: string;
}

export interface DanfeCreateRequestDTO {
  documentId: string;
  documentType: DanfeDocumentType;
}

export interface DanfeAuditRequestDTO {
  danfeId: string;
  notes?: string;
}

export interface DanfeListResponseDTO {
  danfeList: DanfeDTO[];
  total: number;
}

export interface DanfeResponseDTO {
  success: boolean;
  message?: string;
  danfe?: DanfeDTO;
}

export interface DanfeDownloadResponseDTO {
  success: boolean;
  pdfBufferBase64: string;
  fileName: string;
}
