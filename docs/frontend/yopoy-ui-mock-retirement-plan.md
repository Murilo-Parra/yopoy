# Plano de Aposentadoria de Mocks Visuais na UI

## O Legado Visual
Antes desta transição arquitetural de fronteiras (`Boundary Alignment`), o Yopoy foi inflado com centenas de "Cards Mocks": estatísticas rígidas criadas estaticamente nos componentes, gráficos preenchidos por JSON Fake e dados de array React state que fingiam mutar para simular interatividade real (Como transações locais que evaporavam num Shift+F5). 

## Progressão das Substituições

**Fase Atual (Módulo 47.D):** 
Os blocos super-críticos foram enxertados primeiro. Substituímos a "Geração Abstrata de Venda e Dinheiro Falso" na central por operações tangíveis via `YopoyFrontendClient` que bate no in-memory Backend real.

**Próximas Fases:**
1. **Substituição dos Gráficos Duros:** 
Onde as labels preenchiam `"R$ 20.000,00"`, iniciaremos a adoção de um Endpoints unificados nas Handlers Analytics/Ledger que consolida o que de fato o usuário obteve.
2. **Cards Falsos Remanescentes (Logistics, Finance):**
Através dos módulos onde o usuário finge ver um mapa com frota ou fluxo em andamento, transformá-los de volta em esqueletos visuais marcando-os em modo "Coming Soon". O que ditará a construção do Front dessas partes será o Backend. No Yopoy, o componente segue o Backend e nunca mais o Backend construído para servir um mock UI feito anteriormente.

Esse descarte sistemático de Mock garantirá um produto "limpo e crú". Esteticamente menos opulento no início, mas funcionalmente puro e escalável a Banco Distribuído. 
