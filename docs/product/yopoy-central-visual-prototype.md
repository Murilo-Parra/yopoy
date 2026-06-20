# Yopoy — protótipo conceitual da Central Visual

## Objetivo

Descrever o protótipo navegável de produto antes de qualquer código. Este documento deve permitir que alguém desenhe ou implemente posteriormente um protótipo fiel, sem representar tela real, componente, backend, rota ou persistência.

## Persona operacional

O protótipo deve servir a papéis que podem pertencer à mesma pessoa em negócios pequenos:

- **Dono ou gerente de empresa física:** quer entender o dia, resolver pendências e acompanhar caixa e estoque.
- **Funcionário de balcão:** registra venda, comanda e pagamento com poucos toques.
- **Operador de caixa:** abre e fecha caixa, registra pagamentos e revisa divergências.
- **Pessoa que fotografa comandas:** captura o papel rapidamente e revisa o rascunho depois.
- **Pessoa que fecha caixa:** confere resumo, diferenças e itens pendentes antes de confirmar.
- **Contador:** destinatário indireto de pré-notas e pacotes exportados; não precisa operar a Central no MVP.

O protótipo deve usar linguagem comum, permitir uso com uma mão no mobile e não pressupor conhecimento de ERP.

## Cenário principal

Em um dia de operação, a pessoa abre o caixa, tira foto de uma comanda e revisa a captura. A comanda vira uma venda interna; um pagamento é registrado manualmente e vinculado à venda. Ao encontrar uma diferença de valor, a Central mostra a divergência para revisão, sem corrigir sozinha. A venda confirmada gera baixa de estoque mediante confirmação. Depois, a pessoa cria um rascunho interno, converte-o em pré-nota, inclui-o no pacote do contador e exporta com confirmação. Itens resolvidos são arquivados, permanecendo no histórico e disponíveis para desarquivar.

## Jornada mobile principal

| Passo | Tela | Ação | Resposta esperada |
|---|---|---|---|
| 1 | Central | abrir “Atenção agora” e verificar caixa fechado | ação “Abrir caixa” fica evidente |
| 2 | Caixa | informar valor inicial e confirmar | caixa aparece aberto na Central |
| 3 | Capturar | tocar em “Capturar”, fotografar a comanda e salvar | card de captura nasce como “Revisar” |
| 4 | Detalhe da captura | conferir foto e dados do rascunho | nenhuma informação extraída é tratada como definitiva |
| 5 | Confirmação | escolher “Criar venda” e confirmar | venda é criada; origem continua acessível |
| 6 | Venda | tocar em “Registrar pagamento” e preencher valor/método | pagamento manual nasce “Sem vínculo” |
| 7 | Pagamento | escolher “Vincular”, comparar venda e pagamento e confirmar | vínculo fica visível e “Desfazer” aparece |
| 8 | Caixa | revisar totais e divergência demonstrativa; fechar com confirmação | caixa fica fechado com resumo do dia |
| 9 | Venda | tocar em “Criar pré-nota” e confirmar | rascunho interno é criado sem efeito fiscal |
| 10 | Contador | revisar, converter em pré-nota e incluir no pacote | pacote mostra conteúdo selecionado |
| 11 | Contador | tocar em “Exportar para contador” e confirmar | histórico registra a exportação |
| 12 | Detalhe do card | tocar em “Arquivar”, confirmar e usar ou dispensar “Desfazer” | item sai da Central, mas permanece consultável |

Todos os passos essenciais funcionam por botão. Nenhum gesto de arrastar é obrigatório.

## Jornada desktop principal

1. Abrir o quadro da Central e conferir contagens das colunas.
2. Revisar **Entradas**, selecionando a comanda fotografada.
3. Usar **Pendências** para identificar venda sem pagamento, pagamento sem vínculo e divergência.
4. Abrir o painel lateral do card sem perder a posição no quadro.
5. Comparar venda e pagamento, escolher “Vincular” e confirmar.
6. Revisar a coluna **Contador**, abrir a pré-nota e confirmar a exportação.
7. Selecionar itens resolvidos e arquivar apenas quando a ação em lote for válida e confirmada.
8. Usar busca global e filtros de tipo, estado e período para localizar itens específicos.

