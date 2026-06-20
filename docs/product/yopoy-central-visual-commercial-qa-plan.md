# Yopoy — plano de QA visual e validação comercial da Central Visual

## Etapa e finalidade

Este documento define a etapa **51.0-A — plano de QA visual e validação comercial da Central Visual**. A etapa é exclusivamente documental: organiza testes manuais e entrevistas para avaliar a proposta de valor atual, sem implementar tela, persistência, backend, automação ou capacidade fiscal.

O QA deve validar se:

- a Central Visual é compreendida como o coração do Yopoy;
- empresas físicas entendem a proposta de uma mesa de organização para o trabalho diário;
- o fluxo manual faz sentido antes de backend e persistência avançada;
- a pré-nota visual é entendida como preparação interna, sem ser confundida com emissão fiscal real.

O fluxo de produto observado permanece: **registrar primeiro, organizar depois, conciliar quando possível, enviar ao contador se quiser e emitir nota somente no futuro, quando existir fiscal real e o usuário confirmar**.

## Público-alvo dos testes

Priorizar pessoas responsáveis pela operação diária de:

- pequenos comércios;
- restaurantes e lanchonetes;
- lojas físicas;
- prestadores de serviços locais;
- negócios que hoje trabalham com papel, WhatsApp, planilha ou sistema simples;
- negócios cujos usuários têm baixa paciência para ERP tradicional.

Registrar o ramo, o papel da pessoa no negócio, o método atual de organização e seu nível de familiaridade com ERP. A amostra inicial deve variar esses perfis para evitar validar a linguagem somente com usuários já acostumados a sistemas de gestão.

## Preparação e condução

- Usar o estado atual da Central Visual, com dados fictícios e ações locais/mockadas.
- Priorizar sessão individual em celular; desktop pode ser observado como comparação.
- Pedir que a pessoa pense em voz alta e evitar explicar a interface antes da leitura inicial.
- Não apresentar ações mockadas como persistidas, automatizadas ou integradas a sistemas externos.
- Não induzir respostas nem corrigir a interpretação durante a primeira tentativa.
- Separar observação de uso, perguntas de compreensão e conversa comercial.
- Registrar falhas de ambiente separadamente de problemas visuais ou de proposta de valor.

## Roteiro de QA visual

Para cada passo, registrar o que a pessoa disse, tentou tocar primeiro, concluiu sem ajuda e somente concluiu após explicação.

1. Abrir a Central Visual e observar a leitura inicial da tela sem explicação do produto.
2. Perguntar o que a pessoa acredita que a tela faz e qual seria seu próximo passo.
3. Verificar se entende que cada card é um item organizável, com tipo, estado, contexto e ação possível.
4. Pedir que explique, com suas palavras, as seções **Atenção agora**, **Capturas**, **Pagamentos sem vínculo**, **Vendas sem pagamento**, **Em revisão**, **Prontos** e **Pré-notas/contador**.
5. Verificar se diferencia captura, venda e pagamento e se entende por que venda e pagamento podem estar sem vínculo.
6. Pedir que execute as ações locais/mockadas disponíveis e observar se suas consequências visuais são previsíveis.
7. Pedir que arquive um card e depois o restaure, confirmando se arquivar é percebido como organização reversível, não exclusão.
8. Pedir que crie uma pré-nota visual a partir de um item elegível.
9. Perguntar o que foi criado e confirmar se a pessoa entende que nada na experiência representa emissão, autorização, transmissão ou cancelamento fiscal real.
10. Perguntar se enviaria o resumo ou pacote preparado ao contador e em qual situação.
11. Repetir o fluxo essencial em viewport mobile, observando legibilidade, ordem de leitura, alvos de toque, rolagem, ações essenciais e compreensão do próximo passo.

Durante o roteiro, observar especialmente se dados fictícios e ações mockadas são reconhecidos como demonstração e se o usuário mantém contexto ao agir, arquivar, restaurar ou preparar a pré-nota.

## Roteiro de validação comercial

### Apresentação em 30 segundos

> O Yopoy é uma mesa visual mobile-first para empresas físicas. Tudo o que acontece no dia pode entrar primeiro como um card — uma venda, pagamento, foto de comanda ou pendência — e ser organizado depois. Você concilia quando possível e prepara um resumo para o contador se quiser. A pré-nota é apenas organização interna; emissão fiscal real não faz parte desta versão.

### Conversa após a demonstração

1. Mostrar a Central Visual sem percorrer todos os recursos.
2. Perguntar se a mesa resolveria alguma dor real do negócio e pedir um exemplo recente.
3. Perguntar quais cards o negócio usaria primeiro.
4. Perguntar se “registrar primeiro, organizar depois” faz sentido na rotina e em que momento seria usado.
5. Perguntar se a pessoa pagaria pela solução após testá-la.
6. Perguntar qual preço mensal pareceria justo e o que precisaria estar incluído nesse preço.
7. Perguntar o que falta para adotar a Central no dia a dia.
8. Registrar intenção concreta: sem interesse, curiosidade, aceitaria testar, participaria de piloto ou pagaria.

