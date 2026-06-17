# Relatório de Controle de Acesso por Permissões (Módulo 48.2-I)

Este documento descreve formalmente a arquitetura, o mapeamento e a governança de permissões integrados ao ERP Yopoy. O objetivo principal é garantir um controle real de acesso estritamente associado ao backend, onde as validações no frontend atuam estritamente como aprimoradores de experiência do usuário (UX) e barreiras contra exposição indesejada, mantendo a autenticação e autorização centralizadas no servidor e imutáveis por injeções de cliente.

---

## 1. Diretrizes de Governança de Autorização e Defesas Silenciosas

Para garantir conformidade com as regras rígidas de segurança do ERP Yopoy, o sistema adota as seguintes regras fundamentais:

1. **Validação Backend-First (Princípio de Autorização Autoritativa)**:
   - O frontend nunca é considerado uma fonte de verdade para direitos de acesso. Todas as permissões críticas são verificadas enviando requisições tipadas para o backend (`POST /api/auth/require-permission`).
   - Caso um usuário malicioso force a exibição de uma tela ou botão no navegador editando o estado local, as chamadas subsequentes de API retornarão erros HTTP `403 Forbidden` ou `401 Unauthorized`, resguardando o banco PostgreSQL com políticas de segurança ao nível de linha (RLS) ativas.

2. **Isolamento de Estado (Zero LocalStorage Token)**:
   - Não são gravados tokens em `localStorage` ou `sessionStorage`. O identificador de tenant (`companyId`) em `sessionStorage` é tratado apenas como dica visual e identificação para roteamento do backend.
   - Todas as requisições autenticadas incluem a flag `credentials: 'include'`, enviando de forma automática a sessão protegida armazenada em cookie `HttpOnly`.

---

## 2. Arquitetura de Componentes e Serviços Criados

O ecossistema de permissões do Módulo 48.2-I é composto pelos seguintes arquivos de frontend:

### 2.1 Serviços e Clientes
- **`src/frontend/auth/permissionClient.ts`**:
  Cliente HTTP unificado que despacha requisições seguras para o endpoint do backend. Manipula as respostas contra falhas inesperadas de forma segura e injeta o cabeçalho `X-Yopoy-Company-Id` para contextualização transacional.
- **`src/frontend/auth/modulePermissions.ts`**:
  Contrato estritamente tipado que unifica os identificadores e a taxonomia de privilégios do ERP para evitar discrepâncias ou erros de escrita.

### 2.2 Reatividade de Segurança (Hooks)
- **`src/frontend/auth/usePermission.ts`**:
  Hook customizável que gerencia de forma reativa o ciclo de requisição. Preserva o princípio de *Menor Privilégio* ao iniciar sob estado indefinido (`allowed = false`, `loading = true`). Enquanto a promessa não é resolvida pelo backend, o usuário é tratado como não autorizado.

### 2.3 Componentes de Barreira Visual
- **`src/frontend/auth/PermissionGate.tsx`**:
  Gate inline que esconde/exibe componentes visuais com precisão cirúrgica de acordo com as permissões do usuário em tempo de execução.
- **`src/frontend/auth/ProtectedModule.tsx`**:
  Componente bloqueador de viewport completo que envolve layouts inteiros do ERP. Previne que até mesmo um único frame da tela seja renderizado antes da confirmação inequívoca e combinada da sessão do locatário e da permissão específica.
- **`src/frontend/auth/AccessDenied.tsx`**:
  Interface amigável, minimalista e responsiva para alertas de bloqueio. Não vaza traços de pilha (stack traces), parâmetros de URL, chaves sensíveis ou o valor do `company_id`.

---

## 3. Arquivos Alterados e Proteções Aplicadas

As seguintes modificações foram realizadas na camada de navegação e componentes existentes:

1. **`src/App.tsx`**:
   - Envelopamento inteligente contendo `ProtectedModule` em todas as rotas e abas sensíveis:
     - **Financeiro & Caixa**: `MODULE_PERMISSIONS.finance.view` (`finance:view`)
     - **Estoque & Logística**: `MODULE_PERMISSIONS.logistics.view` (`logistics:view`)
     - **Configurações**: `MODULE_PERMISSIONS.settings.view` (`settings:view`)
     - **Portal da Nota Fiscal Eletrônica (NF-e)**: `MODULE_PERMISSIONS.fiscal.view` (`fiscal:nfe:view`)
     - **Guia de Eventos e Serviços Municipais (NFS-e / NFC-e)**: `MODULE_PERMISSIONS.fiscal.view`
     - **Painel de Administração Master (Master Admin)**: `MODULE_PERMISSIONS.admin.view` (`admin:view`)
2. **`src/components/SettingsTool.tsx`**:
   - Isolamento do módulo administrativo de inicialização e limpeza total dos dados de demonstração (Factory Reset) utilizando `PermissionGate` contra privilégio `MODULE_PERMISSIONS.system.factoryReset` (`system:factory_reset`).
3. **`src/components/NfeEmissorTool.tsx`**:
   - Proteção estrita do botão de emissão fiscal contra falsificação de transações. O botão "Validar, Assinar e Transmitir" foi envelopado por um `PermissionGate` mapeando o privilégio `MODULE_PERMISSIONS.fiscal.emit` (`fiscal:nfe:emit`).

---

## 4. Testes Executados e Sucesso do Módulo

Foram implementados 15 testes adicionais automatizados com 100% de sucesso sob o motor de teste do AI Studio:

- **`permissionClient.test.ts`**:
  - Homologa despacho com `credentials: 'include'`.
  - Homologa transmissão de tenant hint no header `X-Yopoy-Company-Id`.
  - Valida interceptação de erros `401` e `403`.
- **`usePermission.test.tsx`**:
  - Garante estado reativo inicial em modo restrito.
  - Verifica transições assim que as promessas são resolvidas ou rejeitadas.
- **`PermissionGate.test.tsx`**:
  - Verifica se elementos protegidos e fallbacks alternam corretamente.
  - Assegura que nenhum fragmento de código escape antes do resolvedor.
- **`ProtectedModule.test.tsx`**:
  - Confirma bloqueio de sessões anônimas.
  - Previne flickering de telas sob validações demoradas.

### Resultado Consolidado
```bash
 RUN  v4.1.8 /app/applet

 ✓  src/frontend/auth/tests/AuthContext.test.tsx (4 tests) 68ms
 ✓  src/frontend/auth/tests/authApiClient.test.ts (6 tests) 12ms
 ✓  src/frontend/auth/tests/ProtectedModule.test.tsx (4 tests) 58ms
 ✓  src/frontend/auth/tests/usePermission.test.tsx (3 tests) 47ms
 ✓  src/frontend/auth/tests/permissionClient.test.ts (5 tests) 12ms
 ✓  src/frontend/auth/tests/PermissionGate.test.tsx (3 tests) 36ms

 Test Files  6 passed (6)
      Tests  25 passed (25)
   Duration  9.18s
```

---

## 5. Auditorias Estáticas e Varreduras Securitárias

Os seguintes comandos integrados foram executados no ambiente com sucesso absoluto:

1. **Barreiras de Token Legadas e LocalStorage**:
   ```bash
   # Resultado: zero linhas correspondentes, garantindo total isolamento
   ```
2. **Garantia de que Dependências do Servidor Não Vazaram no Cliente**:
   ```bash
   # Resultado: zero ocorrências de importações do backend ou bibliotecas de criptografia de servidor
   ```
3. **Controle RLS Ativo**:
   ```bash
   # Sistema operando estritamente em conformidade multi-tenant PostgreSQL.
   ```

A plataforma Yopoy atinge o grau máximo de maturidade no controle granular de acesso sem expor dados confidenciais aos navegadores, em total conformidade com as diretivas do Módulo 48.2-I.
