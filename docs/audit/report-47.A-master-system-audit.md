# MÓDULO 47.A — Relatório Detalhado de Auditoria do Sistema Yopoy ERP

## 1. Resumo Executivo e Avaliação Sincera do Cenário
Esta auditoria analisa o estado técnico atual do Yopoy ERP (anteriormente Elparrar/Auxiliar Contábil), com foco no encerramento do Módulo 47.2. 
O cenário revelou uma dicotomia arquitetônica severa: o **backend lógico (Domain e Application)** foi refatorado com sucesso para um padrão Domain-Driven Design (DDD) limpo e agnóstico de frameworks, suportado por Handlers de API simulados e persistência In-Memory. No entanto, o **frontend e os artefatos de integração** permanecem em um estado caótico, acoplado, e impregnado de "mocks visuais" e código legado perigoso. O sistema, neste exato momento, **não está apto para produção**.

O presente documento expõe a realidade técnica sem eufemismos: há código morto, falsas simulações de geração de notas fiscais (que violam governança e regras Fiscais) e uma interface de usuário que ignora completamente a nova arquitetura do backend.

## 2. Estrutura Organizacional do Sistema e Pastas Criadas
O repositório está fragmentado entre a "Nova Arquitetura" (limpa) e a "Antiga Arquitetura" (legada e caótica).

### 2.1. A Nova Arquitetura (Válida)
- `src/domain/entities/`: Contém os modelos de negócio puros (Ex: `Company`, `Sale`, `CashSession`, `SmartCaptureDraft`). Possui aderência a isolamento multi-tenant (`company_id` mandatório) e abstrações limpas como `AuditableEntity`.
- `src/application/use-cases/`: O cérebro da operação. Bem estruturado. 
  - `cash/` (`openCashSession`, `closeCashSession`)
  - `draft-invoices/` (`createDraftInvoiceFromSale`)
  - `payments/` (`registerPayment`, `linkPaymentToSale`, `unlinkPaymentFromSale`)
  - `sales/` (`createSale`, `addSaleItem`, `markSaleAsPendingPayment`)
  - `smart-capture/` (`createSmartCaptureDraft`, `convertSmartCaptureDraftToSale`, `reviewSmartCaptureDraft`)
- `src/application/shared/`: Contém o `UseCaseResult` base, encapsulando sucessos e falhas e prevenindo Throw/Catch descontrolados.
- `src/infrastructure/in-memory/`: Mocks técnicos funcionais de repositório. Simulam o banco de dados para permitir o desenvolvimento da lógica de negócio. (Ex: `SaleRepository.ts`, `CashSessionRepository.ts`).
- `src/backend/`: Camada de fronteira (API Boundary).
  - `handlers/`: Controladores técnicos isolados (`sales.handlers.ts`, `draftInvoices.handlers.ts` etc.).
  - `dtos/`: Definições claras de Input/Output.
  - `validators/` e `mappers/`: Validação estrita de tipagem (manuais, sem uso de libs como Zod) e mapeadores de Entidade para Dto.

### 2.2. A Arquitetura Legada e Código Morto (Perigo)
- `src/components/`, `src/App.tsx`: A camada React utiliza uma gerência de estado rústica (`currentView`) simulando rotas através de um switch. Abundância de dados mockados chumbados no código e telas que manipulam fluxos de negócio visualmente, desrespeitando o backend DDD atual.
- `src/utils/SefazReal.ts`, `src/utils/nfse/`, `src/modules/fiscal/`: Código morto e de alto risco. Tentativas pregressas de forçar emissões falsas de documentos ou gerar PDFs inconsistentes.
- Scripts de Raiz (`patch*.cjs`, `generate*.cjs`): Artefatos de automações passadas perdidas que sujam e confundem a base de código.

## 3. Ferramentas e Funções Prontas para Execução
As seguintes engrenagens podem ser testadas localmente via scripts de integração e estão logicamente impecáveis, operando sob validação do terminal (`npx tsx`):

1. **Gestão de Sessão de Caixa (`use-cases/cash/*` e `cash.handlers.ts`)**: Fluxo funcional para abrir e fechar a sessão financeira de determinado operador em determinada companhia.
2. **Ciclo de Vendas (`use-cases/sales/*` e `sales.handlers.ts`)**: Capacidade de criar um rascunho de venda, adicionar itens dinâmicos e precificar totalizadores, com o isolamento tenand exigido.
3. **Fluxo de Captura Inteligente (`smart-capture`)**: Criação de pré-lançamentos a partir de leituras não-estruturadas, forçando uma etapa manual de `review` para transicionar à Venda Efetiva.
4. **Pagamentos (`use-cases/payments/*`)**: Lançamento de pagamento avulso e vinculação a uma Venda (Sale), abstraindo o Gateway para um estado genérico.
5. **Barreira Fiscal e Prevenção (`draftInvoices.handlers.ts`)**: O avanço não-autorizado rumo à integração com a SEFAZ está devidamente bloqueado com um erro HTTP 403 `FISCAL_ACTION_BLOCKED`. 

