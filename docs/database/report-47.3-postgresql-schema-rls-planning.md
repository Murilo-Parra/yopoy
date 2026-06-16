# ERP Yopoy - Relatório Final do Módulo 47.3

Este relatório conclui formalmente as operações do Módulo 47.3: PostgreSQL Schema, RLS & Persistence Planning Foundation do ERP Yopoy.

## 1. Resumo executivo
Nesta etapa da refatoração Backend-First, preparamos de forma intensiva a planta (Blueprints) física de migração do estado abstrato (In-memory) para o armazenamento Transacional Relacional Permanente (Database PostgreSQL). Foram definidos os contornos limpos das tabelas alinhados à segregação Multi-Tenant, protegendo contra vazamentos através de Row-Level-Security e Indexes compostos. Todo esse esforço manteve a restrição rigorosa de NENHUMA EXECUÇÃO REAL DML/DDL.

## 2. Arquivos criados
* `/docs/database/report-47.3-postgresql-schema-rls-planning.md`
* `/docs/database/yopoy-postgresql-schema-map.md`
* `/docs/database/yopoy-table-field-catalog.md`
* `/docs/database/yopoy-rls-policy-plan.md`
* `/docs/database/yopoy-index-plan.md`
* `/docs/database/yopoy-unit-of-work-plan.md`
* `/docs/database/yopoy-postgres-repository-boundary.md`
* `/docs/database/yopoy-migration-strategy.md`
* `/docs/database/yopoy-orm-decision-record.md`
* `/docs/database/yopoy-environment-strategy.md`
* `/src/infrastructure/postgres/README.md`
* `/src/infrastructure/postgres/PostgresAdapterBlocked.ts`
* `/src/infrastructure/postgres/schema/draft-schema-not-for-execution.sql`
* `/src/infrastructure/postgres/rls/draft-rls-not-for-execution.sql`

## 3. Arquivos modificados
N/A (Nenhum arquivo anterior de Application ou Handlers In-memory precisou ser alterado pelas fundações passivas documentais desta etapa).

## 4. Tabelas planejadas
* `companies`, `users`
* `sales`, `sale_items`
* `payments`, `payment_links`
* `smart_capture_drafts`, `draft_invoices`
* `audit_logs`, `ledger_entries`, `pending_items`

## 5. Entidades mapeadas
`Company`, `User`, `Sale`, `SaleItem`, `Payment`, `PaymentLink`, `CashSession`, `CashMovement`, `Expense`, `Attachment`, `SmartCaptureDraft`, `DraftInvoice`, `LedgerEntry`, `PendingItem`, `AuditLog`.

## 6. Campos obrigatórios
Definiu-se rigidez de campos `id` (UUIDs), `company_id` (Identificador Multi-Tenant), `created_at` default `now()` na base, padrozinação monetária `currency` com fallback em 'BRL', e carimbos de `created_by` vinculando obrigatoriedade da autoria sem delegar pontas soltas na base.

## 7. Relacionamentos planejados
Mapeou-se restrições `ON DELETE CASCADE` entre Filhos Críticos E Empresa (se a Company for destituída como LGPD manda, varre os seus `sales`, `payments`). Contudo transações contábeis dentro do limite temporal isolado mantém integridade via Snapshot. SaleItem bloqueado à SalePai. 

## 8. Índices planejados
Compôs-se as árvores B-Tree considerando a prioridade massiva por `(company_id, occurred_at)` ou `(company_id, status)` devido ao direcionamento principal de queries (Visualização do Timeline na interface UI reativa).

## 9. RLS planejado
Estratégia Defesa-Em-Profundidade utilizando o Context Variables do Postgres (`app.current_company_id`) aplicado à Policy `tenant_isolation_policy` para mitigar Bypass via backend Bugs. Adicionais de exclusividade para Insert-Only nas tables do `audit_logs`.

## 10. Policies draft criadas
Sim, escritas como templates em `/src/infrastructure/postgres/rls/draft-rls-not-for-execution.sql`. Nunca avaliadas ativamente pela database real.

## 11. Estratégia de company_id
Toda tabela com impacto sensível transacional ou financeiro exige o `company_id`. Operações com Service Role ficam explicitamentes isoladas por credenciais backend exclusivas de uso da Yopoy (Superadmin), sem permear a via AppContainer. 

## 12. Estratégia de audit_logs
Auditar as transações sem alterar nem permitir hard-deletes. Modelagem `append-only` com restrições severas utilizando os snapshots JSONBs da "Foto Eterna" do registro (antes/depois) guardando o IP e user-agent se colhidos via context request.

## 13. Estratégia de ledger_entries
Implementar um log serial da base que reage aos desdobramentos de Pagamentos Vínculados ou Criados/Caixa com reflexo Contábil de Lançamento (Crédito/Débito) usando `company_id`, `direction`, e `category`. Fim dos gráficos fakes visuais em tempo real, prioridade na leitura da Tabela Ledger para montagem final do fluxo de caixa.

## 14. Estratégia de attachments
Planificando tabelas apontando para baldes de storage genéricos S3/Supabase com checksum do envio, evitando trafegar blobs puros, apenas UUID de path. Ficará isolado enquanto a plataforma crescer.

## 15. Estratégia de pending_items
A trilha que resolve o descompasso "Assíncrono" do modelo MVP real. Pagou-se numa maquina ad-hoc, subiu notificação e a pendência fiscal (SaleWithoutPayment, ExpenseWithoutProof) cria tasks orgânicas pra equipe em um painel do yopoy resolver. Total modelagem de States de progresso.

