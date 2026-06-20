# Yopoy — matriz função x plano

## Objetivo

Esta matriz define quais funções pertencem a cada plano e fixa o limite de escopo do MVP. Ela separa o que deve existir para validar e vender o Yopoy V1, o que é bloqueado por plano e o que só pode ser oferecido no futuro, evitando construção precoce e promessa comercial sem entrega.

## Planos oficiais

- **Grátis — Começar**;
- **Básico — Controle**;
- **Intermediário — Gestão Física**;
- **Premium — Gestão Pro**.

“Fiscal Pro” não é nome de plano principal do V1. Fiscal real é futuro, pós-MVP e poderá ser um add-on futuro somente depois de desenvolvimento, homologação, validação e confirmação explícita de disponibilidade.

## Princípios comerciais

- Grátis demonstra valor, mas não substitui uma operação completa;
- Básico substitui caderno e planilha;
- Intermediário organiza empresa física com mais rotina, equipe e estoque;
- Premium monetiza gestão avançada, automações futuras, IA contextual e recursos operacionais avançados;
- fiscal real não deve ser obrigatório para começar;
- emissão fiscal real fica fora do MVP;
- o V1 pode ter rascunho de nota, pré-nota e contador;
- automação não deve vir antes do fluxo manual;
- integração com maquininha não deve vir antes do vínculo manual;
- IA avançada não deve vir antes da Central Visual manual.

## Matriz

As marcações representam disponibilidade de produto, não cronograma garantido. `MVP` identifica o escopo mínimo comum da primeira versão; as colunas dos planos definem acesso e evolução comercial.

