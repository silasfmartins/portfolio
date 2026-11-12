# Contribuindo/Contributing

## PT-BR

Requisitos: Node 26 e pnpm 11 (`corepack enable`). Veja como rodar o projeto no [README](README.md).

1. Crie um fork!
2. Crie sua feature branch: git checkout -b my-new-feature |
3. Adicione os arquivos modificados: git add .
4. Faça um Commit com suas alterações: git commit -m "Add some feature"
5. Faça um push da sua branch: git push origin my-new-feature
6. Envie um Pull Request para esse repositório

- Adicione um título e uma descrição que deixe claro sua sugestão

Antes de abrir o Pull Request, rode:

```bash
pnpm lint && pnpm type-check && pnpm i18n:check && pnpm build
```

Os testes no navegador (`pnpm test:e2e`) estão pausados por enquanto.

### Depois que seu pull request for mergeado

Depois que seu pull request for mergeado, você pode apagar sua branch.

## en-US

Requirements: Node 26 and pnpm 11 (`corepack enable`). See how to run the project in the [README](README.md).

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Add files changed: git add .
4. Commit your changes: git commit -m "Add some feature"
5. Push to the branch: git push origin my-new-feature
6. Submit a pull request

- Add a title and a description that make your suggestion clear :).

Before opening the pull request, run:

```bash
pnpm lint && pnpm type-check && pnpm i18n:check && pnpm build
```

The browser tests (`pnpm test:e2e`) are paused for now.

### After your pull request is merged

After your pull request is merged, you can safely delete your branch.