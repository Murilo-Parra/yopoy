# Auditoria Técnica do server.ts (Etapa 49.1-A)

## 1. Visão geral do server.ts
O arquivo `server.ts` atual funciona como o ponto de entrada principal e monolítico do backend da aplicação (Express). Atualmente, seu papel abrange a inicialização do Express, a injeção do Vite Middleware (para SPA), a gestão de middlewares globais (auth, context multi-tenant) e a definição fortemente acoplada de centenas de linhas de regras de negócio de diversos domínios, como Integração Fiscal SEFAZ (NFe, NFCe, DANFE, manifestos), Inteligência Artificial (Gemini) e DevTools (Factory Reset).

Ele é um gargalo arquitetural porque as responsabilidades de *boot/startup da aplicação* estão profundamente misturadas com *rotas hardcoded de regras de negócio estritas*. Isto impede o isolamento adequado de funcionalidades para testes pontuais, diminui o desacoplamento e amplia radicalmente a chance de regressão cruzada (ex.: alterar uma lógica de manifestação SEFAZ quebrar a inicialização do banco). Modificações no `server.ts` sem decomposição se tornaram insustentáveis e instáveis de gerir e manter.

## 2. Mapa de responsabilidades encontradas
O arquivo atualmente concentra dezenas de responsabilidades em blocos lógicos misturados. Pode-se mapear da seguinte forma:

* **Integrações Fakes/Mocks Temporárias Fiscais:** Inicialização de `XmlSignatureService`, `SefazConnector`, `CertificateManager` falsos.
* **Factory Reset DevTool:** Lógica perigosa de wipeout de tabelas do DB (`POST /api/system/factory-reset`).
* **Middlewares Globais de Segurança e Contexto:** Configuração de Express limits, AuthHeader extraction parser (bearer auth) aliado a uso de AsyncLocalStorage (`tenantContext.run(...)`).
* **Rotas de Inteligência Artificial / Gemini:** Endpoints hardcoded `/api/gemini/parse-receipt` e `/api/gemini/chat-assistant`, contendo toda lógica lazy load e regras de parsing estritas injetadas nas rotas.
* **Injeção de Módulos Externalizados (Boas Práticas Parciais):** `app.use` instalando as controllers pré-existentes de `auth`, `companies`, e `adminUsers`.
* **Rotas Legadas Fiscais Fortemente Acopladas:** A espinha dorsal das operações fiscais (`NFE`, `NFCe`, DANFE) e auditoria (`company-audit-logs`), totalizando quase 2.000 linhas de handlers massivos com validações de RBAC integradas rigidamente ao roteamento HTTP.
* **Recursos Estáticos Locais (PDFs de Manuais):** Endpoints diretos de fallback (`/manual.pdf`, `/relatorio-eventos.pdf`).
* **Integração Vite/Express Boot:** A lógica de Bootstrap `bootstrapServer()` lidando com a conectividade base (initializeDb), audit sinks (`AuditLogger`), Vite em Dev Mode e Express Static content handler em Produção.

## 3. Mapa de rotas do Core Monolítico

