# Yopoy — diagnóstico de persistência do tenant provisório

## Escopo e conclusão executiva

Este documento registra a etapa 50.0-D. A análise foi somente de leitura e cobriu o cadastro, a criação de tenant e usuário, membership, sessão, auditoria, contexto de `company_id`, RLS e os schemas encontrados no repositório. Nenhuma implementação, migration, API, validação, autenticação, banco ou estado do navegador foi alterado.

**Conclusão: o modelo atual não suporta com segurança um tenant provisório interno não fiscal sem migration.** Há estrutura suficiente para preservar o `companyId`, o isolamento, a sessão e, no caminho PostgreSQL de auth, a membership owner. Também é possível armazenar CNPJ/documento ausente. O impedimento é representar de forma inequívoca e persistente que o tenant ainda não é uma empresa confirmada: nenhum dos modelos de `companies` possui um campo próprio para esse estado. Além disso, os dois caminhos de auth/persistência encontrados divergem, e o caminho montado em `server.ts` preenche hoje CNPJ, regime tributário e alíquota fictícios.

Assim, não é seguro tratar `status = 'trial'`, `status = 'ACTIVE'`, nome vazio, CNPJ vazio ou conteúdo textual como marcador de provisoriedade. A próxima etapa recomendada é **50.0-E — planejamento de migration mínima para tenant provisório**.

## Fontes técnicas e caminhos encontrados

O repositório mantém dois conjuntos relevantes que precisam ser reconciliados antes da implementação:

1. `server.ts` monta `/api/auth` a partir de `modules/auth`. Esse caminho expõe `POST /register`, delega a `CompanyOnboardingService` e finalmente a `db.ts#createTenant`. Ele cria empresa e usuário administrador, depois cria sessão na tabela `sessions`. Não cria registro em `memberships`.
2. `src/backend/auth` e `src/application/auth` definem outro fluxo, exposto conceitualmente como `POST /register-company`, com transação PostgreSQL, empresa, usuário, membership owner, auditoria e `auth_sessions`. Esse caminho usa os schemas locais `001` a `007`, mas não foi encontrado montado pelo `server.ts` atual.

O front-end moderno analisado chama `/api/auth/register-company`, usa cookie HttpOnly e `sessionStorage.yopoy_company_id`. O roteador efetivamente importado por `server.ts` registra `/api/auth/register`, retorna token no JSON e usa sessão Bearer. Essa divergência de composição impede assumir que apenas um dos modelos seja hoje a fonte canônica do cadastro.

## Campos obrigatórios por camada

