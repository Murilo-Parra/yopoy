# Yopoy — plano de cadastro mínimo e onboarding progressivo

## Contexto e decisão de produto

O Yopoy V1/MVP é uma Central Visual Inteligente para empresas físicas brasileiras. Seu fluxo comercial oficial é: registrar primeiro, organizar depois, conciliar quando possível, enviar ao contador se o usuário quiser e emitir nota somente no futuro, quando existir capacidade fiscal real e houver confirmação explícita do usuário.

O cadastro inicial deve identificar e proteger a conta da pessoa sem exigir que ela modele toda a empresa antes de experimentar o produto. Informações empresariais, operacionais, contábeis e fiscais entram progressivamente, dentro da conta, quando forem necessárias para uma ação compreensível.

Este documento é exclusivamente um plano de produto. Ele não define implementação, contrato de API, persistência, regra de autenticação ou capacidade fiscal real.

## Objetivo do cadastro mínimo

Permitir que uma pessoa crie uma conta segura e entre rapidamente na Central Visual, com o menor conjunto de dados necessário para identificação, acesso e consentimento. A ativação inicial de valor deve acontecer antes do preenchimento detalhado da empresa.

O cadastro mínimo deve:

- reduzir abandono causado por formulários longos;
- separar claramente a identidade da pessoa da identidade da empresa;
- levar o usuário à Central Visual sem exigir configuração operacional prévia;
- preservar segurança mínima de acesso e consentimento;
- criar pontos claros para solicitar informações adicionais somente quando elas tiverem finalidade visível.

## Separação dos dados por momento

### Dados essenciais no primeiro cadastro

| Campo | Obrigatoriedade sugerida | Justificativa |
| --- | --- | --- |
| Nome | Obrigatório | Identifica a pessoa e permite uma experiência pessoal básica. |
| E-mail | Obrigatório | Identificador de acesso e canal para comunicações essenciais da conta. |
| Senha | Obrigatório | Protege o acesso à conta conforme a política de segurança que vier a ser definida. |
| Confirmação de senha | Obrigatório | Reduz erro de digitação no cadastro. |
| Aceite dos termos | Obrigatório quando os termos existirem | Registra consentimento no momento adequado, sem simular um aceite antes da existência dos documentos aplicáveis. |
| Telefone | Opcional | Só se justifica quando houver finalidade imediata e explicada, como recuperação de acesso ou suporte solicitado; não deve bloquear a entrada na Central Visual. |

O primeiro cadastro representa a pessoa usuária. Ele não deve ser apresentado como cadastro completo da empresa.

### Dados posteriores no onboarding

Após entrar na conta, o Yopoy pode solicitar progressivamente:

- **perfil pessoal:** nome preferido, telefone opcional e preferências úteis à experiência;
- **empresa:** nome de exibição, CNPJ quando aplicável, razão social, endereço e informações operacionais básicas;
- **operação:** produtos, organização inicial, caixa e demais configurações somente ao iniciar o fluxo correspondente;
- **contador:** nome, contato e preferências de compartilhamento, apenas se o usuário optar por configurar essa relação;
- **preparação fiscal futura:** dados cadastrais e classificações que possam ser revisados como preparação, sem habilitar emissão real.

Cada solicitação posterior deve informar por que o dado é necessário, como será usado e se pode ser preenchido depois.

### Dados fiscais bloqueados ou adiados no MVP

Ficam fora do cadastro inicial e sem uso operacional fiscal no MVP:

- regime tributário;
- certificado A1;
- credenciais, tokens ou configurações da SEFAZ;
- séries, ambientes, autorizações e demais dados fiscais avançados;
- parâmetros para emissão, cancelamento ou autorização de documentos fiscais reais;
- configurações operacionais de NF-e, NFC-e e NFS-e.

Caso dados preparatórios sejam futuramente coletados, devem permanecer claramente identificados como rascunho ou preparação. Seu preenchimento não pode sugerir homologação, disponibilidade de emissão ou conexão ativa com autoridade fiscal.

## Campos que não devem ser obrigatórios no primeiro cadastro

O acesso inicial à Central Visual não deve depender de:

- CNPJ;
- razão social;
- endereço completo;
- regime tributário;
- certificado A1;
- dados da SEFAZ;
- contador;
- dados fiscais avançados;
- plano ou configuração operacional completa.

Esses dados pertencem a contextos diferentes da criação da identidade pessoal. Exigi-los antes da primeira experiência mistura pessoa e empresa e posterga a percepção de valor do produto.

## Fluxo proposto de onboarding progressivo

### 1. Criar conta

A pessoa informa nome, e-mail, senha, confirmação de senha e, quando existir, aceita os termos. O telefone permanece opcional e condicionado a uma finalidade explícita.

**Resultado esperado:** conta pessoal criada com segurança mínima, sem exigir dados empresariais ou fiscais.

### 2. Entrar na Central Visual

Após o acesso, o usuário encontra a proposta principal do Yopoy e pode começar a registrar e organizar seu trabalho. Pendências de onboarding podem ser indicadas sem bloquear a exploração das capacidades que não dependam delas.

**Resultado esperado:** o valor central do produto aparece antes de um formulário empresarial longo.

