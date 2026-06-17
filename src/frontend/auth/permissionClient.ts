/**
 * Permission Client para controle real de acesso e autorizacao no Yopoy.
 * 
 * Regra absoluta:
 *   - A autorizacao final sempre pertence ao backend.
 *   - O frontend apenas melhora UX e evita exposicao visual indevida.
 *   - companyId no frontend nao e autorizacao.
 */

export interface PermissionCheckResponse {
  allowed: boolean;
}

export class PermissionClient {
  public static async checkPermission(permission: string): Promise<PermissionCheckResponse> {
    const companyId = sessionStorage.getItem('yopoy_company_id');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (companyId) {
      headers['X-Yopoy-Company-Id'] = companyId;
    }

    try {
      const response = await fetch('/api/auth/require-permission', {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ permission })
      });

      if (response.status === 401) {
        throw new Error('Sessão inválida ou expirada.');
      }

      if (response.status === 403) {
        return { allowed: false };
      }

      if (response.status === 400) {
        throw new Error('Permissão inválida ou mal formatada.');
      }

      if (!response.ok) {
        throw new Error('Erro inesperado na validação de permissão.');
      }

      const data = await response.json();
      return { allowed: !!data.allowed };
    } catch (error: any) {
      if (error.message && (error.message.includes('Sessão inválida') || error.message.includes('Permissão inválida'))) {
        throw error;
      }
      return { allowed: false };
    }
  }
}