| Função | Categoria | MVP | Grátis | Básico | Intermediário | Premium | Observação |
|---|---|---|---|---|---|---|---|
| Central Visual Inteligente | Central Visual | Sim | Limitado | Sim | Sim | Sim | Coração mobile-first do produto; limite do Grátis por volume. |
| criação manual de cards | Central Visual | Sim | Limitado | Sim | Sim | Sim | O fluxo manual vem antes de automações. |
| editar cards | Central Visual | Sim | Limitado | Sim | Sim | Sim | Preserva histórico mínimo. |
| arquivar/desarquivar | Central Visual | Sim | Sim | Sim | Sim | Sim | Arquivar nunca apaga. |
| histórico de card | Central Visual | Sim | Limitado | Sim | Sim | Sim | Profundidade maior nos planos superiores. |
| filtros básicos | Central Visual | Sim | Limitado | Sim | Sim | Sim | Busca e filtros essenciais. |
| colunas/visão desktop | Central Visual | Não | Limitado | Limitado | Sim | Sim | Complementa a experiência mobile. |
| ações em lote | Central Visual | Não | Não | Não | Sim | Sim | Recurso de operação com maior volume. |
| drag-and-drop desktop | Central Visual | Não | Não | Limitado | Sim | Sim | Nunca é a única forma de agir. |
| alternativa por botões no mobile | Central Visual | Sim | Sim | Sim | Sim | Sim | Obrigatória para ações essenciais. |
| anexar foto | Captura | Sim | Limitado | Sim | Sim | Sim | Anexo ou origem de rascunho. |
| foto de comanda | Captura | Sim | Limitado | Sim | Sim | Sim | Não cria registro definitivo automaticamente. |
| foto de comprovante | Captura | Sim | Limitado | Sim | Sim | Sim | Pode apoiar vínculo manual. |
| OCR/escrita à mão | Captura | Não | Não | Limitado | Sim | Sim | Resultado sempre revisável. |
| rascunho editável | Captura | Sim | Limitado | Sim | Sim | Sim | Usuário confirma antes de converter. |
| revisão de confiança | Captura | Não | Não | Limitado | Sim | Sim | Confiança orienta, não autoriza ação crítica. |
| extração automática avançada | Captura | Pós-MVP | Futuro | Futuro | Futuro | Futuro | Depende da validação do fluxo manual. |
| venda simples | Vendas e caixa | Sim | Limitado | Sim | Sim | Sim | Registro operacional interno. |
| pagamento manual | Vendas e caixa | Sim | Limitado | Sim | Sim | Sim | Não movimenta dinheiro. |
| vínculo manual venda/pagamento | Vendas e caixa | Sim | Limitado | Sim | Sim | Sim | Conciliação sob controle humano. |
| desvincular pagamento | Vendas e caixa | Sim | Limitado | Sim | Sim | Sim | Mantém rastreabilidade. |
| divergência de pagamento | Vendas e caixa | Sim | Limitado | Sim | Sim | Sim | Exibe diferença sem ajuste autônomo. |
| caixa diário | Vendas e caixa | Sim | Limitado | Sim | Sim | Sim | Rotina central do Básico. |
| abertura de caixa | Vendas e caixa | Sim | Não | Sim | Sim | Sim | Fluxo operacional pago. |
| fechamento de caixa | Vendas e caixa | Sim | Não | Sim | Sim | Sim | Inclui confirmação e resumo. |
| sangria/suprimento | Vendas e caixa | Não | Não | Limitado | Sim | Sim | Registro interno auditável. |
| relatório do dia | Vendas e caixa | Sim | Limitado | Sim | Sim | Sim | Sem substituir relatório fiscal. |
| cadastro de produto | Estoque | Sim | Limitado | Sim | Sim | Sim | Limite de itens no Grátis. |
| categorias | Estoque | Não | Limitado | Sim | Sim | Sim | Organização simples do catálogo. |
| fornecedores | Estoque | Não | Não | Limitado | Sim | Sim | Gestão ampliada no Intermediário. |
| estoque básico | Estoque | Sim | Limitado | Sim | Sim | Sim | Quantidade simples e histórico. |
| entrada de estoque | Estoque | Sim | Limitado | Sim | Sim | Sim | Movimento manual auditável. |
| saída de estoque | Estoque | Sim | Limitado | Sim | Sim | Sim | Movimento manual auditável. |
| baixa por venda | Estoque | Sim | Não | Sim | Sim | Sim | Regra explícita e rastreável. |
| inventário mobile | Estoque | Não | Não | Limitado | Sim | Sim | Contagem operacional guiada. |
| código de barras | Estoque | Não | Não | Limitado | Sim | Sim | Depende de validação de uso. |
| estoque mínimo | Estoque | Não | Não | Limitado | Sim | Sim | Alerta, não compra automática. |
| lote/validade | Estoque | Pós-MVP | Futuro | Futuro | Futuro | Futuro | Fora do MVP. |
| precificação avançada | Estoque | Pós-MVP | Futuro | Futuro | Futuro | Sim | Recurso avançado após validação. |
| sugestão de compra | Estoque | Pós-MVP | Futuro | Futuro | Futuro | Com confirmação | Nunca gera compra automaticamente. |
| rascunho de nota interno | Pré-nota e contador | Sim | Limitado | Sim | Sim | Sim | Não é nota fiscal emitida. |
| pré-nota simples | Pré-nota e contador | Sim | Não | Limitado | Sim | Sim | Documento interno preparatório. |
| transformar venda em pré-nota | Pré-nota e contador | Sim | Não | Limitado | Sim | Sim | Conversão preserva origem e histórico. |
| pasta do contador | Pré-nota e contador | Não | Não | Limitado | Sim | Sim | Organização interna, sem envio automático. |
| exportação para contador | Pré-nota e contador | Sim | Não | Limitado | Sim | Sim | Exportação simples no MVP. |
| envio ao contador com confirmação | Pré-nota e contador | Não | Não | Não | Com confirmação | Com confirmação | Nunca automático. |
| histórico de envio | Pré-nota e contador | Não | Não | Não | Sim | Sim | Registra responsável e momento. |
| acesso do contador | Pré-nota e contador | Pós-MVP | Futuro | Futuro | Futuro | Futuro | Exportação vem antes do acesso dedicado. |
| status interno: sem nota / rascunho / pré-nota / enviar ou enviado ao contador / pronto para emitir futuramente | Pré-nota e contador | Sim | Limitado | Sim | Sim | Sim | Estados internos não comprovam emissão fiscal. |
| preparação fiscal | Fiscal futuro | Sim | Limitado | Sim | Sim | Sim | No MVP, significa apenas dados internos organizados para capacidade futura. |
| NF-e real | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Não disponível nem prometida no MVP. |
| NFC-e real | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Não disponível nem prometida no MVP. |
| NFS-e real | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Não disponível nem prometida no MVP. |
| XML fiscal real | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Só existe com documento fiscal real. |
| DANFE/PDF fiscal real | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Pré-nota não deve usar aparência de DANFE fiscal. |
| certificado A1 operacional | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Sem operação em produção no MVP. |
| consulta SEFAZ | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Depende de integração fiscal futura. |
| cancelamento fiscal | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Nunca automático. |
| ambiente homologação fiscal | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Não antecipa disponibilidade comercial. |
| produção fiscal | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Exige homologação e decisão posterior. |
| rejeições fiscais explicadas | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Só faz sentido com integração real validada. |
| emissão fiscal real | Fiscal futuro | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Sempre exige confirmação humana quando existir. |
| card de pagamento manual | Pagamentos e conciliação | Sim | Limitado | Sim | Sim | Sim | Registro interno, sem transação financeira. |
| pagamento sem vínculo | Pagamentos e conciliação | Sim | Limitado | Sim | Sim | Sim | Permanece como pendência visível. |
| venda sem pagamento | Pagamentos e conciliação | Sim | Limitado | Sim | Sim | Sim | Permanece como pendência visível. |
| sugestão manual de vínculo | Pagamentos e conciliação | Não | Não | Limitado | Sim | Sim | Usuário decide aplicar. |
| conciliação visual manual | Pagamentos e conciliação | Sim | Limitado | Sim | Sim | Sim | Base antes de qualquer integração. |
| importação de transações | Pagamentos e conciliação | Pós-MVP | Futuro | Futuro | Futuro | Futuro | Formato e fonte ainda serão validados. |
| integração automática com adquirente/maquininha | Pagamentos e conciliação | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Só após vínculo manual validado. |
| Pix/comprovante como anexo | Pagamentos e conciliação | Sim | Limitado | Sim | Sim | Sim | Anexo não confirma liquidação. |
| taxa da maquininha | Pagamentos e conciliação | Não | Não | Limitado | Sim | Sim | Registro e conferência manuais. |
| liquidação bancária | Pagamentos e conciliação | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Não movimenta dinheiro pelo Yopoy. |
| conciliação automática | Pagamentos e conciliação | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Requer integração e validação posteriores. |
| alertas fixos | IA contextual | Não | Limitado | Sim | Sim | Sim | Regras simples antes de IA avançada. |
| sugestões básicas | IA contextual | Não | Não | Limitado | Sim | Sim | Sempre identificadas como sugestão. |
| sugestão de vínculo | IA contextual | Pós-MVP | Futuro | Futuro | Limitado | Sim | Exige confirmação humana. |
| classificação de card | IA contextual | Pós-MVP | Futuro | Futuro | Limitado | Sim | Resultado revisável. |
| explicação de divergência | IA contextual | Pós-MVP | Futuro | Futuro | Limitado | Sim | Não ajusta dados sozinha. |
| ajuda de estoque | IA contextual | Pós-MVP | Futuro | Futuro | Futuro | Com confirmação | Não altera estoque definitivamente. |
| ajuda de caixa | IA contextual | Pós-MVP | Futuro | Futuro | Futuro | Com confirmação | Não fecha nem ajusta caixa sozinha. |
| ajuda de pré-nota | IA contextual | Pós-MVP | Futuro | Futuro | Futuro | Com confirmação | Não envia ao contador sozinha. |
| ajuda fiscal real | IA contextual | Pós-MVP | Futuro | Futuro | Futuro | Add-on futuro | Depende de fiscal real futuro. |
| IA avançada contextual | IA contextual | Pós-MVP | Futuro | Futuro | Futuro | Futuro | Só após Central manual validada. |
| chat genérico | IA contextual | Não | Não | Não | Não | Não | Não faz parte da proposta central. |
| cadastro/login | Admin/SaaS | Sim | Sim | Sim | Sim | Sim | Entrada básica do SaaS. |
| empresa/tenant | Admin/SaaS | Sim | Sim | Sim | Sim | Sim | Isolamento por empresa é obrigatório. |
| usuários | Admin/SaaS | Sim | Limitado | Limitado | Sim | Sim | Quantidade limitada por plano. |
| permissões | Admin/SaaS | Não | Não | Limitado | Sim | Sim | Complexidade cresce com equipe. |
| planos | Admin/SaaS | Sim | Sim | Sim | Sim | Sim | Bloqueios precisam ser claros. |
| suporte | Admin/SaaS | Sim | Limitado | Sim | Sim | Sim | Nível de atendimento pode variar. |
| chamados | Admin/SaaS | Não | Não | Limitado | Sim | Sim | Operação estruturada nos pagos. |
| afiliados | Admin/SaaS | Não | Não | Não | Não | Limitado | Função interna/comercial, não promessa central. |
| comissões internas | Admin/SaaS | Não | Não | Não | Não | Limitado | Registro interno; não movimenta dinheiro. |
| baixa interna de comissão | Admin/SaaS | Não | Não | Não | Não | Limitado | Baixa contábil interna, não pagamento externo. |
| logs de auditoria | Admin/SaaS | Sim | Limitado | Sim | Sim | Sim | Auditoria mínima no MVP; retenção varia. |
| monitoramento | Admin/SaaS | Sim | Não | Não | Não | Sim | Operação interna do SaaS, não função do cliente. |
| factory reset protegido | Admin/SaaS | Não | Não | Não | Não | Limitado | Recurso administrativo excepcional e protegido. |
| página Home | Site/comercial | Sim | Sim | Sim | Sim | Sim | Comunica apenas funções disponíveis ou marcadas futuras. |
| página Planos | Site/comercial | Sim | Sim | Sim | Sim | Sim | Usa os quatro nomes oficiais. |
| página Funcionalidades | Site/comercial | Sim | Sim | Sim | Sim | Sim | Distingue MVP, futuro e add-on futuro. |
| página Estoque | Site/comercial | Não | Sim | Sim | Sim | Sim | Conteúdo alinhado ao estoque disponível. |
| página Controle interno/contador | Site/comercial | Sim | Sim | Sim | Sim | Sim | Não apresenta pré-nota como nota emitida. |
| página Fiscal futuro | Site/comercial | Não | Sim | Sim | Sim | Sim | Deve declarar indisponibilidade no MVP. |
| cadastro público | Site/comercial | Sim | Sim | Sim | Sim | Sim | Entrada para teste ou contratação disponível. |
| login | Site/comercial | Sim | Sim | Sim | Sim | Sim | Acesso à aplicação. |
| termos | Site/comercial | Sim | Sim | Sim | Sim | Sim | Obrigatório antes da abertura comercial. |
| privacidade | Site/comercial | Sim | Sim | Sim | Sim | Sim | Obrigatório antes da abertura comercial. |
| contato/piloto | Site/comercial | Sim | Sim | Sim | Sim | Sim | Canal para validação controlada. |

