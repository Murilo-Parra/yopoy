# Yopoy — diagnóstico do cadastro atual no front-end

## Escopo e método

Este documento registra a etapa 50.0-B. O trabalho foi somente de leitura do fluxo atual e comparação com o plano de cadastro mínimo e onboarding progressivo. Nenhum componente, autenticação, contrato HTTP, backend, banco, `server.ts`, `App.tsx`, `localStorage` ou comportamento foi alterado.

O diagnóstico distingue três camadas que hoje participam da entrada no produto:

1. a landing page legada, que reúne cadastro, login, recuperação de senha, planos e pagamento simulado;
2. a autenticação real, que cria empresa, usuário, membership e sessão no backend;
3. a compatibilidade local do `App.tsx`, que ainda deriva estado empresarial e dados simulados de `localStorage`.

## Arquivos e responsabilidades identificados

| Arquivo | Responsabilidade observada |
| --- | --- |
| `src/components/ElparrarLandingPage.tsx` | Componente principal da landing e dos modos `landing`, `login`, `register`, `forgot` e `reset`; concentra campos, navegação do wizard, validações, plano, pagamento simulado e submissões. |
| `src/frontend/auth/AuthContext.tsx` | Expõe `registerCompany`, `login`, `logout` e restauração de sessão; mantém estado autenticado e grava `yopoy_company_id` em `sessionStorage`. |
| `src/frontend/auth/authApiClient.ts` | Define os tipos dos payloads e chama `/api/auth/register-company`, `/api/auth/login`, `/api/auth/session` e `/api/auth/logout` com cookie de sessão. |
| `src/App.tsx` | Decide entre landing e ERP; reage ao estado real de autenticação, executa a ponte legada `onLoginSuccess` e grava usuário e configurações empresariais em `localStorage`. |
| `src/localStorageWrapper.ts` | Intercepta `localStorage`, cria escopo por usuário e sincroniza chaves com `/api/sync/save`; mantém algumas chaves globais fora do escopo. |
| `src/main.tsx` | Carrega dados de `/api/sync/load` antes de renderizar e monta `AuthProvider` ao redor do app. |
| `src/backend/auth/AuthRequestValidators.ts` | Confirma que o endpoint atual exige objeto completo de empresa, endereço, regime tributário e administrador. |
| `src/backend/auth/AuthHttpHandlers.ts` | Implementa login e cadastro, abre transação, cria sessão/cookie e traduz o payload HTTP para o caso de uso. |
| `src/application/auth/use-cases/RegisterCompanyUseCase.ts` | Cria empresa, usuário owner, membership e auditoria; aplica a política real de senha. |
| `src/application/auth/services/PasswordPolicy.ts` | Exige senha de 12 a 128 caracteres, com maiúscula, minúscula, número e símbolo, e rejeita senhas comuns. |
| `src/infrastructure/postgres/auth/PostgresCompanyAuthRepository.ts` | Persiste no cadastro atual somente identificação, nome e documento da empresa, além de estado e datas. |
| `src/backend/auth/registerAuthRoutes.ts` | Registra os paths de autenticação, incluindo `POST /register-company` e `POST /login` sob o roteador de auth. |

## Fluxo atual de cadastro

### Entrada

O cadastro pode ser aberto pelo botão **Cadastrar**, pelo link da tela de login ou pela seleção de um plano na landing. Escolher um plano na landing preenche `selectedPlanId`, mas o botão geral **Cadastrar** começa sem plano selecionado.

Todo o fluxo está dentro de `ElparrarLandingPage`. Não há rota de página separada para cadastro.

### Tela 1 — Dados cadastrais

A primeira tela mistura empresa e pessoa administradora.

**Empresa:**

- razão social — obrigatória;
- nome fantasia — opcional;
- CNPJ — obrigatório;
- e-mail principal da empresa — obrigatório;
- telefone de contato — opcional;
- regime tributário — apresentado como obrigatório e iniciado em `simples_nacional`;
- rua, número, cidade e UF — obrigatórios.

