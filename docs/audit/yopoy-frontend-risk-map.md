# Mapa de Risco do Frontend - Componentes Críticos

Apesar do Backend e da lógica fiscal terem sido extirpados de conexões ativas na SEFAZ e substituídos por Stubs com `FISCAL_ACTION_BLOCKED`, as interfaces do usuário no Frontend ainda possuem botões, abas e tabelas que geram uma visão enganosa (alucinação lógica). 

## Componentes Marcados como "Perigosos na Visualização"
- `NfeEmissorTool.tsx`
- `NfcePosTool.tsx`
- `NfseTool.tsx`
- `InvoiceTool.tsx`
- `DanfeTool.tsx`
- `FiscalEventsTool.tsx`
- `FinanceTool.tsx`

**Ação Mitigadora Tomada:** 
Inserido banner vermelho de alerta superior no `App.tsx` para todas das exibições de ViewMode `erp`, destacando a frase: *FLUXO LEGADO VISUAL. AÇÕES FISCAIS REAIS ESTÃO BLOQUEADAS E NÃO CONECTADAS AO BACKEND V2*. Este banner serve como isolante conceitual e protetor visual enquanto o frontend não iniciar sua reconexão REST com os Endpoints DDD da versão limpa (Handler Mapeados).
