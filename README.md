# Yopoy

## Visão geral

ERP brasileiro multi-tenant para empresas físicas, com módulos de autenticação, administração, estoque/logística, fiscal e financeiro em construção.

## Estado do projeto

Em desenvolvimento.

## Requisitos

- Node.js 20
- PostgreSQL (via Docker opcional para ambiente local)

## Configuração local

1. Instalar as dependências:
   ```bash
   npm ci
   ```

2. Configurar as variáveis de ambiente:
   Copie `.env.example` para `.env.local` e preencha conforme necessário. Nunca commite `.env.local`.

3. Levantar o banco de dados localmente (opcional se não usar banco em nuvem):
   ```bash
   npm run db:local:up
   ```

4. Rodar o projeto em modo desenvolvimento:
   ```bash
   npm run dev
   ```

## Scripts úteis

- `npm run dev`: Inicializa o servidor Express embutido e API.
- `npm run build`: Faz a build otimizada da aplicação.
- `npm run start`: Roda a versão de build compilada.

## Testes

O projeto utiliza Vitest para testes.

Rodar testes do backend de autenticação, por exemplo:
```bash
npx vitest run src/backend/auth/tests
```

## CI

Rodando verificações da CI localmente:
```bash
npm run typecheck
npx vitest run src/backend/auth/tests
npm run security:all
```

## Segurança

- Arquivos contendo secrets (ex. `.env.local`) NUNCA devem ser versionados ou expostos. Adicione-os ao `.gitignore`.
- **Aviso Fiscal:** Não é permitida a emissão fiscal real (SEFAZ, NF-e, NFS-e) no ambiente de desenvolvimento/preview. Múltiplas proteções `DevelopmentEnvironmentGuard` garantem que qualquer integração de emissão real dispare um erro simulado e force o uso de fakes em ambiente que não seja produção.

## Roadmap técnico próximo

Continuar a modularização da aplicação e isolamento dos contextos.
A etapa seguinte foca na auditoria do `server.ts` para conformidade arquitetural.
