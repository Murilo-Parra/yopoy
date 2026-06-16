# Registro de Riscos do ERP Yopoy (Risk Register)

| ID  | Área | Severidade | Título e Contexto | Mitigação Aplicada |
| --  | ---- | ---------- | ----------------- | ------------------ |
| RR1 | Frontend | Alta | Interfaces Legadas Ativas no App.tsx acoplando com dados perdidos do passado. Gera crash ou frustração técnica. | Desconectar Frontend da parte velha ao máximo no próximo passo. |
| RR2 | Integração de Pagamentos | Média | Pagamentos via Gateway real podem invadir o processo via webhooks não interceptados de maneira falha na atual infraestrutura de simulação "in-memory". | Webhooks a serem construídos, atualmente a simulação de pagamento restringe-se a lançamentos textuais num repositório simples no UseCase. |
| RR3 | Fiscal / Consecutivo | Baixa | SEFAZ Rejeição real não gerenciará os status do `DraftInvoice`, se passarem. | Rotas fiscais bloqueadas ativamente na API. Bloqueio validado sob testes `.test.ts`. Risco contido. |
| RR4 | Lixo no DB / Inconsistência | Média | Falta de transações multi-inserts sem garantia Rollback. | Aplicação de PG Transactions `begin; commit; rollback` a programada ao instanciar DB Real. | 
