# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. run `npm run dev:server`

# API Mind NerdApp

---

## 🚀 Sobre o Projeto

A API Mind NerdApp é o backend da aplicação de gerenciamento de artigos e interações sociais na área de tecnologia da informação. Construída com Node.js, Express e TypeORM, a API oferece endpoints seguros para cadastro, autenticação, upload de imagens, e controle de likes entre usuários. É uma estrutura robusta, escalável e preparada para produção, garantindo a integridade e performance dos dados.

---

## 🛠 Tecnologias Utilizadas

### Linguagens e Frameworks

- **Node.js**  
  Ambiente de execução JavaScript do lado servidor.

- **TypeScript**  
  Superset do JavaScript com tipagem estática para maior segurança.

- **Express.js**  
  Framework minimalista para construção de APIs REST.

- **TypeORM**  
  ORM para facilitar operações com bancos de dados relacionais usando TypeScript.

---

### Banco de Dados

- **MySQL**  
  Banco de dados relacional utilizado para armazenar usuários, artigos, likes e demais informações.

---

### Outras Dependências e Ferramentas

- **bcryptjs**  
  Para hashing seguro de senhas.

- **jsonwebtoken**  
  Implementação de JWT para autenticação e autorização.

- **cors**  
  Middleware para permitir requisições cross-origin.

- **multer**  
  Middleware para upload e manipulação de arquivos (imagens).

- **sharp**  
  Biblioteca para manipulação e otimização de imagens.

- **express-async-errors**  
  Tratamento de erros assíncronos de forma simples.

- **ts-node-dev**  
  Ferramenta para desenvolvimento com hot-reload em TypeScript.

- **reflect-metadata**  
  Dependência essencial para o funcionamento do TypeORM.

---

## ⚙️ Funcionalidades Principais

- **Cadastro e autenticação de usuários**  
  Criação de contas, login com JWT, e segurança no armazenamento de senhas.

- **Gerenciamento de artigos**  
  Criação, edição, listagem e exclusão de artigos com campos completos.

- **Interação social**  
  Sistema de likes/deslikes por usuário, mantendo integridade e contagem correta.

- **Upload e manipulação de imagens**  
  Upload de fotos para artigos e usuários, com processamento via Sharp para otimização.

- **Tratamento global de erros**  
  Middleware para captura e resposta uniforme de erros.

---
