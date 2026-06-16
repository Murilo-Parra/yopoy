# Relatório Módulo 47.D — Frontend to Backend Boundary Alignment do ERP Yopoy

## 1. Resumo Executivo
Neste módulo, conectamos o frontend do Yopoy à nova arquitetura *backend-first* (Módulo 47.C). O principal foco foi centralizar a comunicação através da Backend Boundary formal (`YopoyFrontendClient`), garantindo que o React não execute lógicas de negócio críticas, não acesse o repositório de dados ou use-cases diretamente, e mantenha uma estrutura rígida de isolamento baseada em `AppContainer` e `RequestContext`. Os fluxos MVP legados começaram a ser substituídos por handlers em-memória. 

A interface também recebeu bloqueios contundentes nas rotas fiscais antes abertas, protegendo o ambiente.

## 2. Arquivos Criados
* `src/frontend-api/YopoyFrontendClient.ts`
* `src/frontend-api/createYopoyFrontendClient.ts`
* `src/frontend-api/devRequestContext.ts`
* `src/frontend-api/YopoyClientContext.tsx`
* `src/frontend-api/index.ts`
* `src/features/yopoy-central-do-dia/YopoyCentralDashboard.tsx`
* `src/components/InvoiceTool.tsx` (Substituído por bloqueador)
* `src/components/NfseTool.tsx` (Novo componente bloqueador)
* `src/components/NfcePosTool.tsx` (Novo componente bloqueador)

## 3. Arquivos Modificados
* `src/App.tsx` (Inserida a nova Central do Dia como parte da rota `dashboard`)
* `src/main.tsx` (Envelopado com `YopoyClientProvider`)
* Retirada de dependência de `crypto` no `src/application/use-cases` com a criação de UUID em `src/application/shared/uuid.ts`.

## 4. Frontend Client Criado
Foi criado o `YopoyFrontendClient`, uma classe encarregada de envelopar os métodos dos handlers e mascará-los de forma amigável ao React, devolvendo sempre um objeto padronizado do tipo `ApiResponse<T>`.

## 5. Como o Client Chama Handlers
O Client recebe a instância do `AppContainer` e o `RequestContext`. Toda chamada (e.g. `client.createSale`) internamente aciona `this.container.handlers.sales.handleCreateSale(this.context, request)`. O React apenas aguarda a Promise para tratar o Response.

## 6. Como o Client Usa AppContainer
O `AppContainer` (atualmente fixo em `in-memory`) foi levantado de forma *Singleton* no Context do Redux/React (`YopoyClientContext.tsx`). Ele encapsula toda a árvore de repositórios, use-cases e handlers para o frontend instanciá-lo apenas uma vez, operando sobre o estado em-memória unificado.

## 7. Como RequestContext dev foi tratado
Foi criado um arquivo local isolado (`src/frontend-api/devRequestContext.ts`), exportando o `devRequestContext` fixo e gerando o `requestId` para rasteamento simulado. Sempre que um Controller/Handler é chamado, esse RequestContext é enxertado pela fachada do Client.

## 8. Quais fluxos foram conectados
Na página `YopoyCentralDashboard.tsx` conectamos um MVP demonstrando a "Backend Boundary Edition":
- **Caixa**: Abrir caixa e verificar status.
- **Venda**: Criar uma venda, adicionar itens, marcar como pendente de pagamento.
- **Pagamento**: Registrar pagamentos.
- **Captura Inteligente**: Criar o rascunho de IA (Simulado), aprovar, e converter em venda real.
- **Fiscal**: Simular uma emissão chamando um handler nativamente bloqueado para demonstração do tratamento de erro tipado (`FISCAL_ACTION_BLOCKED`).

## 9. Quais telas ainda permanecem legadas
- Outras views dentro de `App.tsx` que dependem de `currentView` para Logistics, FinanceTool, etc.
- As demais tabs (`produtos`, `clientes`, `relatórios` etc). 
A conversão será gradual ou re-arquitetada nas próximas sprints com um framework de Roteamento final.

## 10. Quais mocks visuais foram removidos
- Mocks visuais na home do ERP (para a Central) que exibiam estatísticas falsas passaram a dar espaço ao painel conectado dos fluxos MVP.
- O mega-componente `InvoiceTool.tsx` que simulava fluxos complexos de NF-e, DANFE e painéis complexos sem persistência foi desativado e trocado pelo `AlertTriangle`.