| Camada | Exigência atual | Efeito para tenant provisório |
| --- | --- | --- |
| Front-end | O wizard em `ElparrarLandingPage.tsx` exige razão social, CNPJ, e-mail empresarial, endereço, administrador e passa por plano/pagamento simulado. | Não permite cadastro pessoal mínimo sem mudança futura. Plano e pagamento não são persistidos pelo fluxo diagnosticado em 50.0-B. |
| Auth client | `src/frontend/auth/authApiClient.ts` tipa `company.razaoSocial`, `cnpj`, e-mail, endereço e regime tributário como obrigatórios e chama `/register-company`. Login exige `companyId` string. | O contrato do cliente não aceita tenant sem dados empresariais; o login mantém UUID/ID técnico visível. |
| Validators/handlers em `src/backend/auth` | `AuthRequestValidators` exige razão social, CNPJ com 14 dígitos, e-mail empresarial, endereço, regime, nome, e-mail, senha e confirmação. O handler repassa razão social e CNPJ ao caso de uso. | Bloqueia payload mínimo, embora endereço, regime, e-mail e telefone empresariais não sejam persistidos por esse caminho. |
| Use case em `src/application/auth` | `RegisterCompanyUseCase` exige `companyName`, e-mail e senha; `cnpj` é opcional. Cria `Company` com `status = 'ACTIVE'`, usuário, membership owner e auditoria `company_registered`. | CNPJ já pode ser ausente, mas nome empresarial e estado ativo/confirmado continuam acoplados. A auditoria descreve o tenant como empresa registrada. |
| Repository PostgreSQL de auth | `PostgresCompanyAuthRepository` insere `id`, `name`, `document`, `status`, `active` e datas. Converte CNPJ ausente em `NULL`. | Aceita documento ausente. Não possui campo de provisoriedade. `status`/`active` são usados para bloquear ou liberar a empresa e não devem ser reutilizados para onboarding. |
| Auth montado em `modules/auth` | `AuthValidators` e `CompanyOnboardingValidators` exigem `companyName`, nome da pessoa, e-mail e senha. `AuthController` cria sessão e devolve CNPJ `"Não Preenchido"`. | O contrato é menor que o wizard, mas ainda exige nome de empresa e apresenta placeholder empresarial como dado. |
| Persistência de `db.ts#createTenant` | Insere `corporate_name` e `trade_name` a partir de `companyName`; grava explicitamente `cnpj = "Não Preenchido"`, `tax_regime = "Simples Nacional"`, `tax_rate = 4.5`, plano e `status = "trial"`. No fallback em memória repete os mesmos valores. | Viola diretamente a decisão 50.0-C; não pode ser usado como atalho para tenant provisório. |
| Banco PostgreSQL local de auth | `companies.id` UUID e `name NOT NULL`; `document` anulável; `status NOT NULL DEFAULT 'ACTIVE'`; `active NOT NULL DEFAULT true`; `subscription_tier` recebe `premium` por padrão. | Não exige CNPJ, endereço ou regime, mas exige nome e não distingue perfil provisório. O plano default também pode vazar como atribuição comercial não confirmada. |
| Banco legado/bootstrap | `companies.id` é `VARCHAR`; `corporate_name`, `trade_name` e `cnpj` são anuláveis. Diversos campos empresariais/fiscais têm defaults, incluindo regime, alíquota, certificado, ambiente, CRT, plano e `trial`. | Fisicamente aceita nomes e CNPJ nulos, mas defaults fiscais/comerciais e ausência de marcador de onboarding tornam a criação insegura se o insert não for explícito. |
| Sessão | O modelo local exige `auth_sessions.company_id NOT NULL`; o legado guarda `sessions.company_id`. Ambos vinculam sessão a usuário e tenant. | Compatível com tenant técnico provisório; não requer CNPJ, endereço ou regime. |
| Membership/owner | O schema local possui `memberships`, `company_id NOT NULL`, `user_id NOT NULL`, role limitada e permite `owner`. O fluxo `src/application/auth` cria owner. O fluxo montado em `modules/auth` cria apenas `users.is_admin = true`. | A estrutura local suporta owner, mas o caminho montado não materializa membership. A implementação futura deve escolher e preservar uma única representação canônica. |
| RLS/contexto | Os schemas locais usam `app.current_company_id` e comparam `companies.id` ou `company_id`. O bootstrap legado também aplica RLS, com bypass controlado, a tabelas multi-tenant e à tabela `companies`. | Compatível com tenant provisório desde que exista um `companyId` válido e o contexto correto seja definido. RLS não depende de CNPJ nem de dados fiscais. |

## Obrigatoriedade física de `companies`

### Schema PostgreSQL local usado pela infraestrutura de auth

- `id`: UUID, chave primária, obrigatório;
- `name`: obrigatório por `NOT NULL`;
- `document`: opcional;
- `created_at`: obrigatório com default;
- `status`: obrigatório com default `ACTIVE` após `005_auth_core.sql`;
- `active`: obrigatório com default `true`;
- `subscription_tier`: anulável, mas com default `premium`;
- não existem colunas de endereço, regime tributário ou outros dados fiscais nesse schema reduzido;
- o índice único de documento só considera valores não nulos e não vazios.

Consequentemente, esse schema já permite vários tenants com `document = NULL`. O CNPJ não é um obstáculo físico nem de unicidade. O obstáculo físico é `name NOT NULL`; o obstáculo semântico é a ausência de estado de onboarding.

### Schema legado inicializado por `db.ts`/`infrastructure/database/bootstrap.ts`

- `id`: `VARCHAR`, chave primária, obrigatório;
- `corporate_name`, `trade_name` e `cnpj`: anuláveis;
- endereço e outros dados empresariais adicionados são anuláveis, vários com default vazio;
- `tax_regime` possui default `Simples Nacional` e `tax_rate` possui default `4.5`;
- existem ainda defaults com significado fiscal ou comercial, como certificado `A1`, ambientes de homologação, CRT, plano `media` e status `trial`;
- a unicidade de CNPJ ignora `NULL`, string vazia e o placeholder legado `"Não Preenchido"`;
- não há coluna específica que indique empresa não confirmada ou onboarding empresarial pendente.

