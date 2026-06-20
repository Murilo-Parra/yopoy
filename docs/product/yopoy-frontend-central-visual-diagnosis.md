# Yopoy — diagnóstico front-end para Central Visual manual

## Commit-base

Diagnóstico realizado sobre o commit `09896e0cc52e98422f4e740ca85dda8d096c4a74` (`09896e0 docs(product): define smart card UX foundation`), com worktree inicialmente limpa.

Os artefatos das etapas 47.2, 48.0 e 48.1 existem: modelo conceitual dos cards, design system/blueprint mobile-first e protótipo/mapa de telas da Central. A sequência técnica 49.1 está encerrada. Esta é uma etapa curta de produto/front-end; não reabre `server`, backend, banco ou fiscal.

## Escopo

Este documento diagnostica o encaixe da Central Visual manual no front-end atual e prepara a implementação 49.0-B. Não implementa página, componente, rota, persistência ou automação.

O fluxo preservado é: registrar primeiro, organizar depois, conciliar quando possível, enviar ao contador se o usuário quiser e emitir nota somente no futuro, quando existir função fiscal real e houver confirmação. NF-e, NFC-e, NFS-e, SEFAZ, certificado A1 operacional, XML/DANFE e cancelamento fiscal real estão fora do MVP.

## Resumo da estrutura atual

### Stack aparente

- React 19, TypeScript e Vite;
- Tailwind CSS 4 via classes utilitárias e `src/index.css`;
- `lucide-react` para ícones, `motion` para transições e `recharts` para gráficos;
- Vitest e Testing Library presentes, com testes front-end concentrados em autenticação e permissões;
- não há `react-router-dom`: a navegação interna usa estado React.

### Pastas e pontos de entrada

- `src/main.tsx`: bootstrap, sincronização inicial via `/api/sync/load` e providers de client e autenticação;
- `src/App.tsx`: shell, autenticação visual, tema, estado global legado, menu, navegação e renderização das áreas;
- `src/features/yopoy-central-do-dia/`: feature atual da Central, contendo somente `YopoyCentralDashboard.tsx`;
- `src/components/`: módulos e componentes grandes do front-end legado;
- `src/frontend/`: autenticação, permissões e guards de interface;
- `src/frontend-api/`: client tipado que chama handlers por container em memória;
- `src/hooks/`: atualmente contém `useMediaQuery`;
- `src/index.css`: Tailwind, tipografia, ajustes responsivos, toque mínimo e adaptação global de tabelas no mobile.

### Rotas e páginas atuais

Não existe arquivo de rotas nem roteador por URL. `App.tsx` alterna `landing`/`erp` e usa `activeTab` como destino interno. As áreas principais são:

- `dashboard`: Home pós-login e destino padrão; monta `YopoyCentralDashboard` e, abaixo dele, um dashboard legado extenso;
- `finance`: `FinanceTool`, com caixa, receitas/despesas, equipe e planejamento;
- `logistics`: `LogisticsTool`, com estoque, alertas, produtos e fornecedores;
- `invoice`, `nfce_pos` e uma ramificação `nfse_module`: superfícies fiscais legadas, bloqueadas ou incompatíveis com a direção do MVP;
- `hierarchy`: `HierarchyTool`, com equipe e uma central de tarefas local;
- `advisor`: `ChatAssistant`;
- `settings`: `SettingsTool`;
- `master_admin`: `MasterAdminTool`, incluindo empresas, usuários, afiliados, auditoria e suporte.

Não há módulo autônomo de vendas na navegação. A Central atual oferece ações demonstrativas de venda, pagamento, caixa e captura por meio de `YopoyFrontendClient`; o restante da venda aparece espalhado por dashboard, financeiro e superfícies fiscais legadas.

### Layout e navegação

- `App.tsx` é o layout principal e também um componente concentrador de estado;
- desktop: sidebar fixa, topbar e área principal;
- mobile: menu lateral em overlay e uma faixa horizontal rolável de destinos abaixo da topbar;
- não existe bottom navigation fixa conforme o design system conceitual;
- `dashboard` é selecionado no login e funciona como Home pós-login;
- permissões estruturais usam `ProtectedModule`, `PermissionGate`, `AuthContext` e `usePermission`.

### Componentes e padrões reaproveitáveis

