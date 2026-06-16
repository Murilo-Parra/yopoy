import { FiscalEnvironment } from "../types/fiscal.types";
import { SefazUF, SefazManifestationType } from "../types/sefaz.types";

export interface SefazTransmitRequestDTO {
  documentId: string;
}

export interface SefazTransmitResponseDTO {
  success: boolean;
  message: string;
  protocol?: string;
  xmlSigned?: string;
  errors?: string[];
}

export interface SefazCancelRequestDTO {
  documentId: string;
  justification: string;
}

export interface SefazCancelResponseDTO {
  success: boolean;
  message: string;
  protocol?: string;
  errors?: string[];
}

export interface SefazInvalidateRequestDTO {
  uf: SefazUF;
  year: number;
  cnpj: string;
  series: number;
  startNumber: number;
  endNumber: number;
  justification: string;
}

export interface SefazInvalidateResponseDTO {
  success: boolean;
  message: string;
  protocol?: string;
  errors?: string[];
}

export interface SefazCceRequestDTO {
  documentId: string;
  correctionText: string;
  sequenceNumber: number;
}

export interface SefazCceResponseDTO {
  success: boolean;
  message: string;
  protocol?: string;
  errors?: string[];
}

export interface SefazQueryRequestDTO {
  documentId?: string;
  key?: string;
}

export interface SefazQueryResponseDTO {
  success: boolean;
  status: string;
  protocol?: string;
  xml?: string;
  errors?: string[];
}

export interface SefazManifestRequestDTO {
  key: string;
  type: SefazManifestationType;
  justification?: string;
}

export interface SefazDistributionRequestDTO {
  uf: SefazUF;
  cnpj: string;
  ultNSU?: string;
  nsu?: string;
}

export interface SefazDistributionResponseDTO {
  success: boolean;
  maxNSU: string;
  ultNSU: string;
  documentsCount: number;
  documents: Array<{
    schema: string;
    nsu: string;
    xml: string;
  }>;
}

export interface SefazConfigResponseDTO {
  environment: FiscalEnvironment;
  uf: SefazUF;
  cnpj: string;
  configuredCertificateId?: string;
}

export interface SefazEnvUpdateRequestDTO {
  environment: FiscalEnvironment;
}
