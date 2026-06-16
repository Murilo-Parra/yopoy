# ERP Yopoy - Estratégia de Transações & Unit of Work (Planejamento)

A natureza em-memória da arquitetura prévia não tinha concorrência rigorosa ou deadlocks acoplados na engine (como ocorre em isolamentos `SERIALIZABLE` ou bancos ACIDs relacionais pesados). A entrada do PostgreSQL estipula a obrigatoriedade do padrão UoW (Unit of Work) para orquestrar fluxos intersecionando persistência que não podem falhar pela metade (e.g., Registar Caixa sem gravar o Livro Contábil / Registrar Lançamento deixando Auditoria quebrar no meio do Event Loop gerando dados inconsistentes).

## O Problema a ser mitigado (Sem UoW):
Um Handler invoca `createExpense`:
1. Muta o registro principal na Tabela `expenses`. 
2. Insere um log temporal na `ledger`.
3. Dispara log na `audit_logs`.
Se a etapa 3 falhar (conexão instável DB), o "Custo" foi validado parcialmente, o livro razão foi distorcido do real mundo da caixa daquele comerciante e a transação HTTP do backend retorna um Interntal Server Error supreso. Para reverter exige rollback suado caso isolado.

## O Plano: Interface Orientada a Blocos (UnitOfWork)
Nossos repositórios não abrirão commits automáticos sobre instâncias autônomas no Pool. A Interface injetável orquestrará as calls dentro de um proxy unificado:

```typescript
// Interface Teórica de Planejamento 

export interface TransactionContext {
  // Envelopa DB Client cru ou Transaction client base.
}

export interface UnitOfWork {
  // Block lambda garantido pelo repositório SQL real
  transaction<T>(
    companyId: string, 
    fn: (tx: TransactionContext) => Promise<T>
  ): Promise<T>;
}

```

### Carga Reposicionada 
No futuro os UseCases (Camada de Aplicação) do Yopoy não receberão repositórios desvinculados em série (Ex:`usecase(param, repo1, repo2, repo3)`).
Eles receberão uma abstração unificada (`UoW`) cujo interior contém Repositórios Scoped injetando as querys na mesma Transaction Connection originária do Bloco SQL: `BEGIN ... COMMIT` e um bloco interno unificado de captura/rollback global: `ROLLBACK`.

### Operações Essenciais de Necessário UnitOfWork:
- Criação de Venda atômica + Atrelamento de Itens Lineares e Atualização de Status Financeiro.
- Link de Pagamento cravado à Venda gerando a baixa automática de Conciliação e criando um evento Pendente resolvido e o Log Transacional contábil `Ledger`.
- Fechar Sessão de Caixa somando todo o montante de Vendas reportado contra Expected_amount e gerando o log final.
- Aprovação de Inteligência Artificial para Carrinho gerando todo Ticket no DB simultâneo.

Em nosso ambiente Mock (`InMemory`), o UoW operará como proxy fantasma. No `Postgres` ele ditará transação purista BEGIN/COMMIT.
