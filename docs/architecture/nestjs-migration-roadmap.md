# NestJS Migration Roadmap

A migração para NestJS será controlada e por fases.

## Regra de Ouro
Nenhuma migração para NestJS pode quebrar db:native:test, lint, typecheck ou build.

## Planejamento das Fases

- **Fase 1:** Estabilizar backend atual e fronteira frontend/backend
- **Fase 2:** Criar apps/api com NestJS
- **Fase 3:** Migrar auth e companies
- **Fase 4:** Migrar memberships/users
- **Fase 5:** Migrar sales/payments
- **Fase 6:** Migrar inventory
- **Fase 7:** Migrar fiscal simulado
- **Fase 8:** Migrar security gate
- **Fase 9:** Remover dependências antigas
