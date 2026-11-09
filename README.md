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

-   [ x ] Node 26
-   [ x ] Next.js 16 (App Router, Cache Components) + React 19
-   [ x ] TypeScript 7
-   [ x ] Tailwind CSS v4 + tailwind-variants + tailwind-merge
-   [ x ] nuqs (busca e filtros na URL)
-   [ x ] Playwright + axe (testes e acessibilidade)
-   [ x ] Framer Motion
-   [ x ] next-intl (português e inglês)
-   [ x ] Hygraph (CMS)
-   [ x ] Biome + Ultracite

## :hammer_and_wrench: Features 

-   [ x ] Página inicial com apresentação, conhecimentos (9 por vez, com "Ver mais"), projetos em destaque, experiência e formação.
-   [ x ] Lista de projetos com paginação de 9 em 9 (grade de 3 colunas) (`/projects`, `/projects/page/2`...) e página de detalhes de cada projeto.
-   [ x ] Busca de projetos por nome, descrição ou tecnologia, sem diferenciar acentos, com filtro por tecnologia e link compartilhável.
-   [ x ] Ctrl + K (⌘ + K no Mac) abre o modal de busca em qualquer página, com páginas e projetos separados, ícones, miniaturas e atalhos de teclado. A busca fica na URL (`?search=`), e a tela de projetos mostra essa dica.
-   [ x ] Compartilhar projeto (copiar link e WhatsApp).
-   [ x ] Formulário de contato, com validação e página de privacidade.
-   [ x ] Tema claro e escuro.
-   [ x ] Português e inglês, com detecção do idioma do navegador.

## 📲 Executando o projeto

Requisitos: **Node 26** (fixo em `.nvmrc` e em `engines`, e também é a versão usada no Vercel e na CI) e pnpm 11 (fixo em `packageManager` no `package.json`; com o corepack ativo, ele é usado automaticamente).

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
| `NEXT_PUBLIC_SITE_URL` | Opcional: endereço do site usado no SEO (padrão: `https://silasmartins.vercel.app`) |

Sem `HYGRAPH_URL` e `HYGRAPH_TOKEN`, ou se a Hygraph falhar, o site abre com conteúdo de exemplo.

| Comando | O que faz |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm lint` | Verifica lint e formatação (Ultracite) |
| `pnpm format` | Corrige lint e formatação |
| `pnpm type-check` | Checagem de tipos |
| `pnpm i18n:check` | Confere se português e inglês têm as mesmas chaves |
| `pnpm test:e2e` | Testes no navegador e acessibilidade (rode `pnpm build` antes) |

Use sempre o pnpm: o `pnpm-lock.yaml` é o mesmo que o Vercel instala.

## 🎨 Padrões de interface

-   Cores, raios, fontes e sombras só por tokens, definidos em `src/app/[locale]/globals.css`.
-   Componentes genéricos ficam em `src/components/ui` e são importados de `@/components/ui`.
-   Componente com variantes usa `tailwind-variants`; sem variantes, usa `cn` (`tailwind-merge`). Detalhes em `src/components/ui/CLAUDE.md`.

## 🗂️ Estrutura

| Pasta | O que tem |
| --- | --- |
| `src/app/[locale]` | Páginas, layout e telas de erro, por idioma |
| `src/app/api/contact` | Rota do formulário de contato |
| `src/components` | Seções do site; `src/components/ui` tem os componentes genéricos |
| `src/lib` | Dados dos projetos, busca, validação e configuração do site |
| `messages` | Textos em português e inglês |
| `e2e` | Testes no navegador (Playwright e axe) |
| `scripts` | Conferência de traduções e geração de ícones e da imagem de compartilhamento |

## ✅ Qualidade

A cada push e pull request, a CI (`.github/workflows/ci.yml`) roda em Node 26: confere se nenhum arquivo `.env` foi para o Git e executa lint, tipos, traduções, build e testes. Ela não usa os dados da Hygraph, então os testes funcionam com o conteúdo de exemplo.

Os testes de acessibilidade usam o axe, que verifica contraste, nomes de botões e links, rótulos e títulos nos temas claro e escuro. Eles não substituem um teste com leitor de tela.

Para gerar de novo os ícones e a imagem de compartilhamento a partir do logo:

```bash
node scripts/generate-brand-assets.mjs
```

## 📝 Conteúdo na Hygraph

-   Cada idioma (`pt_BR` e `en`) guarda o próprio texto; corrija nos dois e publique.
-   O plano da Hygraph permite só dois idiomas (`pt_BR` e `en`), por isso o site não tem espanhol. Links antigos `/es` vão para o inglês.
-   Ícones de conhecimentos e redes sociais são SVG em texto. Prefira SVG de uma cor com `fill="currentColor"`: o site pinta o ícone com a cor do tema e deixa todos do mesmo tamanho.
-   O site guarda o conteúdo em cache por 1 dia: uma alteração pode levar até um dia para aparecer. Na sua máquina, apague a pasta `.next/cache/fetch-cache` para ver na hora.

## 🛡️ Segurança e desempenho

-   Cabeçalhos de segurança (contra clickjacking e outros) configurados em `next.config.mjs`.
-   O formulário de contato aceita até 5 mensagens por IP a cada 10 minutos.
-   Todas as imagens passam pela otimização do Next.js (AVIF ou WebP, no tamanho certo para cada tela).
-   O Dependabot abre um único pull request por semana com todas as atualizações.

## 🔒 Privacidade

O site segue a LGPD. A política completa está em `/privacy`, em português e inglês: quem controla os dados, base legal, cookies, fornecedores (Discord, Vercel e Hygraph), transferência internacional, prazos, direitos do titular e ANPD.

O formulário de contato coleta nome, email e mensagem. O site não tem contas, banco de dados próprio nem ferramentas de análise, e só usa armazenamento essencial (cookie de idioma e tema no navegador). Se isso mudar, atualize a política nos dois idiomas; cookies de análise ou marketing exigem um aviso de consentimento antes.

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
