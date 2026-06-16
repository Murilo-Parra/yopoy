# Auditoria do Domínio (src/domain)

A análise das entidades e modelos apontou para uma aderência robusta ao padrão exigido.

## Entidades Verificadas:
- `Company`, `User`, `Role`, `Customer`, `Product`, `Service`, `Sale`, `SaleItem`, `Payment`, `CashSession`, `CashMovement`, `Expense`, `Attachment`, `SmartCaptureDraft`, `DraftInvoice`, `LedgerEntry`, `PendingItem`, `AuditLog`. (Apenas `PaymentLink` e `AccountantPackage` ainda não foram estabelecidos por completos pois seu Use Case ainda encontra-se fora do MVP central.)

## Critérios Auditados em Cadeia via BaseEntity e Implementações:
- **Possui company_id?** Sim, mandatório em `BaseEntity` (com exceção de entities de Admin, não ativas, se for o caso).
- **Possui id?** Sim (UUID gerado ou importado).
- **Possui status?** Presente onde aplicável (`Sale`, `SmartCaptureDraft`, `DraftInvoice` etc.).
- **Possui created_at / updated_at?** Sim.
- **Possui created_by / updated_by?** Abstraído sob a interface `AuditableEntity`.
- **Possui soft-delete?** Abstraído usando `archived_at` quando aplicável.
- **Impacta financeiro / estoque / fiscal?** Separados logicamente. Entity pura não tem logica externa, quem impacta é Usecase.
- **Gera auditoria?** Entidades são submetidas a Logs universais `recordAuditLog`.
- **Estão bem nomeadas / duplicadas?** Nenhuma duplicação constatada na modelagem nova (`src/domain/entities/index.ts`).
- **Possui versionamento?** Entidades base não contêm `version` nativamente declarado em BD, mas controlam versions nos AuditLogs independentes.

O Domínio atual encontra-se limpo, unificado e isolado (Livros sem depêndencias de frameworks web/backend HTTP). Status: APROVADO PARA CONTINUIDADE.