**Administrador principal:**

- nome completo — obrigatório;
- e-mail administrativo — obrigatório;
- senha — obrigatória;
- confirmação de senha — obrigatória.

O botão para avançar só é renderizado quando `isRobustStep1Valid` considera válidos razão social, CNPJ com 14 dígitos, e-mail da empresa contendo `@`, endereço, nome e e-mail do administrador, senha com ao menos 6 caracteres e confirmação igual. Nome fantasia, telefone e regime tributário não participam dessa expressão; o regime sempre tem um valor padrão.

### Tela 2 — Plano

O usuário precisa selecionar um dos três planos visíveis para que o botão de avanço apareça. Se entrou a partir de um card da landing, o plano já chega selecionado. O plano escolhido permanece apenas no estado React `selectedPlanId`; ele não integra o payload de cadastro nem a resposta da API.

### Tela 3 — Pagamento simulado e criação

A tela apresenta resumo comercial, exige abrir o formulário por **Confirmar Compra** e oferece cartão, Pix ou boleto simulados.

- cartão: número, nome, validade e CVV;
- Pix: checkbox que afirma pagamento simulado;
- boleto: checkbox que afirma quitação simulada.

`isPaymentValid` muda apenas a aparência do botão final. O atributo `disabled` considera somente `processingAuth`, e `handleCheckoutSubmit` não repete validação de pagamento. Portanto, apesar da aparência de bloqueio, a submissão pode ser acionada sem pagamento simulado válido.

Somente ao clicar no botão final o cadastro é enviado. Plano e dados de pagamento não são enviados nem persistidos pelo fluxo observado.

### Submissão ao servidor

Antes da chamada, `handleCheckoutSubmit` repete parte das validações da tela 1 e chama `registerCompany` com este formato conceitual:

```text
company: razão social, nome fantasia, CNPJ, e-mail, telefone,
         endereço { rua, número, cidade, UF }, regime tributário
admin:   nome completo, e-mail, senha, confirmação de senha
```

O cliente envia `POST /api/auth/register-company`, JSON e `credentials: include`. O backend atual valida todos esses grupos. Em caso de sucesso:

- gera um UUID de empresa;
- cria empresa, usuário owner e membership em transação;
- registra auditoria de `company_registered`;
- cria sessão e cookie HttpOnly `yopoy_session`;
- devolve empresa, usuário e sessão;
- o `AuthContext` grava o UUID em `sessionStorage.yopoy_company_id` e marca o usuário como autenticado.

O handler repassa ao caso de uso apenas razão social, CNPJ, nome do administrador, e-mail do administrador e senha. A persistência de empresa observada grava nome e documento. Nome fantasia é devolvido na resposta, mas não é repassado ao caso de uso; e-mail e telefone da empresa, endereço e regime tributário são exigidos/validados no contrato atual, porém não são persistidos por esse caminho. Essa diferença deve ser confirmada antes de qualquer promessa de onboarding retomável.

Após a criação, dois `setTimeout` exibem mensagens de preparação e chamam `onLoginSuccess`. A autenticação real já foi atualizada pelo `AuthContext`; os timers são uma ponte de compatibilidade visual.

## Fluxo atual de login e chegada à Central

O login exige:

- ID da empresa em formato UUID;
- e-mail;
- senha.

`handleLoginSubmit` chama `AuthContext.login`, que envia `POST /api/auth/login`, armazena novamente `yopoy_company_id` em `sessionStorage` e atualiza o estado autenticado. Em paralelo, `onLoginSuccess` grava um objeto reduzido em `biz_current_user` e configurações empresariais em `localStorage`.

`App.tsx` também observa o estado real do `AuthContext`. Quando autenticado, muda para `erp`, define a aba inicial como dashboard/Central Visual por meio do fluxo de sucesso e usa fallbacks para nome empresarial, plano e CNPJ. Assim, a entrada atual depende simultaneamente da sessão real e de uma ponte legada local com formas de usuário diferentes.

