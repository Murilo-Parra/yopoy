/**
 * API client browser-safe para integração do real backend de autenticação do Yopoy.
 * 
 * Regra absoluta:
 *   - companyId no frontend não é autorização. O backend valida sessão, tenant e permissões.
 *   - Não guarda tokens de sessão sensíveis em localStorage/cookies do JS.
 *   - Depende estritamente do cookie HttpOnly 'yopoy_session'.
 */

export interface RegisterCompanyInput {
  companyName: string;
  adminName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthUserResponse {
  id: string;
  companyId: string;
  fullName: string;
  email: string;
  role: string;
}

export interface AuthSessionResponse {
  id: string;
  expiresAt: string;
}

export interface RegisterCompanyResponse {
  ok: boolean;
  company: {
    id: string;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj?: string | null;
  };
  user: AuthUserResponse;
  session: AuthSessionResponse;
}

export interface LoginResponse {
  ok: boolean;
  user: AuthUserResponse;
  session: AuthSessionResponse;
}

export interface SessionCheckResponse {
  authenticated: boolean;
  session?: {
    id: string;
    companyId: string;
    userId: string;
    email: string;
    role: string;
    permissions?: string[];
  };
}

export class AuthApiClient {
  private static async handleFetchError(response: Response, defaultMessage: string): Promise<never> {
    let errorCode = 'UNKNOWN';
    let errorMessage = defaultMessage;

    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorCode = errorData.error.code || 'UNKNOWN';
        errorMessage = errorData.error.message || defaultMessage;
      }
    } catch {
      // ignore JSON parse issue for errors
    }

    if (response.status === 401) {
      throw new Error('E-mail ou senha inválidos.');
    }
    if (response.status === 409) {
      if (errorCode === 'COMPANY_ALREADY_EXISTS') {
        throw new Error('Já existe uma empresa com este CNPJ.');
      }
      if (errorCode === 'USER_ALREADY_EXISTS') {
        throw new Error('Este e-mail já está em uso.');
      }
    }
    if (response.status === 400) {
      throw new Error(errorMessage || 'Revise os dados informados.');
    }
    if (response.status === 403 || response.status === 423) {
      throw new Error('Acesso negado ou conta temporariamente bloqueada por segurança.');
    }
    if (response.status >= 500) {
      throw new Error('Não foi possível entrar agora. Tente novamente mais tarde.');
    }

    throw new Error(errorMessage);
  }

  public static async registerCompany(input: RegisterCompanyInput): Promise<RegisterCompanyResponse> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    });

    if (!res.ok) {
      await this.handleFetchError(res, 'Erro ao registrar empresa.');
    }

    return await res.json();
  }

  public static async login(input: LoginInput): Promise<LoginResponse> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: input.email,
        password: input.password
      })
    });

    if (!res.ok) {
      await this.handleFetchError(res, 'Erro ao entrar.');
    }

    return await res.json();
  }

  public static async getSession(): Promise<SessionCheckResponse> {
    const res = await fetch(`/api/auth/session`, {
      method: 'GET',
      credentials: 'include',
      headers: {}
    });

    if (!res.ok) {
      return { authenticated: false };
    }

    return await res.json();
  }

  public static async logout(companyId: string): Promise<boolean> {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Yopoy-Company-Id': companyId
        },
        body: JSON.stringify({ companyId })
      });

      return res.ok;
    } catch {
      return false;
    }
  }

  public static async requirePermission(companyId: string, permission: string): Promise<{ allowed: boolean }> {
    try {
      const res = await fetch('/api/auth/require-permission', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Yopoy-Company-Id': companyId
        },
        body: JSON.stringify({ permission })
      });

      if (!res.ok) {
        return { allowed: false };
      }

      return await res.json();
    } catch {
      return { allowed: false };
    }
  }
}
