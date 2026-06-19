# Módulo 48.2-O - Auditoria Controlada do `server.ts` e Dívida Técnica

## Objetivo
Realizar um mapeamento e classificação completa da dívida técnica estrutural, lógica e de segurança no arquivo raiz `server.ts`, focando em isolamento de banco, tipagem e handlers, atuando como base segura para extrações futuras. Não foi aplicada alteração funcional, tratando-se exclusivamente de um módulo de auditoria documental.

## Arquivo Auditado
- `server.ts`

## Lista de Achados e Riscos Mapeados

| ID | Região / Rotas | Problema Encontrado | Classificação | Risco Observado | Recomendação Futura |
|---|---|---|---|---|---|
| A01 | `/api/admin/custom-providers*` | Uso direto de `pgPool.query` e comandos DML cruos na base do server | **ALTO** | Vulnerabilidade de arquitetura, alto acoplamento à DB inviabilizando testes mockados. | Extrair operações para `AdminCustomProvidersHttpHandlers` + Use Cases puros. |
| A02 | `/api/admin/affiliates*` e `commissions` | Lógica de negócio de afiliados e cálculos anexada às rotas misturada ao Express | **ALTO** | Vazamento transacional potencial, repasse inconsistente de regras. | Abstrair para `AdminAffiliatesHttpHandlers` usando Unit of Work central. |
| A03 | Helpers Fiscais (`isUserAuthorizedForNfeWrite`) | Uso de `session: any` em validações sensíveis de Role Based Access Control (RBAC) | **ALTO** | Bypasses acidentais por quebra silenciosa do TypeScript na estrutura da sessão base. | Substituir casting `any` pelo tipo estrito `LegacyActiveSession`. |
| A04 | `/api/admin/support*` e `audit-logs` | Queries longas de logs injetadas nativamente e misturando SQL e retornos de rotas HTTP | **MÉDIO** | Inviabiliza paginação limpa, poluição forte do entrypoint `server.ts` (aumentando sua dívida). | Mover para sub-módulo de Administração Secundária (`AdminSupport`). |
| A05 | Role Checks Espalhados no Corpo Fim | Lógica hardcoded como `['Proprietário', 'Fiscal', 'Operador PDV'].includes(session.role)` | **MÉDIO** | Manutenção dolorosa em cada inserção de nova permissão, propensão a esquecimentos de rotas lógicas. | Criar um Role Provider / RBAC Guard unificado. |
| A06 | Rotas base SEFAZ (NFe / Danfe) | Lógica de validação pesada atrelada ao motor falso ou instável das primeiras Sprints diretamente via endpoints mistos | **MÉDIO** | "God Object" server; dificuldades críticas ao comutar de fato em ambiente SEFAZ de produção sem retrocompatibilidade. | Decomposição plena para pacotes isolados `FiscalSefazHttpHandlers`. |
| A07 | Catch genéricos | Expressiva presença de `catch (err: any)` silenciando validações da Error Class | **BAIXO** | Deterioração de log traces refinados, exceções unhandled ou falseadas. | Passar a centralizar no `GlobalErrorHandler`. |
| A08 | Processamento de XLXS / Excel / Impressões | Loops e lógicas de transformação/formatação gigantes contidas nos handlers nativos do Express | **BAIXO** | Obesidade de rotas atrapalhando leituras diárias (Code Smells). | Extrair parsers para uma camada `ExternalDataServices`. |

## Ordem Recomendada de Execução para Próximos Módulos

Visando mitigar a desestabilização da aplicação em andamento, recomenda-se a seguinte ordem progressiva de refinamento técnico:

1. **48.2-P**: Correções de Tipificação Restante: Blindar helpers `isUserAuthorizedFor*` substituindo `any` pela nova interface `LegacyActiveSession` assegurando autorização estrita.
2. **48.2-Q**: Extração Modular do Admin de Afiliados, Comissões e Provedores Customizados: Migrar as rotas diretas sujas do `pgPool` para a arquitetura de Admin já existente (Domain/Usecase + Handlers injetados).
3. **48.2-R**: Extração Modular Admin Support / System Logs: Removendo o rastro final de SQL cru voltado à gestão interna presentes no `server.ts`.
4. **48.2-S**: Isolar Camadas de Exportação (Impressoras / Planilhas e Documentos Longos): Transferindo as centenas de linhas estáticas de formatação que poluem a estrutura do backend.
5. **48.2-T**: Extração Completa SEFAZ / NFCe / Danfe: Transição total e gradual da emissão, integrando-a com mensageria e o repositório legado refatorado, efetuando por fim a pulverização do God Object do Server primário.

## Garantias de Não Alteração - Contexto Original Preservado
Conforme estritamente exigido:
- A leitura foi puramente um exercício documental/analítico sobre os artefatos atuais; **nenhum arquivo de logica (.ts, .ts, .json) ou estrutura de dependência foi alterado**.
- Nenhuma ativação de ambiente externo (Produção Real, Banco, Serviços Pix/Boleto Gateway, SEFAZ Real, Gemini, Env Vars) foi realizada.
- Nenhuma refatoração antecipada foi aplicada as dependências antigas listadas.
- RLS, Migrations, Segurança e Módulos Anteriores Operantes continuam completamente imutáveis.

## Status Final
**GO** - O relatório descreve as próximas etapas baseadas numa visão clínica, sem tocar nas restrições solicitadas.
