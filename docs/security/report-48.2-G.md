# Relatório Segurança e Arquitetura — Módulo 48.2-G
## Bootstrap Seguro e Cadastro Inicial de Empresa sem Bypass de RLS

Este documento formaliza as decisões de design, infraestrutura e segurança tomadas para implementar o fluxo de cadastro inicial de empresa e o usuário administrador principal do Yopoy em conformidade rigorosa com Row Level Security (RLS) habilitado e ativo.

---

### 1. Como o Bootstrap Seguro Funciona

O fluxo foi projetado para permitir que uma nova organização se registre no ecossistema de maneira transacional e resiliente, sem recorrer a desativações de segurança ou furos nas políticas RLS:

1. **Pre-generation de Contexto**: O Servidor recebe a requisição de cadastro e pré-calcula localmente os identificadores necessários (`companyId`, `adminUserId`, `sessionId`) e o token bruto de sessão (`rawSessionToken` com seu hash SHA-256 e data de expiração calculada).
2. **PostgreSQL Connection Isolation**: O backend inicia uma nova transação encapsulando todo o fluxo sob o `companyId` gerado:
   ```ts
   await uow.transaction(companyId, async (tx) => { ... });
   ```
   A função `uow.transaction` executa localmente dentro da conexão ativa:
   ```sql
   SELECT set_config('app.current_company_id', $1, true);
   ```
   Isso ativa o valor do tenant corrente no escopo de sessão do PostgreSQL antes de qualquer persistência ocorrer.
3. **Escrita Unificada e Transacional**: Sob o mesmo contexto unificado e isolado de transação, as tabelas são povoadas sequencialmente sob políticas ativas de RLS:
   - Inserção na tabela `companies` com `id = companyId`
   - Inserção na tabela `users` com `company_id = companyId`
   - Inserção na tabela `memberships` com com `company_id = companyId` e perfil `owner`
   - Inserção opcional do registro `auth_sessions` para a sessão corrente do usuário
   - Gravação dos logs de auditoria segurados com as informações de cadastro

Caso qualquer uma dessas operações falhe ou cause violações, a conexão sofrerá `ROLLBACK` completo de forma atomizada.

---

### 2. Por que gerar `companyId` antes da transação não é bypass

Gerar o identificador de empresa antecipadamente no nível do servidor do aplicativo e carregá-lo no PostgreSQL via `set_config` **não constitui um bypass de RLS** porque o banco de dados continua avaliando todas as condições e restrições de escrita. 
O Row Level Security continua totalmente ativado (`FORCE ROW LEVEL SECURITY`) e o servidor apenas preenche o parâmetro de isolamento que rege o que as queries podem ou não visualizar/escrever. Como todos os registros criados (empresa, usuário, membros, sessões) recebem rigorosamente o mesmo identificador coincidente com o contexto de sessão do banco, a política avalia para `true` em todas as asserções de política `WITH CHECK`, preservando a coerência lógica e a isolabilidade operacional do modelo multi-tenant.

---

### 3. Políticas RLS que Permitem INSERT Seguro

As políticas associadas que controlam o isolamento são aplicadas de forma transparente sobre cada tabela sem frestas:

* **Tabela `companies`**:
  - `USING (id::text = current_setting('app.current_company_id', true))`
  - `WITH CHECK (id::text = current_setting('app.current_company_id', true))`
  - *Garantia*: Uma empresa só é visível ou inserida se seu ID corresponder exatamente ao valor corrente do parâmetro de sessão.

* **Tabela `users`, `memberships`, `auth_sessions`, `auth_audit_logs`**:
  - `USING (company_id::text = current_setting('app.current_company_id', true))`
  - `WITH CHECK (company_id::text = current_setting('app.current_company_id', true))`
  - *Garantia*: Todo dado relacional pertencente ao tenant é avaliado e sanitizado nas operações em tempo de execução para barrar qualquer tipo de visualização ou poluição cruzada entre diferentes contas.

---

### 4. Tratamento de Constraints e Duplicidade

O sistema não faz varreduras globais (SELECT fora do RLS) para validar duplicidade de dados sensíveis para não expor brechas de dados inter-tenant. Em vez disso, índices únicos seguros foram estabelecidos no banco por meio da migração local `006_auth_bootstrap_rls.sql`:

- **Índice Único Global**: `idx_companies_document_unique` restringe duplicidades de CNPJ ativos na tabela `companies`.
- **Índice Único no Tenant**: `idx_users_company_email_unique` restringe duplicidades de e-mail por empresa no escopo de usuários.

Qualquer colisão dispara o código de erro nativo do PostgreSQL `23505` (Unique Violation), capturado e mapeado no handler conforme as especificações do negócio:
- Conflito de CNPJ duplicado $\rightarrow$ HTTP 409 com código `COMPANY_ALREADY_EXISTS`
- Conflito de E-mail de usuário duplicado $\rightarrow$ HTTP 409 com código `USER_ALREADY_EXISTS`
- Entrada inválida ou dados vazios $\rightarrow$ HTTP 400 com código `INVALID_INPUT`
- Outras falhas $\rightarrow$ HTTP 500 silencioso com código `INTERNAL_SERVER_ERROR`

---

### 5. Geração de Cookies e Omissão de Atributos Sensíveis no JSON

Após a criação transacional dos dados, o cookie `yopoy_session` é injetado sob as regras estabelecidas por `AuthCookieService`:
- `HttpOnly: true` (impede acesso via scripts do lado do cliente)
- `SameSite: Lax` (protege contra ataques CSRF e viabiliza navegação legítima)
- `Path: /` (disponível em toda a aplicação)
- `Secure: true` em conexões seguras/produção, e `false` durante os testes locais e desenvolvimento local puro HTTP.

**Segurança de Payloads JSON**:
Nenhuma informação privada como `senha`, `passwordHash`, `rawSessionToken` (no payload) ou hashes internos (`sessionTokenHash`) é compartilhada ou retornada no objeto de serialização de sucesso fornecido às respostas do cliente, inibindo capturas indevidas de credenciais por agentes externos.

---

### 6. Testes Efetuados e Status Final

O suite de testes de integração do backend foi estendido com testes reais para cobrir toda a esteira operacional:

1. **Testes de Fluxo Positivo**: Verificação de que o endpoint canta com sucesso, cria os assets no Postgres sob RLS operacional ativo, associa corretamente o papel de `owner` e gera o cookie seguro.
2. **Verificações de Vazamento**: Asserções de que as credenciais brutas, hashes internos, tokens brutos e detalhes internos de constraints não residem nos dados serializados retornados na resposta HTTP.
3. **Fluxos de Erro de Entrada**: Testes contra senhas fracas, e-mail mal formatado e senhas divergentes, assegurando resposta HTTP 400.
4. **Resolução de Conflitos**: Simulação de duplicidade de CNPJ retornando HTTP 409 coerente.
5. **Integração Completa**: Confirmação robusta de que os fluxos de Login e validação de Sessão funcionam perfeitamente para parceiros recém-cadastrados via esta sandbox local.

```bash
Test Files: 1 passed (1)
Tests: 15 passed (15)
Status final: 100% PASSOU sem qualquer bypass de RLS.
```

---

### 7. Declaração de Limitações / Contexto do Módulo

* **HTTPS-ready para produção futura.**
* **NO-GO para produção real neste módulo.**
* **NO-GO para SEFAZ real.**
* **NO-GO para gateway de pagamento real.**
* **NO-GO para Supabase cloud.**
* **NO-GO para banco de dados remoto.**