Esse schema poderia persistir `NULL` para CNPJ, nomes e campos fiscais por meio de um insert explícito, mas isso não basta: um conjunto de nulos não é um estado de domínio confiável, e não impede que defaults/consumidores apresentem o tenant como empresa regular.

## Viabilidade sem dados empresariais ou fiscais confirmados

| Dado | Banco permite ausência? | Fluxo atual permite ausência? | Parecer |
| --- | --- | --- | --- |
| CNPJ/documento | Sim nos dois schemas; índices parciais toleram ausência. | Não no `/register-company`; `db.ts#createTenant` grava `"Não Preenchido"`. | Pode ser `NULL` futuramente, sem placeholder. |
| Endereço | Não existe no schema local reduzido; é anulável/default vazio no legado. | Validador `/register-company` exige parte do endereço; caminho `modules/auth` não pede, mas o bootstrap mantém campos. | Não precisa existir no cadastro mínimo. |
| Regime tributário | Não existe no schema local reduzido; é anulável no legado, apesar do default. | `/register-company` exige; `createTenant` grava `Simples Nacional`. | Deve ficar `NULL` e sem inferência/default aplicado ao tenant provisório. |
| Dados fiscais | Ausentes no schema local reduzido; em grande parte anuláveis/default no legado. | O caminho legado atribui alguns defaults fiscais. | Devem permanecer nulos/inativos; nenhum default pode ser interpretado como confirmação. |
| Razão/nome empresarial | `name NOT NULL` no local; campos anuláveis no legado. | Ambos os validadores exigem nome de empresa. | Não deve ser preenchido com nome fictício; o schema canônico precisa permitir ausência até confirmação. |
| Identidade técnica do tenant | Sim, por `id`. | Ambos criam um ID; o local usa UUID, o legado usa `comp_<timestamp>`. | Suficiente para sessão/RLS, mas o formato canônico precisa ser confirmado. |

## Riscos mapeados

### `company.name` e nomes empresariais

No schema local, `name` é obrigatório no banco, no tipo de domínio e no caso de uso. No legado, as colunas são anuláveis, mas validators e criação exigem `companyName` e o copiam para razão/nome fantasia. Usar nome da pessoa, “Minha empresa”, “Empresa Integrada” ou texto semelhante nesses campos apenas mudaria o placeholder; não criaria um dado empresarial confirmado.

### Documento/CNPJ e unicidade

O CNPJ não precisa ser inventado. `document`/`cnpj` são anuláveis e os índices únicos parciais ignoram ausência. O valor legado `"Não Preenchido"` é especialmente arriscado: ele é tratado como exceção pelo índice e também retornado à UI, tornando um marcador textual indistinguível de dado de negócio.

### Auditoria

Os eventos atuais falam em “empresa registrada”, usam `company_registered` ou incluem o nome empresarial no texto. Um cadastro pessoal com tenant provisório precisa de evento semanticamente correto e rastreável, sem declarar criação ou confirmação fiscal da empresa. A migration mínima não resolve sozinha a linguagem da auditoria; isso pertence ao plano de implementação posterior.

### RLS e contexto de `company_id`

RLS depende do ID técnico, não de CNPJ ou nome. A criação deve continuar atômica sob o contexto do novo tenant. O bootstrap legado permite bypass de RLS para buscas e validação de sessão; esse mecanismo não distingue tenant provisório. O novo estado deverá ser consumido por guards de capacidades empresariais/fiscais, sem enfraquecer o isolamento.

### Sessão, `sessionStorage` e `localStorage`

`sessionStorage.yopoy_company_id` é necessário ao cliente moderno para restauração e cabeçalhos. Já a ponte legada usa token/localStorage e `biz_current_user`. `App.tsx` possui fallbacks de razão social, nome fantasia, CNPJ e regime tributário com aparência real. Portanto, mesmo com persistência nula correta, placeholders podem vazar para a Central Visual e configurações. O wrapper ainda escopa dados por ID/e-mail do usuário e pode cair em escopo global/`guest` se `biz_current_user` não for estabelecido de modo consistente.

### Login e formato de ID

O cliente moderno exige `companyId` no login e o validador de `src/backend/auth` exige UUID. O caminho legado cria IDs `comp_<timestamp>` e permite login apenas por e-mail/senha. Essa incompatibilidade precisa ser resolvida no plano futuro; não é possível assumir simultaneamente os dois contratos.

### Owner/membership

