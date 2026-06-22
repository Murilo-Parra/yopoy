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
  public static validateLoginInput(body: unknown): { valid: boolean; message?: string } {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return { valid: false, message: 'JSON inválido' };
    }

    const { email, password } = body as Record<string, unknown>;

    if (!email) {
      return { valid: false, message: 'E-mail é obrigatório' };
    }

    if (typeof email !== 'string' || !this.isValidEmail(email)) {
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

  /**
   * Valida os campos da requisição de cadastro de empresa.
   */
  public static validateRegisterCompanyInput(body: unknown): { valid: boolean; message?: string } {
    if (!body || typeof body !== 'object') {
      return { valid: false, message: 'JSON inválido' };
    }

    const { company, admin } = body as Record<string, unknown>;

    if (company !== undefined && company !== null && (typeof company !== 'object' || Array.isArray(company))) {
      return { valid: false, message: 'Objeto company deve ser válido quando informado' };
    }

    if (!admin || typeof admin !== 'object' || Array.isArray(admin)) {
      return { valid: false, message: 'Objeto admin é obrigatório' };
    }

    const companyFields = (company || {}) as Record<string, unknown>;
    const adminFields = admin as Record<string, unknown>;

    if (companyFields.razaoSocial !== undefined && typeof companyFields.razaoSocial !== 'string') {
      return { valid: false, message: 'Nome do negócio deve ser um texto válido' };
    }

    if (companyFields.cnpj !== undefined && companyFields.cnpj !== null && companyFields.cnpj !== '') {
      if (typeof companyFields.cnpj !== 'string') {
        return { valid: false, message: 'CNPJ deve ser um texto válido quando informado' };
      }
      const normalizedCnpj = companyFields.cnpj.replace(/\D/g, '');
      if (normalizedCnpj.length !== 14) {
        return { valid: false, message: 'CNPJ deve conter exatamente 14 dígitos quando informado' };
      }
    }

    if (companyFields.email !== undefined && companyFields.email !== null && companyFields.email !== '') {
      if (typeof companyFields.email !== 'string' || !this.isValidEmail(companyFields.email)) {
        return { valid: false, message: 'E-mail da empresa é inválido quando informado' };
      }
    }

    if (companyFields.endereco !== undefined && companyFields.endereco !== null) {
      if (typeof companyFields.endereco !== 'object' || Array.isArray(companyFields.endereco)) {
        return { valid: false, message: 'Endereço deve ser um objeto válido quando informado' };
      }
      const address = companyFields.endereco as Record<string, unknown>;
      const addressFields = [
        ['rua', 'Rua'],
        ['numero', 'Número'],
        ['cidade', 'Cidade']
      ] as const;

      for (const [field, label] of addressFields) {
        const value = address[field];
        if (value !== undefined && (typeof value !== 'string' || value.trim() === '')) {
          return { valid: false, message: `${label} do endereço deve ser um texto válido quando informado` };
        }
      }

      if (address.uf !== undefined) {
        if (typeof address.uf !== 'string' || !/^[A-Za-z]{2}$/.test(address.uf.trim())) {
          return { valid: false, message: 'UF do endereço deve conter 2 letras quando informada' };
        }
      }
    }

    if (
      companyFields.regimeTributario !== undefined &&
      companyFields.regimeTributario !== null &&
      companyFields.regimeTributario !== ''
    ) {
      const acceptedTaxRegimes = ['simples_nacional', 'lucro_presumido', 'lucro_real'];
      if (
        typeof companyFields.regimeTributario !== 'string' ||
        !acceptedTaxRegimes.includes(companyFields.regimeTributario.trim().toLowerCase())
      ) {
        return { valid: false, message: 'Regime tributário informado é inválido' };
      }
    }

    // Validate Admin fields
    if (!adminFields.nomeCompleto || typeof adminFields.nomeCompleto !== 'string' || adminFields.nomeCompleto.trim() === '') {
      return { valid: false, message: 'Nome completo do administrador é obrigatório' };
    }

    if (!adminFields.email || typeof adminFields.email !== 'string' || !this.isValidEmail(adminFields.email)) {
      return { valid: false, message: 'E-mail do administrador é inválido' };
    }

    if (!adminFields.senha || typeof adminFields.senha !== 'string' || adminFields.senha.trim() === '') {
      return { valid: false, message: 'Senha é obrigatória' };
    }

    if (!adminFields.confirmarSenha || typeof adminFields.confirmarSenha !== 'string' || adminFields.confirmarSenha.trim() === '') {
      return { valid: false, message: 'Confirmação de senha é obrigatória' };
    }

    if (adminFields.senha !== adminFields.confirmarSenha) {
      return { valid: false, message: 'A senha e a confirmação de senha devem ser iguais' };
    }

    return { valid: true };
  }
}