- shell responsivo, sidebar, topbar, tema claro/escuro e destino `dashboard` de `App.tsx`;
- `YopoyLogo`;
- `ProtectedModule` e `PermissionGate`, se a Central exigir a permissão `dashboard:view`;
- `useMediaQuery` para diferenças que não puderem ser resolvidas somente com CSS;
- `ResponsiveDataView` como referência de adaptação lista/tabela, não como modelo direto de SmartCard;
- padrões visuais Tailwind já usados: superfícies com borda, `rounded-xl/2xl`, grids responsivos, estados claro/escuro e botões com alvo mínimo de 44 px;
- padrões de overlay/modal e modal mobile fullscreen existentes em `App.tsx`, `OnboardingTutorial` e componentes de gráficos; são padrões locais, não componentes compartilhados;
- `YopoyClientProvider`/`useYopoyClient` e `YopoyFrontendClient` existem para integrações futuras, mas não são necessários para o mock local da 49.0-B.

Não existe hoje um componente compartilhado confiável de SmartCard, StatusChip, dialog, drawer, bottom navigation ou undo toast. Criar abstração genérica para todos eles na primeira etapa aumentaria o escopo; 49.0-B deve extrair apenas o card visual que já tiver repetição real.

### Dados mockados e estado

- grande parte dos dados legados fica em `App.tsx` e em componentes, inicializada por `useState` e persistida em chaves `biz_simulated_*`/`cfg_*` do `localStorage`;
- `HierarchyTool` mantém `biz_central_tasks` e já contém algo parecido com pendências/tarefas, mas seu modelo é de equipe, não de SmartCard;
- `YopoyCentralDashboard` usa o client em memória para ações demonstrativas e não possui uma coleção visual de cards;
- os mocks de 49.0-B devem ficar identificados e isolados dentro da feature da Central, sem reutilizar dados fiscais simulados nem criar persistência permanente disfarçada.

### Recursos próximos da Central

- existe uma Home/dashboard e um componente chamado Central do Dia, mas ele é um painel técnico de demonstração, não a Central Visual definida nos documentos de produto;
- existem cards visuais genéricos no dashboard, tarefas em `HierarchyTool`, alertas de estoque, indicadores e modais;
- não existe kanban de SmartCards, detalhe em drawer, busca/filtros próprios, notificações unificadas ou seção coerente de pendências operacionais;
- há responsividade parcial: breakpoints Tailwind, sidebar mobile, faixa de navegação rolável, modais fullscreen e regras globais para formulários/tabelas. Isso não equivale ao fluxo mobile-first completo da Central;
- os testes front-end relevantes cobrem autenticação, permissões e boundary. Não há teste do `App`, do `YopoyCentralDashboard` ou da navegação/conteúdo da Central.

## Onde a Central Visual deve entrar

- **Nova página?** Sim como página funcional dedicada, mas dentro da feature existente `src/features/yopoy-central-do-dia/`; não criar uma segunda Central paralela.
- **Substituir o dashboard atual?** Sim. Deve substituir o conteúdo operacional do `dashboard`, inclusive evitar manter a “Visão Geral” legada abaixo da nova Central. O shell pode ser preservado.
- **Home pós-login?** Sim. A Central deve continuar sendo o destino inicial após autenticação.
- **Menu principal?** Sim. O item atual “Painel de Controle”/“Dashboard” deve passar a comunicar “Central”, sem duplicar item.
- **Rota própria?** Deve ter um destino estável próprio. Como hoje não há roteador, 49.0-B deve ajustar o destino interno existente `dashboard` como rota equivalente da Central. Uma URL como `/central` só deve ser introduzida se o escopo autorizar uma decisão de roteamento e os arquivos/dependências correspondentes; não se deve instalar um roteador incidentalmente nesta primeira implementação.
- **Mobile-first?** Sim desde o primeiro commit de implementação. A versão essencial é lista/seções em uma coluna com ações por botão; desktop é expansão, não pré-requisito.

## O que reaproveitar

- shell pós-login, tema e navegação responsiva de `App.tsx`;
- ponto de montagem `YopoyCentralDashboard` e a pasta da feature existente;
- permissão `dashboard:view` e guards front-end, se aplicáveis ao encaixe;
- `YopoyLogo`, ícones Lucide e tokens/padrões Tailwind atuais;
- breakpoints e regras de toque/responsividade de `src/index.css`;
- padrão de modal fullscreen mobile para confirmação ou detalhe, implementado localmente na feature até existir repetição suficiente para extrair;
- `useMediaQuery` somente quando o comportamento, e não apenas o layout, mudar por viewport;
- linguagem e exemplos fake definidos no protótipo 48.1;
- client/context existentes apenas como fronteira futura, sem conectar backend nesta etapa.

