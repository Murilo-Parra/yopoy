# Relatório Módulo 48.2-K - Quarentena Inicial dos Legados Críticos (Factory Reset)

## Objetivo do Módulo
Tratar os riscos de segurança mais graves advindos do endpoint de reset HTTP legado (`POST /api/system/factory-reset`). Corrigir o isolamento para que não execute em produção ou em ambientes alheios ao contexto de desenvolvimento/teste, e neutralizar vazamentos de componentes internos em retornos de erros.

## Risco Original Neutralizado
- **`NODE_ENV` Não Estrito:** Factory reset podia executar em ambientes indevidos ou desconhecidos (`undefined`).
- **Retornos Sensíveis:** Exceções do tipo `err.message` vazavam pelo retorno HTTP, expondo detalhes internos da aplicação e da infraestrutura.
- **Fake hashes e Strings de Acesso Direto:** Credenciais perigosas hardcoded e bypass de senhas.

## Regras de Quarentena Estabelecidas
- Acesso EXCLUSIVO e condicional aos ambientes `development` OU `test` via verificação explícita de `NODE_ENV`.
- `YOPOY_ENABLE_FACTORY_RESET` obrigatoriamente exigido como `"true"`.
- Validação dinâmica obrigatória comparando a variável ambiente `YOPOY_FACTORY_RESET_TOKEN` da infraestrutura com o Header local `x-yopoy-dev-reset-token`.
- Hash local dinâmico via `YOPOY_FACTORY_RESET_ADMIN_PASSWORD_HASH`.
- Bloqueio da propagação de exception via JSON da requisição, adotando falha genérica segura na chave de resposta (`FACTORY_RESET_FAILED`).

## Limitações do Escopo (Legado Mantido para Refatoração Futura)
Seguem deficiências que permanecem ativas na base e foram protegidas deste escopo seguindo a diretriz estrita (NO REFATORAR `server.ts` INTACTO GLOBAL, NEM OUTRAS ROTAS ALHEIAS):
- Middlewares baseados em fluxos com autenticações legadas injetadas `Authorization: Bearer`.
- Funcoes e controladores antigos que fazem invocação direta de `bypassRls`.
- Manipulação global e direta do `pgPool` em Controladores antigos e query parameters desprotegidos.
- Extensiva desorganização do `server.ts` contendo lógica pesada por desacoplar.

## Validação Realizada
Foram rodadas suítes completas de testes, compilação de interface/backend e lint de segurança. O isolamento passivo de roteadores da aplicação está comprovado e testado tanto dinâmica como estaticamente:
- Nenhum dano às implementações anteriores do AdminUsers e seus Controllers.
- O endpoint `/api/admin/users` se manteve operante perfeitamente de forma intocada e isolado à exigência da env `DATABASE_URL` estrita sem hardcode PostgreSQL bypassante para a instância unit-of-work.

## Status Final

GO