Arrastar pode antecipar uma transição válida no protótipo desktop, mas botão ou menu equivalente deve permanecer visível.

## Wireframes textuais mobile

### Central mobile

```text
┌──────────────────────────────┐
│ Empresa Exemplo      Buscar  │
│ Central              Filtros │
├──────────────────────────────┤
│ ATENÇÃO AGORA (3)            │
│ ! Pagamento divergente       │
│   R$ 58,00 · Revisar         │
├──────────────────────────────┤
│ NOVAS CAPTURAS (1)           │
│ [foto] Comanda Mesa 12       │
│        Revisar               │
├──────────────────────────────┤
│ PAGAMENTOS SEM VÍNCULO (1)   │
│ Pix informado · R$ 42,00     │
│ [Vincular]                   │
├──────────────────────────────┤
│ VENDAS SEM PAGAMENTO (1)     │
│ Venda #104 · R$ 42,00        │
│ [Registrar pagamento]        │
├──────────────────────────────┤
│ [+ Novo card] [Capturar]     │
├──────────────────────────────┤
│ Central  Vendas  Caixa  Mais │
└──────────────────────────────┘
```

### Detalhe do card

```text
┌──────────────────────────────┐
│ ‹ Central   Comanda Mesa 12  │
│ [Revisar]                    │
├──────────────────────────────┤
│ Resumo: 2 itens · R$ 42,00   │
│ Data: hoje, 12:40            │
│ Anexo: [foto da comanda]     │
│ Vínculos: nenhum             │
│ Sugestão: revisar valores    │
│ Histórico: criada às 12:41   │
├──────────────────────────────┤
│ [Criar venda] [Arquivar]     │
│ [Ver histórico]              │
└──────────────────────────────┘
```

### Capturar

```text
┌──────────────────────────────┐
│ ‹ Central       Capturar     │
├──────────────────────────────┤
│ [ Capturar foto ]            │
│ [ Anexar arquivo ]           │
│ [ Criar card manual ]        │
├──────────────────────────────┤
│ Captura recente              │
│ [foto] Comanda Mesa 12       │
│ Estado: Revisar              │
│ [Revisar captura]            │
└──────────────────────────────┘
```

### Venda

```text
┌──────────────────────────────┐
│ ‹ Vendas       Venda #104    │
│ [Sem pagamento]              │
├──────────────────────────────┤
│ 2 itens            R$ 42,00  │
│ Pagamento: não vinculado     │
│ Estoque: baixa pendente      │
├──────────────────────────────┤
│ [Registrar pagamento]        │
│ [Vincular] [Confirmar baixa] │
│ [Criar pré-nota]             │
└──────────────────────────────┘
```

### Pagamento

```text
┌──────────────────────────────┐
│ ‹ Central   Pagamento manual │
│ [Sem vínculo]                │
├──────────────────────────────┤
│ Método: Pix informado        │
│ Valor: R$ 42,00              │
│ Horário: 12:45               │
│ Comprovante: anexo opcional  │
├──────────────────────────────┤
│ Possível venda: #104         │
│ [Vincular] [Arquivar]        │
└──────────────────────────────┘
```

### Caixa

```text
┌──────────────────────────────┐
│ Caixa de hoje        [Aberto]│
├──────────────────────────────┤
│ Abertura: R$ 100,00          │
│ Vendas:   R$ 184,00          │
│ Informado:R$ 180,00          │
│ Divergência: R$ 4,00         │
├──────────────────────────────┤
│ [Registrar pagamento]        │
│ [Revisar divergências]       │
│ [Fechar caixa]               │
│ [Relatório do dia]           │
└──────────────────────────────┘
```

### Estoque

```text
┌──────────────────────────────┐
│ Estoque              Buscar  │
├──────────────────────────────┤
│ Café 500 g     3 unidades    │
│ [Estoque baixo]              │
│ Água 500 ml   18 unidades    │
├──────────────────────────────┤
│ [Cadastrar produto]          │
│ [Registrar entrada]          │
│ [Registrar saída]            │
│ [Ver histórico]              │
└──────────────────────────────┘
```

### Contador

