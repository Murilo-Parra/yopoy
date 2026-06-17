import React from 'react';
import { useAuth } from './AuthContext';
import { usePermission } from './usePermission';
import AccessDenied from './AccessDenied';

interface ProtectedModuleProps {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Componente de protecao estrutural para modulos inteiros do ERP.
 * Confirma sessao via AuthContext e confirma permissao pelo backend
 * antes de exibir qualquer parte do modulo real.
 */
export default function ProtectedModule({ permission, fallback, children }: ProtectedModuleProps) {
  const { authenticated, loading: authLoading } = useAuth();
  const { allowed, loading: permLoading } = usePermission(permission);

  if (authLoading || permLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-6 text-center" id="protected-loading">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500 mb-4"></div>
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
          Autenticando e verificando permissões...
        </p>
      </div>
    );
  }

  if (!authenticated || !allowed) {
    if (fallback !== undefined) {
      return <>{fallback}</>;
    }
    return <AccessDenied />;
  }

  return <>{children}</>;
}
