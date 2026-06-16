# Relatório de Planejamento, Modelagem e Contratos de Autenticação — Módulo 48.2-A

Este relatório consolida a especificação conceitual, desenho de contratos de repositório, regras de autorização por privilégios estruturados da matriz de permissões e as funções puras de sanitização de dados confidenciais do ERP Yopoy.

Este submódulo atua estritamente como a etapa inicial de preparação segura, de modo que nenhum login real, senha real, sessão persistida real ou rota HTTP de autenticação foi exposta no momento.

---

## 1. Inventário de Alterações

### Arquivos Criados
* `docs/security/auth-session-permissions-plan.md` — Plano arquitetural completo do fluxo Backend-First e preparativos de provedores externos.
* `src/application/auth/types.ts` — Modelagens de dados completas (`AuthUser`, `SafeAuthUser`, `AuthSession`, `SafeAuthSession`, `Membership`, `AuthenticatedSession`, `AuthAuditEvent`).
* `src/application/auth/contracts/AuthUserRepository.ts` — Contrato de repositório de persistência de credenciais criptografadas de login.
* `src/application/auth/contracts/AuthSessionRepository.ts` — Contrato de controle de ciclo de vida e hashes de sessões ativas.
* `src/application/auth/contracts/AuthAuditRepository.ts` — Interface de gravação cronológica e forense de eventos operacionais.
* `src/application/auth/contracts/CompanyAuthRepository.ts` — Interface para controle operacional de tenants ativos/inativos.
* `src/application/auth/contracts/MembershipRepository.ts` — Repositório de associação e vinculo estruturado multiempresa.
* `src/application/auth/contracts/IdentityProviderAdapter.ts` — Adapter de abstração para desacoplamento de provedores externos (ex: Clerk, Auth0, Zitadel).
* `src/application/auth/sanitizeAuthModels.ts` — Helpers puros de filtragem contra vazamento de strings e hashes sensíveis ao frontend.
* `src/security/permissions/permissions.ts` — Matriz estática de roles e permissões com checadores declarativos purificados.
* `src/security/tests/permissions.test.ts` — Testes de sanidade de privilégios (Owner, Employee, Accountant, Support).
* `src/application/auth/tests/auth-types.test.ts` — Validação estrita das funções de sanitização contra vazamentos de credenciais.

### Arquivos Inalterados
* Não houve qualquer alteração nas políticas Row Level Security (RLS) nem Force RLS nos scripts SQL e migrações existentes.
* Todas as travas de proteção de produção e contra vazamento de segredos permanecem integralmente ativas e aprovadas pelo Security Gate.

---

## 2. Decisões de Design do Modelo Conceitual e Provedores de Identidade

1. **Modelo de Tenants Multiempresa Integrado (`users` + `companies` + `memberships`):**
   * Em vez de acoplar usuários de forma rígida a um único tenant (`users.company_id`), adota-se estruturalmente a entidade `memberships`. Isso permite que uma mesma identidade física (ex: contador, auditor, parceiro externo) acesse com credencial única diversos escritórios operacionais, selecionando o tenant ativo no contexto do backend em cada requisição. O atributo originário `company_id` de usuários foi mantido por compatibilidade provisória, permitindo transição imperceptível.
   
2. **Resguardo de Provedores de Identidade Externos (Adapter):**
   * No futuro, ferramentas como Clerk ou Auth0 podem ser acopladas apenas na confirmação/emissão de identidades. Todo o controle de privilégios, vínculos de Membership, auditoria forense e isolamento em nível de Row Level Security permanece estritamente gerenciado sob domínio do backend do Yopoy.

---

## 3. Matriz de Permissões Consolidada

Define-se estritamente cinco tipos de perfis operacionais de usuários no Yopoy ERP:

* **`owner`:** Privilégio máximo de administração, contemplando todas as 14 permissões de alteração fiscal, cadastral e configurações do tenant de produção.
* **`admin`:** Gestão operacional geral de usuários, clientes, estoques e auditoria, exceto permissões críticas de configuração de conta global (`company:update`, `settings:update`).
* **`employee`:** Foco em atividades essenciais de cadastro de novos clientes, faturamento, registros de venda básica e inventários. Sem acesso a logs de auditoria sistêmica.
* **`accountant`:** Leitura focada de registros financeiros, relatórios de vendas operacionais, faturamento e auditoria, atuando de maneira estritamente passiva.
* **`support`:** Vértice restrito para diagnósticos de campo (leitura de usuários, cadastros gerais, estoques), sem visão de logs financeiros detalhados ou fluxos confidenciais.

---

## 4. Auditoria de Validações Obrigatórias Executadas com Sucesso

```text
security:all .................................................. PASS
vitest unit tests (19 tests) ................................... PASS
lint (eslint) ................................................. PASS
typecheck & build (Vite compiler & esbuild) .................... PASS
npm audit ...................................................... 0 Vulnerabilidades (PASS)
```

---

## 5. Prontidão Técnica e Parecer de Segurança

* **Login real ativado?** Não.
* **Senha pura ou hash persistidos?** Não. No code leaks.
* **Uso de banco remoto ou Supabase Cloud?** Não.
* **SEFAZ Real ou Gateway Vivo operando?** Não, sandbox nativo selado.

### Veredito Final:
### **[ GO ] — Apenas para Mapeamento Funcional e Desenvolvimento do Módulo 48.2-B**
### **[ NO-GO ] — Deploy Vivo, SEFAZ Real e Gateways Financeiros Reais**