Não reaproveitar como domínio da Central: `CentralTask`, invoices simuladas, emissores fiscais, DANFE, NFC-e/NFS-e, dados de estoque com lote/validade ou ações técnicas do atual `YopoyCentralDashboard`.

## O que evitar

- duplicar o dashboard ou renderizar a Central junto da “Visão Geral” legada;
- criar módulo paralelo sem integração com a Home e o menu atuais;
- mexer em `server.ts`, backend, banco, migrations, contratos ou autenticação;
- reabrir fiscal ou expor emissão, cancelamento, SEFAZ, certificado, XML ou DANFE como capacidade do MVP;
- começar com automação, OCR real, IA, conciliação automática ou integração com maquininha;
- depender de drag-and-drop; toda ação essencial precisa de botão no mobile;
- usar dados falsos permanentes sem nome, isolamento e identificação explícita de mock;
- acoplar os SmartCards às chaves `biz_simulated_*` legadas;
- quebrar mobile com colunas mínimas, tabelas largas, overflow horizontal ou ações apenas em hover;
- ampliar 49.0-B para corrigir todo o `App.tsx`, toda a navegação legada ou todos os módulos fiscais.

## Implementação recomendada para 49.0-B

1. Ajustar o destino de navegação existente `dashboard` para ser a Central Visual canônica e remover do mesmo destino o dashboard legado duplicado. Não introduzir biblioteca de rotas nesta etapa.
2. Reestruturar `YopoyCentralDashboard` como container mobile-first, com uma coluna no mobile e expansão controlada no desktop.
3. Definir tipos de apresentação e dados mockados locais, explicitamente fictícios, em arquivos próprios da feature.
4. Renderizar, nesta ordem: **Atenção agora**, **Novas capturas**, **Pagamentos sem vínculo**, **Vendas sem pagamento**, **Em revisão**, **Prontos** e **Pré-notas/contador**.
5. Criar um componente visual de SmartCard dentro da feature, pois não há equivalente reutilizável adequado.
6. Implementar somente estado local para: revisar, marcar pronto, arquivar, desarquivar, vincular visualmente e criar pré-nota visual. Manter botões explícitos e feedback reversível.
7. Exibir avisos claros: pré-nota é preparação interna; fiscal real está fora do MVP; nenhum estado significa nota emitida.
8. Validar larguras pequenas, toque mínimo, foco, textos de estado, ausência de overflow e adaptação desktop.
9. Não criar backend, endpoint, client novo, banco ou persistência. A conexão com dados reais fica para etapa posterior, depois da validação da interface manual.

## Allowlist sugerida para 49.0-B

Arquivos existentes prováveis:

- `src/App.tsx` — apenas encaixe da Central no destino `dashboard`, rótulos de navegação e remoção do dashboard legado duplicado daquele destino;
- `src/features/yopoy-central-do-dia/YopoyCentralDashboard.tsx` — container da Central manual.

Arquivos novos prováveis, dentro da pasta já existente:

- `src/features/yopoy-central-do-dia/yopoyCentralTypes.ts` — tipos de apresentação do mock;
- `src/features/yopoy-central-do-dia/yopoyCentralMockData.ts` — fixtures locais identificadas como fictícias;
- `src/features/yopoy-central-do-dia/YopoySmartCard.tsx` — card visual reutilizado entre seções;
- `src/features/yopoy-central-do-dia/YopoyCentralDashboard.test.tsx` — teste da renderização, estados e ações locais, se incluído na etapa.

Adicionar `src/index.css` à allowlist somente se as classes Tailwind existentes forem insuficientes para uma correção responsiva concreta. Não incluir `package.json`, backend, `server.ts`, migrations ou componentes fiscais. Se a equipe decidir por URL real `/central`, essa decisão exige allowlist própria para o mecanismo de roteamento, sem inventar hoje um arquivo de rotas inexistente.

## Critério de pronto da implementação 49.0-B

- Central acessível no app como Home pós-login e destino principal, sem dashboard concorrente;
- mobile funcional, sem rolagem horizontal e com ações essenciais por botão;
- SmartCards mockados exibidos nas seções previstas;
- tipos, estados e consequências visíveis por texto, não apenas cor;
- ações mockadas funcionando em estado local, incluindo arquivar/desarquivar e vínculo visual;
- nenhum backend, endpoint, banco ou persistência criado;
- fiscal real ausente; pré-nota e contador apresentados somente como preparação interna;
- testes específicos da Central, se criados, e `npm run typecheck` passando.
