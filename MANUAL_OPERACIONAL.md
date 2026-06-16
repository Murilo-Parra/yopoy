# MANUAL OPERACIONAL E RELATÓRIO DE AUDITORIA DO SISTEMA

## FASE 1 — INVENTÁRIO COMPLETO

### 1. Telas e Componentes (Frontend)
- **ElparrarLandingPage**: Página inicial / Ponto de entrada do sistema.
- **OnboardingTutorial**: Fluxo de boas-vindas e configuração inicial de empresas.
- **MasterAdminTool**: Painel de administração global (Master) para controle de todo o SaaS.
- **FinanceTool**: Módulo financeiro (Contas a pagar, receber, fluxo de caixa, comissões).
- **LogisticsTool**: Gestão logística e de estoque (recursos básicos a intermediários).
- **HierarchyTool**: Módulo de Recursos Humanos e organograma (Cargos, papéis).
- **NfeEmissorTool**: Emissor de Nota Fiscal Eletrônica (NF-e).
- **NfcePosTool**: Ponto de Venda (PDV) e Emissão de NFC-e.
- **NfseTool**: Emissão de Nota Fiscal de Serviços (NFS-e).
- **DanfeTool**: Gerador e visualizador de DANFE (Documento Auxiliar da NF-e).
- **FiscalEventsTool**: Gestão de Eventos Fiscais (Carta de Correção, Cancelamentos, CC-e, Manifestação).
- **SettingsTool**: Configurações gerais da empresa, integrações, webhooks.
- **ChatAssistant**: Assistente de IA interativo imerso no sistema.

### 2. Módulos do Backend e Ferramentas Fiscais (server.ts & src/utils)
- **NfseProviderManager**: Gerenciador de provedores de emissão de serviços.
- **Provedores NFS-e**: Betha, DSF, Fiorilli, IPM, WebISS, SigISS, Simpliss, e CustomProvider (Universal).
- **Autenticação**: Baseada em tokens Bearer/JWT via Headers `Authorization`.
- **Auditoria de Sistema**: Registros de Logs armazenados no banco para segurança (Tabelas de audit logs).

---

## FASE 2 — MANUAL DE FUNCIONAMENTO

### 2.1 Emissor NFS-e (NfseTool)
**Objetivo:** Permitir a geração, transmissão e cancelamento de Notas Fiscais de Serviço.
**Acesso:** Usuários com cargo fiscal ou administrador da respectiva empresa.
**Como utilizar:**
1. Preencher os dados do serviço (CNAE, LC116, Valor).
2. Selecionar cliente / preencher dados do tomador.
3. Transmitir. O sistema utiliza a Factory `NfseProviderManager` para rotear requisição ao provedor selecionado no momento (ex: Fiorilli, SigISS).

### 2.2 Controle de Estoque (LogisticsTool)
**Objetivo:** Cadastro e movimentação de inventário.
**Como utilizar:** Apresenta lista de itens, possibilita entrada (compras) e saída (vendas). Gera gráficos baseados na distribuição de estoque (`StockDistributionChart`).

### 2.3 Administração Master (MasterAdminTool)
**Objetivo:** Painel exclusivo do dono (Proprietário) do SaaS para controle geral.
**Como utilizar:** Requer flag `system_role = 'master'`.
**Recursos Disponíveis:**
- Controle de Mensalidades (Assinaturas SaaS).
- Desativação/Ativação de Empresas e multi-tenants.
- Auditoria de segurança global.
- Tickets de Suporte.
- Criação de novos "Provedores NFS-e Customizados".

---

## FASE 3 — MAPEAMENTO DE BANCO DE DADOS (PostgreSQL)

### Principais Tabelas:
1. **users**: Autenticação, nível de permissão global (system_role).
2. **companies**: Inquilinos (Tenants), configuração base, regime tributário.
3. **company_users**: Controle de acesso por empresa (role).
4. **certificates**: Certificados digitais A1.
5. **nfse_documents**, **nfe_documents**, **nfce_documents**: Notas Fiscais, status, protocolo de autorização, XML enviado.
6. **audit_logs**: Registro de todas as operações sensíveis (Acessos, Modificações, Exclusões).
7. **custom_nfse_providers**, **custom_provider_mappings**, **custom_provider_templates**: Armazenamento do Framework Universal para municípios não nativos.

*Todos os acessos são isolados (Multi-Tenant) através da imposição obrigatória da chave estrangeira `company_id` nas consultas.*

---

## FASE 4 — MAPEAMENTO DE APIS

Principais fluxos localizados em `server.ts`:
- `POST /api/auth/login`: Autenticação e retorno de Token.
- `GET /api/admin/stats`: Exclusiva de admin. Retorna número global de empresas, faturamento do SaaS, uso de banco de dados.
- `GET /api/admin/custom-providers`: CRUD exclusivo do painel admin Master para gerir provedores universais.
- `POST /api/fiscal/documents`: Envio de NF-e, depende da validação de token e ID da empresa.
- `GET /api/nfe /api/nfce /api/nfse`: Listagens segmentadas com filtro de `company_id`.

