# Plano de Depreciação do state 'currentView'

## Situação Atual
A renderização atual do aplicativo (`App.tsx`) controla sua navegação condicionalmente alterando states locais do React, tais como `activeTab` (ex: `dashboard`, `vendas`, `financeiro`) ou `currentView`. Isso acoplava rigidamente dezenas de componentes na base, impedindo a separação limpa de pacotes dinâmicos e URL tracking (o usuário nunca poderia dar `Ctrl+R` e continuar onde parou, ou mesmo enviar o link a alguém de sua equipe).

## Substituição Iminente - Rotas Formais
Nossa futura abordagem para a gestão do aplicativo dita o fim da navegação state-based. Instalaremos bibliotecas nativas de Roteamento (como o `react-router-dom`).

### Steps Estipulados:
1. **Adição da Dependência:** Instalar React Router V6.
2. **Definição dos Envelopes:** Modularizar os atuais compontes que dependem do `activeTab === 'something'` para seu próprio aquivo `.tsx` puro, transformando-os em páginas autônomas em `src/pages` ou mantidos nas respectivas `features/`.
3. **Migração do Sidebar/Header:** Torná-los componentes globais fora dos blocos individuais, rodando paralelamente em um `<RootLayout>`. Eles agora alterarão o path ativo `router.push('/financeiro')` em vez do booleano visual.
4. **Desconexão do Pass-down Propriedades:** Estados compartilhados não passarão mais via prop root (`App.tsx`). Viverão via Context Providers (como o já iniciado `YopoyClientProvider`).
5. **Erradicação do Componente Inchado:** Limpar o `App.tsx` para abrigar unicamente as Declarações de Rota, limpo e direto.
