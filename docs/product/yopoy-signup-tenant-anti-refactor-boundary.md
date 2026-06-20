# Yopoy — limite anti-refatoração para cadastro mínimo e tenant provisório

## Contexto e finalidade

Este documento registra a etapa 50.0-E e estabelece o limite de segurança para qualquer trabalho futuro sobre cadastro mínimo e tenant provisório. Os diagnósticos 50.0-A a 50.0-D foram úteis para confirmar a direção de produto e revelar dependências reais, mas a sequência entrou em uma zona de risco de refatoração estrutural.

O tema deixou de envolver somente a experiência de cadastro e passou a alcançar autenticação, `server.ts`, `modules/auth`, `src/backend/auth`, `db.ts`, schema local, migrations, RLS, sessão, `localStorage`, `sessionStorage`, login e o legado Elparrar. A existência dessas dependências não autoriza resolvê-las dentro de uma implementação pequena de UX.

Este limite não escolhe uma fonte canônica, não implementa o cadastro e não planeja DDL. Seu objetivo é impedir que a melhoria de entrada desloque o foco comercial do MVP ou abra uma refatoração ampla sem checkpoint próprio.

## Regra de produto

O coração comercial do Yopoy V1/MVP continua sendo a Central Visual Inteligente / Mesa de Organização. O cadastro mínimo é uma melhoria de entrada para reduzir atrito; ele não é o coração do produto e não deve interromper a validação da Central Visual.

Nenhuma refatoração grande de autenticação ou banco pode começar como consequência implícita do cadastro mínimo. Qualquer mudança desse porte exige checkpoint separado, allowlist própria, responsabilidade única e objetivo comercial claro. Enquanto isso não existir, o fluxo atual pode permanecer como estado transitório, sem placeholders novos e sem ser tratado como a direção final do produto.

## A) Decisão aprovada

- o cadastro inicial deve ser mínimo e representar primeiro a pessoa usuária;
- os dados empresariais devem ser solicitados depois, por onboarding progressivo e contextual;
- a direção conceitual para o MVP é um tenant provisório interno, técnico e não fiscal;
- CNPJ, endereço, regime tributário, razão social ou outros dados empresariais não podem ser inventados para satisfazer contratos existentes;
- fiscal real, incluindo emissão e integrações fiscais, permanece fora do MVP.

Essas decisões são conceituais. Elas não autorizam alteração de contrato, schema, autenticação, sessão, login, RLS ou persistência.

## B) Permitido agora

- documentação;
- diagnóstico somente de leitura;
- planejamento;
- definição de corte mínimo;
- pequenos ajustes futuros, desde que tenham allowlist explícita e não ampliem o escopo estrutural;
- QA visual da Central Visual;
- melhorias de UX que não alterem contrato, banco ou autenticação estrutural.

Cada etapa futura deve declarar previamente os arquivos permitidos, a responsabilidade única e os comportamentos que serão preservados.

## C) Proibido agora

- unificar os dois sistemas de autenticação;
- refatorar `server.ts`;
- trocar a fonte canônica de persistência por implementação;
- criar migration real ou arquivo SQL de execução;
- alterar RLS;
- alterar `db.ts`;
- alterar contratos de autenticação, incluindo paths, payloads, mensagens HTTP e status codes;
- alterar login ou sessão;
- reescrever `App.tsx`;
- limpar o legado Elparrar em massa;
- criar tenant provisório com placeholders empresariais ou fiscais;
- implementar cadastro completo ou onboarding empresarial completo;
- criar capacidade fiscal real.

O fato de uma dessas mudanças parecer conveniente para concluir o cadastro não a torna parte do corte mínimo.

## Sinais de alerta e regra de interrupção

Qualquer etapa futura deve ser interrompida e devolvida a um checkpoint separado quando surgir um destes sinais:

- alteração em mais de uma camada estrutural ao mesmo tempo;
- mudança simultânea em front-end, autenticação e banco;
- necessidade de migration não prevista e não autorizada;
- necessidade de alterar `server.ts`;
- necessidade de escolher entre `modules/auth` e `src/backend/auth` durante uma implementação pequena;
- tentativa de corrigir todos os caminhos e legados de uma vez;
- criação de placeholders empresariais para satisfazer validações ou fazer testes passarem;
- mudança que exija revalidar integralmente login, sessão e RLS.

Ao aparecer um sinal, a etapa não deve ampliar sua allowlist. Deve parar sem solução parcial estrutural, registrar a dependência e propor um trabalho isolado com objetivo próprio.

## Corte mínimo seguro antes de qualquer implementação

Antes de implementar o cadastro mínimo real, deve existir uma etapa separada exclusivamente para escolher a fonte canônica de autenticação e persistência entre os caminhos diagnosticados.

Essa escolha deve ser feita por consolidação documental ou, se evidência executável for indispensável, por um spike técnico isolado. O spike deve ser reversível, ter allowlist própria e produzir evidência para a decisão, sem:

- alterar a produção funcional;
- criar migration;
- mudar o fluxo do usuário;
- iniciar a unificação dos sistemas de auth;
- antecipar a implementação do tenant provisório.

Somente depois dessa decisão será possível dimensionar um corte técnico coerente. A implementação posterior ainda deverá ser dividida por responsabilidade e autorizada separadamente.

## Por que o planejamento de migration mínima foi adiado

A proposta anterior de seguir diretamente para o planejamento de uma migration mínima fica adiada. Uma migration já pressupõe que a fonte canônica de persistência está decidida, mas o diagnóstico 50.0-D encontrou dois caminhos de autenticação e persistência com contratos, IDs, sessões, memberships e schemas divergentes.

Planejar DDL, nulabilidade, backfill e rollback antes de escolher o caminho canônico pode consolidar o modelo errado e transformar uma melhoria de cadastro em refatoração estrutural de auth, banco, sessão e RLS. Primeiro deve ser tomada a decisão de fonte canônica; somente depois, em checkpoint próprio e se ainda necessária, uma migration poderá ser planejada.

## Próxima etapa recomendada

A próxima etapa recomendada para continuar o tema é **50.0-F — consolidação documental da fonte canônica de auth/persistência**, sem implementação funcional, migration ou mudança no fluxo do usuário.

Se o objetivo imediato for avançar o produto sem tocar em infraestrutura, a alternativa preferencial é retornar ao QA e à validação visual da Central Visual. Essa alternativa preserva o foco comercial do MVP enquanto a decisão estrutural permanece isolada.

## Critérios de preservação deste limite

Este limite permanece respeitado quando:

- a Central Visual continua sendo a prioridade do V1/MVP;
- cadastro mínimo permanece uma melhoria de entrada, não um programa de refatoração;
- nenhuma escolha canônica é feita incidentalmente por código;
- nenhuma migration é criada antes da consolidação da fonte canônica;
- nenhum placeholder empresarial ou fiscal é introduzido;
- mudanças estruturais futuras recebem checkpoint, objetivo comercial e allowlist próprios;
- fiscal real continua fora do MVP.

## Resultado da etapa 50.0-E

A direção conceitual do cadastro mínimo e do tenant provisório está preservada, mas sua implementação estrutural está freada. O próximo avanço seguro é decidir documentalmente a fonte canônica de autenticação e persistência ou voltar ao QA da Central Visual. O planejamento de migration mínima permanece adiado até essa decisão.