| Método HTTP | Path | Responsabilidade | Dependências Principais | Risco (Nível de Acoplamento) | Recomendação Futura |
|---|---|---|---|---|---|
| POST | `/api/system/factory-reset` | DevTools: Dropar e popular DB de testes | Postgres driver bruto, in memory `dbInMemoryLocal`, `isPostgresActive` | Altíssimo | Extrair para router específico protegido e utilitário `DevToolsRouter`. |
| POST | `/api/gemini/parse-receipt` | AI: Gerar json de importação a partir de cupom fiscal | Google GenAI SDK | Médio | Extrair para router `AIFunctionsRouter`. |
| POST | `/api/gemini/chat-assistant` | AI: Chat de contexto empresarial | Google GenAI SDK | Médio | Extrair para router `AIFunctionsRouter`. |
| GET | `/api/auth/company-audit-logs` | Fiscal / General: Auditoria de logs globais | query direta `pgPool` ou memória | Alto | Mover para um controlador de `TenantAuditController`. |
| CRUD(Vários)| `/api/fiscal/documents/*` | Fiscal: Geração, validação, duplicar ou deletar xmls | Session Auth, XmlValidator, XmlGenerator, `saveFiscalDocument` | Extremo | Requer migração modular para `FiscalModule` V2. |
| CRUD(Vários)| `/api/fiscal/certificates` | Fiscal: Módulo p/ Certificados e assinatura D-Sig | `CompanyController`, `XmlSignatureService`, RBAC | Alto | Mover para `FiscalSignatureController`. |
| CRUD(Vários)| `/api/nfe/*` e `/api/nfce/*` | Fiscal: Emissão de Notas NF-e e NFC-e PDV. | Session Auth, `isUserAuthorizedFor*`, Sefaz Mocks, query direta db | Extremo | Redesenho rigoroso em `InvoicingModule`. |
| CRUD(Vários)| `/api/danfe/*` | Fiscal: Download e manipulação PDFs do DANFE | Logs de Auditoria, validação de `isUserAuthorized` | Alto | Delegação para um `GraphicsDocumentRouter`. |
| POST | `/api/sefaz/manifest` | Fiscal / Sefaz: Eventos SEFAZ | `SefazEventQueue`, pools diretos de Postgres | Elevado | Mover ao `SefazComplianceRouter`. |
| GET | `/*.pdf` | Arquivos estáticos p/ documentação local | path/fs node puro | Baixo | Mover a um repositório static handler. |
| ALL | `/api/auth`, `/api/admin` | Acoplamento de módulos prontos | authRoutes, adminUsersRoutes, etc | Baixo | Preservar no futuro `AppFactory` root class. |

## 4. Dependências Importadas

| Import | Origem | Uso e Contexto Encontrado | Recomendação Tecnológica (Refactoring) |
|---|---|---|---|
| `GoogleGenAI` | `@google/genai` | Handler lazy loading para chat e parsing de AI. | Removê-lo de `server.ts` centralizando em um singleton / injetor em módulos IA de negócio. |
| Mão de obra pesada Postgres (`isPostgresActive`, `pgPool`, etc) | `./infrastructure/database` e local drivers | Wipe local Dev tools e queries de banco diretas para audit logs / manifests / notas fiscais. | Removê-los do `server.ts`. Operações devem ocorrer em `Repository`/`UnitOfWork`. |
| `XmlGenerator`, `XmlValidator` | `./src/utils/xmlGenerator` | Helpers fiscais massivos no roteamento fiscal. | Mover para module fiscal isolado V2. O Express setup file jamais deveria conhecer como se faz XML. |
| Context Local (AsyncLocalStorage) | `./shared/context` | Isolamento do Tenant (Auth). Funciona no middleware. | Ok de ser inicializado na factory do App, mas a montagem do middleware pode ser exportada para camada Application/Middleware auth. |
| Dezenas de handlers de BD Legacy | `./db` | Múltiplas injeções para gerir o banco (`saveDanfeDocument`, `getNfcEDocuments`, ...). | Acoplamento crítico. Deve migrar pro controller/router novo sem deixar raiz em Express app inicial. |

## 5. Riscos técnicos

- **Arquivo Central Massivo**: A inicialização corre o risco de acoplar configurações HTTP com falhas de inicialização do SEFAZ/Xml Signature / AI (mais de 3000 linhas).
- **Hardcoding de Middlewares de Negócio Misturadas Roteamento HTTP**: Funções injetadas no próprio `server.ts` executam queries em banco e usam pacotes vitais em meio ao arquivo inteiro, sem injeção de dependência clara. 
- **Fiscal Bypasses**: Classes Mock temporárias estão injetadas de corpo presente puramente como placeholders globais (`const CertificateManager = { ... }`).
- **Problema Multi-tenant na raiz do Server**: Existem verificações como `isUserAuthorizedForNfeWrite()` declaradas puramente globais dentro deste arquivo. Se precisarem ser expandidas, o `server.ts` irá aumentar ainda mais de complexidade.
- **Dificuldade Constante de Teste Isolado**: Impossível dar start rápido no endpoint Fiscal para testá-lo unitariamente ou num teste End-to-End mockado local porque ele obriga ao "boot" de um monolito com Inteligência Artificial e Vite associados.

