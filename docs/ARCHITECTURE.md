# Arquitetura v0.2

Frontend/API: Next.js.
Banco: PostgreSQL via Prisma.
Autenticação: sessão assinada; produção deve usar cookie HttpOnly/Secure e rotação de segredo.
Certificados: somente referência criptografada no banco; arquivo A1 deve ficar em object storage privado com KMS.
Auditoria: tabela AuditLog para eventos sensíveis.

## Perfis
MASTER: configuração estrutural, usuários, integrações e auditoria.
ANALYST: operação fiscal autorizada.

## Próximos conectores
Domínio e SIEG dependem das APIs/credenciais contratadas. SEFAZ depende do fluxo aplicável a cada serviço/UF e certificado do contribuinte.
