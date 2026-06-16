# Auditoria de Estado do Banco de Dados (Database Readiness)

## Preparativos:
A modelagem do Domínio e das Interfaces de Repositories foram meticulosamente desenhadas como preparativo para introdução ao PgSQL e abstrações de queries (como o Drizzle ORM ou Knex/Prisma).

- Atendem à normalização relacional. 
- A obrigatoriedade do Id gerado (`uuid: string`) e as strings encriptadas ou UUIDS de `company_id` facilitam Primary Key, Foreign Key compostas, e RLS (Row Level Security).
- A separação entre Update/Archive também já favorece uma coluna `archived_at` permitindo views filtradas isentas de impacto no código (`WHERE archived_at IS NULL`).

## Checklist Pendente para o próximo avanço de Banco de Dados:
- [ ] Definir a Engine Real Relacional (PostgreSQL).
- [ ] Criar e escrever `migrations` e os schemas definitivos focados nos repositórios.
- [ ] Construir as amarrações do unit-of-work (para persistir um Documento + Documento Items duma vez e rolar rollback no failure).
- [ ] Transicionar a instância injetada nas testagens e handlers dos repos in-memory aos repos PostgreSQL usando Pool de conexões em `src/infrastructure/postgresql`.

Classificação: PRONTO PARA 47.3.