## Grátis — Começar

- **Finalidade:** demonstrar a organização por cards e permitir uma operação pequena de teste.
- **Cliente ideal:** microempresa ou responsável que ainda precisa comprovar valor antes de pagar.
- **Função que vende o plano:** Central Visual manual com venda e pagamento simples.
- **Limite para evitar abuso:** cotas reduzidas de cards, histórico, produtos, usuários, anexos e período de retenção, definidas após validação comercial.
- **Motivo para upgrade:** operar continuamente, ampliar volume, caixa, estoque, exportações e equipe.

## Básico — Controle

- **Finalidade:** substituir caderno e planilha no controle diário.
- **Cliente ideal:** pequena empresa física com uma operação simples e recorrente.
- **Função que vende o plano:** venda, pagamento, vínculo manual, caixa diário e estoque básico em um único fluxo.
- **Limite para evitar abuso:** limites comerciais de usuários, volume, armazenamento e exportações; sem recursos avançados de equipe, lote ou automação.
- **Motivo para upgrade:** maior rotina operacional, equipe, inventário, pré-nota completa e pasta do contador.

## Intermediário — Gestão Física

- **Finalidade:** organizar uma empresa física com maior volume, rotina, equipe e estoque.
- **Cliente ideal:** comércio, restaurante ou prestador que precisa acompanhar operação e contador com rastreabilidade.
- **Função que vende o plano:** gestão física integrada, conciliação visual manual, inventário, pré-nota e pasta do contador.
- **Limite para evitar abuso:** faixas de usuários, cards, anexos, histórico e exportações; sem integração automática, IA avançada ou fiscal real.
- **Motivo para upgrade:** gestão avançada, maior capacidade, recursos operacionais premium e automações futuras confirmadas.

