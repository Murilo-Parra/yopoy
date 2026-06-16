# Diário de Remoções Seguras

As seguintes etapas descrevem o passo-a-passo da higienização lógica, garantida através da quebra imediata e reparação assistida em build-time.

1. Identificados módulos obsoletos / de alto risco que engatilhavam "Simulacros de Autenticação SEFAZ".
2. Os diretórios (`/modules/fiscal`, `/src/utils/sefaz_events`, `/src/utils/nfse`) foram movidos da árvore produtiva para `/src/legacy-quarantine/`.
3. Códigos que faziam chamadas aos conectores nativos foram movidos. A saber: `SefazReal.ts`, `sefazConnector.ts`, `xmlGenerator.ts`, `xmlSignatureService.ts`.
4. Os imports órfãos que restaram em `server.ts` foram mapeados globalmente, silenciados através de comentários ou instanciados como objetos Mocks retornando `FISCAL_ACTION_BLOCKED`.
5. Comprovação matemática de build-safe por chamadas consecutivas ao Vite e ESBuild, finalizadas em Zero Erros críticos.
