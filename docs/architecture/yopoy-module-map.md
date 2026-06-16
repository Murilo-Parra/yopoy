# Yopoy Module Map

| Módulo | Responsabilidade | Camada Permitida | Dados Sensíveis | Testes Obrigatórios |
| - | - | - | - | - |
| auth | Autenticação e Sessão | Backend | Sim | Auth Isolation |
| companies | Gerenciamento de Tenant | Backend | Sim | RLS Isolation |
| memberships | Relação Usuário-Empresa | Backend | Sim | Permission Check |
| users | Perfis e Dados de Usuário | Backend | Sim | RLS Isolation |
| customers | Cadastro de Clientes | Backend | Sim | RLS Isolation |
| products | Catálogo de Produtos | Backend | Sim | RLS Isolation |
| services | Catálogo de Serviços | Backend | Sim | RLS Isolation |
| sales | Vendas e Pedidos | Backend | Sim | Unit of Work, RLS Isolation |
| payments | Recebimentos e Faturamento | Backend | Sim | Unit of Work, RLS Isolation |
| inventory | Estoque | Backend | Sim | Unit of Work |
| accounting | Contabilidade Integrada | Backend | Sim | RLS Isolation |
| fiscal | Documentos Fiscais (NFe, etc) | Backend | Sim | Guard Rails |
| audit | Logs e Rastreadores | Backend | Sim | RLS Isolation |
| security | Validações e Boundary | Backend | Não | Security Gate |
| attachments | Geração de PDFs/Anexos | Backend | Sim | RLS Isolation |
| settings | Configurações Extras | Backend | Não | Form validation |

- **Dependências permitidas:** Módulos estritamente isolados da UI.
- **Dependências proibidas:** Frontend importando Use Cases diretos ou lógicas de infra (pg, sefaz).
