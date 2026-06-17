/**
 * Mapeamento de permissoes principais do ERP Yopoy.
 * Garantia de conformidade de rotas, modulos e acoes criticas.
 */
export const MODULE_PERMISSIONS = {
  dashboard: {
    view: 'dashboard:view',
  },
  fiscal: {
    view: 'fiscal:nfe:view',
    emit: 'fiscal:nfe:emit',
    cancel: 'fiscal:nfe:cancel',
    danfeView: 'fiscal:danfe:view',
  },
  inventory: {
    view: 'inventory:view',
    manage: 'inventory:manage',
  },
  logistics: {
    view: 'logistics:view',
    manage: 'logistics:manage',
  },
  finance: {
    view: 'finance:view',
    manage: 'finance:manage',
  },
  settings: {
    view: 'settings:view',
    update: 'settings:update',
  },
  admin: {
    view: 'admin:view',
    companiesManage: 'admin:companies:manage',
    usersManage: 'admin:users:manage',
    auditView: 'admin:audit:view',
    supportManage: 'admin:support:manage',
  },
  system: {
    factoryReset: 'system:factory_reset',
  }
} as const;

export type SystemPermission =
  | 'dashboard:view'
  | 'fiscal:nfe:view'
  | 'fiscal:nfe:emit'
  | 'fiscal:nfe:cancel'
  | 'fiscal:danfe:view'
  | 'inventory:view'
  | 'inventory:manage'
  | 'logistics:view'
  | 'logistics:manage'
  | 'finance:view'
  | 'finance:manage'
  | 'settings:view'
  | 'settings:update'
  | 'admin:view'
  | 'admin:companies:manage'
  | 'admin:users:manage'
  | 'admin:audit:view'
  | 'admin:support:manage'
  | 'system:factory_reset';
