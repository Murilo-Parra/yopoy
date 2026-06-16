export interface CertificateDecryptedInfo {
  id: string;
  companyId: string;
  certificatePfxBase64: string;
  passwordDecrypted: string;
  subjectName: string;
  expiresAt: string;
}

export interface ICertificateProvider {
  getActiveCertificate(companyId: string): Promise<CertificateDecryptedInfo | null>;
  getCertificateForSigning(companyId: string, certificateId?: string): Promise<CertificateDecryptedInfo | null>;
  validateCertificateAvailability(companyId: string): Promise<{ available: boolean; expiresDays?: number; error?: string }>;
}
