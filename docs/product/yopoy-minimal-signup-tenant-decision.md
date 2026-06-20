# Yopoy — decisão de tenant para cadastro mínimo

## Contexto

Este documento registra a decisão técnica e de produto da etapa 50.0-C. Ele viabiliza conceitualmente o cadastro pessoal mínimo definido em 50.0-A à luz das dependências encontradas em 50.0-B, sem implementar cadastro, autenticação, API, persistência ou onboarding.

O cadastro atual cria, em uma única operação, empresa, usuário owner, membership e sessão. O login e a restauração da sessão usam `companyId`, e o tenant participa do isolamento de dados e das políticas de RLS. Portanto, reduzir somente os campos visíveis do formulário não remove a necessidade técnica de um contexto de tenant no estado atual do produto.

## Por que ainda é necessário um tenant

O primeiro cadastro deve representar a pessoa, mas a primeira sessão precisa saber em qual espaço organizacional ela opera. No Yopoy atual, o tenant é necessário para:

- isolar os dados de uma conta dos dados de outras contas;
- estabelecer o contexto da sessão e das políticas de RLS;
- associar o usuário owner a um espaço inicial por meio da membership;
- manter a organização inicial da Central Visual dentro de um escopo consistente;
- evitar que dados sejam gravados em um escopo global, anônimo ou `guest`.

Essa necessidade técnica não autoriza tratar o tenant inicial como empresa fiscal. `companyId` deve ser entendido, nessa fase, como identificador interno do espaço organizacional, e não como prova de CNPJ, razão social, endereço, regime tributário ou habilitação fiscal.

## Opções avaliadas

### 1. Manter o contrato atual e preencher empresa fictícia automaticamente

Essa opção manteria `/api/auth/register-company` sem mudança e preencheria os campos empresariais obrigatórios com valores artificiais para satisfazer o payload atual.

**Vantagem aparente:** menor alteração imediata no backend e no contrato de autenticação.

**Problemas:** cria informações falsas em campos com significado empresarial ou fiscal; torna difícil distinguir dado confirmado de placeholder; pode contaminar telas, sincronização, auditoria e onboarding posterior; e preserva um contrato incompatível com a decisão de produto.

**Decisão:** rejeitada. É explicitamente proibido preencher CNPJ, endereço, regime tributário, razão social ou outros dados empresariais fictícios no front-end. Também não se deve esconder esse preenchimento em outro adaptador apenas para contornar a validação existente.

### 2. Criar tenant provisório interno sem valor fiscal

Essa opção cria a conta pessoal mínima e, na mesma operação controlada, cria um espaço organizacional interno, associa o usuário como owner e inicia a sessão. O tenant recebe identidade técnica própria, mas permanece marcado conceitualmente como provisório e não confirmado até o onboarding empresarial.

**Vantagens:** preserva isolamento, sessão, membership e RLS; leva o usuário diretamente à Central Visual; não exige declaração empresarial ou fiscal antecipada; e mantém uma transição clara para o onboarding posterior.

**Custos e riscos:** exige evolução explícita do contrato de auth e do backend; requer distinguir tenant provisório de empresa confirmada; e demanda testes para impedir uso fiscal e vazamento de placeholders em superfícies empresariais.

**Decisão:** recomendada para o MVP.

### 3. Criar cadastro pessoal isolado e empresa depois

Essa opção cria primeiro apenas o usuário, sem tenant ou membership, e cria a empresa somente quando o onboarding for concluído.

**Vantagem:** separação conceitual mais estrita entre pessoa e organização.

**Problemas:** exige um novo estado autenticado sem `companyId`, revisão das premissas de sessão e RLS, definição de escopo para os dados criados antes da empresa e tratamento de associação ou escolha posterior de tenant. É uma mudança arquitetural maior e aumenta o risco de dados sem isolamento adequado.

**Decisão:** não escolhida para o MVP. Pode ser reavaliada no futuro se o produto precisar suportar usuários sem organização, convite para múltiplas empresas ou seleção explícita de tenant.

