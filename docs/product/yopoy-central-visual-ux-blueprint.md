# Yopoy — blueprint UX da Central Visual Inteligente

## Objetivo

Definir a experiência principal da Central Visual antes de qualquer implementação. Este blueprint orienta o protótipo da etapa 48.1 e não cria tela real, componente, rota, backend ou persistência.

O mapa navegacional e a demonstração textual desta experiência estão em `docs/product/yopoy-central-visual-screen-map.md` e `docs/product/yopoy-central-visual-prototype.md`.

## Definição

A Central Visual Inteligente é a mesa de trabalho diária da empresa física. Ela organiza cards de comanda, venda, pagamento, despesa, pré-nota, pendência e arquivado ao redor do fluxo: registrar primeiro, organizar depois, conciliar quando possível e enviar ao contador se o usuário quiser.

## Estrutura principal

### Mobile

A Central usa uma lista priorizada, com acesso por seções e filtros simples:

1. **Atenção agora:** resumo das situações mais urgentes e da próxima ação.
2. **Novas capturas:** comandas, fotos e entradas aguardando classificação ou revisão.
3. **Pagamentos sem vínculo:** pagamentos que ainda precisam ser relacionados.
4. **Vendas sem pagamento:** vendas sem pagamento associado.
5. **Prontos:** cards revisados e sem pendência imediata.
6. **Pré-notas/contador:** preparação interna, pacotes e exportações sob decisão do usuário.
7. **Arquivados:** consulta sob demanda, fora da rotina principal.

### Desktop

O desktop estende a mesma rotina em um quadro operacional:

- coluna **Entradas**;
- coluna **Pendências**;
- coluna **Em revisão**;
- coluna **Prontos**;
- coluna **Contador**;
- coluna **Arquivados**;
- painel lateral de detalhes para revisar dados, vínculos, anexos, ações e histórico sem sair do quadro.

Mover entre colunas nunca substitui botões ou menus de ação. Apenas transições válidas ficam disponíveis.

## Fluxos principais do MVP

### Fluxo A — Criar card manual

1. Abrir a Central.
2. Tocar em “Novo”.
3. Escolher o tipo de card.
4. Preencher o mínimo necessário.
5. Salvar como rascunho.
6. Revisar as informações.
7. Marcar como pronto.

Resultado: um registro interno rastreável, sem exigir automação ou conclusão de outros fluxos.

### Fluxo B — Foto de comanda

1. Tocar em “Capturar”.
2. Anexar ou tirar a foto.
3. Criar um card de captura.
4. Revisar manualmente a imagem e qualquer rascunho extraído.
5. Transformar em venda, com confirmação, ou arquivar.

Resultado: a foto permanece como anexo; OCR, quando existir, produz apenas rascunho revisável.

### Fluxo C — Venda e pagamento manual

1. Criar a venda.
2. Criar o pagamento informado.
3. Selecionar “Vincular pagamento” em um dos cards.
4. Escolher a correspondência e revisar os dados lado a lado.
5. Confirmar o vínculo.
6. Oferecer “Desfazer” imediatamente.

Resultado: venda e pagamento ficam vinculados com histórico; o registro não comprova liquidação bancária.

### Fluxo D — Caixa diário

1. Abrir o caixa com valor inicial e confirmação.
2. Registrar vendas e pagamentos durante o período.
3. Ver divergências e itens pendentes.
4. Revisar o resumo de fechamento.
5. Fechar o caixa com confirmação explícita.

Resultado: sessão operacional auditável; caixa não é extrato bancário.

### Fluxo E — Estoque básico

1. Cadastrar o produto.
2. Registrar uma entrada de estoque.
3. Registrar a venda do produto.
4. Confirmar a baixa correspondente.
5. Consultar saldo e histórico de movimentos.

Resultado: quantidade simples e rastreável; nenhuma sugestão altera estoque definitivamente sem confirmação.

### Fluxo F — Pré-nota e contador

1. Transformar a venda em rascunho de nota interno.
2. Revisar dados, itens e totais.
3. Converter o rascunho em pré-nota.
4. Incluir a pré-nota em um pacote do contador.
5. Revisar o conteúdo e exportar com confirmação.