## 4. Avaliações de Riscos (Sincero e Técnico)

| Categoria | Risco Identificado | Severidade | Comentário / Justificativa Real |
| :--- | :--- | :---: | :--- |
| **Arquitetura** | Desconexão Front vs Back | Crítica | O React não está consumindo os `handlers`. Se o deploy ocorresse hoje, o usuário interagiria com telas "falsas" e nenhum dado passaria pelas regras reais da aplicação (DDD). |
| **Engenharia** | Ausência de DI (Injeção de Dep.) | Alta | Os handlers e testes instanciam todos os repositórios manualmente (`new ...Repo()`). Impossível escalar ou mockar de modo global para testes quando as dependências crescerem. |
| **Banco de Dados** | Volatilidade e Sem Transações | Alta | O sistema usa `in-memory`. Se o Node.js reiniciar, todos os dados somem. Ademais, em operações complexas no futuro relacional (inserir Venda + Itens de Venda), a infra precisará garantir Unit-of-Work (Transações `BEGIN`/`COMMIT`/`ROLLBACK`). |
| **Integração Front**| Navegação Arcaica | Média/Alta | A falta de um `react-router-dom` força um "God Component" no `App.tsx`, causando recálculos visuais pesados e falta de deep-linking para as páginas de faturamento. |
| **Governança/Fiscal**| Escombros da Sefaz Mockada | Crítica | Manter arquivos em `/utils/nfse` cria uma dívida técnica e moral. Pode gerar equívocos se um mantenedor utilizar funções que forjam retornos de Sefaz sem valia legal real. |
| **UX / UI** | Lixo de Branding ("Elparrar") | Baixa | Ainda há metadados, landing pages e resquícios do nome "Elparrar" / "Auxiliar Contábil" que causam falta de coerência de produto. |

## 5. Propostas Pragmáticas de Melhoria (Roadmap Corretivo)

Para transicionar do formato acadêmico atual para um Software minimamente operável (`Produção V2`), as seguintes ações **não são opcionais**:

1. **Extermínio do Código Morto (Prioridade Ouro):**
   - Deletar fisicamente as pastas `src/utils/nfse`, `src/utils/sefaz_events`, arquivos `SefazReal.ts`, `patch*.cjs`. Código que não é compilado para a operação DDD deve ser exterminado.

2. **Re-arquitetura Abrupta do Frontend (Prioridade Prata):**
   - Destruir o roteamento de `currentView` presente em `App.tsx`.
   - Implementar `react-router-dom`.
   - Criar serviços de client HTTP (utilizando `fetch` nativo com wrappers ou axios) para conectar as interfaces gráficas com as funções exportadas por `src/backend/handlers`. Nenhum componente React deverá operar lógica crua.

3. **Contêiner de Injeção de Dependências (Prioridade Bronze):**
   - Criar uma implementação simples (TSyringe, Awilix ou mesmo uma `Registry` class pattern) na camada application ou infra. Passar os `Repositories` a este container, permitindo que os Handlers apenas exijam a dependência já instanciada e configurada (seja em memory, seja PostgreSQL).

4. **Levantamento de Banco de Dados Real (Post-Front/Back Alignment):**
   - Somente após o Frontend espelhar o Backend In-Memory, deve-se realizar a implementação do `Drizzle ORM` (ou similar) mapeando a Engine Postgres. Evitar o setup do DB enquanto as telas do usuário sequer emitem os Requests corretos.

## 6. Parecer Conclusivo da Auditoria
O sistema avançou consideravelmente da sua fase de prototipação arriscada para uma estrutura robusta sob os modelos DDD. O núcleo contábil financeiro foi testado em script CLI atestando que os rascunhos, faturas, fechamentos de caixa e isolamento multi-tenant (`company_id`) exercem o comportamento contratado. Porém, **como produto integrável, encontra-se quebrado**. A interface visual alucina fluxos falsos que devem ser cortados como tecido necrótico, e plugar a nova API In-Memory diretamente aos elementos HTML se faz urgente. O status final é o de progresso sólido, embora a UI necessite de drástica intervenção para alcançar a sincronia técnica necessária.
