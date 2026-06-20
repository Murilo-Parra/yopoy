# Yopoy — consolidação de planejamento pós-limite anti-refatoração

## Finalidade

Este documento registra a etapa 50.0-F, encerra por enquanto a linha de planejamento de cadastro mínimo e tenant provisório e redireciona o avanço imediato do produto para a Central Visual Inteligente / Mesa de Organização.

A consolidação preserva as decisões das etapas 50.0-A a 50.0-E sem escolher fonte canônica de autenticação ou persistência, sem implementar cadastro e sem iniciar refatoração estrutural. O objetivo é manter disponível a direção conceitual já construída e impedir que ela bloqueie a validação da proposta de valor do Yopoy V1/MVP.

## Decisões consolidadas das etapas 50.0-A a 50.0-E

- o cadastro mínimo é desejável para reduzir o atrito de entrada e levar a pessoa mais rapidamente ao valor do produto;
- o onboarding progressivo é a direção de produto: dados pessoais essenciais entram primeiro e dados empresariais são solicitados depois, de forma contextual;
- o tenant provisório interno, técnico e não fiscal é a direção conceitual para preservar isolamento, sessão, membership e RLS sem antecipar uma empresa confirmada;
- CNPJ, endereço, regime tributário, razão social ou qualquer dado empresarial ou fiscal fictício não podem ser usados para satisfazer contratos, schemas ou testes existentes;
- o modelo atual não suporta o tenant provisório com segurança sem uma decisão estrutural sobre a fonte canônica de autenticação e persistência;
- a migration mínima foi adiada porque não se deve criar ou planejar DDL sobre uma fonte de persistência ainda não escolhida;
- autenticação, banco, RLS, `server.ts`, sessão e estados locais ficaram fora do escopo imediato;
- a Central Visual volta a ser a prioridade de produto e de validação comercial.

Essas decisões preservam a direção futura do cadastro mínimo, mas não autorizam implementação. O fluxo existente permanece transitório até que o tema seja retomado por uma etapa própria.

## Trilho A — produto imediato

O trabalho imediato deve concentrar-se no valor demonstrável da Central Visual:

- QA visual da Central Visual;
- melhoria da clareza da mesa e da leitura das prioridades;
- estados vazios compreensíveis e orientados à primeira ação;
- validação do fluxo manual de criação, organização, edição e arquivamento de cards;
- pré-nota visual claramente tratada como preparação sem valor fiscal;
- pacote organizado para contador, sempre sob decisão explícita do usuário;
- entrada no produto e percepção rápida de valor;
- ajustes mobile-first de compreensão, hierarquia e interação;
- documentação comercial e roteiro de validação com empresas físicas brasileiras.

Esse trilho pode produzir documentação, QA, evidência de uso e pequenos cortes futuros com allowlist explícita. Ele não autoriza nesta etapa mudanças na Central Visual nem amplia automaticamente o escopo técnico de uma etapa posterior.

## Trilho B — infraestrutura congelada

Ficam congelados até novo checkpoint:

- cadastro mínimo real;
- persistência do tenant provisório;
- escolha da autenticação canônica;
- escolha da persistência canônica;
- criação ou planejamento de migration;
- login sem UUID visível;
- limpeza do legado Elparrar;
- unificação dos sistemas de autenticação;
- qualquer alteração em RLS, sessão, `localStorage` ou `sessionStorage`.

O congelamento significa que esses itens não podem ser incluídos incidentalmente em etapas de UX, QA, Central Visual, pré-nota ou validação comercial.

## Regra de retomada do Trilho B

O tema cadastro/tenant somente poderá voltar quando houver uma etapa própria para escolher a fonte canônica de autenticação e persistência. Essa etapa deve ter objetivo único, allowlist nominal e critérios de decisão explícitos.

A escolha deve ocorrer por consolidação documental ou, se for necessária evidência executável, por spike técnico isolado e reversível. O spike não pode se transformar em implementação ampla, alterar produção funcional, criar migration ou mudar o fluxo do usuário.

Somente depois da escolha canônica poderá ser avaliado se uma migration ainda é necessária e qual é o menor corte seguro. Auth, banco, RLS, sessão e front-end não devem ser alterados simultaneamente sob o rótulo de cadastro mínimo.

## Restrições para as próximas etapas

Nas próximas etapas, não se deve:

- criar migration ou arquivo SQL;
- alterar autenticação;
- alterar `server.ts`;
- alterar `db.ts` ou banco;
- alterar contratos de login ou cadastro;
- reescrever `App.tsx`;
- limpar o legado Elparrar em massa;
- criar capacidade ou emissão fiscal real;
- criar placeholders empresariais ou fiscais;
- desviar o foco da Central Visual.

Qualquer demanda que dependa de um desses itens deve parar e ser registrada como dependência do Trilho B, sem ampliar a etapa em andamento.

## Por que não seguir agora para migration ou auth

Uma migration para tenant provisório exige saber qual schema e qual caminho de persistência são canônicos. Da mesma forma, alterar auth exige escolher entre fluxos atualmente divergentes e decidir contratos, sessão, membership e contexto de tenant. Essa escolha é estrutural e não deve ser tomada como detalhe de uma melhoria de entrada.

O MVP precisa primeiro validar se a Mesa de Organização é compreendida, utilizada e percebida como valiosa por empresas físicas brasileiras. O cadastro mínimo pode permanecer planejado sem impedir essa validação. Avançar agora em migration ou auth inverteria a prioridade: consumiria esforço na entrada antes de comprovar o coração comercial do produto.

## Próxima etapa recomendada

**51.0-A — Plano de QA visual e validação comercial da Central Visual.**

Essa etapa deve definir cenários, público, roteiro, critérios de observação e evidências para validar:

- compreensão imediata da mesa;
- criação e organização manual de cards;
- clareza dos estados vazios e próximos passos;
- uso mobile-first;
- entendimento de pré-nota como preparação sem valor fiscal;
- percepção de valor para organização diária e preparação de material para contador.

A etapa deve começar documental e orientada a evidências. Qualquer ajuste funcional posterior exige allowlist própria e não pode reabrir o Trilho B.

## Critérios de encerramento da linha 50.0-A a 50.0-F

A linha fica encerrada por enquanto quando:

- cadastro mínimo e onboarding progressivo permanecem registrados como direção futura;
- tenant provisório permanece uma decisão conceitual, não uma implementação improvisada;
- migration e escolha canônica permanecem adiadas;
- auth, banco, RLS, sessão e legado não são alterados;
- nenhum dado empresarial ou fiscal fictício é criado;
- o próximo avanço recomendado mede a qualidade visual e o valor comercial da Central Visual.

## Resultado da etapa 50.0-F

O planejamento de cadastro mínimo e tenant provisório está consolidado e congelado no ponto seguro alcançado pela 50.0-E. A retomada depende de checkpoint estrutural próprio, documental ou spike isolado. Até lá, o avanço recomendado retorna à Central Visual, com QA visual e validação comercial como prioridade.
