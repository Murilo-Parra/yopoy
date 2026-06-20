# Yopoy — roadmap de execução até comercialização

## Estado atual

- 49.1 encerrada;
- ciclo técnico do `server` encerrado;
- próxima fase é produto/comercial, seguida pela construção orientada pela Central Visual;
- não abrir novas refatorações sem risco real.

A numeração abaixo representa a sequência de produto a partir deste marco. Ela não reabre nem prolonga a sequência técnica de refatoração do `server` já encerrada.

## Sequência de execução

### 47.0 — Documento oficial Yopoy V1

- **Objetivo:** fixar visão, público, proposta comercial, escopo do MVP e modelo comum de cards.
- **Entregáveis:** mapa oficial do produto, modelo de cards e estados e roadmap até a comercialização.
- **Critério de conclusão:** os três documentos aprovados orientam decisões de produto sem exigir implementação.
- **O que não fazer:** criar tela, rota, banco, automação ou reabrir refatoração técnica.

### 47.1 — Matriz função x plano

- **Objetivo:** transformar os planos oficiais em ofertas comerciais comparáveis, limitáveis e sem promessa fiscal prematura.
- **Entregáveis:** matriz de funções por plano, separação MVP/pós-MVP e limites comerciais a validar.
- **Critério de conclusão:** cada função tem plano, fase e justificativa comercial; emissão fiscal real está fora do MVP.
- **O que não fazer:** implementar cobrança, escolher preço definitivo sem validação ou adicionar funções só para preencher planos.

### 47.2 — Modelo de dados conceitual dos cards

- **Objetivo:** detalhar entidades, relações, transições e auditoria necessárias ao fluxo manual.
- **Entregáveis:** `docs/product/yopoy-card-conceptual-data-model.md`, com catálogo de entidades e campos, relações, regras de transição, auditoria e vínculos multi-tenant.
- **Critério de conclusão:** produto e engenharia conseguem avaliar o modelo antes de qualquer decisão física de persistência.
- **O que não fazer:** criar migration, tabela, endpoint ou antecipar automações.

### 48.0 — Design system mobile-first

- **Objetivo:** definir os padrões visuais e de interação necessários à Central em telas pequenas.
- **Entregáveis:** `docs/product/yopoy-mobile-first-design-system.md` e `docs/product/yopoy-central-visual-ux-blueprint.md`, com fundações visuais, acessibilidade, componentes conceituais, estados, padrões de confirmação/desfazer e fluxos da Central.
- **Critério de conclusão:** os fluxos prioritários podem ser prototipados com padrões consistentes e acessíveis.
- **O que não fazer:** construir páginas ou componentes, criar código, backend, rota ou migration, antecipar fiscal real, criar variações sem uso real ou depender exclusivamente de drag-and-drop.

### 48.1 — Protótipo da Central Visual

- **Objetivo:** validar navegação, entendimento dos cards e organização manual antes da implementação.
- **Entregáveis:** `docs/product/yopoy-central-visual-prototype.md` e `docs/product/yopoy-central-visual-screen-map.md`, com protótipo conceitual mobile-first navegável e variante desktop para criar, revisar, vincular, converter e arquivar cards, ainda sem implementação final ou backend.
- **Critério de conclusão:** testes com usuários representativos demonstram compreensão do fluxo principal e indicam ajustes concretos.
- **O que não fazer:** criar código ou implementação final, conectar backend, criar rota, banco, migration ou persistência, simular automação ou fiscal real como disponíveis, ou ampliar o protótipo para módulos periféricos.

### 48.2 — Captura por foto simples

- **Objetivo:** validar a entrada de papel e comanda como anexo ou rascunho de card.
- **Entregáveis:** fluxo demonstrável de captura, visualização, correção manual e descarte seguro.
- **Critério de conclusão:** uma captura pode originar um rascunho revisável sem assumir que OCR está correto.
- **O que não fazer:** IA avançada, extração autônoma, escrita definitiva em estoque ou ação fiscal.

### 49.0 — Central Visual manual

- **49.0-A — diagnóstico curto:** diagnosticar o front-end atual e definir o encaixe da Central sem duplicar dashboard, reabrir `server` ou antecipar backend/banco; esta etapa é exclusivamente documental e prepara a implementação.
- **49.0-B — primeira implementação:** iniciar a primeira construção da Central Visual manual, mobile-first, usando dados mockados locais e ações visuais sob controle do usuário.
- **49.0-C — planejamento de QA e polimento:** planejar o QA e o polimento controlado da Central Visual manual e registrar como backlog a simplificação progressiva do cadastro inicial.
- **49.0-E — diagnóstico de acesso local para QA:** documentar a inicialização e os riscos de ambiente necessários para validar a Central Visual no navegador, sem alterar código, autenticação ou cadastro.
- **Objetivo:** construir a mesa operacional na qual cards podem ser criados e organizados manualmente, somente depois do diagnóstico 49.0-A e da validação conceitual de 48.1.
- **Entregáveis:** listagem/colunas, criação, edição, filtros essenciais, arquivar, desarquivar e histórico mínimo.
- **Critério de conclusão:** o usuário organiza o trabalho diário por cards no mobile sem depender de automação.
- **O que não fazer:** conciliação automática, IA avançada, fiscal real ou refatoração de `server` sem risco concreto.