### 4. Manter o cadastro atual por enquanto

Essa opção evita mudança técnica imediata e conserva o wizard com empresa, CNPJ, endereço, regime tributário, plano e pagamento simulado.

**Vantagem:** nenhum impacto imediato nos contratos existentes.

**Problemas:** mantém o atrito já diagnosticado, mistura pessoa e empresa, posterga a chegada à Central Visual e contraria a decisão de produto do cadastro mínimo.

**Decisão:** aceitável apenas como estado transitório até uma implementação autorizada. Não é a direção do MVP.

## Decisão recomendada para o MVP

O Yopoy deve:

1. criar a conta pessoal com nome, e-mail, senha, confirmação de senha e aceite de termos quando esse requisito existir;
2. criar, na mesma operação de cadastro, um tenant provisório interno e não fiscal;
3. associar a pessoa como owner desse tenant e criar uma sessão válida;
4. levar a pessoa diretamente à Central Visual;
5. solicitar os dados reais da empresa depois, por onboarding progressivo e contextual.

A operação deve continuar atômica quanto aos elementos necessários para uma sessão válida: conta, tenant provisório, membership e sessão não devem ficar parcialmente criados. Os detalhes físicos dessa atomicidade e do estado do tenant serão definidos na etapa de implementação autorizada.

## Princípios do tenant provisório

O tenant provisório:

- não é uma empresa fiscal;
- não exige CNPJ;
- não pode emitir nota ou habilitar qualquer operação fiscal;
- não representa razão social, endereço, regime tributário ou outros dados empresariais confirmados;
- serve somente para isolamento de dados, contexto de sessão, RLS, membership e organização inicial;
- deve ser identificável internamente como provisório ou não confirmado, sem depender de conteúdo fictício em campos empresariais;
- deve poder receber dados empresariais reais posteriormente, por uma transição explícita e testável;
- não deve aparecer ao usuário como empresa regularizada, validada ou pronta para emissão.

Se o modelo atual não possuir uma representação segura para esse estado sem migration, a implementação deve parar e propor a menor evolução de persistência necessária em etapa própria. Não se deve simular o estado com CNPJ, endereço ou regime inventado.

## Impacto técnico esperado para implementação futura

### Front-end de cadastro

- reduzir o primeiro cadastro aos dados pessoais essenciais aprovados;
- remover empresa, CNPJ, endereço, regime tributário, plano e pagamento do caminho bloqueante;
- apresentar a política real de senha de forma coerente;
- encaminhar o sucesso diretamente à Central Visual;
- não gerar placeholders empresariais no navegador.

### Payload e contrato de auth

- criar ou evoluir explicitamente um contrato de cadastro pessoal mínimo;
- preservar paths, mensagens HTTP, status codes e contratos não autorizados até haver escopo nominal para alterá-los;
- definir uma resposta que forneça o contexto interno necessário sem expor dados empresariais inexistentes como confirmados.

### Backend de autenticação

- validar somente os campos pessoais previstos no novo cadastro;
- criar conta, tenant provisório, owner membership e sessão de forma consistente;
- preservar política de senha, cookie HttpOnly, auditoria e controles de segurança;
- impedir que o tenant provisório adquira capacidade fiscal por padrão.

Alterações em `src/backend/auth` exigem autorização explícita em uma etapa futura.

### Criação do tenant provisório

- gerar `companyId`/tenant ID interno sem derivá-lo de CNPJ;
- registrar de maneira inequívoca que os dados empresariais ainda não foram confirmados;
- evitar valores com aparência fiscal ou cadastral real;
- definir a transição posterior para empresa preenchida sem recriar silenciosamente o tenant nem perder os dados iniciais.

### `sessionStorage` e `localStorage`