O fluxo local cria membership `owner`; o fluxo montado cria usuário com `is_admin = true` e não cria membership. Tratar `is_admin` como owner por inferência perpetuaria duas fontes de autorização. A implementação mínima deve definir qual modelo é canônico e migrar/adaptar o outro de forma explícita.

### Nomenclatura Elparrar e placeholders empresariais

`ElparrarLandingPage`, chaves e callbacks legados ainda conduzem parte da entrada. `App.tsx` contém fallbacks como empresa distribuidora, CNPJ formatado, regime “Simples Nacional” e plano `media`. Esses valores não podem representar o tenant provisório nem ser persistidos de volta como dados confirmados.

### Fonte de verdade do schema

Os arquivos `src/infrastructure/postgres/schema/local/*.sql` são marcados para sandbox local e usam UUID, `name`, memberships e `auth_sessions`. `db.ts` e `infrastructure/database/bootstrap.ts` inicializam outro schema, com IDs textuais, `corporate_name`, `sessions` e muitos campos fiscais. Antes de escrever DDL, a próxima etapa deve confirmar qual schema será promovido e como os registros existentes serão tratados.

## Menor evolução de schema recomendada

A evolução mínima conceitual é adicionar à tabela canônica `companies` um estado dedicado e não ambíguo, por exemplo `business_profile_status`, com valores restritos equivalentes a `PROVISIONAL` e `CONFIRMED`:

- registros existentes devem permanecer compatíveis e ser classificados como `CONFIRMED` somente após regra de backfill revisada; não se deve inferir confirmação apenas pela presença de CNPJ;
- novos tenants do cadastro mínimo devem nascer explicitamente como `PROVISIONAL`;
- esse estado não substitui `active`/`status` de acesso, trial, assinatura ou suspensão;
- a promoção para `CONFIRMED` deve ocorrer somente após onboarding empresarial explícito e validado;
- capacidades empresariais/fiscais futuras devem exigir `CONFIRMED` e seus dados próprios, além de qualquer autorização adicional.

Se o schema canônico for o local de auth, a mesma migration mínima precisa também permitir `companies.name = NULL` até a confirmação, porque hoje a coluna é `NOT NULL`. Se o schema canônico for o legado/bootstrap, `corporate_name` e `trade_name` já são anuláveis e a mudança estrutural mínima pode limitar-se ao novo estado. Em ambos os casos, o insert futuro deve gravar explicitamente `NULL` nos campos empresariais/fiscais adiados para não acionar defaults legados.

Não se recomenda reutilizar:

- `status = 'trial'`, porque representa ciclo comercial;
- `status = 'ACTIVE'`, porque controla disponibilidade/acesso no repositório de auth;
- `subscription_tier` ou `plan`, porque representam plano comercial;
- `document IS NULL`, porque ausência de CNPJ não equivale necessariamente a onboarding incompleto;
- nomes, strings vazias ou `"Não Preenchido"`, porque vazam para UI, auditoria e sincronização.

O DDL exato, nome final da coluna, constraint, backfill e rollback não pertencem a 50.0-D. Eles dependem da confirmação da fonte canônica de persistência na etapa seguinte.

## Corte mínimo futuro após a migration

Depois de planejar, autorizar e aplicar a evolução mínima, a implementação de cadastro deverá:

1. receber somente nome da pessoa, e-mail, senha e confirmação, além de termos quando existirem;
2. gerar um ID técnico de tenant e persistir empresa sem nome, CNPJ, endereço, regime ou dado fiscal confirmado;
3. marcar explicitamente o tenant como provisório;
4. criar usuário e membership owner no modelo canônico;
5. criar sessão válida e manter `companyId` no contexto de RLS;
6. registrar auditoria de conta/tenant provisório, sem afirmar empresa registrada;
7. retornar uma representação que não invente razão social, nome fantasia, CNPJ, plano ou capacidade fiscal;
8. levar à Central Visual sem gravar placeholders em `localStorage` ou `sessionStorage`;
9. bloquear qualquer capacidade fiscal enquanto o perfil empresarial não estiver confirmado e enquanto fiscal real continuar fora do MVP.

## Próxima etapa proposta

**50.0-E — planejamento de migration mínima para tenant provisório:** confirmar a fonte canônica entre o auth montado/legado e o fluxo PostgreSQL local, definir a coluna de estado de perfil empresarial, decidir a nulabilidade do nome conforme o schema escolhido, planejar backfill/rollback e especificar os testes de banco, owner, sessão e RLS. A etapa deve continuar sem implementar o cadastro e deve receber autorização nominal antes de alterar schema, migrations, `db.ts`, auth ou backend.

