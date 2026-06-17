# Relatório de Segurança e Implementação - Módulo 48.2-J-D

**Módulo:** Backend HTTP Handlers Admin Users  
**Base:** cf70d53 — Checkpoint - Admin users use cases approved

## Escopo

Este módulo cria somente a camada HTTP pura para futuras rotas administrativas de usuários.

Não registra rotas no `server.ts`.  
Não cria `UnitOfWork`.  
Não importa `pg`.  
Não usa `Pool`.  
Não usa `set_config`.  
Não altera RLS.  
Não altera migrations.  
Não cria frontend.

## Arquivos criados

- `src/backend/auth/AdminUsersHttpHandlers.ts`
- `src/backend/auth/registerAdminUsersRoutes.ts`
- `src/backend/auth/tests/admin-users-http-handlers.test.ts`
- `docs/security/report-48.2-J-D.md`

## Arquitetura

O `AdminUsersHttpHandlers` recebe uma interface injetada chamada `AdminUsersOperations`.

A interface é responsável por:

- validar sessão;
- listar usuários;
- atualizar status;
- atualizar permissões;
- atualizar role;
- resetar senha por hash já fornecido.

O handler HTTP não conhece banco de dados, transação, repositório ou infraestrutura PostgreSQL.

## Segurança de sessão e tenant

O handler lê o token apenas através de `AuthCookieService.getSessionToken(req)`.

O `companyId` é aceito apenas via header `x-yopoy-company-id`.

O handler não usa:

- `req.query.companyId`;
- `req.body.companyId`;
- `Authorization Bearer`;
- `document.cookie`;
- `localStorage`.

Após validação da sessão, o handler compara o tenant autenticado com o tenant informado no header.

Se houver divergência entre o tenant do header e o tenant da sessão autenticada, o handler retorna `403`.

## Sanitização de resposta

Mesmo que a operação injetada retorne campos sensíveis por erro, o handler remove explicitamente:

- `passwordHash`;
- `sessionTokenHash`;
- `rawSessionToken`.

O endpoint de reset de senha não retorna:

- senha;
- `newPasswordHash`;
- hash;
- token.

## Permissões

O endpoint de permissões aceita somente permissões administrativas aprovadas:

- `admin:users:view`;
- `admin:users:manage`;
- `admin:users:create`;
- `admin:users:update`;
- `admin:users:permissions:update`;
- `admin:users:password:reset`;
- `admin:audit:view`.

## Reset de senha

O endpoint `POST /users/:userId/password-reset` ainda é preparatório.

Ele recebe `newPasswordHash` já pronto e não importa `bcrypt`.  
Ele não gera senha temporária.  
Ele não envia e-mail.  
Ele não retorna senha.

## Testes

Arquivo criado:

- `src/backend/auth/tests/admin-users-http-handlers.test.ts`

Cobertura:

- 401 sem cookie;
- 403 por divergência tenant/sessão;
- listagem segura;
- ausência de `passwordHash`, `sessionTokenHash` e `rawSessionToken`;
- validação de `active`;
- validação de permissões;
- validação de role;
- reset de senha sem retorno sensível;
- 403 por permissão negada;
- 404 para usuário/vínculo inexistente;
- 500 genérico para erro inesperado.
