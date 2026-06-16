# Auditoria de Flags e Bloqueios

No MVP atual do Yopoy ERP foram implementadas defesas restritivas ao longo das construções para proteger os tenants inexperientes. 

## 1. Tratamentos Hardcoded (API Handlers)
Valores Hardcoded de bloqueio retornando `HTTP 403 (FISCAL_ACTION_BLOCKED)` estão em `src/backend/handlers/draftInvoices.handlers.ts`. 
- **Onde é usado:** Invocação de avanço real de faturas (`handleAttemptRealFiscalEmission`).
- **Recomendação:** Nunca remover até que a integração PKI e certificado X.509 + Contrato Legal seja efetuada e validada.  

## 2. Flags Visuais Front-End (No Repositório Central)
O App contém flags teóricas que lidam com permissão do `Activation` ou Routing que devem ser preservadas no momento:
- `routeToV2` (Variável provável da transição da Arquitetura).
- `routeToLegacy` (Oposta que manteve os layouts antigos renderizando sem crashar).
- `activationBlocked` (Relacionada a liberação comercial de Features em prod).

**Riscos:** Alteração de flags via console pode abrir visuais mas não ferem nada grave enquanto as flags na Camada do Servidor operarem independente da visual (que é o que está concretizado com o Domain Driven Design).