Não tratar concordância genérica como validação. Solicitar exemplos da rotina, alternativas atuais, frequência da dor e motivo para trocar ou manter o método existente.

## Perguntas de entrevista

- O que você entendeu que essa tela faz?
- Qual parte parece mais útil?
- Qual parte ficou confusa?
- O que você registraria primeiro nessa mesa?
- Você entende que a pré-nota não é nota fiscal?
- Você mandaria esse resumo para o contador?
- O que te faria abandonar essa tela?
- Você usaria no celular durante o trabalho?
- Isso parece mais simples ou mais complicado que seu jeito atual?
- Você pagaria quanto por mês?

Perguntas de aprofundamento podem buscar exemplos e motivos, mas não devem ensinar a resposta esperada.

## Critérios de sucesso

Avaliar cada critério por participante como **atendido**, **parcial**, **não atendido** ou **não observado**:

- entende a Central sem explicação longa;
- entende card como item organizável;
- percebe valor em registrar antes e organizar depois;
- não confunde pré-nota com emissão fiscal;
- entende que a solução pode ser útil mesmo sem fiscal real;
- enxerga uso da Central no celular durante o trabalho;
- consegue citar pelo menos dois casos de uso reais do próprio negócio;
- demonstra intenção concreta de testar ou pagar.

A etapa de testes iniciais terá sinal positivo quando esses resultados aparecerem de forma recorrente em perfis diferentes, sustentados por comportamento observado e exemplos reais, não apenas por respostas de cortesia. A quantidade mínima da amostra e qualquer meta percentual deverão ser definidas antes da execução da 51.0-B, conforme a capacidade do piloto, sem alterar estes critérios qualitativos.

## Sinais de falha

- a pessoa entende a tela apenas como dashboard genérico;
- procura emissão fiscal antes de entender a mesa de organização;
- não entende o que são cards;
- não diferencia pagamento, venda e captura;
- considera a tela poluída;
- não vê motivo para substituir ou complementar WhatsApp e planilha;
- confunde pré-nota com nota fiscal;
- não entende qual é o próximo passo.

Também deve ser registrado como falha de comunicação qualquer momento em que uma ação local/mockada seja percebida como persistência, automação ou operação externa real.

## Evidências a coletar

Para cada participante, coletar:

- frases reais, preservando as palavras usadas pela pessoa;
- dúvidas recorrentes;
- primeiras ações ou áreas que tentou clicar;
- cards que considerou úteis;
- cards que considerou inúteis;
- pontos de confusão;
- preço mensal sugerido e condições associadas;
- ramo e contexto do negócio;
- nível de familiaridade com ERP;
- dispositivo e largura de viewport usados;
- conclusão de cada critério de sucesso e sinal de falha observado;
- intenção declarada de testar ou pagar, acompanhada do motivo.

### Registro mínimo por sessão

| Campo | Registro |
|---|---|
| Participante e papel | Identificador não sensível e função no negócio |
| Negócio | Ramo, porte aproximado e método atual de organização |
| Familiaridade com ERP | Baixa, média ou alta, com breve contexto |
| Ambiente | Dispositivo e viewport |
| Leitura inicial | O que entendeu sem explicação |
| Primeira ação | Onde tentou tocar e por quê |
| Casos de uso citados | Exemplos reais do negócio |
| Cards úteis/inúteis | Tipos e justificativas |
| Confusões | Termos, seções, ações e limite fiscal |
| Pré-nota | Entendeu ou confundiu com nota fiscal |
| Uso e preço | Intenção de teste/pagamento e preço sugerido |
| Resultado | Critérios atendidos e falhas observadas |

Ao consolidar sessões, agrupar padrões sem apagar frases divergentes. Dados pessoais desnecessários não devem ser registrados.

## Regras anti-refatoração

Este QA não autoriza:

- mexer em autenticação;
- mexer em cadastro;
- mexer em backend;
- mexer em banco;
- mexer em migration;
- mexer em RLS;
- reabrir tenant provisório;
- trazer fiscal real para o MVP;
- transformar feedback isolado em refatoração imediata.

Todo feedback deve virar item de backlog priorizado por recorrência, impacto na compreensão, impacto comercial e risco. Qualquer correção futura exige etapa própria, responsabilidade única e allowlist explícita.

## Saída esperada da etapa 51.0-A

- plano de QA visual e validação comercial documentado;
- roteiro de entrevistas definido;
- critérios de sucesso e sinais de falha definidos;
- evidências a coletar e formato mínimo de registro definidos;
- próxima etapa sugerida: **51.0-B — execução/registro dos primeiros testes manuais da Central Visual**.

Nenhuma implementação, mudança funcional ou decisão de fiscal real faz parte desta entrega.
