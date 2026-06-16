# Registro de Riscos de Mocks Fiscais

## Histórico de Perigo
Antes da sanitização, o sistema continha componentes graves que simulavam ações fiscais:
1. `SefazReal.ts` & `NfseRealClient.ts`: Traziam a falácia de se comunicar com a SEFAZ real, e poderiam ser importados de forma maliciosa ou acidental por um dev júnior.
2. `xmlGenerator.ts`: Continha métodos de geração de XML para notas que serviam apenas como placeholders mockados, sendo enganosos para o escopo de produção.
3. `xmlSignatureService.ts` & `sefazConnector.ts`: Encarregavam a validação irresponsável e perigosa de assinaturas.

## Status Pós-Módulo 47.B
- Mocks desativados.
- Chamadas fiscais no Backend de transição (`server.ts`) foram comentadas, interceptadas via mocks rígidos e programadas para retornar `FISCAL_ACTION_BLOCKED`.
- Os perigos foram contidos no pacote `/src/legacy-quarantine/` com total quebra de referenciamentos nos códigos produtivos remanescentes.
