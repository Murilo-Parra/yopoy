# Auditoria de Segurança

Nesse momento o sistema é uma Sandbox Single-Page na infraestrutura server-side e nos In-Memory state. Nenhuma integração sensível ocorreu de facto, porém mapeamos:

- **Isolamento Tenant (Company_ID):** Extremamente forte. Todas as queries contêm `if (entity.company_id !== companyId)`. O sistema de Usecase impossibilita omitir esse dado.
- **Audit Trails:** Estão robustos. Ao se deletar ou atualizar (`ARCHIVE`, etc), a ação cria uma linha imutável. Isso é vital contra fraudes contábeis.
- **Soft Delete:** Aplicável. Nada deve ser dropado no meio da fatura.
- **Verificação Role/User:** No Backend Handlers é necessário passar as permissões no RequestContext, contudo as chamadas de Role Checking (`role === 'ADMIN'`) ainda não estão profundamente hardcoded (muito Usecase não checa permissão). Pendência pra futura etapa.
- **Segredos e Identidades (.env):** As chaves e tokens não estão vazando ao Front pois o backend é desacoplado, contudo, é preciso garantir no build via `vite.config` a não interceptação indevida de dados fiscais assim que Postgres for conetado.