- manter o contexto técnico necessário para restaurar a sessão, sem exigir que o usuário conheça o UUID;
- revisar a ponte entre `sessionStorage.yopoy_company_id`, `biz_current_user` e as chaves empresariais legadas;
- impedir escopo `guest`, mistura entre contas e gravação de CNPJ ou configurações empresariais fictícias;
- preservar o comportamento existente até que alterações específicas sejam autorizadas e cobertas por testes.

### Login sem UUID visível

- permitir que a pessoa informe credenciais humanas, como e-mail e senha, sem digitar `companyId`;
- resolver o tenant internamente quando houver somente um contexto válido;
- definir futuramente uma seleção segura quando a mesma pessoa puder pertencer a mais de um tenant;
- manter o UUID como identificador técnico interno, não como credencial que o usuário precisa memorizar.

### Testes

- provar que o cadastro mínimo cria conta, tenant provisório, membership e sessão válidos;
- falhar se CNPJ, endereço, regime tributário, plano ou pagamento voltarem a ser obrigatórios no primeiro cadastro;
- provar que nenhum dado empresarial ou fiscal fictício é criado;
- cobrir isolamento entre tenants, contexto de RLS e restauração da sessão;
- provar que tenant provisório não pode emitir nota nem aparentar habilitação fiscal;
- preservar login, logout, recuperação e mensagens/contratos existentes que não forem explicitamente alterados;
- cobrir a chegada direta à Central Visual e evitar mistura de dados locais entre usuários.

## Corte mínimo proposto para a etapa 50.0-D

A futura 50.0-D pode implementar, com allowlist e autorizações explícitas para cada camada necessária:

1. um contrato de cadastro pessoal mínimo com nome, e-mail, senha e confirmação de senha;
2. a criação atômica do tenant provisório interno, usuário owner, membership e sessão;
3. o formulário inicial reduzido, sem etapas bloqueantes de empresa, plano ou pagamento;
4. a chegada direta à Central Visual após sucesso;
5. login sem UUID visível para o caso mínimo suportado;
6. adaptação mínima do estado local e de sessão para preservar isolamento e restauração;
7. testes focados no novo fluxo, nas regressões dos campos removidos e no bloqueio fiscal.

A 50.0-D deve ser dividida em responsabilidades pequenas se a mudança atravessar contrato, backend e front-end. Antes de implementá-la, deve confirmar se o modelo atual consegue representar o tenant provisório sem migration. Caso não consiga, a mudança de banco deve ser planejada e autorizada separadamente.

## Fora de escopo

Continuam fora desta decisão e do corte mínimo proposto:

- onboarding completo da empresa;
- emissão fiscal real ou qualquer autorização fiscal;
- integração com SEFAZ;
- certificado A1;
- NF-e, NFC-e e NFS-e operacionais;
- cobrança real, gateway, Pix ou movimentação financeira real;
- configuração definitiva de planos;
- refatoração ampla de `App.tsx`;
- limpeza completa do legado Elparrar;
- refatoração ampla de autenticação ou `server.ts`;
- implementação de contador ou compartilhamento automático;
- criação de API, migration ou alteração de banco nesta etapa.

## Critérios para considerar a decisão preservada

- o primeiro cadastro representa a pessoa e não exige dados empresariais ou fiscais;
- todo usuário que entra na Central Visual possui contexto de tenant isolado e sessão válida;
- o tenant inicial é tratado como provisório, interno e não fiscal;
- nenhum campo empresarial é preenchido com valor fictício para satisfazer contrato legado;
- `companyId` permanece interno e não precisa ser digitado no login;
- completar a empresa é uma ação posterior, explícita e contextual;
- fiscal real permanece bloqueado e fora do MVP.

## Resultado da etapa 50.0-C

A decisão é adotar, para o MVP, cadastro pessoal mínimo com criação simultânea de tenant provisório interno não fiscal. Essa solução preserva isolamento, sessão, membership e RLS sem transformar placeholders em dados empresariais. A implementação fica reservada à futura 50.0-D, condicionada a allowlist explícita, testes e confirmação do suporte do modelo de persistência ao estado provisório.
