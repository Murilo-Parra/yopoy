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

  /**
   * Valida os campos da requisição de cadastro de empresa.
   */
  public static validateRegisterCompanyInput(body: any): { valid: boolean; message?: string } {
    if (!body || typeof body !== 'object') {
      return { valid: false, message: 'JSON inválido' };
    }

    const { company, admin } = body;

    if (!company || typeof company !== 'object') {
      return { valid: false, message: 'Objeto company é obrigatório' };
    }

    if (!admin || typeof admin !== 'object') {
      return { valid: false, message: 'Objeto admin é obrigatório' };
    }

    // Validate Company fields
    if (!company.razaoSocial || typeof company.razaoSocial !== 'string' || company.razaoSocial.trim() === '') {
      return { valid: false, message: 'Razão Social é obrigatória' };
    }

    if (!company.cnpj || typeof company.cnpj !== 'string' || company.cnpj.trim() === '') {
      return { valid: false, message: 'CNPJ é obrigatório' };
    }

    // CNPJ Normalization is done in handler/usecase, let's validate format/digits
    const normalizedCnpj = company.cnpj.replace(/\D/g, '');
    if (normalizedCnpj.length !== 14) {
      return { valid: false, message: 'CNPJ deve conter exatamente 14 dígitos' };
    }

    if (!company.email || !this.isValidEmail(company.email)) {
      return { valid: false, message: 'E-mail da empresa inválido' };
    }

    if (!company.endereco || typeof company.endereco !== 'object') {
      return { valid: false, message: 'Endereço é obrigatório' };
    }

    const { rua, numero, cidade, uf } = company.endereco;
    if (!rua || typeof rua !== 'string' || rua.trim() === '') {
      return { valid: false, message: 'Rua do endereço é obrigatória' };
    }
    if (!numero || typeof numero !== 'string' || numero.trim() === '') {
      return { valid: false, message: 'Número do endereço é obrigatório' };
    }
    if (!cidade || typeof cidade !== 'string' || cidade.trim() === '') {
      return { valid: false, message: 'Cidade do endereço é obrigatória' };
    }
    if (!uf || typeof uf !== 'string' || uf.trim().length !== 2) {
      return { valid: false, message: 'UF do endereço deve conter 2 letras' };
    }

    if (!company.regimeTributario || typeof company.regimeTributario !== 'string' || company.regimeTributario.trim() === '') {
      return { valid: false, message: 'Regime tributário é obrigatório' };
    }

    // Validate Admin fields
    if (!admin.nomeCompleto || typeof admin.nomeCompleto !== 'string' || admin.nomeCompleto.trim() === '') {
      return { valid: false, message: 'Nome completo do administrador é obrigatório' };
    }

    if (!admin.email || !this.isValidEmail(admin.email)) {
      return { valid: false, message: 'E-mail do administrador é inválido' };
    }

    if (!admin.senha || typeof admin.senha !== 'string' || admin.senha.trim() === '') {
      return { valid: false, message: 'Senha é obrigatória' };
    }

    if (!admin.confirmarSenha || typeof admin.confirmarSenha !== 'string' || admin.confirmarSenha.trim() === '') {
      return { valid: false, message: 'Confirmação de senha é obrigatória' };
    }

    if (admin.senha !== admin.confirmarSenha) {
      return { valid: false, message: 'A senha e a confirmação de senha devem ser iguais' };
    }

    return { valid: true };
  }
}
