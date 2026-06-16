# Inventário de Mocks do Yopoy ERP

## Geral
Mapeamento dos dados simulados e hardcoded no sistema para substituição futura.

## 1. Mocks da Camada de Infraestrutura
- **Arquivo/Local:** `src/infrastructure/in-memory/*`
- **Classificação:** MOCK ÚTIL e MOCK DE TESTE.
- **Finalidade:** Emular base de dados para desenvolvimento ágil e Unit/Integration Tests da layer Application.
- **Risco:** Zero (mantido isolado com tipagem forte).
- **Destino:** Deve ser substituído por PostgreSQL via Repositórios Reais, e mantido unicamente nas swuites de CI Test.

## 2. Mocks da Camada Frontend (UI State)
- **Arquivo/Local:** `src/components/*` (inúmeras menções explícitas a arrays estáticos, falsos fluxos de chart, etc).
- **Classificação:** MOCK VISUAL e MOCK TEMPORÁRIO (em alguns casos, MOCK PERIGOSO).
- **Finalidade:** Renderizar layout antes do backend ficar pronto.
- **Risco:** Alto risco de permanecem em produção e ludibriar cálculos financeiros de Chart, induzindo à falha fiscal ou financeira do Business Viewer.
- **Destino:** Remover futuramente ou no Módulo de Refatoração UI em favor de Fetch requests disparados aos Handlers.

## 3. Mocks Relacionados à Integração Sefaz/NFSE
- **Arquivo/Local:** `src/utils/SefazReal.ts`, scripts `/patch...`, arquivos na raiz de geração e pastas isoladas da infra antiga `modules/fiscal` e `sefaz_events`.
- **Classificação:** LEGADO, MOCK PERIGOSO.
- **Finalidade:** Simular envios de API real fiscal sem certificados.
- **Risco:** Fraude técnica ou confusão arquitetônica.
- **Destino:** EXCLUIR IMEDIATAMENTE (remover futuramente o antes possível). Nenhuma regra de mock de Sefaz deverá sobrepôr o Requesting final feito por Handlers em APIs dedicadas, sob a governança arquitetônica estrita criada.
