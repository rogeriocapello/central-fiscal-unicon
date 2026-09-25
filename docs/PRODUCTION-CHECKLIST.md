# Checklist de produção

- [ ] Criar PostgreSQL gerenciado com backups e criptografia.
- [ ] Definir DATABASE_URL somente no gerenciador de segredos.
- [ ] Gerar JWT_SECRET aleatório com alta entropia.
- [ ] Definir senha temporária do Master e exigir troca.
- [ ] Habilitar HTTPS e domínio.
- [ ] Configurar object storage privado e KMS para A1.
- [ ] Configurar retenção e revisão dos AuditLog.
- [ ] Testar restauração de backup.
- [ ] Revisar permissões das integrações Domínio/SIEG/SEFAZ.
- [ ] Nunca registrar senha do certificado em logs.
- [ ] Fazer teste de acesso com cada perfil antes de produção.