```text
┌──────────────────────────────┐
│ Contador            Período  │
├──────────────────────────────┤
│ Rascunhos (1)                │
│ Pré-notas prontas (1)        │
│ Pacote Junho · 1 item        │
├──────────────────────────────┤
│ Pré-nota PN-008 · R$ 42,00   │
│ [Pronta para o contador]     │
│ [Exportar para contador]     │
│ [Ver histórico]              │
└──────────────────────────────┘
```

## Wireframes textuais desktop

### Central em colunas

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Yopoy | Central | Buscar cards... | Tipo ▾ Estado ▾ Período ▾ | Vendas ... │
├────────────┬────────────┬────────────┬────────────┬────────────┬─────────────┤
│ ENTRADAS   │ PENDÊNCIAS │ EM REVISÃO │ PRONTOS    │ CONTADOR   │ ARQUIVADOS  │
│ Comanda 12 │ Venda #104 │ Captura 15 │ Venda #101 │ Pré-nota 8 │ Despesa 31  │
│ [Revisar]  │ [Resolver] │ [Revisar]  │ [Abrir]    │ [Revisar]  │ [Abrir]     │
│            │ Pgto R$ 58 │            │            │            │             │
└────────────┴────────────┴────────────┴────────────┴────────────┴─────────────┘
```

### Painel lateral

```text
┌──────────────────────────────┐
│ DETALHE: Pré-nota 8      [×] │
├──────────────────────────────┤
│ Estado: Pronta               │
│ Dados · R$ 42,00 · hoje      │
│ Anexos · 1 arquivo           │
│ Vínculos · Venda #104        │
│ Histórico · 4 eventos        │
├──────────────────────────────┤
│ [Exportar] [Arquivar]        │
└──────────────────────────────┘
```

### Revisão em lote

```text
┌──────────────────────────────────────────────────────────────────────┐
│ 3 cards selecionados                                                 │
│ [Marcar pronto] [Arquivar] [Limpar seleção]                          │
├──────────────────────────────────────────────────────────────────────┤
│ ☑ Venda #101 · Pronto                                                │
│ ☑ Venda #102 · Pronto                                                │
│ ☑ Pagamento #55 · Vinculado                                          │
└──────────────────────────────────────────────────────────────────────┘
Confirmação: “Arquivar 3 cards? Eles sairão da Central, mas não serão apagados.”
```

### Busca e filtros

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Buscar: [mesa 12________________] [Buscar]                            │
│ Filtros ativos: [Captura ×] [Revisar ×] [Hoje ×] [Limpar tudo]       │
├──────────────────────────────────────────────────────────────────────┤
│ 1 resultado: Comanda Mesa 12 · R$ 42,00 · Revisar                    │
└──────────────────────────────────────────────────────────────────────┘
```

## Dados fake permitidos no protótipo

Todos os dados abaixo são fictícios e não identificam pessoas reais.

| Exemplo | Tipo | Valor/quantidade | Estado | Texto do card |
|---|---|---|---|---|
| Comanda fotografada | comanda/captura | R$ 42,00 | Revisar | “Comanda Mesa 12 · foto anexada” |
| Venda sem pagamento | venda | R$ 42,00 | Sem vínculo | “Venda #104 ainda não tem pagamento” |
| Pagamento sem vínculo | pagamento | R$ 42,00 | Sem vínculo | “Pix informado · 12:45” |
| Pagamento divergente | pagamento | R$ 58,00 para venda de R$ 60,00 | Divergente | “Diferença de R$ 2,00. Revise antes de vincular.” |
| Produto com estoque baixo | produto | 3 unidades | Revisar | “Café 500 g · estoque baixo” |
| Rascunho interno | rascunho de nota | R$ 84,00 | Rascunho | “Rascunho RN-014 · precisa de revisão” |
| Pré-nota para contador | pré-nota | R$ 42,00 | Pronto | “Pré-nota PN-008 pronta para o contador” |
| Item arquivado | despesa | R$ 25,00 | Arquivado | “Despesa interna · arquivada com histórico” |

Anexos fake não comprovam pagamento nem emissão fiscal.

## Estados e mensagens no protótipo

