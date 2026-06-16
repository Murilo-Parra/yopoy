# Contract Usage: Frontend & Backend do Yopoy

## Abstração da Comunicação

A fronteira de alinhamento (`Boundary Alignment`) do ERP não expõe o Backend de forma solta. Existe um contrato bem definido garantindo segurança e tipagem limpa:

### Os DTOs
O Contrato entre Frontend Client e os Handlers Backend acontece através de pacotes tipados localizados em `src/backend/dtos/`.
Sempre que uma nova Feature nasce, novos tipos `Request` e interfaces de `Response` são escritos em `.dto.ts`. O Front apenas consome isso de forma declarativa.

Exemplo em `sales.dto.ts`:
```ts
export interface CreateSaleRequest {
  customerName?: string;
  customerDocument?: string;
}

export interface SaleResponse {
  id: string;
  status: string;
  totalAmount: number;
  items: Array<{ productId: string; qty: number; unitValue: number }>;
}
```

### O Validativo
Nenhum dado é jogado na Boundary sem que seja conferido por um *Validator Funcional* (ex.: `yopoyZodValdiator` ou manual validation dependendo de nossa implementação). Este contrato assegura que erros crassos devolvam no formato amigável JSON e caia na variável `response.error` com atributos de `.details` na tela do usuário, dispensando blocos complexos de `try-catch` no ecossistema do React.

### Arquitetura Final de Ciclo de Vida:
1. `React` dispara um Evento de UI (Click onClick).
2. O componente chama o `YopoyFrontendClient` provendo um `RequestPayload`.
3. O `YopoyFrontendClient` insere o `devRequestContext` do usuário da sessão logada.
4. O `Handler` respectivo é acionado pela referência injetada do `AppContainer`.
5. O `Handler` executa as restrições sanitizantes e repassa ao `UseCase`.
6. O `UseCase` devolve o `Result` com/sem sucesso baseando-se no `InMemory Repository` ou Lógica de Domínio.
7. O `Handler` envelopa isso num padrão `ApiResponse`.
8. O `Frontend Client` devolve em promessa assíncrona ao React.
9. A Tela dá reflete o feedback ao usuário.
