// Wrapper para separar os dados do localStorage por usuário logado (Multi-tenant local com sinc híbrida na nuvem)
const originalGetItem = window.localStorage.getItem.bind(window.localStorage);
const originalSetItem = window.localStorage.setItem.bind(window.localStorage);
const originalRemoveItem = window.localStorage.removeItem.bind(window.localStorage);

const EXCLUDED_KEYS = [
  'biz_current_user',
  'biz_token',
  'biz_registered_users',
  'biz_app_theme',
  'biz_onboarding_tutorial_viewed'
];

const getScopedKey = (key: string): string => {
  if (EXCLUDED_KEYS.includes(key)) {
    return key;
  }
  
  const currentUserRaw = originalGetItem('biz_current_user');
  if (currentUserRaw) {
    try {
      const user = JSON.parse(currentUserRaw);
      // Identificador único do usuário: id, email ou 'admin'
      const identifier = user.isAdmin ? 'admin' : (user.id || user.email || user.pjEmail || 'guest');
      return `${identifier}_${key}`;
    } catch (e) {
      // Ignora erro de parsing
    }
  }
  return key; // Fallback para chave original se não houver usuário logado
};

// Envia atualizações em segundo plano para persistência cross-device no servidor
const syncToServer = async (key: string, value: string | null) => {
  if (key === 'biz_current_user' || key === 'biz_app_theme' || key === 'biz_onboarding_tutorial_viewed') {
    return;
  }

  try {
    const currentUserRaw = originalGetItem('biz_current_user');
    let identifier = 'guest';
    if (currentUserRaw) {
      try {
        const user = JSON.parse(currentUserRaw);
        identifier = user.isAdmin ? 'admin' : (user.id || user.email || user.pjEmail || 'guest');
      } catch (e) {}
    }

    const token = originalGetItem('biz_token') || '';
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    await fetch('/api/sync/save', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        identifier,
        key, // Chave física real salva (pode ser scoped ex: admin_biz_simulated_products)
        value,
      }),
    });
  } catch (err) {
    console.warn('Falha na comunicação de sincronia ativa com o servidor auxiliar para:', key, err);
  }
};

// Sobrescrevendo os métodos globais do localStorage
window.localStorage.getItem = (key: string): string | null => {
  return originalGetItem(getScopedKey(key));
};

window.localStorage.setItem = (key: string, value: string): void => {
  const scopedKey = getScopedKey(key);
  originalSetItem(scopedKey, value);
  syncToServer(scopedKey, value);
};

window.localStorage.removeItem = (key: string): void => {
  const scopedKey = getScopedKey(key);
  originalRemoveItem(scopedKey);
  syncToServer(scopedKey, null);
};

// Sobrescrevendo o clear para limpar apenas os dados do usuário atual e manter os logins e cadastros
window.localStorage.clear = (): void => {
  const currentUserRaw = originalGetItem('biz_current_user');
  let identifier = 'guest';
  if (currentUserRaw) {
    try {
      const user = JSON.parse(currentUserRaw);
      identifier = user.isAdmin ? 'admin' : (user.id || user.email || user.pjEmail || 'guest');
    } catch (e) {}
  }

  const keysToClear: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key) {
      if (key.startsWith(`${identifier}_`)) {
        keysToClear.push(key);
      } else if (!currentUserRaw && !EXCLUDED_KEYS.includes(key)) {
        keysToClear.push(key);
      }
    }
  }

  keysToClear.forEach(key => {
    originalRemoveItem(key);
    syncToServer(key, null);
  });
};

// Expõe métodos brutos originais sem interceptores de escopo/sync para permitir restore limpo na inicialização
export const restoreLocalStorageItem = (key: string, value: string): void => {
  originalSetItem(key, value);
};

export const getOriginalItem = (key: string): string | null => {
  return originalGetItem(key);
};
