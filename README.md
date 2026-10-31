<h1 align="center">
  <img alt="Portfólio" height="80" title="Portfolio" src="./src/app/favicon.ico" />
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/github/license/silasfmartins/portfolio">
</p>


## 💻 Projeto
Site que concentra todos os meus projetos, experiências e conhecimentos. O conteúdo vem da Hygraph (CMS) e o site está em português e inglês.

## 🔃 Requisitos para utilizar

É necessário ter um navegador e internet acessar a aplicação.

## ✨ Tecnologias

-   [ x ] Next.js 16 (App Router, Cache Components) + React 19
-   [ x ] TypeScript 7
-   [ x ] Tailwind CSS v4 + tailwind-variants + tailwind-merge
-   [ x ] Framer Motion
-   [ x ] next-intl (português e inglês)
-   [ x ] Hygraph (CMS)
-   [ x ] Biome + Ultracite

## :hammer_and_wrench: Features 

-   [ x ] Página inicial com apresentação, conhecimentos, projetos em destaque, experiência e formação.
-   [ x ] Lista de projetos com paginação de 10 em 10 (`/projects`, `/projects/page/2`...) e página de detalhes de cada projeto.
-   [ x ] Formulário de contato.
-   [ x ] Tema claro e escuro.
-   [ x ] Português e inglês.

## 📲 Executando o projeto

Requisitos: Node 26 e pnpm 11 (a versão fica fixa em `packageManager` no `package.json`; com o corepack ativo, ela é usada automaticamente).

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev
```

Variáveis de ambiente (`.env.local`):

| Variável | Para que serve |
| --- | --- |
| `HYGRAPH_URL` | Endpoint GraphQL da Hygraph |
| `HYGRAPH_TOKEN` | Token de leitura da Hygraph |
| `WEBHOOK_URL` | Para onde o formulário de contato envia a mensagem |

Sem `HYGRAPH_URL` e `HYGRAPH_TOKEN`, ou se a Hygraph falhar, o site abre com conteúdo de exemplo.

| Comando | O que faz |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm lint` | Verifica lint e formatação (Ultracite) |
| `pnpm format` | Corrige lint e formatação |
| `pnpm type-check` | Checagem de tipos |

Use sempre o pnpm: o `pnpm-lock.yaml` é o mesmo que o Vercel instala.

## 🎨 Padrões de interface

-   Cores, raios, fontes e sombras só por tokens, definidos em `src/app/[locale]/globals.css`.
-   Componentes genéricos ficam em `src/components/ui` e são importados de `@/components/ui`.
-   Componente com variantes usa `tailwind-variants`; sem variantes, usa `cn` (`tailwind-merge`). Detalhes em `src/components/ui/CLAUDE.md`.

## 📝 Conteúdo na Hygraph

-   Cada idioma (`pt_BR` e `en`) guarda o próprio texto; corrija nos dois e publique.
-   Ícones de conhecimentos e redes sociais são SVG em texto. Prefira SVG de uma cor com `fill="currentColor"`: o site pinta o ícone com a cor do tema e deixa todos do mesmo tamanho.
-   O site guarda o conteúdo em cache por 1 dia: uma alteração pode levar até um dia para aparecer. Na sua máquina, apague a pasta `.next/cache/fetch-cache` para ver na hora.

## 🆚 Versionamento / Versioning

Esse projeto não possui um sistema de versionamento.

## 🆙 Projeto no ar

É possível acessar a aplicação através da URL: https://silasmartins.vercel.app/ .

## 👨‍💻 Contribuir / Contributing

Deseja contribuir com o projeto? [Passo a passo para contribuir](https://github.com/silasfmartins/portfolio/blob/main/Contributing.md)

## 💿 Histórico / History

Consulte [Releases](https://github.com/silasfmartins/portfolio/releases) para ter um changelog completo.

## 📄 Licença do Projeto/License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/silasfmartins/portfolio/blob/main/LICENSE) © Silas Martins para mais detalhes.

<br />
