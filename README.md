# Mundo Star Wars Front

Aplicação React + TypeScript que consome a API SWAPI.dev e uma API backend personalizada, exibe cards de entidades do universo Star Wars, possui autenticação real e rotas protegidas.

## Funcionalidades

### 🔍 Busca SWAPI
- Busca por filmes, personagens e planetas do Star Wars via SWAPI.dev
- Exibição de cards com detalhes específicos por categoria
- Interface responsiva com animações

### 🔐 Autenticação
- Sistema de login e cadastro real conectado ao backend
- Proteção de rotas privadas
- Gerenciamento de tokens JWT
- Persistência de sessão
- Validação de formulários

### 📱 Interface
- Design responsivo inspirado no universo Star Wars
- Componentes reutilizáveis (Card, Navbar)
- Animações e transições suaves
- Feedback visual para loading e erros

### 🎯 Páginas
- **Home**: Busca por conteúdo SWAPI + acesso a itens privados
- **Login/Cadastro**: Autenticação de usuários
- **Itens**: Página privada com conteúdo exclusivo (requer autenticação)
- **Sobre**: Informações sobre o projeto

## Tecnologias

- **Frontend**: React 19, TypeScript, React Router DOM
- **Styling**: CSS3 com animações e design responsivo
- **APIs**: SWAPI.dev + Backend personalizado (Spring Boot)
- **Testes**: Jest, Testing Library
- **Build**: Vite
- **Linting**: ESLint

## Como rodar o projeto

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Backend API rodando em `http://localhost:8080` (opcional para funcionalidades completas)

### Instalação

1. **Clone o repositório e instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   - O arquivo [.env](.env) já está configurado para desenvolvimento local
   - Ajuste `REACT_APP_API_URL` se necessário

3. **Rode o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - A aplicação funcionará parcialmente sem o backend (busca SWAPI funcionará)

## Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run test     # Executa testes
npm run lint     # Verifica código com ESLint
```

## Funcionalidades por Página

### 🏠 Home (`/`)
- Busca por filmes, personagens e planetas via SWAPI
- Formulário com categoria e termo de busca
- Exibição de resultados em cards
- Botão para acessar área privada (requer login)

### 🔑 Login (`/login`)
- Formulário de autenticação
- Validação de credenciais
- Redirecionamento automático se já autenticado
- Link para página de cadastro

### 📝 Cadastro (`/cadastro`) 
- Formulário de registro de novos usuários
- Validação completa de dados
- Confirmação de senha
- Integração com backend

### 🔒 Itens (`/itens`) - **Rota Protegida**
- Exibe conteúdo exclusivo do universo Star Wars
- Requer autenticação para acesso
- Redirecionamento automático para login se não autenticado

### ℹ️ Sobre (`/sobre`)
- Informações sobre o projeto

## Autenticação

### Desenvolvimento (Mock)
Para testar sem backend, use o hook [`useAuth`](src/hooks/useAuth.ts):
- **Usuário**: `user@starwars.com`
- **Senha**: `123456`

### Produção (API Real)
O hook [`useAuthReal`](src/hooks/useAuthReal.ts) conecta com o backend:
- Cadastro de novos usuários
- Login com validação JWT
- Refresh automático de tokens
- Logout seguro

## Testes

```bash
npm test                 # Executa todos os testes
npm test -- --watch     # Modo watch
npm test -- --coverage  # Com cobertura
```
---

**Desenvolvido por Antonia Maciel** 🚀

*"Que a Força esteja com o código!"* ⭐