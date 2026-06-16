# Registro de Lacunas de Paridade (Gap Register)

O `createPostgresDryRunRepositories` atualmente devolve classes in-memory diretamente para os seguintes repositórios que ainda não ganharam contra-partida Dry-Run:
* `InMemoryCompanyRepository`
* `InMemoryCustomerRepository`
* `InMemoryDraftInvoiceRepository`
* `InMemoryPendingItemRepository`
* `InMemoryProductRepository`
* `InMemorySmartCaptureRepository`

## Justificativa (Por Que Permitido)
Isso é aceitável na iteração `47.5` pois as dependências cruciais transacionais (caixa, venda, pagamento, despesa, lançamentos) foram mockadas com dry-run SQL completo para atestar viabilidade de queries `company_id`, joins lógicos vitais e SQL generation.

## Plano de Fechamento de Lacuna
1. No Módulo `47.6` estes repositórios in-memory serão substituídos por `Postgres*Repository` com client real apontando pro dev sandbox local.
2. Nenhuma transição para a branch main V2 vai ocorrer com o registro de gap remanescente.
3. Até finalização real em dev local, os contratos TypeScript do Frontend seguirão usando o composition container `in-memory`.
