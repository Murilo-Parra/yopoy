# Relatório de Patch de Segurança: Módulo 48.2-J-B — Contratos e Repositórios Admin Users

## Objetivo

Implementar a fundação de contratos e repositórios PostgreSQL para o futuro módulo de Gestão Administrativa de Usuários, preservando isolamento multi-tenant via RLS e evitando vazamento de dados sensíveis.

## Arquivos alterados

- `src/application/auth/types.ts`
- `src/application/auth/contracts/AuthUserRepository.ts`
- `src/application/auth/contracts/MembershipRepository.ts`
- `src/application/auth/testing/InMemoryAuthUserRepository.ts`
- `src/application/auth/testing/InMemoryMembershipRepository.ts`
- `src/infrastructure/postgres/auth/PostgresAuthUserRepository.ts`
- `src/infrastructure/postgres/auth/PostgresMembershipRepository.ts`

## Arquivos criados

- `src/infrastructure/postgres/schema/local/007_admin_users_repository_support.sql`
- `src/infrastructure/postgres-native/tests/native-admin-users.test.ts`
- `docs/security/report-48.2-J-B.md`

## Garantias de segurança

- `listCompanyUsers` retorna somente `SafeAuthUser`.
- Listagens administrativas não retornam `passwordHash`, `sessionTokenHash` ou `rawSessionToken`.
- Métodos de update respeitam `companyId` e o contexto RLS.
- `memberships.permissions` foi adicionado como `text[]`.
- Nenhuma rota HTTP foi criada.
- Nenhum frontend foi alterado.
- Nenhum handler de autenticação foi alterado.
- Nenhum bypass de RLS foi introduzido.

## Validação esperada

```bash
npm run security:all
npm run db:native:reset
npm run db:native:guard
npm run db:native:migrate
npm run db:native:test
npx vitest run src/application/auth/tests src/infrastructure/auth/tests
npm run lint
npm run typecheck
npm run build
npm audit

