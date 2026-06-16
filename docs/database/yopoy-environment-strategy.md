# ERP Yopoy - Estratégia de Ambientes (Environments Plan)

Uma plataforma de natureza fiscal jamais compartilha estado sem isolação de contêineres entre Sandbox de Lojistas Reais, Homologações Legais e Testes Locais da Máquina de Integração do Dev. O nosso ecossistema baseará a separação em "Environments".

## 1. Development (Dev Local/Dry)
- **Persistência Real**: PostgreSQL em Container Local Minimalista (Ex: Postgres ou Repositories InMemory rodando Live) sem necessidade de acesso público.
- **Transação:** Larga a rede Sefaz irrestritamente sem Certificados A1 instalados. Todo módulo fiscal está comutada na bandeira `FISCAL_ACTION_BLOCKED`.
- **Risco:** Zero. Uso intensivo para recriar Tabelas com Mock de UUIDs constantes, dropar Base Diária. Supabase Cli dev server se utilizado permite reset limpo da branch com os Testes e Seeds Mockados de clientes fakes em milissegundos.

## 2. Staging (Homologação Fiscal/UAT)
- **Persistência Real**: Cluster Postgres em Nuvem Dedicado (Tier gratuito ou PaaS Menor Ex: Supabase Project *Staging*). 
- **Transação**: Módulo Fiscal habilitado na rede "SEFAZ Ambiente de Homologação Nacional". Conecta-se com CNPJs de Teste (Como T-Zeros Fiscais), emite notas com valor Jurídico Cancelado de forma instantânea para debug de protocolos webservice com a IA.
- **Risco:** Moderado, não causa dívida de ICMS/ISS para CNPJs atrelados desde que a SEFAZ separe. 
- **Backups:** Point-In-Time 1 dia para não encher quotas. 

## 3. Production (Real Env)
- **Persistência Real**: Banco Relacional Alto SLA Isolado e Redundante, escalando multi-node dependendo dos tráfegos (Supabase Pro infra dedicada ou CloudSQL PG).
- **Transação**: Conecta Sefaz e SEFIN de produção; assinaturas PFX com certificado real do CNPJ do Multi-Tenant Logado (Pass-Through Secret e KeysVault). 
- **Risco**: Crítico. Emissão com Status Autorizado impõe imposto intransferível, não pode possuir Mock visual sem ser em Quarentena.
- **Backups**: Rotina restrita e rígida com Replicação Contínua Point In Time WAL (Write-Ahead Logs) p/ Recuperação de desastres a cada transação mínima e dump geral de Cold Storage programado off-site de 7 em 7 dias garantindo que relatórios LEDGER de empresas nunca sumam por Falhas de DC no nosso Cloud.