### 49.1 — Vendas, pagamento e vínculo manual

- **Objetivo:** conectar registros de venda e pagamento sob controle do usuário.
- **Entregáveis:** venda simples, pagamento manual, vínculo, desvínculo, divergência e histórico das ações.
- **Critério de conclusão:** venda e pagamento podem ser registrados e conciliados manualmente sem perda de rastreabilidade.
- **O que não fazer:** integrar adquirente, gateway, Pix ou movimentar dinheiro real.

### 50.0 — Caixa diário e estoque básico

- **50.0-A — cadastro mínimo e onboarding progressivo:** planejar entrada rápida pela conta pessoal e coleta posterior de dados empresariais, mantendo fiscal real bloqueado no MVP.
- **50.0-B — diagnóstico do cadastro atual:** mapear o wizard, campos, validações, dependências de autenticação/backend e estado local antes da implementação mínima.
- **50.0-C — decisão de tenant para cadastro mínimo:** adotar conta pessoal mínima com tenant provisório interno não fiscal, preservando sessão, isolamento e RLS sem dados empresariais fictícios.
- **50.0-D — diagnóstico de persistência do tenant provisório:** concluir que o estado provisório exige evolução mínima de schema e planejar a 50.0-E sem implementar cadastro ou dados fiscais fictícios.
- **50.0-E — limite anti-refatoração de cadastro e tenant:** frear implementação estrutural e adiar migration até a consolidação documental da fonte canônica de auth/persistência, preservando o foco na Central Visual.
- **50.0-F — consolidação pós-trava:** congelar cadastro/tenant e redirecionar o próximo avanço para QA visual e validação comercial da Central Visual.
- **Objetivo:** refletir a operação diária em caixa e quantidade simples de produtos.
- **Entregáveis:** abertura/fechamento de caixa, resumo do dia, cadastro de produtos e movimentação básica de estoque auditável.
- **Critério de conclusão:** a empresa fecha o dia e identifica efeitos das vendas no estoque, com divergências visíveis.
- **O que não fazer:** lote, validade, WMS, previsão avançada ou alteração definitiva sugerida apenas por IA.

### 51.0 — Pré-nota e contador

- **51.0-A — plano de QA visual e validação comercial:** documentar público, roteiros, critérios e evidências para validar a Central Visual manual sem reabrir infraestrutura ou fiscal real.
- **51.0-B — template de sessões manuais:** padronizar o registro dos primeiros testes e simulações guiadas da Central Visual, sem executar testes nem gerar resultados fictícios.
- **Objetivo:** preparar e compartilhar informações organizadas sem obrigar emissão fiscal.
- **Entregáveis:** pré-nota simples, revisão, pasta/exportação para contador, confirmação de envio e histórico.
- **Critério de conclusão:** o usuário gera pré-nota ou relatório consistente e decide explicitamente quando enviar ao contador.
- **O que não fazer:** emitir nota, enviar automaticamente ou substituir validação contábil profissional.

### 52.0 — Preparação fiscal futura e pré-nota/contador

- **Objetivo:** consolidar dados e estados internos que deixam a empresa organizada para uma capacidade fiscal futura, sem emitir nota.
- **Entregáveis:** rascunho interno, pré-nota, estados “sem nota”, “enviar ao contador” e “pronto para emitir futuramente”, exportação e histórico.
- **Critério de conclusão:** a informação fiscal preparatória é clara e rastreável, sem ser apresentada como documento autorizado.
- **O que não fazer:** integrar SEFAZ, operar certificado A1, emitir ou cancelar NF-e, NFC-e ou NFS-e, gerar XML/DANFE fiscal real ou prometer produção fiscal.

### 53.0 — IA contextual

- **Objetivo:** reduzir trabalho de classificação e revisão sem retirar o controle humano.
- **Entregáveis:** sugestões de tipo, vínculo, divergência e próximos passos com confiança, explicação e desfazer.
- **Critério de conclusão:** a IA melhora métricas definidas de tempo ou acerto sem executar ações críticas sozinha.
- **O que não fazer:** chat genérico, decisões irreversíveis, emissão fiscal, envio ao contador ou alteração definitiva de preço/estoque.

### 54.0 — Admin/SaaS operacional

