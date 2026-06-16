import { AdminCompanyUpdateRequestDTO } from "../dto/adminCompany.dto";

export class AdminCompanyValidators {
  /**
   * Validates company update payload sent by Admin
   */
  public static validateUpdate(data: AdminCompanyUpdateRequestDTO): { success: boolean; error?: string } {
    if (!data || typeof data !== "object") {
      return { success: false, error: "Dados de envio inválidos ou vazios." };
    }

    const { corporate_name, trade_name, plan, status } = data;

    if (corporate_name !== undefined && (typeof corporate_name !== "string" || corporate_name.trim().length === 0)) {
      return { success: false, error: "A Razão Social é obrigatória." };
    }

    if (trade_name !== undefined && (typeof trade_name !== "string" || trade_name.trim().length === 0)) {
      return { success: false, error: "O Nome Fantasia é obrigatório." };
    }

    if (plan !== undefined && (typeof plan !== "string" || plan.trim().length === 0)) {
      return { success: false, error: "O Plano é obrigatório." };
    }

    if (status !== undefined && (typeof status !== "string" || status.trim().length === 0)) {
      return { success: false, error: "O Status da empresa é obrigatório." };
    }

    // validate date formats if provided
    if (data.trial_ends_at) {
      const trialDate = new Date(data.trial_ends_at);
      if (isNaN(trialDate.getTime())) {
        return { success: false, error: "Data de fim do trial inválida." };
      }
    }

    if (data.expires_at) {
      const expiresDate = new Date(data.expires_at);
      if (isNaN(expiresDate.getTime())) {
        return { success: false, error: "Data de vencimento inválida." };
      }
    }

    return { success: true };
  }
}
