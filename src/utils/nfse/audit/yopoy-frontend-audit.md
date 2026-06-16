# Auditoria do Frontend (src/components / App.tsx)

O foco do projeto esteve inteiramente concentrado em Back End Boundaries na fase 47.1/2, portanto a UI permaneceu defasada em relação aos novos preceitos de Módulos estabelecidos. 

## Análise Atual (Components & Shell)
- `DesktopShell` / `ResponsiveAppShell` / `MobileShell`: Estão servindo Mocks Estáticos baseando a mudança via estado `React State`. O layout não é engatilhado por Rotas URL (Browser Routing). 
- Menções obsoletas a "Elparrar" e ferramentas como `NfeEmissorTool`. 
- Existem componentes massivos que unem a renderização CSS a Regras de Negócio e "States Complexos" isolados de qualquer Fetch Backend. 

## Classificação do Frontend:
- **Telas MVP (Central do Dia / Caixa):** PRECISA REESCREVER e adequar para utilizar `fetch()` nas rotas / handlers.
- **Telas Legadas (Mock, Fiscal):** MOCKADO e RISCO DE REGRESSÃO caso sejam conectadas ou mantidas abertamente nas gavetas/menus em produção. 
- **Interface Gráfica e CSS (Tailwind):** PRONTO PARA CONECTAR BACKEND (O design system visual em si pode ser reutilizado perfeitamente). 

O próximo passo inegociável é limpar o Front-end e plugar o framework unificado React Router + Chamadas de Fetch no Backend mock Server.
