# Plano de Autenticação, Sessão e Permissões do Yopoy

## 1. Visão Geral da Arquitetura Auth

O Yopoy adota uma arquitetura de autenticação **Backend-First**, em que o controle de identidades, sessões e privilégios é estritamente centralizado e validado pelo backend. O fluxo de responsabilidades obedece à seguinte estrutura hierárquica:

```text
React (Renderiza o Frontend & Exibe o Estado Seguro)
↓
Backend Auth Handler (Gerencia Rotas e Middlewares de Segurança)
↓
Auth Use Cases (Executa Casos de Uso, como Registro e Login)
↓
Domain/Auth Rules (Valida Permissões e Regras de Negócio)
↓
Repository (Persiste Dados Conceituais do Usuário e Sessões)
↓
PostgreSQL + RLS/FORCE RLS (Isola Tenant e Impõe Segurança no Banco)
```

### Políticas de Responsabilidade das Camadas
- **Frontend (SPA):** Exibe visualmente o estado da sessão autenticada. É agnóstico às regras criptográficas de banco e não armazena chaves privadas no browser. Os tokens e identificadores confidenciais do usuário são manipulados com total proteção de fronteira de boundary de segurança.
- **Backend (Server):** Toma todas as decisões finais de autorização. O backend valida a legitimidade de cada requisição autenticada, verifica o papel e as permissões ativas e registra as auditorias.
- **Banco de Dados (PostgreSQL + RLS):** Força o isolamento total de dados no menor nível possível (Row Level Security), impedindo vazamentos transversais de tenants (`company_id`), mesmo em caso de falhas na camada lógica da aplicação.

---

## 2. Decisão de Provedores de Identidade Externos (Identity Provider Adapter)

Embora o Yopoy possa usar provedores de autenticação externa modernos no futuro (como Clerk, Auth0, Keycloak, Ory, SuperTokens ou Zitadel), o sistema de ERP **nunca deve delegar cegamente decisões críticas de controle de acesso ao provedor externo**. 

O provedor externo funcionará estritamente como um emissor e autenticador de identidades. Todas as decisões de contexto de negócio, incluindo:
- **`company_id` ativo**
- **Vínculos operacionais (`membership`)**
- **Role do usuário**
- **Permissões no tenant**
- **Autorização para operações fiscais e financeiras**
- **Execução de logs de auditoria de segurança**

continuarão sendo orquestradas e verificadas pelo backend proprietário do Yopoy. O desacoplamento é garantido pela interface `IdentityProviderAdapter`.

---

## 3. Modelo Conceitual de Dados de Segurança

Para suportar múltiplos tenants de forma escalável e com capacidade de abrigar contadores compartilhados, administradores de filiais e parceiros de suporte, o modelo conceitual adota:

1. **`users` (Pessoa / Login ou Credencial):** Representa a identidade global do usuário do sistema, com seu e-mail e hash criptográfico da credencial.
2. **`companies` (Empresa / Tenant):** Representa o tenant/empresa isolado operacionalmente.
3. **`memberships` (Associação segura):** Vínculo que conecta um usuário de forma segura a um ou mais tenants. Define o papel (`role`) que ele desempenhará em cada empresa individualmente.
4. **`auth_sessions` (Sessões de Acesso):** Armazena chaves de acesso ativas, referenciando apenas hashes seguros dos tokens de sessão.
5. **`auth_audit_logs` (Logs de Auditoria):** Auditoria cronológica de atividades críticas (ex: login bem-sucedido, falha de senha, acesso negado, bloqueio de usuário).

*Nota de compatibilidade:* Durante a transição do schema inicial herdado, a coluna histórica `users.company_id` permanece preservada por questões de compatibilidade transiente, enquanto o modelo avançado baseado na associação via `memberships` passa a ser estruturado como diretriz oficial para futuras instâncias multiempresa.

---

## 4. Implementação Física de Banco de Dados e Segurança

As tabelas de autenticação foram fisicamente incorporadas no banco de dados local do Yopoy por meio do arquivo de migração `src/infrastructure/postgres/schema/local/005_auth_core.sql`.

### Detalhamento Macroscópico de Segurança

1. **`memberships`:**
   - **Check Constraint:** Limita os valores previstos de roles (`owner`, `admin`, `employee`, `accountant`, `support`).
   - **Row Level Security:** Políticas do PostgreSQL impõem a restrição baseada em `current_setting('app.current_company_id')`.
   - **Chave de Unicidade:** Chave única composta assegura que um mesmo usuário tenha somente um papel (`role`) em cada empresa independente.

2. **`auth_sessions`:**
   - **Proteção Criptográfica:** Armazena somente o hash criptográfico seguro do token (`session_token_hash`), impedindo a exposição direta das chaves secretas no banco.
   - **Row Level Security:** Aplicação estrita baseada em `app.current_company_id`.
   - **Índices de Performance:** Otimização para busca rápida via token hash e IDs de empresas e usuários.

3. **`auth_audit_logs`:**
   - **Auditoria Forense Imutável:** Registra eventos operacionais e de falha contendo metadados flexíveis (`jsonb`), garantindo conformidade forense a qualquer instante.
   - **Restrição de Eventos:** Garante conformidade com os tipos de eventos concebidos (`company_registered`, `login_success`, `login_failed`, `logout`, etc.).
   - **Row Level Security:** Segregação garantida por nível de tenant.

