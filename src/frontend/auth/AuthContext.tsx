import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthApiClient, RegisterCompanyInput } from './authApiClient';

// companyId no frontend não é autorização. O backend valida sessão, tenant e permissões.

export interface AuthState {
  authenticated: boolean;
  loading: boolean;
  companyId: string | null;
  user: {
    id: string;
    companyId: string;
    fullName: string;
    email: string;
    role: string;
  } | null;
  session: {
    id: string;
    expiresAt: string;
  } | null;
}

export interface AuthContextType extends AuthState {
  registerCompany: (input: RegisterCompanyInput) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  requirePermission: (permission: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    authenticated: false,
    loading: true,
    companyId: null,
    user: null,
    session: null
  });

  // O cookie HttpOnly é a fonte de verdade para restaurar a sessão.
  const refreshSession = async () => {
    try {
      const sessResp = await AuthApiClient.getSession();
      if (sessResp.authenticated && sessResp.session) {
        sessionStorage.setItem('yopoy_company_id', sessResp.session.companyId);
        setState({
          authenticated: true,
          loading: false,
          companyId: sessResp.session.companyId,
          user: {
            id: sessResp.session.userId,
            companyId: sessResp.session.companyId,
            fullName: sessResp.session.email.split('@')[0], // falling back or setting humanly
            email: sessResp.session.email,
            role: sessResp.session.role
          },
          session: {
            id: sessResp.session.id,
            expiresAt: '' // cookie handles actual expiration, this is representation
          }
        });
      } else {
        // Sessão inválida ou expirada
        sessionStorage.removeItem('yopoy_company_id');
        setState({
          authenticated: false,
          loading: false,
          companyId: null,
          user: null,
          session: null
        });
      }
    } catch {
      sessionStorage.removeItem('yopoy_company_id');
      setState({
        authenticated: false,
        loading: false,
        companyId: null,
        user: null,
        session: null
      });
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const registerCompany = async (input: RegisterCompanyInput) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const res = await AuthApiClient.registerCompany(input);
      sessionStorage.setItem('yopoy_company_id', res.company.id);
      
      setState({
        authenticated: true,
        loading: false,
        companyId: res.company.id,
        user: {
          id: res.user.id,
          companyId: res.user.companyId,
          fullName: res.user.fullName,
          email: res.user.email,
          role: res.user.role
        },
        session: {
          id: res.session.id,
          expiresAt: res.session.expiresAt
        }
      });
    } catch (err) {
      setState(prev => ({ ...prev, loading: false }));
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const res = await AuthApiClient.login({ email, password });
      sessionStorage.setItem('yopoy_company_id', res.user.companyId);

      setState({
        authenticated: true,
        loading: false,
        companyId: res.user.companyId,
        user: {
          id: res.user.id,
          companyId: res.user.companyId,
          fullName: res.user.fullName,
          email: res.user.email,
          role: res.user.role
        },
        session: {
          id: res.session.id,
          expiresAt: res.session.expiresAt
        }
      });
    } catch (err) {
      setState(prev => ({ ...prev, loading: false }));
      throw err;
    }
  };

  const logout = async () => {
    const activeCompanyId = state.companyId || sessionStorage.getItem('yopoy_company_id');
    if (activeCompanyId) {
      await AuthApiClient.logout(activeCompanyId);
    }
    sessionStorage.removeItem('yopoy_company_id');
    setState({
      authenticated: false,
      loading: false,
      companyId: null,
      user: null,
      session: null
    });
  };

  const requirePermission = async (permission: string): Promise<boolean> => {
    const activeCompanyId = state.companyId || sessionStorage.getItem('yopoy_company_id');
    if (!activeCompanyId) return false;
    try {
      const res = await AuthApiClient.requirePermission(activeCompanyId, permission);
      return res.allowed;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, registerCompany, login, logout, refreshSession, requirePermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
