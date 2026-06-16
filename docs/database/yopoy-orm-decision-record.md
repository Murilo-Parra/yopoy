# ERP Yopoy - Decisão de ORM vs Query Builder vs SQL

Na conversão da Infraestrutura `in-memory` para persitência persistente PostgreSQL, requer-se padronizar uma camada Client e Parser do Node.JS para a linguagem SQL do Database. 

## Concorrentes e Critérios Avaliativos
1. **Prisma ORM:** Abstração mágica superior, com type-safety altíssimo nativo pelo schema de GraphQL similar, contudo, é custoso e tem sérios conflitos ou barreiras com features de "Native PostgreSQL Row-Level-Security (RLS)" exigindo malabarismos insalubres (pass-throughs inseguros de connections no middleware para RLS customizado).  
2. **SQL Puro / `pg` puro ou Supabase Data Client RPC:** Limpo, zero abstração. Difícil de manter mapeamento de colunas, requer criação monolitica em Typescript para bater e inferir tipagem na string retornada das views ou row arrays, demandando custo em time/mappers. O Cliente Oficial Supabase ajuda muito, porém, amarra muito na plataforma Supabase especifica ou sua própria API REST.
3. **Drizzle ORM (Query Builder Tipado):** Equilibra extrema velocidade Edge e zero bloat no client, tipagem "1 pra 1" entre Schema Script local em Typescript e o SQL emitido final. Ele dá autonomia pura em Raw Config para assinar "Context Variables" na transações sem malabarismos. Permite a emissão manual do RLS Policy ao lado, e respeita perfeitamente as views Postgres cruas como o `app.current_company_id`.  

## Decisão Oficial Orientada pelo Design System do Módulo 47
Dentre as premissas e análise global as necessidades de RLS mandatório pelo design `Multi-Tenant`, o **Drizzle ORM** é a escolha recomendada, por:
- Alta adesão Typescript, simplificando os Retornos Types inferidos desde a linha dos `PostgresRepositories*`. 
- Menos "mágica" para as transações UnitofWork (suporta perfeitamente blocos `db.transaction(tx=>{ })`).
- Zero overhead no Node, excelente tempo de cold-starts.
- Total sintonia em não poluir tabelas caso não queiramos com chaves estranhas automáticas que o Prisma gosta de adicionar à engine no background, garantindo o "Source Of Truth" para nós.

*(Nesta etapa não instalaremos bibliotecas npm. Apenas ditado normativo.)*