4. **`password_reset_tokens`:**
   - **Hashes Seguros:** Armazenamento restrito a hashes seguros de tokens temporários (`reset_token_hash`).
   - **Row Level Security:** Segregação garantida por nível de tenant.

5. **Sanatização de Adaptações (`users` table):**
   - Incorporação de colunas essenciais para auditoria sem quebra transiente das tabelas atuais, incluindo `password_hash`, `email_verified`, `failed_login_attempts`, `locked_until`, e `last_login`.

### Suíte de Testes e RLS Schema Gate
- O script automatizado local `src/security/scripts/check-rls-schema.ts` audita a totalidade de arquivos de script SQL para certificar que todas as 9 tabelas do sistema estão cobertas com `ENABLE ROW LEVEL SECURITY`, `FORCE ROW LEVEL SECURITY` e cláusulas específicas de `USING` e `WITH CHECK`.
- O isolamento físico de dados é testado de ponta a ponta no arquivo `src/infrastructure/postgres-native/tests/native-auth-rls.test.ts`.

---

## 5. PasswordHasher e SessionTokenService

O Yopoy introduz serviços criptográficos de ponta para a proteção das credenciais dos usuários e integridade operacional das sessões ativas no ecossistema ERP.

### Visão Geral de Segurança Criptográfica

1. **PasswordHasher (`BcryptPasswordHasher`):**
   - **Prevenção de Senha Pura:** O sistema nunca armazena senhas em texto puro. Elas são convertidas em um hash irreversível utilizando o algoritmo **bcryptjs** (salt rounds padrão de `12` para servidores de produção, configurável para salt rounds de `4` exclusivamente em ambientes de teste para otimizar velocidade).
   - **Força de Senha Obrigatória:** Antes de qualquer processo de hash, o sistema avalia a senha através da camada de política `PasswordPolicy`, lançando uma exceção segura caso a senha não atenda aos critérios estruturais (por exemplo, tamanho insuficiente, falta de símbolos, ou presença de palavras comuns). O texto de erro da exceção nunca expõe a senha em texto limpo.
   - **Segurança de Fronteira:** Interfaces de hash não importam e nem expõem dependências de bibliotecas de criptografia baseadas em Node para o frontend React.

2. **SessionTokenService (`NodeCryptoSessionTokenService`):**
   - **Tokens de Sessão Seguros:** Os tokens são gerados utilizando `node:crypto.randomBytes` de `48` bytes para altíssima entropia e convertidos em strings seguras no formato `base64url`.
   - **Armazenamento Seguro de Tokens (Prevenção de Roubo de Banco):** O token em formato limpo (`rawToken`) só existe no retorno imediato para ser entregue graficamente ao cliente. O banco persiste estritamente o hash versionado do token prefixado com `sha256:` (por exemplo, `sha256:<hex-hash>`).
   - **Mitigação de Timing Attacks:** A comparação e validação do token fornecido com o hash armazenado no banco de dados emprega `crypto.timingSafeEqual`, protegendo o fluxo de verificação contra análises estatísticas de tempo de processamento.
   - **Limites de Ciclo de Vida:** O tempo de vida (TTL) é monitorado de forma restrita (padrão de 7 dias, mínimo superior a zero e máximo limite de 30 dias).

## 6. Casos de Uso Internos de Autenticação (Auth Use Cases)

O sistema de autenticação e sessão do Yopoy ERP é estruturado com base em casos de uso desacoplados focados no ecossistema de aplicação segura, agindo sem exposição direta para o exterior por rotas Http, middlewares ou cookies neste submódulo.

### Descrições Operacionais

1. **`RegisterCompanyUseCase`**:
   - Centraliza o registro atômico de uma nova organização, seu respectivo usuário gestor e a membership obrigatória associada ao papel de `owner`.
   - Força a verificação da política de senhas redundantes `PasswordPolicy` e hashea via `PasswordHasher` antes de acionar a persistência.
   - Audita o sucesso da operação através do evento `company_registered`.

2. **`LoginUseCase`**:
   - Verifica credenciais sem vazamento informacional de e-mails em mensagens de erro públicas.
   - Gerencia a proteção brute-force rastreando e incrementando as tentativas falhas de login (`failed_login_attempts`), disparando um banimento computacional de `15 minutos` via `locked_until` ao atingir `5 tentativas`.
   - Gera um token criptograficamente seguro e grava exclusivamente o seu hash `session_token_hash`. Dispara o evento de auditoria `login_success` ou `login_failed`.

3. **`LogoutUseCase`**:
   - Invalida fisicamente a sessão ativa do usuário através do preenchimento e atribuição do campo `revoked_at` sem expor segredos criptográficos ou purgar histórico transacional.
   - Audita o encerramento seguro sob a tipagem `logout`.

4. **`ValidateSessionUseCase`**:
   - Valida de forma determinística os tokens brutos procedentes do cliente, verificando expirações temporárias no banco e mapeando os acessos para o formato composto `AuthenticatedSession`.
   - Atualiza a marcação de atividade no banco de dados (`touchSession`) a cada validação executada com absoluto selo de timing-safe.

5. **`RequirePermissionUseCase`**:
   - Intersecta as sessões ativas contra as permissões funcionais parametrizadas no ERP, bloqueando violações no nível de aplicação, disparando o evento forense `permission_denied` e mitigando decisões lógicas inseguras de front-end.