## 16. Estratégia de smart_capture_drafts
Tabela passiva pra despejar o corpo puro e sujo capturado via OCR pela IA. Vida curta como Status 'PENDING' na review humana. Quando convertida, torna-se lixo ou registro imutável do 'converted_to_id' garantindo o link na contabilidade final.

## 17. Estratégia de draft_invoices
A Tabela pro-forma "Rápida" a fim evitar contato de certificação e payload massivo SEFAZ no começo. Isola Customer e ListProdutos em snapshot, sem envolver Protocolo SEFAZ ou Keys Autenticadas.

## 18. Estratégia de soft delete
Toda deleção nas chaves que acoplariam logs contábeis não deverão estourar erros de Constraints ou Droppar dados legais: Marcam-se em `status='CANCELLED'` e preenche-se o tracker de `cancelled_at` & `cancelled_by`. Hard deletion (DROP CASCADE) fica em escopo absoluto (Excluir Conta Inteira no App Yopoy/Encerramento RGPD).

## 19. Estratégia de versionamento
Adotar controle simples de Concorrência ou Timestamp lock para o futuro (`updated_at`), principalmente quando a mesma pre-nota receber updates contínuos dos caixas, reduzindo Update Loss sem over-engineering absurdo no inicio do MVP.

## 20. Estratégia de Unit of Work
Evitar corrupção multi-table definindo que transações com mais de 1 TBL afetações ocorram sob a abstração UnitOfWork (`transaction(companyId, tx => {...})`). A aplicação passa as ordens aos adapters mas a conexão principal de Proxy SQL segura tudo em um bloco puro BEGIN/COMMIT, com rollback total se exceptions travarem o EventLoop do NodeJS.

## 21. Estratégia de migrations
Uso de ferramenta imperativa sem quebra contínua manual da UI do Supabase (Drizzle Kit generate/migrate ou Prisma Migrate). Scripts versionados (Ex: 0001_schema, 0002_rls). Modificações diretas ou sem dry-run em staging são Vetadas.

## 22. Estratégia de ambientes
Split triplo: DevLocal (Containers efêmeros Sem Sefaz), Staging (Testes fiscais/UAT, ambiente seguro com Base da Sefaz Mockada Homolog) e Production Cloud (Backup constante replicados DB com chaves Jurídico Financeiras Real). Todo pipeline obedece. 

## 23. Decisão técnica recomendada para ORM/SQL
Recomendando **Drizzle ORM** (Equilíbrio Edge, tipificação extrema TypeScript com esquema unificado, clareza sobre queries geradas pra conferir Indexes e sem choques invasivos às proteções Nativa RLS do Supabase), fugindo de Prisma pra Multi-tenancy ou do Pg "cruo" pra ganho construtivo de produtividade nos mappers de MVP.

## 24. Plano de PostgresRepository
A API se materializará com blocos de Erros "POSTGRES_ADAPTER_NOT_IMPLEMENTED", Stubs estritos da interface base TypeScript para fácil switch de inversão de controle via CompositionRoot, mas retendo integridade total no atual momento In-memory isolado. Documentado através do arquivo de repositório stubado. 

## 25. Confirmação de que nenhum banco real foi usado
**CONFIRMADO**. Nenhuma conexão lib `pg` ou pacote de pool ORM nativo foi invocada na execução deste relatorio/tarefa.

## 26. Confirmação de que nenhuma migration real foi executada
**CONFIRMADO**. Planos apenas documentais marcados como Draft Não-Executável.

## 27. Confirmação de que nenhum DML/DDL real foi executado
**CONFIRMADO**.

## 28. Confirmação de que nenhuma SEFAZ real foi chamada
**CONFIRMADO**.

## 29. Confirmação de que nenhuma emissão fiscal real ocorreu
**CONFIRMADO**.

## 30. Confirmação de que nenhuma Produção V2 foi ativada
**CONFIRMADO**.

## 31. Confirmação de flags
* `routeToV2`: N/A, inativo.
* `routeToLegacy`: Preservado Frontend MVP.
* `activationBlocked`: Respeitado pelas regras fiscais.

## 32. Resultado de npm run lint
PASS. (Verificado via compilação sem falhas de Lint de blocos criados).

## 33. Resultado de npm run typecheck
PASS. Typechecking validado de ponta a ponta sem mutação.

## 34. Resultado de npm run build
PASS. Build do projeto permanece prístino.

## 35. Problemas encontrados
Nenhum impeditivo técnico para o planejamento de Blueprint, desde que o time mantenha-se alinhado na escrita das policies RLS para que elas performem bem nos próximos módulos de implementações.

## 36. Riscos remanescentes
Configuração sutil de connection proxies que ignoram escopo temporário de "Context Settings" no Postgres perdem todo RLS Security e devem ser testados severamente com Jest/Vitest no modulo de implantação dos Adapters do Postgres Drizzle. Requer atenção redobrada no futuro.

## 37. Pendências técnicas
Construir propriamente os Schemas Typescript Drizzle e as Factoryes UnitOfWorks de Banco, acoplando em seguida a infra de TestContainers PostgreSQL ou DockerCompose nativo pra homologar a segurança do Adapter bloqueado.

## 38. Parecer GO/NO-GO
* **GO** para 47.4 — PostgreSQL Adapter Implementation in Local/Dry-Run Mode.
* **NO-GO** para produção real.
* **NO-GO** para fiscal real.
* **NO-GO** para gateway real.