- **Objetivo:** operar tenants, planos e suporte necessários ao piloto e à venda.
- **Entregáveis:** gestão básica de empresas, assinaturas/limites, atendimento, indicadores operacionais e procedimentos de suporte.
- **Critério de conclusão:** a equipe administra empresas piloto e resolve incidentes comuns com rastreabilidade.
- **O que não fazer:** painel interno enciclopédico, automação de cobrança não validada ou funções sem demanda operacional.

### 55.0 — Segurança, auditoria e permissões

- **Objetivo:** consolidar controles proporcionais aos fluxos e riscos do MVP.
- **Entregáveis:** matriz de permissões, trilhas de auditoria, revisão multi-tenant, confirmações críticas e plano de resposta a incidentes.
- **Critério de conclusão:** revisão de segurança não encontra bloqueador para piloto e ações críticas são autorizadas e rastreáveis.
- **O que não fazer:** criar guards duplicados sem lacuna de contrato ou ampliar escopo por conformidade hipotética.

### 56.0 — Site comercial

- **Objetivo:** comunicar uma proposta já demonstrável e captar empresas adequadas ao produto.
- **Entregáveis:** páginas de proposta de valor, público, planos, demonstração, dúvidas, privacidade e contato/piloto.
- **Critério de conclusão:** um potencial cliente entende problema, solução, limites e próximo passo sem promessa inexistente.
- **O que não fazer:** publicar promessas de automação, fiscal ou integrações ainda indisponíveis.

### 57.0 — Piloto controlado

- **Objetivo:** validar uso e valor comercial com poucas empresas físicas representativas.
- **Entregáveis:** seleção e onboarding, suporte próximo, métricas de ativação/uso, registro de problemas e ciclos curtos de correção.
- **Critério de conclusão:** empresas concluem o fluxo principal, dados críticos permanecem íntegros e há evidência de valor e disposição de pagamento.
- **O que não fazer:** escalar aquisição, aceitar customização por cliente ou ocultar limitações do piloto.

### 58.0 — Produção comercial gradual

- **Objetivo:** abrir vendas de forma controlada, preservando confiabilidade e capacidade de suporte.
- **Entregáveis:** planos disponíveis, onboarding repetível, operação de suporte, métricas, observabilidade e critérios de expansão/recuo.
- **Critério de conclusão:** clientes pagantes operam com estabilidade e a expansão respeita limites técnicos e operacionais definidos.
- **O que não fazer:** crescimento irrestrito, liberar funções não homologadas ou expandir antes de corrigir riscos reais observados.

## Regras anti-ciclo infinito

- no máximo uma etapa documental antes de uma decisão de execução;
- não criar guard se já existe contrato suficiente;
- não criar diagnóstico se já há teste reproduzindo;
- não refatorar `server` sem risco real;
- não implementar automação antes do fluxo manual;
- não implementar fiscal real antes de o produto ser validado e de existir etapa pós-MVP específica, homologada e aprovada;
- não implementar integração com maquininha antes de vínculo manual;
- não implementar IA avançada antes da Central manual.

Uma etapa só deve começar quando sua dependência imediata estiver concluída ou quando houver decisão explícita e documentada para mudar a ordem.

## Caminho comercial

1. **MVP interno:** provar o fluxo completo com operação assistida e dados controlados.
2. **Piloto com poucas empresas:** observar uso real, corrigir bloqueadores e validar disposição de pagamento.
3. **Plano gratuito limitado:** permitir entrada e demonstração de valor sem custo operacional descontrolado.
4. **Plano básico para substituir planilha:** vender registro, caixa e controle simples para a primeira necessidade pagante.
5. **Plano intermediário para operação física:** atender volume, equipe, pré-nota e contador.
6. **Premium — Gestão Pro:** cobrar por gestão avançada e, quando confirmadas, automações de maior complexidade; fiscal real poderá ser add-on futuro, nunca promessa do MVP.
7. **Site comercial:** publicar quando o fluxo principal estiver demonstrável, com promessas alinhadas ao produto disponível.

## Marco de conclusão do MVP

O MVP está concluído quando uma empresa consegue:

- cadastrar produtos;
- registrar venda;
- anexar foto ou comanda;
- criar card;
- vincular pagamento manualmente;
- fechar caixa do dia;
- atualizar estoque;
- gerar pré-nota ou relatório para contador;
- arquivar com histórico.

Essas ações devem formar um fluxo utilizável e auditável. A existência isolada das funções não caracteriza conclusão do MVP.

## Fiscal real pós-MVP

Emissão, cancelamento, SEFAZ, certificado A1 em produção, XML e DANFE fiscais reais não pertencem à sequência imediata nem ao MVP. Uma etapa fiscal real só poderá ser planejada depois da validação do produto e deverá ter escopo, homologação, riscos e disponibilidade comercial próprios.

A sequência imediata permanece: modelo conceitual, design system, protótipo da Central, Central manual, vendas/pagamento/vínculo, caixa/estoque e pré-nota/contador. Nenhuma integração fiscal real deve interromper ou antecipar esse caminho.
