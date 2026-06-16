import { CertificateUploadRequestDTO } from "../dto/companyCertificate.dto";

export class CompanyCertificateValidators {
  /**
   * Validates incoming upload payload.
   */
  public static validateUpload(body: any): { success: boolean; data?: CertificateUploadRequestDTO; error?: string } {
    if (!body || typeof body !== "object") {
      return { success: false, error: "Dados do certificado ausentes ou mal formatados." };
    }

    const { certificate_name, certificate_base64, password } = body;

    if (!certificate_name || !certificate_base64 || !password) {
      return { 
        success: false, 
        error: "Todos os campos obrigatórios devem ser preenchidos (Nome, Arquivo e Senha)." 
      };
    }

    // Explicitly reject if attempting to override security parameters
    if (body.company_id !== undefined || body.id !== undefined) {
      return {
        success: false,
        error: "Segurança violada: parâmetros centralizados de identificação não podem ser enviados no corpo."
      };
    }

    return {
      success: true,
      data: {
        certificate_name: String(certificate_name).trim(),
        certificate_type: body.certificate_type || "A1",
        certificate_base64: String(certificate_base64),
        password: String(password),
        is_active: body.is_active !== undefined ? Boolean(body.is_active) : true
      }
    };
  }

  /**
   * Validates target certificate ID for deletion
   */
  public static validateDelete(id: string): { success: boolean; error?: string } {
    if (!id || typeof id !== "string" || id.trim().length === 0) {
      return { success: false, error: "O identificador do certificado para exclusão é obrigatório." };
    }
    return { success: true };
  }
}
