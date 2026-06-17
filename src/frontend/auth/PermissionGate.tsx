import React from 'react';
import { usePermission } from './usePermission';

interface PermissionGateProps {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Componente que exibe ou oculta elementos (geralmente botoes, acoes e textos)
 * baseado na confirmacao de permissao do backend.
 */
export default function PermissionGate({ permission, fallback = null, children }: PermissionGateProps) {
  const { allowed, loading } = usePermission(permission);

  if (loading) {
    return null; // Tratar como nao autorizado enquanto carrega
  }

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