### 3. Completar perfil pessoal

O produto solicita apenas informações pessoais úteis à experiência, em momento não intrusivo ou quando a função correspondente precisar delas. Dados já informados não devem ser pedidos novamente.

**Resultado esperado:** perfil pessoal compreensível e separado da empresa.

### 4. Completar empresa

O usuário informa dados empresariais em etapas curtas, começando pelos necessários ao contexto atual. CNPJ, razão social e endereço podem ser solicitados quando uma função empresarial realmente depender deles, com opção de continuar depois quando não houver bloqueio legítimo.

**Resultado esperado:** empresa configurada progressivamente, sem impedir a ativação inicial.

### 5. Configurar contador, se quiser

A configuração do contador é opt-in. O usuário decide se quer cadastrar contato e preparar compartilhamento ou exportação. Nenhum envio deve ocorrer automaticamente.

**Resultado esperado:** relação com o contador disponível como escolha, com controle explícito do usuário.

### 6. Preparar fiscal futuramente, sem emissão real

Quando o produto tiver uma etapa preparatória aprovada, poderá organizar dados revisáveis para uso futuro. Essa etapa deve permanecer bloqueada para emissão e declarar claramente que não emite, autoriza, cancela ou transmite documento fiscal.

**Resultado esperado:** preparação rastreável sem NF-e, NFC-e, NFS-e, SEFAZ ou certificado A1 operacional.

## Critérios de UX

- **Entrada rápida:** poucos campos, uma intenção por tela e caminho direto até a Central Visual.
- **Linguagem simples:** rótulos e explicações em português claro, sem vocabulário fiscal ou técnico antes de ser necessário.
- **Mobile-first:** campos, teclado, validações, mensagens e ações adequados a telas pequenas.
- **Sem formulário longo:** dividir complementos em etapas curtas, salváveis e retomáveis.
- **Sem bloqueio prematuro:** não travar o usuário antes da Central Visual por falta de dados empresariais, contábeis, fiscais ou operacionais que ainda não sejam necessários.
- **Necessidade contextual:** pedir cada dado no momento em que sua utilidade estiver clara.
- **Transparência:** distinguir campos obrigatórios, opcionais e adiáveis e explicar a finalidade de dados sensíveis.
- **Continuidade:** preservar o que já foi preenchido e mostrar progresso sem transformar o onboarding em obrigação extensa.
- **Separação conceitual:** deixar evidente quando o usuário está editando a própria conta, a empresa ou uma preparação futura.

## Riscos e controles de produto

| Risco | Controle planejado |
| --- | --- |
| Cadastro simples demais sem segurança mínima | Manter e-mail, senha, confirmação de senha e controles de segurança definidos pela autenticação; avaliar consentimento e recuperação de acesso sem ampliar o formulário empresarial. |
| Onboarding confuso | Exibir propósito, progresso, estado concluído e possibilidade de retomar; usar etapas curtas com uma responsabilidade clara. |
| Tentar puxar fiscal real cedo demais | Bloquear emissão e integrações fiscais no MVP; nomear qualquer coleta futura como preparação, sem promessa operacional. |
| Exigir CNPJ antes da ativação do valor | Permitir entrada na Central Visual e solicitar CNPJ apenas quando uma função realmente depender dele. |
| Misturar cadastro de pessoa com cadastro de empresa | Manter modelos mentais, telas e textos distintos para conta pessoal e empresa. |
| Coletar telefone sem finalidade | Torná-lo opcional e explicar seu uso antes da coleta. |
| Criar bloqueios progressivos excessivos | Definir bloqueio apenas quando houver dependência funcional ou obrigação legítima e informar a ação necessária. |

## Critérios de aceite deste planejamento

- o primeiro cadastro está limitado aos dados essenciais da pessoa;
- telefone está definido como opcional e condicionado a justificativa explícita;
- dados pessoais, empresariais, contábeis e fiscais estão separados por momento e finalidade;
- o usuário chega à Central Visual antes de completar o cadastro da empresa;
- CNPJ, razão social, endereço, contador e dados fiscais não bloqueiam o primeiro acesso;
- fiscal real permanece fora do MVP e nenhuma preparação implica emissão;
- o onboarding pode ser retomado e solicita dados conforme a necessidade;
- nenhuma decisão deste plano altera contratos técnicos existentes.

## Fora de escopo

- implementar ou alterar cadastro, autenticação, front-end, backend, API ou banco;
- definir contratos, status HTTP, paths, migrations ou modelo físico de dados;
- alterar a Central Visual;
- implementar integração com contador;
- emitir ou cancelar NF-e, NFC-e ou NFS-e;
- integrar SEFAZ ou operar certificado A1;
- definir detalhes finais de termos, privacidade ou políticas de segurança.

## Próxima etapa possível

**50.0-B — diagnóstico do cadastro atual no front-end:** mapear campos, passos, bloqueios, validações e dependências do fluxo existente; comparar o estado atual com este plano; e propor uma mudança pequena e segura. Essa etapa deve ser diagnóstica e respeitar autorização específica antes de qualquer alteração em componentes, autenticação, contratos ou backend.

