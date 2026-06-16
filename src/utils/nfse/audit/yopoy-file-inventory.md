# Inventário de Arquivos do Projeto Yopoy

Esta lista mapeia todos os arquivos e os classifica de acordo com o escopo exigido na auditoria mestre.

## Arquivos/Diretórios Analisados:
`docs/`, `src/domain/`, `src/application/`, `src/backend/`, `src/infrastructure/`, `src/components/`, `src/modules/`, `src/utils/`, `tests/`, `package.json`, `tsconfig.json`, `vite.config.ts`, `metadata.json`, etc.

## Classificação de Arquivos

### 1. Componentes Críticos / Funcionais (Novos / Seguros)
- **CÓDIGO REAL (Business Core / Backend):** 
  - `src/domain/entities/index.ts` 
  - `src/application/use-cases/*`
  - `src/application/shared/*`
  - `src/backend/dtos/*`, `src/backend/handlers/*`, `src/backend/mappers/*`, `src/backend/validators/*`
- **MOCKS CONSCIENTES:**
  - `src/infrastructure/in-memory/*` (Repositórios isolados e úteis no estágio MOCK)

### 2. Frontend Atual (Em Transição)
- `src/App.tsx`, `src/main.tsx`, `src/index.css`.
- Muitos componentes em `src/components/` podem ser categorizados como **Referência Funcional** ou **Legado Seguro** sendo aproveitados, mas necessitam revisão extensa de acoplamento.

### 3. Legados e Lixo
- **LEGADO PERIGOSO:**
  - `src/utils/SefazReal.ts`
  - `src/utils/nfse/` (Pode enganar IAs e DEVs sobre capacidades da aplicação)
  - `src/utils/sefaz_events/` 
  - `src/modules/fiscal/`
  - Raiz: `generate_*.cjs`, `patch*.cjs`
  
- **RISCO TÉCNICO & MOCK PERIGOSO:**
  - Muitos trechos não deletados no meio de toolings de UI (`src/components/NfeEmissorTool.tsx`, etc) simulando emissões brutamente sem back-end.

- **RISCO DE BRANDING:**
  - `src/components/ElparrarLandingPage.tsx`
  - `metadata.json` (Ainda contém descrições do escopo anterior Auxiliar Contábil quando já migrou pra Yopoy)

- **RISCO FISCAL:**
  - Telas UI que permitem manipulação irrealista de PDFs Danfe locais não auditados. 

## Recomendações
Recomenda-se exclusão em massa das massas classificadas como LEGADO PERIGOSO antes de migrar os novos contratos para a Frontend, a fim de expurgar as lógicas enganosas e perigosas que estão dormentes.
