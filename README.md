# Esportiva Shop

Catálogo de camisas de time com atendimento via WhatsApp, painel
administrativo completo e upload de imagens — projeto fullstack construído
do zero para resolver um problema real de um pequeno negócio de revenda.

🔗 [Ver site no ar](https://seudominio.com.br)

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Prisma + PostgreSQL
- Cloudinary (upload e otimização de imagens)
- Embla Carousel

## Funcionalidades

- Catálogo público com filtro por liga, busca por nome e paginação
- Painel admin protegido por autenticação, com CRUD completo de produtos
- Upload de múltiplas imagens por arraste-e-solte, direto pro Cloudinary
- Geração automática de link do WhatsApp com mensagem pré-preenchida
- Configurações de frete, prazo e contato editáveis sem precisar mexer em código

## Decisões técnicas

- [2-3 parágrafos curtos explicando decisões de arquitetura interessantes,
  tipo por que preço não é fixo, por que o catálogo é único com filtro em
  vez de duas páginas separadas, por que WhatsApp em vez de checkout
  automático]

## Rodando localmente

\`\`\`bash
npm install
npx prisma migrate dev
npm run dev
\`\`\`

## Screenshots

[2-4 imagens do site: home, produto com galeria, admin]
