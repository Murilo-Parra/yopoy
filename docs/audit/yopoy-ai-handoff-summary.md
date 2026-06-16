# Yopoy ERP - AI Handoff Summary (Módulo 47.X)

**ATENÇÃO PARA AGENTES FUTUROS:**
Você está assumindo o ambiente do Yopoy ERP logo após a refatoração do *Domain-Driven Design (Core)*. Esta base de código carrega o peso de uma reestruturação severa para isolar Mocks Fiscais Perigosos e consolidar uma Governança de Negócios pura em TypeScript e In-Memory.

## Impressões Técnicas Atuais:
1. **Application Rules & Domain:** Todo estado de negócio obedece a `src/domain/entities/index.ts`. O acesso lógico acontece em `src/application/use-cases/`. A base exige a identificação `company_id`. Todos os UUIDs e Tipagens importam de um padrão normalizado. Não burle esses contratos.
2. **In-Memory Volátil (Sem Persistência Real):** Toda a operação transacional está roteada para simulações in-memory na pasta `src/infrastructure/in-memory/`. NÃO escreva SQL explícito nos repositórios in-memory. 
3. **Barreiras de Controle (Backend Handlers):** Os pontos de entrada lógicos da aplicação são exclusivamente encontrados em `src/backend/handlers`. Não utilize Express no modo convencional chamando lógica inline; consuma os Usecases, empacote o retorno e garanta `ApiErrorMapper`. 
4. **Bloqueio de Emissões (Risco Zero):** Chamadas para a SEFAZ real, gerações de XML com assinaturas expostas foram **fisicamente travadas com erro 403** (verifique `draftInvoices.handlers.ts`). Isso é deliberado. O escopo foca apenas no registro contábil e criação de rascunhos (*Drafts*).
5. **FRONTEND CAÓTICO:** Todo o conteúdo de `src/components/` é resquício da era antiga ("Elparrar/Auxiliar Contábil") com Mock puro em UI. Considere todo o App.tsx e *Tools components como LIXO. Sua missão é não propagá-los e substitui-los ativamente por instâncias limpas roteadas com fetch HTTP para as novas APIs dos Handlers.

## Seus Próximos Passos Obrigatórios
- Interaja consumindo os Handlers sem invadir Modelos diretos no React.
- Utilize React Router.
- Apague as centenas de pastas /utils/nfse. Elimine scripts '.cjs' abandonados.
- Trate sempre a dicotomia Front-Caótico vs Back-Limpo com honestidade técnica. 
