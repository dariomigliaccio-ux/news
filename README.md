# País do Mês e Newsletter

Este é um projeto Next.js customizado para a listagem mensal de orações por países e newsletters.

## Tecnologias
- **Next.js 15+ (App Router)**
- **Tailwind CSS**
- **Prisma ORM**
- **MySQL (GoDaddy)**
- **Lucide React (Ícones)**

## Configuração para GoDaddy

1. **Banco de Dados**:
   - Acesse o painel da GoDaddy e crie um banco de dados MySQL chamado 'news'.
   - Certifique-se de que o usuário 'admin_news' tem permissões totais no banco.

2. **Variáveis de Ambiente**:
   - No arquivo .env, a connection string está configurada para o localhost da GoDaddy.
   - DATABASE_URL="mysql://admin_news:Locadb987%23%40@localhost:3306/news"

3. **Deploy**:
   - Execute 'npm install' e 'npm run build'.
   - Execute 'npx prisma db push' para criar as tabelas no MySQL da GoDaddy.

4. **Painel Admin**:
   - Acesse o caminho '/admin' para configurar os textos e links.

## Funcionalidades
- Banner moderno com cantos arredondados.
- Cards mensais com botões de download.
- Lógica de reset anual automático.
- Totalmente responsivo.