## Premium — Gestão Pro

- **Finalidade:** monetizar gestão avançada, maior escala operacional e capacidades futuras de automação e IA contextual.
- **Cliente ideal:** empresa física com equipe, volume e necessidade de controles mais sofisticados.
- **Função que vende o plano:** gestão avançada com maior capacidade, explicações e assistência contextual quando disponíveis.
- **Limite para evitar abuso:** política de uso justo, limites contratados de usuários, processamento, anexos e integrações; add-ons são contratados separadamente.
- **Motivo para upgrade:** contratação futura de capacidades especializadas disponíveis, inclusive add-ons homologados; fiscal real não integra o MVP nem é garantido pelo plano.

## MVP obrigatório

- Central Visual manual;
- criação, edição e arquivamento de cards;
- foto como anexo ou rascunho;
- venda simples;
- pagamento manual;
- vínculo manual;
- caixa diário;
- produtos e estoque básico;
- rascunho de nota interno;
- pré-nota simples;
- exportação simples para contador;
- admin básico;
- auditoria mínima.

## Fora do MVP

- emissão real de NF-e;
- emissão real de NFC-e;
- emissão real de NFS-e;
- cancelamento fiscal real;
- ativação SEFAZ real;
- certificado A1 operacional em produção;
- integração automática com maquininha;
- conciliação automática;
- IA avançada;
- lote/validade;
- app nativo;
- cobrança automática;
- automações premium.

## Regras de bloqueio

- não mostrar recurso bloqueado como erro técnico;
- mostrar recurso bloqueado como upgrade claro;
- não prometer função futura como disponível;
- não bloquear fluxo essencial do plano contratado;
- toda ação fiscal real fica indisponível no MVP;
- rascunho e pré-nota não devem ser apresentados como nota fiscal emitida;
- toda ação de IA crítica exige confirmação humana;
- arquivar nunca apaga.

## Critério de aprovação da matriz

A matriz está aprovada quando:

- toda função tem plano;
- toda função tem status MVP ou pós-MVP;
- não existe função solta sem dono;
- não existe promessa comercial sem fase;
- o MVP continua pequeno e vendável;
- emissão fiscal real está claramente fora do MVP.
