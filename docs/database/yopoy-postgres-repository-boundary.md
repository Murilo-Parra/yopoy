# ERP Yopoy - Repositórios PostgreSQL (Boundary Plan)

A camada `infrastructure/postgres/` abrangerá a substituição direta e co-local da interface base dos Handlers sem tocar `UseCases` lógicos ou frontends reagentes. 

## Mapeamento de Adapters
Para cada Repositório criado em modo `InMemory`, um arquivo irmão existirá implementando a mesma Interface TS da camada `application/repositories/`.

- `PostgresSaleRepository.ts`
- `PostgresPaymentRepository.ts`
- `PostgresCashSessionRepository.ts`
- `PostgresLedgerRepository.ts`
- `PostgresAuditLogRepository.ts`

## Proteção Anti-Vazamento (Throw Blocks)
Atualmente a plataforma bloqueia tentativas de rodar repositórios Postgres que invoquem SQL real por medidas de contenção MVP e Quarentena. Todo arquivo adaptador criado em `src/infrastructure/postgres/*` será "dry" com Stubs implementados da seguinte maneira inicial:

```typescript
// Exemplo Planejado

import { SaleRepository } from '../../../application/repositories/SaleRepository';

export class PostgresSaleRepository implements SaleRepository {
    create(): Promise<any> {
        throw new Error('POSTGRES_ADAPTER_NOT_IMPLEMENTED');
    }
    // ...
}
```

O AppContainer injetável do Express e do Vite/React é quem efetuará o swap da "chave" de configuração `{ mode: 'postgres' | 'in-memory' }`. Nenhuma lógica React tem acesso nem permissão de invocar PostgreSQL instâncias por debaixo do Client Frontend.