O login pede ao usuário um UUID técnico que foi gerado no cadastro, mas a tela de sucesso não apresenta de forma explícita um passo de retenção ou recuperação desse identificador. A restauração automática depende de `sessionStorage`, que não persiste como `localStorage` entre todos os cenários de nova sessão do navegador.

## Dados locais e remotos

### `sessionStorage`

- `yopoy_company_id`: gravado após cadastro e login; usado para restaurar a sessão via `/api/auth/session` e como contexto das demais chamadas autenticadas.

### `localStorage`

- `biz_registered_users`: a landing garante que exista como lista vazia, mas o cadastro real não adiciona o novo usuário nessa lista;
- `biz_current_user`: gravado por `App.handleLoginSuccess` com o objeto reduzido recebido da landing;
- `cfg_corporate_name`, `cfg_trade_name`, `cfg_cnpj`: derivados pelo callback legado; como o objeto moderno não tem `type` nem `isAdmin`, podem ser gravados como strings vazias no cadastro/login atual;
- demais dados simulados e preferências: lidos após a entrada e escopados pelo wrapper conforme `biz_current_user`.

O wrapper sincroniza várias gravações de `localStorage` com `/api/sync/save`, e `main.tsx` restaura dados com `/api/sync/load` antes de renderizar. `biz_current_user` não é sincronizado pelo wrapper; `biz_registered_users` é global e pode ser sincronizado, embora não seja a fonte do cadastro real atual.

### Servidor/banco

O cadastro real persiste empresa, usuário, membership, auditoria e sessão. O cookie de sessão é HttpOnly e não é armazenado diretamente pelo JavaScript. Plano e pagamento simulado não fazem parte da chamada. Parte dos dados empresariais obrigatórios no payload não chega à persistência usada pelo caso de uso atual.

## Validações e inconsistências

| Tema | Front-end | Backend/efeito | Risco |
| --- | --- | --- | --- |
| Senha | Avanço com mínimo de 6; indicador visual considera combinações simples. | Política exige mínimo de 12, maiúscula, minúscula, número e símbolo. | Cadastro parece válido e falha somente no envio, com mensagem genérica de política. |
| E-mail | Expressão de avanço usa apenas presença de `@`; inputs também têm validação HTML. | Regex exige formato com domínio e limita 150 caracteres. | Regras espalhadas e mensagens potencialmente diferentes. |
| CNPJ | Remove não dígitos e exige exatamente 14. | Também exige 14 dígitos e unicidade no banco. | Não há validação de dígitos verificadores no fluxo observado. |
| UF | Duas letras, convertidas para maiúsculas. | Exige string com comprimento 2. | Não confirma uma UF brasileira existente. |
| Pagamento | `isPaymentValid` altera classes. | Nenhuma chamada de pagamento e nenhum dado enviado. | Aparência de cobrança/ativação sem operação real; validação não bloqueia tecnicamente o clique. |
| Plano | Seleção necessária para exibir avanço. | Não enviado nem persistido no cadastro. | Bloqueio de UX sem efeito no tenant criado; `App` usa fallback `media`. |
| Empresa completa | Exigida antes de chegar ao produto. | Contrato valida tudo, mas o caso de uso persiste somente um subconjunto. | Coleta excessiva e falsa expectativa de dados salvos. |
| Termos | Não há campo de aceite no cadastro observado. | Não há dado correspondente no payload atual. | A decisão futura sobre consentimento precisa de produto/jurídico e contrato próprios. |

Há ainda estados legados não utilizados na interface atual: conjunto simplificado `reg*`, campos PF/PJ (`pf*`, `pj*` e `userType`), `isSimplifiedStep1Valid` e `signupSuccess`. Eles aumentam ruído e risco de editar o caminho errado, mas sua remoção não pertence a esta etapa.

## Classificação dos campos atuais

### Essenciais para o primeiro cadastro

De acordo com a decisão 50.0-A:

- nome da pessoa (`adminNomeCompleto`);
- e-mail da pessoa (`adminEmail`);
- senha (`adminSenha`), alinhada à política real;
- confirmação de senha (`adminConfirmarSenha`);
- aceite de termos somente quando os documentos e o requisito existirem.

Telefone pessoal não existe no formulário moderno. O telefone atual é rotulado e enviado como telefone da empresa; não deve ser reinterpretado silenciosamente como telefone pessoal.

### Devem ir para onboarding posterior

- razão social;
- nome fantasia/nome de exibição da empresa;
- CNPJ, quando aplicável;
- e-mail da empresa;
- telefone da empresa;
- rua, número, cidade e UF;
- seleção e configuração de plano, em fluxo comercial próprio e sem bloquear a primeira experiência quando essa for a decisão aprovada.

### Fiscais/empresa avançados que não devem bloquear a entrada

- regime tributário;
- qualquer dado futuro de contador;
- certificado A1, credenciais SEFAZ, séries, ambientes e parâmetros de NF-e/NFC-e/NFS-e, que não aparecem neste cadastro e devem continuar fora do MVP fiscal real.

### Campos ou conceitos potencialmente problemáticos

- ID da empresa UUID no login: identificador técnico e difícil de memorizar;
- CNPJ obrigatório: mistura identidade pessoal e tenant empresarial antes da ativação;
- e-mail duplicado de empresa e administrador: aumenta atrito e o primeiro não é persistido pelo caminho atual;
- regime tributário com valor padrão: pode registrar uma declaração fiscal não revisada, embora atualmente nem seja persistida pelo caso de uso;
- pagamento, cartão, Pix e boleto simulados: sugerem contratação e movimentação que não ocorrem;
- plano obrigatório sem persistência: bloqueio sem efeito técnico correspondente;
- textos como “emissão”, “faturamento”, “licenciar” e “PostgreSQL”: antecipam fiscal/cobrança ou expõem implementação na experiência;
- campos legados PF/PJ e `reg*`: não participam do formulário renderizado e podem induzir diagnóstico ou manutenção incorretos.

## Riscos técnicos para simplificação

### Acoplamento entre cadastro, login e chegada ao ERP

Cadastro e login chamam a autenticação real, mas também disparam `onLoginSuccess`. `App.tsx` toma decisões tanto a partir do `AuthContext` quanto de `biz_current_user`. Simplificar somente o JSX pode manter dados locais vazios ou divergentes, mesmo com sessão válida.

### Dependência estrutural de empresa e CNPJ

O contrato se chama `register-company`, exige `company` completo e cria empresa, owner e membership atomicamente. O tenant e `companyId` são necessários à sessão, ao RLS e ao login. Retirar empresa/CNPJ apenas do formulário quebra o payload atual; a implementação mínima precisa decidir como criar um tenant provisório ou como evoluir o contrato, com autorização explícita para auth/backend/API se necessário.

### Dependência de plano

O wizard obriga a passagem por plano, mas o backend não recebe essa escolha. O `App.tsx` usa `media` como fallback. Remover a etapa visual é pequeno, porém deve preservar o estado pós-login e evitar atribuir implicitamente um plano comercial incorreto.

### Dependência de armazenamento do navegador

`sessionStorage.yopoy_company_id` é necessário para restaurar sessão e enviar contexto. `localStorage.biz_current_user` determina o escopo de dados simulados e as chaves `cfg_*` alimentam a interface legada. Alterar a forma do usuário ou retirar CNPJ/nome empresarial exige fallbacks explícitos para não misturar escopo `guest`, dados de outra conta ou placeholders fiscais.

### Dependência de backend e persistência

O endpoint, validador e tipos do cliente exigem os dados que o produto quer adiar. O backend cria vários registros em uma transação e aplica RLS. Uma mudança só no front-end não entrega cadastro pessoal mínimo real. Além disso, não existe no fluxo analisado persistência de estado/progresso de onboarding para os dados adiados.

