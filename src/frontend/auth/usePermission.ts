import { useState, useEffect, useCallback } from 'react';
import { PermissionClient } from './permissionClient';

/**
 * Hook customizado para verificacao de permissao no backend de forma reativa.
 * 
 * Regras:
 *   - Nao assumir estado inicial como autorizado.
 *   - Tratar como nao autorizado enquanto carrega.
 */
export function usePermission(permission: string) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const check = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await PermissionClient.checkPermission(permission);
      setAllowed(res.allowed);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err.message || 'Erro de validação'));
      setAllowed(false);
    } finally {
      setLoading(false);
    }
  }, [permission]);

  useEffect(() => {
    check();
  }, [check]);

  return {
    loading,
    allowed,
    error,
    refresh: check
  };
}
