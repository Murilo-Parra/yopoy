# Auditoria da Backend Boundary API (src/backend)

O frontend vai interagir via API (ou seja qual for a boundary) através desta camada, desenvolvida no módulo 47.2.

- **Vazamentos:** A camada age puramente como "tradutora". Ela converte `rawRequest` (JSON) num `ValidationResult` (seguro e tipado). Se der bom, repassa os dados limpos ao UseCase. Se der ruim, retorna formatação padronizada por um `ApiErrorMapper`. NENHUMA LÓGICA CORE DE NEGÓCIO FOI COLOCADA NO HANDLER.
- **Mappers Funcionais:** Conversões seguras da base Entity para o DTO Response evitam vazar senhas, hashes ou propriedades base inuteis à tela final.
- **Risco Mitigado de Integração:** O arquivo `draftInvoices.handlers.ts` tem um interceptor de Dummie Hardcode "FISCAL_ACTION_BLOCKED" que retorna HTTP 403 para a intenção de emissão real de notas fiscais. É infalível e obedece as regras do escopo.
- **Testes Prático:** Os testes `.ts` como `api-contract-flow.test.ts` evidenciam o correto acoplamento da API -> Application -> In-Memory Repository sem necessidade de Framework (como Express/Fastify). A adaptação a um Server Node (Express) será trivial.