| Estado | Mensagem demonstrada |
|---|---|
| Rascunho | “Continue preenchendo quando puder.” |
| Revisar | “Confira os dados antes de continuar.” |
| Sem vínculo | “Esse pagamento ainda está sem vínculo.” |
| Vinculado | “Pagamento vinculado à Venda #104.” |
| Divergente | “Os valores são diferentes. Revise antes de confirmar.” |
| Pronto | “Esse card está pronto para a próxima ação.” |
| Arquivado | “Esse item foi arquivado, mas não apagado.” |
| Convertido em venda | “A venda foi criada e a comanda original foi mantida.” |
| Convertido em pré-nota | “A pré-nota interna foi criada com a origem preservada.” |
| Enviado ao contador | “Exportação registrada no histórico do contador.” |
| Pronto para emitir futuramente | “Dados preparados. Nenhuma nota fiscal foi emitida.” |
| Ignorado com justificativa | “Sugestão ignorada: valores não correspondem.” |

“Emitido”, “rejeitado” e “cancelado” não são estados do MVP e não aparecem como status de card no protótipo.

## Botões principais

- **Novo card:** inicia registro manual.
- **Capturar:** abre foto ou anexo.
- **Criar venda:** cria venda preservando a origem quando houver conversão.
- **Registrar pagamento:** cria pagamento manual interno.
- **Vincular:** abre comparação e confirmação do vínculo.
- **Desvincular:** solicita confirmação e preserva histórico.
- **Revisar:** abre dados e anexos para conferência.
- **Marcar pronto:** confirma conclusão da revisão interna.
- **Arquivar:** retira da visão principal sem apagar.
- **Desarquivar:** restaura o último estado ativo válido.
- **Criar pré-nota:** cria preparação interna com confirmação.
- **Exportar para contador:** revisa conteúdo e confirma exportação.
- **Ver histórico:** abre eventos, responsáveis e motivos.
- **Desfazer:** reverte a ação recente quando permitido.

## Confirmações

| Ação | Título | Texto | Botões |
|---|---|---|---|
| Arquivar | “Arquivar este card?” | “Ele sairá da Central, mas não será apagado. Você poderá desarquivar depois.” | “Voltar” / “Arquivar” |
| Desvincular | “Desvincular pagamento?” | “A venda e o pagamento voltarão a aparecer sem vínculo. O histórico será mantido.” | “Voltar” / “Desvincular” |
| Converter em venda | “Criar venda a partir desta comanda?” | “A venda será criada e a comanda original continuará no histórico.” | “Voltar” / “Criar venda” |
| Criar pré-nota | “Criar pré-nota interna?” | “A venda será preservada. A pré-nota não é uma nota fiscal emitida.” | “Voltar” / “Criar pré-nota” |
| Exportar para contador | “Exportar este pacote?” | “Revise os itens selecionados. A exportação será registrada no histórico.” | “Voltar” / “Exportar” |
| Fechar caixa | “Fechar o caixa de hoje?” | “Confira totais e divergências. O fechamento ficará registrado no histórico.” | “Continuar revisando” / “Fechar caixa” |
| Baixa de estoque | “Confirmar baixa de estoque?” | “As quantidades dos produtos desta venda serão atualizadas e registradas no histórico.” | “Voltar” / “Confirmar baixa” |

Após arquivar, vincular, desvincular ou converter, o protótipo mostra confirmação curta e o botão “Desfazer” quando a reversão for válida.

## O que o protótipo NÃO deve mostrar

- emissão fiscal real;
- botão “Emitir NF-e”;
- botão “Emitir NFC-e”;
- botão “Emitir NFS-e”;
- DANFE real;
- XML fiscal;
- SEFAZ;
- certificado A1;
- integração automática de maquininha;
- conciliação automática;
- IA tomando decisão sozinha;
- tela genérica de chat como centro do produto.

Referências a essas capacidades servem apenas para declarar que são futuras/pós-MVP/add-on futuro. O protótipo mostra somente controle interno, rascunho, pré-nota, preparação de dados e contador.

## Critério de aprovação do protótipo

O protótipo está aprovado quando:

- alguém entende o fluxo em poucos minutos;
- o usuário consegue sair de papel/comanda para venda, pagamento, caixa, estoque, pré-nota e contador;
- tudo pode ser feito no mobile;
- desktop melhora a revisão, mas não é obrigatório;
- fiscal real está claramente ausente;
- nenhuma ação crítica acontece sem confirmação;
- arquivar não parece excluir.
