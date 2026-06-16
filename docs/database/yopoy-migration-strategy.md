# ERP Yopoy - Estratégia de Migrations

## O que são Migrations
Arquivos ordenados historicamente (.sql na veia crua do diretório) contendo DDL (Data Definition Language) versionada que diz à engine abstrata (Supabase/Drizzle) como criar, alterar ou dropar tabelas do banco sem intervenção cega do desenvolvedor em painéis gráficos. Representam o Source Of Truth (SoT) declarativo do Banco do ERP. 

## Como Geriremos no Yopoy
Para total reprodutibilidade e garantia contábil do ERP, proíbe-se qualquer modificação no dashboard em produção sem que existam Migrations upadas no projeto e com Pull requests revisados. 

Toda migration será dividida entre lógica estrutural (Ex:`0001_initial_schema.sql`), Políticas e Restrições de Tenant (Ex: `0002_rls_setup.sql`), popular os planos de contas contábeis e perfis básicos irrevogáveis de seeders (Ex: `0003_seed_base_catalogs.sql`). 

## Regra de Módulo Proibitivo
Na etapa 47.X atual **NENHUMA MIGRATION É RONDADA NUM BANCO LOCAL OU DE DOCKER/SUPABASE.**
Migrações são testadas via Dry-runs ou "Linting" declarativo. Migrações futuras que corrompam tabelas sensíveis de `sales` ou de `ledger_entries` exigem plano de Rollback (.down) que também evitem deleção hard de métricas que foram submetidas por audit logs para a integridade de "soft deletes".

## Plano de Reversão
O Erro humano em uma Migration para uma branch principal só poderá ser ajustado com outra branch *Append-Only* gerando a tabela reestruturada no "Fix". Nós não reescreveremos históricos em Branch Masters já consolidadas ao cliente, assegurando imutabilidade DDL.
