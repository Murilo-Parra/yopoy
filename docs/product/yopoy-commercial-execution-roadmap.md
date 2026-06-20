# Yopoy — roadmap de execução até comercialização

## Estado atual

- 49.1 encerrada;
- ciclo técnico do `server` encerrado;
- próxima fase é produto/front-end;
- não abrir novas refatorações sem risco real.

A numeração abaixo representa a sequência de produto a partir deste marco. Ela não reabre nem prolonga a sequência técnica de refatoração do `server` já encerrada.

## Sequência de execução

### 47.0 — Documento oficial Yopoy V1

- **Objetivo:** fixar visão, público, proposta comercial, escopo do MVP e modelo comum de cards.
- **Entregáveis:** mapa oficial do produto, modelo de cards e estados e roadmap até a comercialização.
- **Critério de conclusão:** os três documentos aprovados orientam decisões de produto sem exigir implementação.
- **O que não fazer:** criar tela, rota, banco, automação ou reabrir refatoração técnica.

### 47.1 — Matriz função x plano

- **Objetivo:** transformar os planos sugeridos em ofertas comerciais comparáveis e limitáveis.
- **Entregáveis:** matriz de funções, limites de uso, usuários, volumes, dependências e hipóteses de preço por plano.
- **Critério de conclusão:** cada função do V1 tem plano, limite e justificativa comercial definidos.
- **O que não fazer:** implementar cobrança, escolher preço definitivo sem validação ou adicionar funções só para preencher planos.

### 47.2 — Modelo de dados conceitual dos cards

- **Objetivo:** detalhar entidades, relações, transições e auditoria necessárias ao fluxo manual.
- **Entregáveis:** diagrama conceitual, catálogo de campos, regras de transição e vínculos multi-tenant.
- **Critério de conclusão:** produto e engenharia conseguem avaliar o modelo antes de qualquer decisão física de persistência.
- **O que não fazer:** criar migration, tabela, endpoint ou antecipar automações.

### 48.0 — Design system mobile-first

- **Objetivo:** definir os padrões visuais e de interação necessários à Central em telas pequenas.
- **Entregáveis:** tokens, tipografia, cores, acessibilidade, componentes conceituais, estados e padrões de confirmação/desfazer.
- **Critério de conclusão:** os fluxos prioritários podem ser prototipados com padrões consistentes e acessíveis.
- **O que não fazer:** construir páginas completas, criar variações sem uso real ou depender exclusivamente de drag-and-drop.

### 48.1 — Protótipo da Central Visual

- **Objetivo:** validar navegação, entendimento dos cards e organização manual antes da implementação.
- **Entregáveis:** protótipo mobile-first navegável e variante desktop para criar, revisar, vincular, converter e arquivar cards.
- **Critério de conclusão:** testes com usuários representativos demonstram compreensão do fluxo principal e indicam ajustes concretos.
- **O que não fazer:** conectar backend, simular automação como pronta ou ampliar o protótipo para módulos periféricos.

### 48.2 — Captura por foto simples

- **Objetivo:** validar a entrada de papel e comanda como anexo ou rascunho de card.
- **Entregáveis:** fluxo demonstrável de captura, visualização, correção manual e descarte seguro.
- **Critério de conclusão:** uma captura pode originar um rascunho revisável sem assumir que OCR está correto.
- **O que não fazer:** IA avançada, extração autônoma, escrita definitiva em estoque ou ação fiscal.

### 49.0 — Central Visual manual

- **Objetivo:** entregar a mesa operacional na qual cards podem ser criados e organizados manualmente.
- **Entregáveis:** listagem/colunas, criação, edição, filtros essenciais, arquivar, desarquivar e histórico mínimo.
- **Critério de conclusão:** o usuário organiza o trabalho diário por cards no mobile sem depender de automação.
- **O que não fazer:** conciliação automática, IA avançada, fiscal real ou refatoração de `server` sem risco concreto.

### 49.1 — Vendas, pagamento e vínculo manual

- **Objetivo:** conectar registros de venda e pagamento sob controle do usuário.
- **Entregáveis:** venda simples, pagamento manual, vínculo, desvínculo, divergência e histórico das ações.
- **Critério de conclusão:** venda e pagamento podem ser registrados e conciliados manualmente sem perda de rastreabilidade.
- **O que não fazer:** integrar adquirente, gateway, Pix ou movimentar dinheiro real.

### 50.0 — Caixa diário e estoque básico

- **Objetivo:** refletir a operação diária em caixa e quantidade simples de produtos.
- **Entregáveis:** abertura/fechamento de caixa, resumo do dia, cadastro de produtos e movimentação básica de estoque auditável.
- **Critério de conclusão:** a empresa fecha o dia e identifica efeitos das vendas no estoque, com divergências visíveis.
- **O que não fazer:** lote, validade, WMS, previsão avançada ou alteração definitiva sugerida apenas por IA.

### 51.0 — Pré-nota e contador

- **Objetivo:** preparar e compartilhar informações organizadas sem obrigar emissão fiscal.
- **Entregáveis:** pré-nota simples, revisão, pasta/exportação para contador, confirmação de envio e histórico.
- **Critério de conclusão:** o usuário gera pré-nota ou relatório consistente e decide explicitamente quando enviar ao contador.
- **O que não fazer:** emitir nota, enviar automaticamente ou substituir validação contábil profissional.

### 52.0 — Fiscal em homologação

- **Objetivo:** validar integrações fiscais com segurança fora da produção.
- **Entregáveis:** configuração protegida, preparação de emissão, ambiente de homologação, tratamento de rejeições e auditoria.
- **Critério de conclusão:** cenários homologados passam com confirmação explícita, sem emissão real indevida em desenvolvimento ou preview.
- **O que não fazer:** liberar produção antes da homologação, cancelar automaticamente ou alterar certificado/configuração crítica por sugestão.

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
- não implementar fiscal real antes de homologação;
- não implementar integração com maquininha antes de vínculo manual;
- não implementar IA avançada antes da Central manual.

Uma etapa só deve começar quando sua dependência imediata estiver concluída ou quando houver decisão explícita e documentada para mudar a ordem.

## Caminho comercial

1. **MVP interno:** provar o fluxo completo com operação assistida e dados controlados.
2. **Piloto com poucas empresas:** observar uso real, corrigir bloqueadores e validar disposição de pagamento.
3. **Plano gratuito limitado:** permitir entrada e demonstração de valor sem custo operacional descontrolado.
4. **Plano básico para substituir planilha:** vender registro, caixa e controle simples para a primeira necessidade pagante.
5. **Plano intermediário para operação física:** atender volume, equipe, pré-nota e contador.
6. **Premium para fiscal e automação:** cobrar por capacidades de maior complexidade depois de homologadas e validadas.
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
