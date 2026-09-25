# Segurança

Nunca versionar certificados digitais, chaves privadas ou senhas no GitHub.

## Diretrizes
- Certificados A1 devem ser armazenados criptografados fora do repositório.
- Senhas devem usar cofre de segredos e criptografia em repouso.
- Toda leitura/alteração de credenciais deve gerar trilha de auditoria.
- Mudanças estruturais ficam restritas ao perfil MASTER.
- Integrações com SEFAZ, Domínio e SIEG devem usar credenciais por ambiente e princípio do menor privilégio.
