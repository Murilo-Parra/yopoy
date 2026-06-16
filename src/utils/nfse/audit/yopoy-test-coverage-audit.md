# Auditoria de Cobertura de Testes

A base possui scripts de testes locais `.ts` rodáveis primariamente pelo tsx (`npx tsx caminho.ts`). O foco é comportamental/contratual do backend de negócio, garantindo que não estamos apenas simulando frontend.

## Suítes Válidas:
- `api-contract-flow.test.ts`: Testa as invocações completas dos controladores como a entrada "venda -> pagamento", respondendo os JSONs.
- `api-error-mapping.test.ts`: Teste restrito do bloqueio Fisco obrigatório, exigindo o HTTP 403 FISCAL_ACTION_BLOCKED. E garantindo o 404 NOT_FOUND. 
- Na layer Application Layer há os testes vitais isolados:
  - `expense-flow.test.ts`: Valida saída de caixa pura.
  - `smart-capture-to-sale-flow.test.ts`: Valida leitura inteligente virando entrada final de nota controlando Drafts.
  - `tenant-isolation.test.ts`: Confirma o isolamento entre 2 CompanyIds (não é possível buscar dados cruzados).
  - `yopoy-mvp-flow.test.ts`: A prova mestra integracional do "Happy Path" local, vendendo e fechando sessão de caixa com lucro registrado no controle pendente.
  - `payment-pending-flow.test.ts`.

## Deficiência Atual / Dívidas de Teste:
O Front não tem Vitest/Jest implementados ativamente para suas rotas e seus Mocks visuais. A base garante a lógica em Backend, mas falta a amarração e testagem de interface. A cobertura lógica obedece perfeitamente aos Core Use Cases estipulados no planejamento da mudança Yopoy.
