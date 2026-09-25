# Implantação

## Requisitos
- Node.js 20+
- PostgreSQL gerenciado
- HTTPS obrigatório
- Object storage privado para certificados
- KMS/serviço de chaves para criptografia

## Variáveis
Copiar .env.example para o gerenciador de segredos da plataforma. Nunca enviar .env ao GitHub.

## Banco
npm install
npm run db:generate
npx prisma migrate deploy
npm run db:seed
npm run build
npm start

## Produção
Usar senha temporária forte no seed e alterá-la no primeiro acesso. JWT_SECRET deve ser aleatório e exclusivo. Certificados A1 somente serão habilitados depois que storage privado + KMS estiverem configurados.
