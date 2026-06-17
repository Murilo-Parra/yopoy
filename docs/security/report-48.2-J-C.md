# Relatório de Patch de Segurança: Módulo 48.2-J-C — Use Cases Admin Users

## Objetivo

Implementar os casos de uso administrativos para gerenciamento de usuários, mantendo a execução exclusivamente na camada `application/auth`, sem acoplamento com banco de dados, frameworks HTTP ou bibliotecas de hashing.

## Casos de uso criados

- `ListAdminUsersUseCase`
- `UpdateAdminUserStatusUseCase`
- `UpdateAdminUserPermissionsUseCase`
- `UpdateAdminUserRoleUseCase`
- `ResetAdminUserPasswordUseCase`

## Segurança aplicada

- Todos os fluxos usam `RequirePermissionUseCase`.
- Nenhum caso de uso importa infraestrutura.
- Nenhum caso de uso importa PostgreSQL.
- Nenhum caso de uso importa backend HTTP.
- Nenhum caso de uso importa `bcrypt`.
- Nenhum caso de uso importa `node:crypto`.
- Nenhum caso de uso retorna `passwordHash`, `sessionTokenHash` ou `rawSessionToken`.
- `ResetAdminUserPasswordUseCase` recebe `newPasswordHash` já pronto.
- Nenhuma senha temporária é gerada.
- Nenhum e-mail é enviado neste módulo.
- Nenhuma rota HTTP foi criada.
- Nenhum frontend foi alterado.
- Nenhuma migration foi criada.

## Permissões exigidas

- `admin:users:view`
- `admin:users:update`
- `admin:users:permissions:update`
- `admin:users:manage`
- `admin:users:password:reset`

## Testes

Arquivo criado:

- `src/application/auth/tests/admin-users-use-cases.test.ts`

Os testes validam:

- exigência de permissões administrativas;
- bloqueio de usuário sem permissão;
- listagem segura sem hashes/tokens;
- atualização de status com escopo de empresa;
- atualização de permissões por membership;
- atualização de role por membership;
- reset de senha sem senha em texto puro;
- bloqueio de reset cross-tenant.