## 6. O que NÃO deve ser mexido ainda
- Todo o ecossistema pronto como `/src/backend/auth` e respectivos testes devem permanecer intocáveis. 
- Migrations, infra (`db.ts`), e setup do Database não mudam.  
- O comportamento, tipagem ou assinatura dos retornos HTTP atuais devem possuir retrocompatibilidade completa com os frontend components; não renomearemos interfaces contratuais do cliente nas próximas etapas.  
- `package.json`, `README.md` e Actions de CI já estão blindados e configurados.

## 7. Plano de decomposição recomendado
A extração contínua e gradual (Baby Steps) mitigará riscos garantindo que as regras não vazem ou quebrem as páginas associadas do ERP (SPA Frontend/React). Sugere-se:

- **Etapa 49.1-B**: Extrair Lógicas de Factory Reset (`POST /api/system/factory-reset`).
- **Etapa 49.1-C**: Extrair Funcionalidades GenAI/Inteligência Artificial (Chat e Upload).
- **Etapa 49.1-D**: Extrair Endpoints passivos ou utilitários (PDFs hardcoded, `/api/fiscal/discover` e `/api/auth/company-audit-logs` que não tem lugar óbvio).  
- **Etapa 49.1-E**: Isolar a construção do ambiente Middleware (criar rotina robusta `AppMiddlewareFactory`).
- **Etapa 49.1-F**: Reduzir os ~blocos residuais do Módulo Fiscal Legado do Express, repassando-os a Controllers da Unidade Fiscal isolada. Transformando de fato `server.ts` num "Composition Root".

## 8. Ordem de prioridade
A maior urgência com impacto menor para o ecossistema é **extrair as Funcionalidades Auxiliares (DevTools de Factory Reset e Integrações de Inteligência Artificial Gemini)**. Essas são ferramentas de fronteira (`edge`), contidas de forma autônoma e não corrompem os relacionamentos do banco ou roteamentos multi-tenant principais. Retirá-las primeiro despolui instantaneamente dezenas de ramificações do `server.ts` com risco próximo a nulo de afetar as validações tributárias de negócio, proporcionando ganhos rápidos e estabilizando a fundação de refatoração do código principal fiscal depois.

## 9. Critérios de aceite para próximas etapas
1. Executar **estritamente uma única etapa** e separação de sub-responsabilidade arquitetural. 
2. Os testes devem cobrir **a transição e ausência de regressões** e a interface HTTP não deve ter sido transmutada.
3. Não efetuar mudanças funcionais nos sistemas do núcleo isolado (Refatoração estrutural / Mover código, e não alterar as lógicas primárias de faturamento).
4. Em pre-commit os seguintes atestados validam segurança:
   * `npm run typecheck` bem sucedido (nada foi deixado p/ trás).
   * `npx vitest run src/backend/auth/tests` em estado "PASS" absoluto.
   * Modificações apenas na origem e destino previstos no git scope (`git diff` clean).

## 10. Conclusão executiva
O `server.ts` alcançou as limitações de "Fast Prototyping" e precisa sofrer enxugamento rápido e fracionado. Sua natureza maciça hoje compromete a estabilidade da orquestração dos módulos Fiscal e Financeiro multi-tenant que estão por vir. A recomendação clara é **abrir a Etapa 49.1-B (extração de DevTools / Factory Reset) seguida da 49.1-C (Inteligência Artificial)**, aplicando refatorações que transportem os controladores e rotas para suas devidas pastas de `modules/devtools` e `modules/ai`, injetando de volta na inicialização global o acoplamento simples de router via `app.use()`.
