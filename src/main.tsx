import { restoreLocalStorageItem, getOriginalItem } from './localStorageWrapper.ts';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { YopoyClientProvider } from './frontend-api';
import { AuthProvider } from './frontend/auth/AuthContext';

async function startApp() {
  try {
    // 1. Descobrir qual o usuário atualmente logado (do storage original puro)
    const currentUserRaw = getOriginalItem('biz_current_user');
    let identifier = 'guest';
    if (currentUserRaw) {
      try {
        const user = JSON.parse(currentUserRaw);
        identifier = user.isAdmin ? 'admin' : (user.id || user.email || user.pjEmail || 'guest');
      } catch (e) {
        console.error("Erro ao fazer parse do usuário atual:", e);
      }
    }

    // 2. Buscar dados unificados e sincronizados do servidor
    const headers: Record<string, string> = {};

    const res = await fetch(`/api/sync/load?identifier=${encodeURIComponent(identifier)}`, { headers, credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      
      // Restaurar chaves globais recebidas (ex: biz_registered_users)
      if (data.global) {
        Object.entries(data.global).forEach(([key, val]) => {
          if (typeof val === 'string') {
            restoreLocalStorageItem(key, val);
          }
        });
      }

      // Restaurar chaves do escopo deste usuário ativo (ex: admin_biz_simulated_products)
      if (data.scoped) {
        Object.entries(data.scoped).forEach(([key, val]) => {
          if (typeof val === 'string') {
            restoreLocalStorageItem(key, val);
          }
        });
      }
    }
  } catch (error) {
    console.warn("Erro de rede ao carregar base de dados remota:", error);
  }

  // 3. Renderizar o App React após garantia de dados populados
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <YopoyClientProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </YopoyClientProvider>
    </StrictMode>
  );
}

startApp();
