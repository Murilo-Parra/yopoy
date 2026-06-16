# Relatório de Inventário do Legado - Yopoy ERP

## Status: QUARENTENADO (Seguro)

### Inventário de Diretórios Movidos para Quarentena
- `src/utils/nfse/` -> `src/legacy-quarantine/nfse`
- `src/utils/sefaz_events/` -> `src/legacy-quarantine/sefaz_events`
- `modules/fiscal/` -> `src/legacy-quarantine/modules_fiscal`

### Inventário de Arquivos Chave Movidos para Quarentena
- `src/utils/SefazReal.ts` -> `src/legacy-quarantine/SefazReal.ts`
- `src/utils/xmlGenerator.ts` -> `src/legacy-quarantine/xmlGenerator.ts`
- `sefazConnector.ts` -> `src/legacy-quarantine/sefazConnector.ts`
- `xmlSignatureService.ts` -> `src/legacy-quarantine/xmlSignatureService.ts`

*Nota: Um "stub" básico para o `xmlGenerator.ts` foi recriado em seu local original para não quebrar excessivamente o front, mas retornando sempre a falha blocante `FISCAL_ACTION_BLOCKED`.*
