# Yopoy Security Gate Plan

O Security Gate do Yopoy é um conjunto consolidado de validações obrigatórias automatizadas que devem ser executadas com sucesso antes de qualquer avanço funcional, release, integração fiscal, gateway de pagamento ou deploy em produção.

O comando central unificado é:

```bash
npm run security:all
```

## Arquitetura das Validações

O Security Gate é composto por cinco módulos independentes:

1. **Frontend/Backend Boundary Audit (`npm run security:frontend-boundary`)**
   - Garante que arquivos do frontend (React/Vite) não carreguem acidentalmente módulos ou arquivos do backend (Express) ou do banco de dados (PostgreSQL/pg). Selagem absoluta da fronteira de compilação.

2. **Secret Leak Scanner (`npm run security:secrets`)**
   - Varre recursivamente toda a codebase local em busca de arquivos de credenciais acidentalmente commitados (como `.env`, `.pem`, `.key`, `.crt`, `.cer`, `*.pfx`) ou strings/credenciais literalizadas no código (DATABASE_URL, chaves privadas, senhas de certificados).

3. **Production Locks Audit (`npm run security:production-locks`)**
   - Impede que parâmetros reais de produção de SEFAZ e Gateways de pagamentos (como Asaas Live, Stripe Live, Mercado Pago Live, Sefaz Real) sejam acionados em ambientes locais de homologação ou sandbox.

4. **RLS Schema Gate (`npm run security:rls-schema`)**
   - Analisa estaticamente os arquivos SQL de migração e inicialização para garantir que as tabelas essenciais possuem explicitamente instruções `ENABLE ROW LEVEL SECURITY` e `FORCE ROW LEVEL SECURITY`, além de políticas com cláusulas robustas de `USING` e `WITH CHECK`.

5. **Dependency Audit Gate (`npm run security:dependency-audit`)**
   - Executa `npm audit` contra a árvore de dependências instalada e impede o avanço em caso de vulnerabilidades classificadas com gravidade **HIGH** ou **CRITICAL**.

---

## Critério Técnico de Aprovação (Definitivo)

O veredito de aprovação local requer sucesso total em todos os gates:

- `security:frontend-boundary` ➔ **PASS**
- `security:secrets` ➔ **PASS**
- `security:production-locks` ➔ **PASS**
- `security:rls-schema` ➔ **PASS**
- `security:dependency-audit` ➔ **PASS**
- `db:native:test` ➔ **PASS**
- `lint` ➔ **PASS**
- `typecheck` ➔ **PASS**
- `build` ➔ **PASS**
