# Inventário de Branding Antigo

Embora sem impacto de alto risco arquitetural, a aplicação espalha menções à sua origem (Elparrar / Auxiliar Contábil). A limpeza profunda desta taxonomia ocorrerá no futuro; a listagem abaixo engloba os maiores infratores.

## Textos Falsos ou Desatualizados
- `src/components/ElparrarLandingPage.tsx`: Como o nome sugere, ainda simula uma centralizadora Landing para a empresa Elparrar.
- A variável central no "Plan selection" dentro do `App.tsx` descreve a tela Ativa como "Página Inicial de Planos de Elparrar".
- Referências a 'Auxiliar Contábil' que podem emergir dependendo do Tenant logado (dados em Memória ou via Banco).

*Resolução Atual:* Como estes são apenas artefatos visuais / textuais, eles foram preservados neste módulo, aguardando refatoração estética futura em favor da verdadeira identidade Yopoy ERP.
