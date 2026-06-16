# Recomendação dos Próximos Passos (Next Step)

O Backend de Negócio In-Memory / Clean Architecture foi o foco central das sprints 47.1 e 47.2, provando sucesso funcional e mitigando os erros das metodologias anteriores.

## Ação Imediata Consequente (Próximo Módulo = 47.3 ou equivalente)
- **Desacoplar o Frontend do Legado Absoluto.** As telas visuais estão olhando para simulações espalhadas internamente aos componentes. É indispensável:
  1. Limpar todas as telas contendo fluxos do "Elparrar".
  2. Implementar as Requisições Client (usando simple fetch ou Axios/TanStack Query) ao Express local / mock de API baseados nos handlers expostos na pasta `src/backend/handlers`.
  3. Comprovar que todo click do usuário atinge os Handlers.
  4. Redefinir `App.tsx` para usar um conjunto unificado de telas condizentes ao "Centro de Comando de Dia" e do Rascunho Fiscal (DraftS) como já formatados nas entidades de backend.

## Próximo Passo Cauteloso
- Deletar e erradicar `.cjs` scripts abandonados (SefazReal test, etc.) para que nenhum commit suba artefatos sem tipagem e perigosos ao servidor final.

## Banco de Dados
Somente após a Frontend estar fluída em comunicação com a *API IN-MEMORY (Backend Handlers executáveis e retornado dados limpos)*, deverá se investir a fundo na virada de chave para banco PostgreSQL (Módulo 48).
