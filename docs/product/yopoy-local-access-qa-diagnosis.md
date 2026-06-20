# Yopoy — diagnóstico de acesso local para QA da Central Visual

## Escopo

Este diagnóstico da etapa 49.0-E descreve como preparar o acesso local necessário para testar a Central Visual no navegador. A etapa é exclusivamente documental: não altera servidor, autenticação, cadastro, banco, contratos HTTP ou a implementação da Central.

## Diagnóstico da inicialização local

O script `dev` do `package.json` executa:

```text
tsx server.ts
```

Portanto, o comando usual de inicialização é `npm run dev`, e o servidor local escuta a porta `3000`. O boot depende de variáveis de ambiente, entre elas `DATABASE_URL`. Além da política de boot do banco, o registro atual das rotas administrativas exige essa variável já durante a carga do servidor.

O `server.ts` usa `dotenv.config({ override: true })` sem indicar o caminho de `.env.local`. Assim, o comando atual não carrega `.env.local` automaticamente. No estado observado durante este diagnóstico, `.env` está ausente, `.env.local` existe e contém a chave `DATABASE_URL`; o valor não foi lido nem registrado neste documento.

Para carregar somente essa variável a partir de `.env.local`, sem imprimir ou copiar o segredo para a documentação, o comando seguro sugerido é:

```bash
DATABASE_URL="$(grep '^DATABASE_URL=' .env.local | cut -d= -f2-)" npm run dev
```

Esse comando deve ser executado a partir da raiz do repositório. Ele injeta `DATABASE_URL` apenas no processo iniciado. Se futuramente existir um `.env` com a mesma chave, será necessário revisar o comportamento, pois o `override: true` atual permite que o valor carregado de `.env` substitua uma variável já definida.

## Roteiro mínimo de QA visual

Com o servidor iniciado e o navegador apontando para `http://localhost:3000`, validar em sequência:

1. entrada no app;
2. cadastro e login;
3. home pós-login;
4. Central Visual apresentada como dashboard único, sem dashboard paralelo ou concorrente.

Falhas anteriores a esse fluxo devem ser classificadas primeiro como possíveis falhas de acesso, configuração ou dados locais. Uma falha de ambiente não deve ser confundida com uma regressão da Central Visual.

## Riscos e dependências conhecidos

- `.env.local` não é carregado automaticamente pelo comando atual `npm run dev`.
- O master admin ainda usa a referência legada `admin@elparrar.com`.
- O factory reset depende de um hash fornecido em `YOPOY_FACTORY_RESET_ADMIN_PASSWORD_HASH`; essa chave não foi encontrada em `.env.local` durante o diagnóstico, embora ainda possa ser fornecida externamente ao processo.
- O cadastro inicial está complexo e pode dificultar a chegada ao estado pós-login durante o QA.
- Erros de boot, banco, credenciais ou preparação do ambiente devem ser isolados antes de atribuir a falha à Central Visual.

## Backlog futuro, fora desta etapa

- Simplificar o cadastro inicial para solicitar apenas os dados essenciais da pessoa/usuário.
- Completar os dados da empresa posteriormente, por onboarding progressivo.
- Não implementar essa simplificação na etapa 49.0-E.

## Resultado do diagnóstico

O caminho operacional recomendado para o QA é iniciar o app com `DATABASE_URL` injetada a partir de `.env.local`, confirmar que o servidor responde localmente e então percorrer entrada, cadastro/login, home pós-login e Central Visual. A validação visual permanece separada de correções de ambiente e do backlog de simplificação cadastral.
