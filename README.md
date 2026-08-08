# Esportiva Shop — Catálogo

Catálogo de camisas de time com fechamento de venda no WhatsApp. Sem checkout
automático de propósito: preço final e prazo são combinados por mensagem,
porque custo e prazo de importação variam demais pra automatizar com
segurança.

## Stack

- **Next.js 15 (App Router) + TypeScript**
- **Tailwind CSS v4**
- **Prisma + SQLite** (em produção, troca fácil pra Postgres — ver seção Deploy)
- Sem NextAuth: login do admin é senha única + cookie, de propósito, pra ficar
  simples de entender e manter (só vocês dois usam)
- Imagens: link direto (Yupoo ou qualquer host), sem upload próprio por
  enquanto

## Rodando localmente (primeira vez)

Você vai precisar do **Node.js 18+** instalado.

```bash
# 1. instalar as dependências
npm install

# 2. criar o banco de dados local (SQLite) a partir do schema
npx prisma migrate dev --name init

# 3. (opcional, mas recomendado) popular com produtos de exemplo
npx prisma db seed

# 4. rodar o projeto
npm run dev
```

Abre **http://localhost:3000** — é o catálogo.
Abre **http://localhost:3000/admin** — é o painel (pede login).

A senha do admin fica no arquivo `.env`, na variável `ADMIN_PASSWORD`.
**Troque essa senha antes de usar de verdade** — já vem um valor de exemplo
(`troque-esta-senha`).

> Nesta sandbox onde eu montei o projeto, não consegui rodar
> `npx prisma generate` porque o download do "engine" do Prisma é bloqueado
> pela rede daqui. Isso é só uma limitação deste ambiente de construção — no
> seu computador, com internet normal, o passo 2 acima já faz esse generate
> sozinho e funciona liso. Se aparecer algum erro de tipo do
> `@prisma/client` no seu editor antes de rodar `npm install` +
> `prisma migrate dev`, é só isso: falta gerar o client, e some assim que
> você rodar os comandos acima.

## Estrutura do projeto

```
app/
  page.tsx              → catálogo público (home)
  admin/
    login/page.tsx       → tela de login
    page.tsx              → lista de produtos (CRUD)
    produtos/novo/         → cadastrar produto
    produtos/[id]/          → editar produto
    configuracoes/page.tsx  → WhatsApp, frete, prazos (editável sem mexer em código)
    actions.ts              → todas as server actions (login, salvar, excluir)
components/
  ProductCard.tsx    → card do produto (o elemento visual "assinatura")
  ProdutoForm.tsx    → formulário reusado em novo/editar produto
  FilterBar.tsx      → filtro "todo catálogo" x "só entrega rápida"
  WhatsappButton.tsx → monta o link wa.me com mensagem pronta
lib/
  whatsapp.ts   → lógica de montar o link do WhatsApp
  format.ts     → formatação de preço ("A partir de R$X")
  auth.ts       → autenticação simples do admin
  prisma.ts     → cliente do Prisma
prisma/
  schema.prisma → modelo de dados
  seed.ts       → dados de exemplo pra já ver o site funcionando
middleware.ts   → protege tudo em /admin, exceto /admin/login
```

## Decisões de design (pra explicar em entrevista)

- **1 catálogo único, não dois separados** — todo produto tem um campo
  `disponivelNacional`. Quem tem fornecedor nacional ganha o selo "pronta
  entrega"; o filtro é um simples `WHERE disponivelNacional = true`, não uma
  página diferente.
- **Preço único visível (`precoVenda`), custos internos separados**
  (`custoNacional`, `custoInternacional`) — o cliente nunca vê os custos, só
  vocês no admin. Isso separa claramente "preço de venda" de "controle de
  margem".
- **Frete e prazo são configuráveis (tabela `ConfigLoja`), não fixos no
  código** — porque você mesmo apontou que a taxa de importação muda com a
  legislação. Trocar isso não deveria exigir mexer em código nem fazer
  deploy.
- **Sem checkout automático** — dado o histórico real (prazo variando de 20 a
  quase 60 dias, taxa mudando), fechar preço/prazo manualmente no WhatsApp é
  mais seguro do que prometer algo automatizado que pode não se sustentar.

## Estilo visual

A identidade parte da etiqueta de gola de camisa de time (aquela etiqueta
costurada com o tamanho) em vez do visual genérico de e-commerce: o card do
produto tem o "furo" de etiqueta no canto e uma linha pontilhada tipo costura
separando a foto das infos. Paleta: verde campo escuro (`--pitch`), branco
giz (`--chalk`), dourado de refletor (`--gold`) pro CTA, verde grama
(`--grass`) só pro selo de entrega rápida.

## Próximos passos sugeridos

1. Trocar `ADMIN_PASSWORD` no `.env`
2. Rodar o seed, entrar no admin e cadastrar seus primeiros ~30 produtos reais
   (nome, time, preço, tamanhos, se tem no nacional, link das fotos do Yupoo)
3. Configurar o WhatsApp real em `/admin/configuracoes`
4. Testar em celular (é de onde a maioria vai acessar)

## Deploy (quando estiver pronto pra ir ao ar)

- **Vercel** (grátis): conecta o repositório e já builda o Next.js sozinho —
  aí sim plugar o domínio `esportivashop.com.br` que vocês já têm.
- **Banco em produção**: SQLite não é ideal pra produção na Vercel (o sistema
  de arquivos não é persistente entre deploys). Trocar pra **Postgres**
  (ex: Supabase, plano free) é só mudar `provider = "sqlite"` pra
  `"postgresql"` no `schema.prisma` e a `DATABASE_URL` no `.env` — o resto do
  código não muda.
