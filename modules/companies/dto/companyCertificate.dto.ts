/**
 * DTOs FOR COMPANY CERTIFICATES
 * Standardized data transfer objects mapping exactly to the existing frontend/backend signatures.
 */

export interface CertificateUploadRequestDTO {
  certificate_name: string;
  certificate_type?: string;
  certificate_base64: string;
  password?: string;
  is_active?: boolean;
}

export interface CertificateDetailsDTO {
  id: string;
  company_id: string;
  certificate_name: string;
  certificate_type: string;
  serial_number: string;
  issuer: string;
  subject: string;
  valid_from: string;
  valid_until: string;
  status: string;
  is_active: boolean;
  uploaded_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CertificateUploadResponseDTO {
  success: boolean;
  message: string;
  certificate: {
    id: string;
    certificate_name: string;
    certificate_type: string;
    serial_number: string;
    issuer: string;
    subject: string;
    valid_from: string;
    valid_until: string;
    status: string;
    is_active: boolean;
  };
}

export interface CertificateDeleteResponseDTO {
  success: boolean;
  message: string;
}