## Arquivos analisados

### Decisões e documentação

- `docs/product/yopoy-minimal-signup-progressive-onboarding-plan.md`
- `docs/product/yopoy-current-signup-frontend-diagnosis.md`
- `docs/product/yopoy-minimal-signup-tenant-decision.md`
- `docs/product/yopoy-commercial-execution-roadmap.md`
- `docs/database/yopoy-migration-strategy.md`
- `docs/database/yopoy-postgresql-schema-map.md`
- `docs/database/report-47.3-postgresql-schema-rls-planning.md`

### Front-end e estado local, somente leitura

- `src/components/ElparrarLandingPage.tsx`
- `src/frontend/auth/authApiClient.ts`
- `src/frontend/auth/AuthContext.tsx`
- `src/frontend/auth/authFetch.ts`
- `src/frontend/auth/permissionClient.ts`
- `src/App.tsx`
- `src/localStorageWrapper.ts`
- `src/main.tsx`

### Auth, aplicação e composição, somente leitura

- `server.ts`
- `modules/auth/api/auth.routes.ts`
- `modules/auth/api/auth.controller.ts`
- `modules/auth/dto/auth.dto.ts`
- `modules/auth/services/AuthService.ts`
- `modules/auth/services/SessionService.ts`
- `modules/auth/repositories/AuthRepository.ts`
- `modules/auth/repositories/SessionRepository.ts`
- `modules/auth/validators/auth.validators.ts`
- `modules/companies/dto/companyOnboarding.dto.ts`
- `modules/companies/services/CompanyOnboardingService.ts`
- `modules/companies/repositories/CompanyOnboardingRepository.ts`
- `modules/companies/validators/companyOnboarding.validators.ts`
- `src/backend/auth/AuthRequestValidators.ts`
- `src/backend/auth/AuthHttpHandlers.ts`
- `src/backend/auth/AuthCompanyIdResolver.ts`
- `src/backend/auth/registerAuthRoutes.ts`
- `src/application/auth/types.ts`
- `src/application/auth/use-cases/RegisterCompanyUseCase.ts`
- `src/application/auth/use-cases/LoginUseCase.ts`
- `src/application/auth/use-cases/ValidateSessionUseCase.ts`
- `src/application/auth/contracts/AuthUserRepository.ts`
- `src/application/auth/contracts/MembershipRepository.ts`
- `src/application/auth/contracts/AuthSessionRepository.ts`
- `src/application/auth/contracts/CompanyAuthRepository.ts`
- `src/application/repositories/CompanyRepository.ts`
- `src/domain/entities/index.ts`
- `src/composition/createServerAppContainer.ts`

### Persistência, schemas e RLS, somente leitura

- `db.ts`
- `infrastructure/database/bootstrap.ts`
- `infrastructure/database/pgPooler.ts`
- `src/infrastructure/postgres/auth/PostgresCompanyAuthRepository.ts`
- `src/infrastructure/postgres/auth/PostgresAuthUserRepository.ts`
- `src/infrastructure/postgres/auth/PostgresMembershipRepository.ts`
- `src/infrastructure/postgres/auth/PostgresAuthSessionRepository.ts`
- `src/infrastructure/postgres/auth/PostgresAuthAuditRepository.ts`
- `src/infrastructure/postgres/unit-of-work/LocalPostgresUnitOfWork.ts`
- `src/infrastructure/postgres/schema/draft-schema-not-for-execution.sql`
- `src/infrastructure/postgres/schema/local/001_init_local_schema.sql`
- `src/infrastructure/postgres/schema/local/002_init_local_rls.sql`
- `src/infrastructure/postgres/schema/local/003_init_local_indexes.sql`
- `src/infrastructure/postgres/schema/local/004_init_local_seed.sql`
- `src/infrastructure/postgres/schema/local/005_auth_core.sql`
- `src/infrastructure/postgres/schema/local/006_auth_bootstrap_rls.sql`
- `src/infrastructure/postgres/schema/local/007_admin_users_repository_support.sql`
- `src/infrastructure/postgres/scripts/run-local-migrations.ts`
- `src/infrastructure/postgres/scripts/run-native-local-migrations.ts`
- `src/infrastructure/postgres-local/tests/local-schema.test.ts`
- `src/infrastructure/postgres-native/tests/native-schema.test.ts`

