# Yopoy ERP - AI Handoff Summary

**CONTEXT FOR AI ASSISTANTS:**
You are working on the completely restructured *Yopoy ERP* codebase. Initially named *Elparrar*, this node app underwent a giant shift starting with the 47.x modules.

## Current Technical Imprint:
1. **Application Rules & Domain:** Read `src/domain/entities/index.ts` to see current data schemas. It uses UUIDs and separates logically into `Sales`, `CashSessions`, `SmartCaptureDrafts`, etc. Check out `src/application/use-cases/` for actual business logic actions.
2. **Strict In-Memory Pattern (No SQL YET):** Do NOT write SQL queries or use pgClient for data access. Every data action is currently resolved via `src/infrastructure/in-memory/*Repository.ts`. These simulate database actions perfectly for logic verification.
3. **API Boundaries:** The entrypoint for any logical update MUST pipe through `src/backend/handlers`. Handlers do pure validation of input and ErrorMapping of application layers output. DO NOT ADD BUSINESS LOGIC TO HANDLERS.
4. **FISCAL BAN / 403 HTTP Rules:** Any attempt to process real legal invoices, Sefaz connections, or Sefaz XMLs is HARD-BLOCKED by design to avoid massive risk. Observe `src/backend/handlers/draftInvoices.handlers.ts` rejecting real submissions. Only Rascunhos (Drafts) or pure Sale/Balance updates are permitted logic flows.
5. **FRONTEND CATASTROPHE:** The UI (`App.tsx` and files under `src/components/`) are heavily legacy and heavily polluted from prior prototypes. *Do not assume the UI matches the clean backend structure right now.* It needs serious rewiring to talk uniformly to the handlers in your upcoming tasks.

## Your Goal Going Forward:
Prioritize keeping the frontend visually aligned with mapping backend responses accurately. Assume code in `src/utils/` related to SEFAZ/NFSE is deprecated. Always enforce the `company_id` check across requests to avoid cross-tenant pollution. Use `UseCaseResult<T>` paradigm inside `/application`.

DO NOT execute REAL Fiscal DMLs strings, do NOT generate generic Express endpoints bypassing the handler architectures already set up.