### Validações espalhadas

Há regras no estado calculado de avanço, no submit, nos atributos HTML, no cliente de API, no validador HTTP e na política do caso de uso. A divergência de senha já é concreta. A 50.0-C deve escolher uma apresentação coerente sem alterar mensagens ou contratos existentes sem autorização.

### Nomenclatura e conteúdo legado Elparrar

O nome `ElparrarLandingPage`, comentários, chave Pix mock (`elparrar_erp_mock_uuid...`) e referências em textos/estados ainda carregam nomenclatura e conceitos anteriores. O componente também combina landing comercial, autenticação, recuperação, planos e checkout, ampliando o impacto de qualquer edição.

## Proposta de etapa 50.0-C — implementação mínima

### Objetivo sugerido

Entregar o menor fluxo que permita informar nome, e-mail, senha e confirmação, criar uma sessão válida e chegar diretamente à Central Visual, sem exigir empresa detalhada, CNPJ, endereço, regime tributário, plano ou pagamento.

### Pré-condição técnica

Antes de editar a tela, aprovar uma decisão de contrato para o tenant inicial. O backend atual não aceita cadastro pessoal isolado. As opções devem ser avaliadas explicitamente, por exemplo:

- manter a criação atômica de um tenant provisório com nome interno não fiscal e completar a empresa depois; ou
- criar/evoluir um contrato de cadastro pessoal que associe a empresa em etapa posterior.

A escolha impacta autenticação, RLS, login, persistência e possivelmente banco. Portanto, a allowlist da 50.0-C deve autorizar nominalmente os arquivos necessários; não se deve contornar o contrato preenchendo CNPJ, endereço ou regime tributário fictícios no front-end.

### Corte mínimo proposto

1. alinhar front-end e política real de senha;
2. reduzir a primeira tela aos quatro campos pessoais aprovados;
3. retirar plano e pagamento do caminho bloqueante de criação;
4. preservar cookie, sessão, `companyId`, papel owner e entrada na Central Visual;
5. definir um único adaptador pós-login para evitar competição entre `AuthContext` e callback legado;
6. preservar contratos e mensagens existentes, salvo autorização explícita e testes correspondentes;
7. adicionar testes que falhem se CNPJ, endereço, regime, plano ou pagamento voltarem a bloquear o primeiro cadastro;
8. deixar onboarding empresarial somente como backlog ou indicador não bloqueante; não implementar fiscal real.

### Fora da 50.0-C mínima

- onboarding completo de empresa;
- cobrança real ou seleção definitiva de plano;
- contador;
- emissão fiscal, SEFAZ, certificado A1, NF-e, NFC-e ou NFS-e;
- limpeza ampla do componente legado;
- refatoração geral de `App.tsx`, `server.ts` ou autenticação sem escopo aprovado.

### Critérios de aceite sugeridos

- primeiro cadastro pede somente nome, e-mail, senha e confirmação;
- regras apresentadas de senha correspondem à política executada;
- ausência de CNPJ, endereço, regime, plano e pagamento não bloqueia entrada;
- cadastro cria sessão válida e abre a Central Visual;
- recarregar/restaurar sessão não perde o tenant nem mistura dados locais;
- nenhuma informação empresarial ou fiscal fictícia é criada para satisfazer o contrato;
- login e recuperação existentes permanecem com paths, mensagens e status preservados, salvo autorização específica;
- testes cobrem o fluxo mínimo e os bloqueios removidos.

## Conclusão

O cadastro atual não é apenas um formulário longo: ele está estruturalmente modelado como criação completa de empresa, owner e sessão, envolto por plano e pagamento simulados e conectado a uma segunda camada legada de estado local. A simplificação aprovada exige uma implementação pequena na experiência, mas uma decisão explícita sobre o contrato de criação do tenant. O principal controle para 50.0-C é não substituir dados reais adiados por placeholders empresariais ou fiscais e não tratar uma alteração somente visual como solução completa.
