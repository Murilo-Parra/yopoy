# Yopoy Architecture Constitution

## Regras Imutáveis

1. Frontend nunca acessa banco diretamente.
2. Frontend nunca contém segredo.
3. Frontend nunca decide permissão.
4. Frontend nunca decide company_id confiável.
5. Frontend nunca chama SEFAZ real.
6. Frontend nunca ativa gateway real.
7. Frontend nunca manipula certificado digital.
8. Backend sempre valida usuário, sessão, empresa, cargo e permissão.
9. Toda tabela sensível tem company_id, exceto companies, que isola por id.
10. Toda tabela sensível tem RLS + FORCE RLS.
11. Toda policy sensível tem USING e WITH CHECK.
12. Todo módulo novo precisa de teste de isolamento multi-tenant.
13. Toda ação crítica precisa de log de auditoria sanitizado.
14. Produção, SEFAZ real e gateway real ficam bloqueados por padrão.
15. Nenhum teste pode ser removido só para passar build.
16. Nenhum erro de segurança pode ser mascarado com any, ts-ignore ou skip.
17. IA pode gerar código, mas não pode alterar regras de segurança sem teste.

## Fluxo Obrigatório

```text
React
↓
Backend API
↓
Application Use Case
↓
Domain
↓
Repository
↓
PostgreSQL
```

## Fluxos Proibidos

- React ↓ PostgreSQL direto
- React → pg
- React → DATABASE_URL
- React → service_role
- React → certificado fiscal
- React → gateway real
- React → SEFAZ real
- React → filesystem
- React → chave privada
