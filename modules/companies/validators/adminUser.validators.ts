/**
 * Validators for Admin User Filters (Sprint 3.6)
 */

export interface AdminUserFiltersDTO {
  page?: number;
  limit?: number;
  search?: string;
  companyId?: string;
  status?: string;
}

export class AdminUserValidators {
  /**
   * Sanitizes and validates filters used for listing users in the admin panel.
   */
  public static validateFilters(query: any): { success: boolean; data?: AdminUserFiltersDTO; error?: string } {
    const data: AdminUserFiltersDTO = {};

    if (query.page !== undefined) {
      const page = parseInt(query.page, 10);
      if (isNaN(page) || page <= 0) {
        return { success: false, error: "Parâmetro 'page' deve ser um número inteiro maior que zero." };
      }
      data.page = page;
    }

    if (query.limit !== undefined) {
      const limit = parseInt(query.limit, 10);
      if (isNaN(limit) || limit <= 0) {
        return { success: false, error: "Parâmetro 'limit' deve ser um número inteiro maior que zero." };
      }
      data.limit = limit;
    }

    if (query.search !== undefined) {
      if (typeof query.search !== "string") {
        return { success: false, error: "Filtro de busca deve ser uma string." };
      }
      data.search = query.search;
    }

    if (query.companyId !== undefined) {
      if (typeof query.companyId !== "string" || query.companyId.trim().length === 0) {
        return { success: false, error: "O companyId deve ser uma string válida." };
      }
      data.companyId = query.companyId;
    }

    if (query.status !== undefined) {
      if (typeof query.status !== "string") {
        return { success: false, error: "O status de filtro deve ser uma string." };
      }
      data.status = query.status;
    }

    return { success: true, data };
  }

  /**
   * Validates user update payload sent by Admin
   */
  public static validateUpdate(data: any): { success: boolean; error?: string } {
    if (!data || typeof data !== "object") {
      return { success: false, error: "Dados de envio inválidos ou vazios." };
    }

    const { name, active, new_password } = data;

    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
      return { success: false, error: "Nome é obrigatório." };
    }

    if (active !== undefined && typeof active !== "boolean") {
      return { success: false, error: "O status ativo/inativo deve ser booleano." };
    }

    if (new_password !== undefined && new_password !== null && new_password !== "") {
      if (typeof new_password !== "string" || new_password.trim().length < 6) {
        return { success: false, error: "A nova senha deve ter pelo menos 6 caracteres." };
      }
    }

    return { success: true };
  }

  /**
   * Validates user creation payload sent by Admin
   */
  public static validateCreate(data: any): { success: boolean; error?: string } {
    if (!data || typeof data !== "object") {
      return { success: false, error: "Dados de envio inválidos ou vazios." };
    }

    const { name, email, company_id, password } = data;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return { success: false, error: "Nome do usuário é obrigatório." };
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return { success: false, error: "E-mail/Login do usuário é obrigatório." };
    }

    if (!company_id || typeof company_id !== "string" || company_id.trim().length === 0) {
      return { success: false, error: "Vínculo de Empresa (company_id) é obrigatório." };
    }

    if (password !== undefined && password !== null && password !== "") {
      if (typeof password !== "string" || password.trim().length < 6) {
        return { success: false, error: "A senha deve ter pelo menos 6 caracteres." };
      }
    }

    return { success: true };
  }
}
