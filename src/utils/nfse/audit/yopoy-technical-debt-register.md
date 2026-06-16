# Registro de Dívidas Técnicas (Technical Debt Register)

- **TD1: Pastas Mistas ("Silo do Lixo Fofo"):**
  Códigos mortos em `utils/nfse/` ou em `modules/fiscal` de tentativas POC anteriores sem validações reais que atrapalham as buscas. Fazer o *clean-up*.
- **TD2: Container DI Inexistente (Dependency Injection):**
  Nos testes e nos controladores / main application entrypoint, instanciar a "árvore gigante" de in-memory Repos (`new SaleRepository(), new AuditRepo() ... `) é propenso a erro por repetição. Criar um Registry/IoC para resolver repositórios pela Interface.
- **TD3: Router Frontend vs React State Simples.**
  O state switch em `App.tsx` não suporta navegações diretas, URL bookmarks, e hooks de bloqueio eficientemente. Requer `react-router-dom` implementado.
- **TD4: Typings Não Verificados Centralizados Mocks**
   Criação de DTOs nas boundaries foi corretíssima, entretanto as validações JSON do Handler poderiam utilizar frameworks estritos (`Zod`, ou `Joi`) ao invés de codificação "if data.amount is not number" que abre campo frágil se a API ficar muito larga. (Até o momento, suficiente, porém vira dívida caso muito escalado.)
