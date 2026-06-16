export enum DanfeDocumentType {
  NFE = "NFE",
  NFCE = "NFCE",
  NFSE = "NFSE",
  EVENTO = "EVENTO",
  RELATORIO = "RELATORIO"
}

export interface DanfeRenderInput {
  xmlContent: string;
  documentType: DanfeDocumentType;
  metadata?: Record<string, any>;
}

export interface DanfeRenderResult {
  success: boolean;
  pdfBuffer: Buffer;
  xmlUsed: string;
  pagesCount?: number;
  errors?: string[];
}

export interface PdfRenderOptions {
  printLogo?: boolean;
  compactMode?: boolean;
  customMargins?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  primaryColor?: string;
}

export interface PdfStorageResult {
  success: boolean;
  path: string;
  url?: string;
  fileSize: number;
  storedAt: string;
}