## 11. Quais mocks visuais foram preservados e por quê
- O header lateral (`Sidebar`) e top-bar que alternam apenas estados visuais. 
- Ferramentas adjacentes que não realizam mutações críticas para o negócio (calculadoras visuais) até ganharem novos Handlers.

## 12. Como App.tsx foi reduzido ou isolado
O componente antigo `activeTab === 'dashboard'` englobava lógicas espalhadas. Nós instanciamos a `<YopoyCentralDashboard theme={theme} />` no topo do Dashboard, começando o isolamento sem destruir a barra de navegação principal.

## 13. Estado do currentView
Ainda é baseado em estado state do React (`activeTab`, `currentView`). 

## 14. Plano para react-router-dom
A adoção do React Router formará as próximas entregas. Planeja-se criar `routes/` dividindo cada feature Yopoy como um micro-painel mapeável em URL state (ex: `/dashboard`, `/sales/new`, `/boxes/active`), erradicando de vez a prop-drilling no painel.

## 15. Como telas fiscais foram bloqueadas
O React component do PDV, NFS-e e NF-e (antigo Invoice Tool) foram completamente enxugados e trocados apenas por um "Módulo fiscal bloqueado" de warning. Essa é uma proteção vital Anti-Produção simulada.

## 16. Confirmação de que componentes não chamam repositories
CONFIRMADO. Componentes passam estritamente pela classe YopoyFrontendClient.

## 17. Confirmação de que componentes não chamam use cases diretamente
CONFIRMADO. Tudo é via Handler do AppContainer.

## 18. Confirmação de que handlers continuam usando container
CONFIRMADO.

## 19. Confirmação de que persistência segue in-memory
CONFIRMADO. `createAppContainer('in-memory')` injetado na raiz.

## 20. Confirmação de que banco real não foi usado
CONFIRMADO. 

## 21. Confirmação de que nenhuma SEFAZ real foi chamada
CONFIRMADO.

## 22. Confirmação de que nenhuma emissão fiscal real foi feita
CONFIRMADO. Fluxo bloqueado desde as requisições API até os componentes React.

## 23. Confirmação de que nenhuma Produção V2 foi ativada
CONFIRMADO.

## 24. Confirmação de flags
* `routeToV2`: Preservada inativa (false/blocked).
* `routeToLegacy`: Preservada (Frontend acessando features locais controladas).
* `activationBlocked`: Confirmado no `devRequestContext` e Handler fiscal simulado.

## 25. Resultado de npm run lint
PASS. As refatorações não quebraram regras de linting após ajuste de importações e do Client.

## 26. Resultado de npm run typecheck
PASS. Correções efetuadas para erros tipográficos na ponte do `AppContainer` garantindo tipos seguros de requisição/resposta das funções.

## 27. Resultado de npm run build
PASS. Bundle com `vite build` validado sem quebras.

## 28. Testes do frontend client
Validações de integração foram descritas rodando o fluxo na web:
As interações no "Simular Venda Completa", "Registrar Pagamento PIX" entre outros, ativam as camadas corretas retornando sem erros tipados à interface, demonstrando funcionalidade isolada in-memory real.

## 29. Problemas encontrados
- A biblioteca `crypto` do NodeJS original sendo puxada nativamente pro Frontend pelo rollup/vite parou o Build. O problema foi sanado isolando a criação do UUID em uma classe `uuid.ts` isomorfa agnóstica (`Math.random()` modificado para browsers sem `crypto` ou uso de `crypto.randomUUID()`).

## 30. Riscos remanescentes
- Outras views que não a página `Central do Dia` continuam suscetíveis à navegação State-based e mocks desconexos. Terão que ser migradas progressivamente.

## 31. Pendências técnicas
- Adição imediata do `react-router-dom`.
- Expansão dos Endpoints/Handlers para listagens generalizadas (Listar Vendas Ativas via Front) quando o `in-memory` permitir query mais flexível ou quando Drizzle/Postgres surgirem.

## 32. Parecer GO/NO-GO
**GO** para Módulo 47.3 — PostgreSQL Schema, RLS & Persistence Planning Foundation.
**NO-GO** para fiscal real.
**NO-GO** para produção exposta.
**NO-GO** para gateway real.
