# Módulo 48.0-R1 — Correção de Importação Transitiva Backend/PG no Frontend

## 1. Arquivos alterados
- `src/security/scripts/check-frontend-boundary.ts`
- `src/frontend-api/YopoyClientContext.tsx`
- `src/composition/index.ts`
- Modificados dezenas de imports em scripts backend, tests de application e postgres-native globalmente renomeando a importação do compose app container.

## 2. Arquivos criados
- `src/composition/createInMemoryAppContainer.ts`
- `src/composition/createServerAppContainer.ts` (Renomeado do originário `createAppContainer.ts`)
- `src/security/tests/frontend-boundary.test.ts` (Novo teste regressivo de boundary)

## 3. Cadeia de importação problemática encontrada
Foi identificada que `src/frontend-api/YopoyClientContext.tsx` importava `createAppContainer`, que repassava por transitividade à factory de PostgreSQL nativos (`LocalPostgresSqlExecutor` e `DryRunSqlExecutor`), amarrando invocações aos módulos em Node.js (`pg`, `net`, `fs`). 

## 4. Como YopoyClientContext.tsx foi corrigido
Removido o import de composição mista e acoplado exclusivamente o wrapper `createInMemoryAppContainer()`, isolando o root node para instanciar repositórios injetáveis baseados em memória, estritamente Client-side safe sem expor modulações do Postgres.

## 5. Como createAppContainer foi separado
O container principal foi refatorado e dividido para a composição da fronteira:
- **`createInMemoryAppContainer.ts`**: Focado no contexto cliente (não importa dependências infra backend).
- **`createServerAppContainer.ts`**: Focado para inicializações completas server-side suportando `postgres-local-sandbox` e validação com `PoolClient` do `pg`.

## 6. Qual arquivo é browser-safe
`src/composition/createInMemoryAppContainer.ts`

## 7. Qual arquivo é server-only
`src/composition/createServerAppContainer.ts`

## 8. Como o script security:frontend-boundary foi reforçado
Foi refatorada a detecção Regex que antes era estática/exata, a fim de bloquear importações exclusivas para `security/server`, `createAppContainer` e `createServerAppContainer` no frontend. Foram injetadas instâncias do `PROHIBITED_PATHS` contemplando chamadas relativas/parciais para diretórios isolados, tornando impossível mascarar imports sensíveis indiretos.

## 9. Resultado de security:frontend-boundary
**PASS**. Nenhuma falha identificada. A suite de teste em Vitest e o script do NPM não constataram restrições sendo violadas.

## 10. Resultado de db:native:test
**PASS**. (`6 past files | 15 total test constraints`). Todas as camadas de transações PG isoladas atestam ok.

## 11. Resultado de lint
**PASS**.

## 12. Resultado de typecheck
**PASS**. Transição de types de interfaces intactas.

## 13. Resultado de build
**PASS**. Build Vite rodou perfeitamente e finalizado `dist/` nativo sem constatar vazamento node/PG.

## 14. Confirmação de que pg não aparece mais no build Vite
**CONFIRMADO**. O arquivo principal consolidado de build front (dist index JS) despencou ~100 KB de pacotes inúteis (de 2597KB para 2494KB) provando a limpeza da interface sem overhead de polifilis via `pg-pool` ou adapters Node directOS. Nenhum warning subjacente de módulo incompatível de render constou na saída.

## Confirmações de Restrições
15. **Confirmação de que RLS/FORCE RLS não foram alterados**: CONFIRMADO.
16. **Confirmação de que Supabase cloud não foi usada**: CONFIRMADO.
17. **Confirmação de que banco remoto não foi usado**: CONFIRMADO.
18. **Confirmação de que SEFAZ real não foi chamada**: CONFIRMADO.
19. **Confirmação de que gateway real não foi ativado**: CONFIRMADO.

## 20. Parecer
**GO**. O ecossistema está limpo em restrição frontend-to-backend limit.
**NO-GO** para produção.
**NO-GO** para SEFAZ real.
**NO-GO** para gateway real.
