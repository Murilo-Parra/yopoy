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
