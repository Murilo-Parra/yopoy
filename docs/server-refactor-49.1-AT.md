# Etapa 49.1-AT — checkpoint final e encerramento da sequência 49.1

## Commit-base

`16ede20 fix(admin): make commission payment atomic`

## Estado final da sequência

- As etapas 49.1-B até 49.1-AT estão concluídas.
- A etapa 49.1-AT é exclusivamente documental e não altera código de produção, testes, rotas, contratos ou `server.ts`.
- A sequência técnica 49.1 está encerrada.

## Rotas e módulos extraídos ou estabilizados

Durante a sequência 49.1, foram extraídas ou estabilizadas, de forma incremental, as seguintes áreas:

- factory reset;
- Gemini/IA;
- company audit logs;
- static PDF routes;
- fiscal discovery;
- fiscal validation;
- fiscal document query;
- signed fiscal document query;
- SEFAZ query routes;
- NF-e query routes;
- NF-e download route;
- NFS-e query route;
- admin system monitoring;
- sync routes;
- NFC-e query routes;
- SEFAZ event observation routes;
- admin affiliate query;
- admin support query;
- admin commission query;
- admin audit log query;
- admin affiliate mutation;
- admin custom provider query;
- custom provider mapping query;
- custom provider template query;
- custom provider mutation;
- custom provider mapping mutation;
- custom provider template mutation;
- custom provider update route.

## Rotas críticas que permanecem inline e protegidas

As rotas abaixo permanecem inline em `server.ts` por decisão explícita de escopo:

- `DELETE /api/admin/custom-providers/:id`;
- `POST /api/admin/support/:id/reply`;
- `POST /api/admin/commissions/:id/pay`.

Elas não serão extraídas agora. Os contratos e guards existentes são suficientes para o momento, incluindo os testes de contrato das mutações admin restantes, o teste comportamental da comissão e os guards de segurança e wiring. A atomicidade da comissão foi corrigida na etapa 49.1-AS.

Qualquer extração futura dessas rotas deve pertencer a uma nova fase, justificada por objetivo real de produto ou segurança, e não pela continuidade automática desta refatoração.

## Baixa interna de comissão

A rota `POST /api/admin/commissions/:id/pay` representa uma baixa interna/contábil. Ela não movimenta dinheiro real e não usa Pix, gateway, cartão, boleto ou banco externo.

Na etapa 49.1-AS, o caminho PostgreSQL passou a usar client dedicado, `BEGIN`, `COMMIT`, `ROLLBACK` e `release()` no `finally`. A rota trata comissão inexistente, comissão já paga e afiliado inexistente, além de validar `rowCount`. Esses controles tornam atômicas as alterações internas de comissão e saldo do afiliado, sem transformar a operação em pagamento financeiro externo.

## Proteções existentes

O estado final é protegido pelos testes de contrato e comportamento das rotas admin críticas, pelo guard das mutações admin restantes, pelos testes das rotas e registradores extraídos ao longo da sequência, pela suíte de autenticação e pelo typecheck do projeto. Esses testes devem continuar falhando se os contratos protegidos, o wiring ou a atomicidade da comissão regredirem.

## Validações recomendadas

- `npm run typecheck`;
- testes admin principais, especialmente contrato, comportamento e segurança da baixa de comissão;
- `npx vitest run src/backend/auth/tests`;
- `git diff --check`;
- `git status --short`.

## Decisão de encerramento

A sequência 49.1 está encerrada. Não abrir novas etapas 49.1 para diagnóstico, guard ou extração, salvo risco real de segurança ou quebra de produção.

## Ponte para produto

O próximo bloco de trabalho é produto/front-end e deve estabelecer:

- o documento oficial Yopoy V1;
- o modelo de cards e estados;
- a Central Visual Inteligente/Mesa de Organização;
- uma experiência mobile-first;
- captura por foto;
- organização manual antes de automação;
- conciliação visual;
- pré-nota e envio ao contador somente quando o usuário quiser;
- fluxo fiscal apenas com confirmação do usuário.

A direção de produto permanece: registrar primeiro, organizar depois, conciliar quando possível, enviar ao contador se o usuário quiser e emitir nota somente quando o usuário quiser ou precisar. Tudo que entra no sistema deve poder assumir a forma de um card inteligente, como comanda, pagamento, venda, despesa, pré-nota, pendência ou arquivado.

## Regra de produto

A próxima etapa deve aproximar o Yopoy da comercialização e da Central Visual Inteligente. Se uma tarefa não aproxima o produto desse destino, ela deve ser cortada ou adiada.