Resultado: informação interna organizada para o contador. Rascunho e pré-nota não são nota fiscal emitida.

### Fluxo G — Arquivar

1. Escolher “Arquivar” no card.
2. Informar o motivo quando o tipo ou risco exigir.
3. Confirmar que o card sairá da visualização principal, mas não será apagado.
4. Manter o histórico e mostrar “Desfazer”.
5. Permitir desarquivar pela área de arquivados.

Resultado: o card permanece consultável e recuperável com rastreabilidade.

## Regras de interação

- no mobile, toda ação precisa ter botão;
- arrastar é opcional;
- ação crítica abre confirmação;
- “Desfazer” aparece após arquivar, vincular, desvincular e converter;
- IA apenas sugere e explica;
- OCR apenas gera rascunho revisável;
- anexos não provam pagamento liquidado nem nota fiscal emitida.

## Regras de prioridade

A Central deve ordenar e destacar:

1. divergências;
2. pagamentos sem vínculo;
3. vendas sem pagamento;
4. cards aguardando revisão;
5. caixa aberto;
6. pré-notas pendentes;
7. arquivados apenas sob demanda.

Dentro do mesmo grupo, priorizar antiguidade e impacto operacional de forma explicável. Sugestões de IA não mudam essa ordem silenciosamente.

## Estados vazios

| Situação | Mensagem | Ação sugerida |
|---|---|---|
| Sem cards | “Sua Central ainda está vazia. Crie o primeiro card ou capture uma comanda.” | “Novo card” / “Capturar” |
| Sem pendências | “Tudo em dia por aqui. Não há pendências agora.” | “Ver cards prontos” |
| Sem pagamentos sem vínculo | “Todos os pagamentos registrados estão vinculados.” | “Ver pagamentos” |
| Sem vendas sem pagamento | “Nenhuma venda está aguardando pagamento.” | “Ver vendas” |
| Sem pré-notas | “Ainda não há pré-notas. Você pode preparar uma a partir de uma venda.” | “Ver vendas” |
| Sem arquivados | “Nenhum item foi arquivado.” | “Voltar à Central” |
| Sem produtos | “Cadastre um produto para começar o controle de estoque.” | “Cadastrar produto” |

## Mensagens de erro amigáveis

| Situação | Mensagem | Recuperação |
|---|---|---|
| Falha ao salvar | “Não foi possível salvar agora. Seus dados continuam aqui.” | “Tentar novamente” |
| Foto não carregou | “A foto não carregou. Verifique a conexão ou escolha outra imagem.” | “Tentar novamente” / “Escolher outra” |
| Card não encontrado | “Esse card não está disponível. Ele pode ter sido movido ou arquivado.” | “Voltar à Central” / “Ver arquivados” |
| Vínculo inválido | “Esses cards não podem ser vinculados nesse estado. Revise os dois itens.” | “Revisar cards” |
| Empresas diferentes | “Não é possível vincular itens de empresas diferentes.” | “Voltar” |
| Recurso bloqueado por plano | “Esse recurso não está incluído no seu plano atual.” | “Ver planos” |
| Ação fiscal indisponível | “Emissão fiscal real não está disponível no MVP. Você pode preparar uma pré-nota para o contador.” | “Criar pré-nota” |

Erros preservam o contexto e o preenchimento sempre que possível. Recurso bloqueado por plano é limite comercial, não falha técnica.

## O que não fazer na Central MVP

- não emitir nota fiscal;
- não cancelar nota fiscal;
- não conectar SEFAZ;
- não integrar maquininha automaticamente;
- não criar conciliação automática;
- não depender de IA para funcionar;
- não depender de drag-and-drop no mobile;
- não apagar card ao arquivar;
- não transformar comprovante em pagamento liquidado automaticamente.

NF-e, NFC-e, NFS-e, certificado A1 operacional, XML/DANFE fiscal real e cancelamento fiscal real permanecem pós-MVP/add-on futuro. “Pronto para emitir futuramente” é apenas estado interno de preparação.

## Critério de aprovação

A Central UX está aprovada quando:

- o fluxo manual completo está claro;
- mobile é prioridade;
- desktop é extensão operacional;
- as ações críticas são confirmadas;
- fiscal real está fora;
- o usuário consegue operar sem entender ERP técnico.
