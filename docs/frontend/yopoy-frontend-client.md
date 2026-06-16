# Yopoy Frontend Client

## Overview

O `YopoyFrontendClient` serve como principal ponte de comunicação entre os fluxos do React e os Use Cases do Backend do sistema. Ele blinda o React de ter que importar ou acessar instâncias de Domínio, Repositórios ou mesmo conhecer as interfaces complexas da nossa lógica de negócios. O Client simula uma "Requisição HTTP", garantindo que todo envio de dados passe pelo funil de entrada estrito da nossa Boundary (`Handlers`).

## Estrutura Atual

- Baseado puramente nos Handlers definidos no `src/backend/handlers`.
- Opera de forma *framework agnóstica* devolvendo ao componente final sempre e somente o objeto universal de resposa: `ApiResponse<T>`.

### Request Context (Simulado)
Em modo local, o contexto do usuário que assina a autoria de qualquer transação é imitado temporariamente pelo pacote `devRequestContext`:

```ts
export const devRequestContext: RequestContext = {
  companyId: 'company_demo_001',
  userId: 'user_demo_owner',
  requestId: crypto.randomUUID()
};
```

Esse objeto deve futuramente ser amarrado a um Identity Provider (ex: Supabase Auth), mapeando um token real.

## Uso Básico

```tsx
import { useYopoyClient } from '../frontend-api';

const MyComponent = () => {
    const client = useYopoyClient();

    const doSomething = async () => {
        const response = await client.createSale({ ... payload });
        if(response.success) {
           console.log("Success! ID:", response.data.id);
        } else {
           console.error(response.error.message); // Tipado do Backend
        }
    }
}
```

## Benefícios Diretos
Não há mais dados visuais puramente locais soltos; todas as ações dependentes de negócio passam primeiro pelo crivo do backend injetado in-memory.
