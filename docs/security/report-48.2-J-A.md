# Relatório de Patch de Segurança: Módulo 48.2-J-A — Fundação de Permissões Admin Users

## Objetivo do Patch
O objetivo deste patch foi a criação estrita da fundação de permissões administrativas (Admin Users) necessárias para o futuro módulo de Gestão de Usuários, Cargos e Permissões do ERP Yopoy. Em conformidade com as restrições arquiteturais, nenhuma alteração estrutural profunda de lógica de bancos de dados ou persistência foi efetuada, preservando todos os módulos e guarda-costões do backend validados anteriormente.

## Escopo Executado e Limitações Respeitadas
As seguintes permissões para a interface administrativa foram homologadas e mapeadas tanto no backend quanto no frontend:
- `admin:users:view`
- `admin:users:manage`
- `admin:users:create`
- `admin:users:update`
- `admin:users:permissions:update`
- `admin:users:password:reset`
- `admin:audit:view`


Todas as proibições impostas pelo escopo foram plenamente seguidas. Abstivemo-nos estritamente de:
- Adicionar ou criar telas como `AdminUsersPage`.
- Criar novos modais de reset de senha e edição de permissões.
- Criar novos endpoints de comunicação ou handlers em `server.ts`.
- Mudar regras de isolamento no banco de dados (bypass, desativação de Row-Level Security, service roles).
- Alterar o `authFetch`, o `ProtectedModule` ou o `AccessDenied`.
- Adotar armazenamento inseguro via `localStorage`, tokens diretos no header ou manipulações de criptografia diretas.

## Alterações de Código

- **`src/application/auth/types.ts`**:
  O tipo principal `AuthPermission` foi expandido para englobar de forma determinística os novos contratos que os casos de uso futuros necessitarão, contendo agora todo o escopo de gestão de usuários `admin:users:*`.

- **`src/frontend/auth/modulePermissions.ts`**:
  O dicionário visual de permissões consumido no frontend via hooks e componentes foi expandido para englobar com exatidão as constantes de controle de CRUD do usuário e redefinição de senhas, sob o nó principal `admin`. O union type `SystemPermission` também foi unificado e equalizado para representar a mesma tipagem restrita do backend.

## Testes Unitários de Verificação
A estabilidade e precisão destas fundações de privilégios agora são atestadas por meio de dois novos cenários de testes concluídos com sucesso.
- **`src/application/auth/tests/permissions-list.test.ts`**: Valida a compilação do TypeScript para certificar que o backend reconhece adequadamente a nova tipagem `AuthPermission`.
- **`src/frontend/auth/tests/modulePermissions.test.ts`**: Valida em runtime se a árvore principal `MODULE_PERMISSIONS.admin` dispõe corretamente de todas as listagens.