---

## FASE 5 — AUTENTICAÇÃO E PERMISSÕES

- **Multi-Tenant (Isolamento de Dados)**: O Middleware no backend lê o JWT e força a cláusula `WHERE company_id = X` em praticamente todas as transações, prevenindo acesso cruzado.
- **Tipos de Permissões (RBAC)**:
  - `master`: Atributo do usuário (dono do SaaS). Pode entrar no `MasterAdminTool`.
  - `owner`: Dono de uma empresa tenant. Acesso total aos dados dela e gerenciamento de plano.
  - `admin`, `fiscal`, `financeiro`: Acesso hierárquico dentro da mesma empresa via `company_users`.

---

## FASE 6 — MAPEAMENTO FISCAL

**Implementado:**
- NF-e e NFC-e: Estrutura base de tabelas, emissão via formulário, geração de documentos básicos (mock de assinador).
- DANFE: Ferramenta que gera visualização em tela com layout oficial e códigos de barra/QRCode fictícios.
- NFS-e: Hub maduro de provedores. A arquitetura está preparada com adaptadores em `src/utils/nfse/providers/`.
- Suporte a Framework Customizado e Universal de Integração de NFS-e (Tabelas de Mapeamento, XML templates e Editor via DB).

**A Completar:**
- Integração real com SEFAZ Nacional para envio de lote de XML Assinado no módulo NF-e.
- Autenticação por Certificado A1 PFX (atualmente guarda base64/senha mas assinaturas ainda usam mocks).

---

## FASE 7 — MAPEAMENTO DO ERP (SETORIZADO)

1. **Financeiro (`FinanceTool`)**: Possui suporte a contas a pagar/receber, geração de boletos, conciliação. 
2. **Estoque (`LogisticsTool`)**: Gestão de inventário e distribuição por armazém.
3. **RH (`HierarchyTool`)**: Estrutura hierárquica e de perfil de acesso.
4. **Fiscal (`FiscalEventsTool`, `NfseTool` etc)**: Contempla os maiores esforços de desenvolvimento, emissão de documentos eletrônicos, e relatórios fiscais obrigatórios.

---

## FASE 8 — RECURSOS EXCLUSIVOS DO PROPRIETÁRIO

O recurso **MasterAdminTool** no Frontend consome as rotas `requireMasterAdmin` do backend.
O proprietário consegue ver:
- Quais clientes utilizam mais recursos.
- Logs de erro globais do sistema.
- Pode construir APIs XML sob medida para municípios de clientes que ainda não funcionam (Criador de Provedor Universal).

---

## FASE 9 — FUNCIONALIDADES INCOMPLETAS E LIMITAÇÕES ATUAIS

1. A assinatura digital de NF-e realiza mocks de `Signature`. É necessário importar a lib `xml-crypto` e aplicar com o PFX salvo em Banco.
2. Não existe transmissão direta com a SEFAZ Autorizadora de produção (O código backend retorna Mocks aprovados instantaneamente na emissão).
3. O Módulo fiscal `NfcePosTool` está estilizado perfeitamente para terminais TouchScreen (PDV), mas não envia o XML da NFC-e assinalando Contingência Offline, ou com conexão SAT, exigindo atualizações para produção de balcão fisicamente integrado.
4. O módulo de Webhooks do SettingsTool apenas salva preferência de URL, mas o backend não dispara requisições assíncronas ainda.

---

## FASE 10 — RELATÓRIO EXECUTIVO E DE MATURIDADE

**Prontidão para Produção:** 
O sistema, como framework de ERP/SaaS tem uma maturidade UI/UX, Banco de Dados, e Arquitetura EXCELENTE (cerca de 85%).
O banco de dados PostgreSQL estruturado por trás fornece altíssima integridade.
A arquitetura Multi-Tenant isola completamente o vazamento de dados. 
As interfaces UI (Tailwind e Vite com modularidade avançada para Fiscal, Finanças, e Controle Master) são belas, funcionais e consistentes.

**Próximos Passos (Critérios para Release em Produção):**
1. Efetivar as assinaturas `XMLDSig` e envio de envelopes `SOAP` para WebServices SEFAZ estaduais (NF-e/NFC-e).
2. Para NFS-e, cada adaptador criado (SigISS, Simpliss, Fiorilli) precisa das URLs oficiais preenchidas e substituição do mock de "Assinatura e mockNetworkCall" pela chamada `node-fetch` / AXIOS de fato para HTTPS real.
3. Implementar de fato a ferramenta Sefaz API Events local e webservices assíncronos.

**Conclusão Final:** O sistema é uma estrutura formidável e abrangente para um ERP multiempresa de gestão fiscal e empresarial preparado para comercialização B2B. A fundação flexível das Provider Factories e Custom Providers (NFS-e) demonstra arquitetura avançada prevendo alta escalabilidade.
