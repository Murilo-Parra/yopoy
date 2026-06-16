export class AuthRequestValidators {
  /**
   * Valida se uma string é um UUID válido.
   */
  public static isValidUuid(value: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return typeof value === 'string' && uuidRegex.test(value);
  }

  /**
   * Valida se uma string é um e-mail com formato aceitável.
   */
  public static isValidEmail(value: string): boolean {
    if (typeof value !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) && value.length <= 150;
  }

  /**
   * Valida se os dados de login estão corretos.
   */
  public static validateLoginInput(body: any): { valid: boolean; message?: string } {
    if (!body || typeof body !== 'object') {
      return { valid: false, message: 'JSON inválido' };
    }

    const { companyId, email, password } = body;

    if (!companyId) {
      return { valid: false, message: 'companyId é obrigatório' };
    }

    if (!this.isValidUuid(companyId)) {
      return { valid: false, message: 'companyId deve ser um UUID válido' };
    }

    if (!email) {
      return { valid: false, message: 'E-mail é obrigatório' };
    }

    if (!this.isValidEmail(email)) {
      return { valid: false, message: 'E-mail inválido' };
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
      return { valid: false, message: 'Senha é obrigatória' };
    }

    if (password.length > 100) {
      return { valid: false, message: 'Senha excede o comprimento máximo permitido' };
    }

    return { valid: true };
  }

  /**
   * Valida se dados de checagem de permissão estão corretos.
   */
  public static validateRequirePermissionInput(body: any): { valid: boolean; message?: string } {
    if (!body || typeof body !== 'object') {
      return { valid: false, message: 'JSON inválido' };
    }

    const { companyId, permission } = body;

    if (!companyId) {
      return { valid: false, message: 'companyId é obrigatório' };
    }

    if (!this.isValidUuid(companyId)) {
      return { valid: false, message: 'companyId deve ser um UUID válido' };
    }

    if (!permission || typeof permission !== 'string' || permission.trim() === '') {
      return { valid: false, message: 'Permissão é obrigatória' };
    }

    const list = [
      'company:read',
      'company:write',
      'sales:read',
      'sales:write',
      'payments:read',
      'payments:write',
      'fiscal:read',
      'fiscal:write'
    ];

    if (!list.includes(permission.trim())) {
      return { valid: false, message: 'Permissão desconhecida' };
    }

    return { valid: true };
  }
}
