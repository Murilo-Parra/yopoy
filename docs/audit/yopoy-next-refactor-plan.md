# Plano de Refatoração Próxima Fila (Módulo 47.C e Frontend)

O presente documento formaliza a passarela técnica do ERP rumo ao final da Refatoração Core M47.

## Passos para o 47.C (Injeção de Dependências - DI)
1. Abandonar a instanciação caótica e engessada de cada handler no Backend Limpo (ex: `new SaleRepositoryInMemory()`).
2. Introduzir um Container de Inversão de Controle ou um módulo de registro nativo (`Awilix`, ou um Singleton ServiceLocator simples).
3. Conectar a Factory a todos os Controllers para que sejam dinamicamente trocáveis por uma camada DB Real (o ORM) sem quebrar testes ou as lógicas Use-Case.

## Passos para Integração Frontend (Align V2)
1. Instatar o `react-router-dom` para banir a navegação rústica por "switch-cases" no `App.tsx`.
2. Criar uma API Library Cliente (`src/api/*` ou equivalente) mapeada sob `fetch()` ou `axios` engatilhado na base path `/api/v2/`.
3. Conectar aos poucos as páginas essenciais (Vendas, Recebimentos e Dashboard) aos controladores limpos no Back-end, desfazendo a rede de mentiras atreladas ao localstorage Mocks.
