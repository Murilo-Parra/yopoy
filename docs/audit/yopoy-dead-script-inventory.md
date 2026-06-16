# Inventário de Scripts Órfãos (Dead Scripts)

Todos os scripts listados abaixo foram localizados soltos no diretório raiz e movidos fisicamente para `src/legacy-quarantine/scripts/`. Eles carregavam alto risco de sobrescrita de banco (`patch_db.cjs`), disparos arbitrários de APIs de provedores pseudo-fiscais (`patch_nfse_providers.cjs`) e sujeira de testes.

## Lista Completa
- `patch.cjs`
- `patch2.cjs`
- `patch3.cjs`
- `patch4.cjs`
- `patch_db.cjs`
- `patch_db_municipalities.cjs`
- `patch_nfse_providers.cjs`
- `patch_nfse_queries_api.cjs`
- `patch_server_endpoints.cjs`
- `patch_server_events.cjs`
- `patch_server_nfse_queue.cjs`
- `patch_server_nfse_reports.cjs`
- `fix_ticks.cjs`
- `generate_events_pdf.cjs`
- `generate_nfse_pdf.cjs`
- `generate_pdf.cjs`
- `run_test.cjs`
- `test-sprint48.ts`
- `test-sprint49.ts`
- `test-sprint410.ts`
- `test-sprint411.ts`
- `test-sprint416.ts`
- `test_direct_ipv6_6543.ts`
- `test_isolation_forensics.ts`
- `test_pooler_real.ts`

Todos esses scripts já não constam mais em automações no `package.json`. Seu reuso está expressamente desencorajado.
