# Yopoy Security Gate Plan

Futuramente, o comando principal será:

```bash
npm run security:all
```

Neste momento, garantimos o Security Gate mínimo com:

```bash
npm run security:frontend-boundary
```

Critério Mínimo para Operação Segura:
- `security:frontend-boundary PASS`
- `db:native:test PASS`
- `lint PASS`
- `typecheck PASS`
- `build PASS`
