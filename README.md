# Mundo Star Wars Front

Aplicação React + TypeScript que consome a API SWAPI.dev, exibe cards de entidades do universo Star Wars, possui autenticação mockada e rotas protegidas.

## Funcionalidades
- Busca por filmes, personagens e planetas do Star Wars
- Exibição de cards com imagens e detalhes
- Autenticação de usuário (login, logout) com mock backend
- Proteção de rotas privadas (ex: página de itens)
- Persistência e expiração de sessão via localStorage
- Mensagens de erro e feedback ao usuário
- Testes unitários para componentes principais

## Tecnologias
- React + TypeScript
- React Router DOM
- Axios
- Jest + Testing Library
- CSS Modules

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse em [http://localhost:5173](http://localhost:5173) (ou porta exibida no terminal)

## Autenticação (Mock)
- Usuário padrão: `user@starwars.com`
- Senha: `123456`
- O backend é simulado, com geração de token e expiração automática.

## Scripts úteis
- `npm run dev` — inicia o servidor de desenvolvimento
- `npm test` — executa os testes unitários

## Estrutura de pastas
```
src/
  components/      # Componentes reutilizáveis (Navbar, Card, etc)
  hooks/           # Hooks customizados (useAuth, useSwapiSearch)
  pages/           # Páginas principais (Home, Login, Itens)
  services/        # Serviços de API e autenticação
  styles/          # Estilos CSS
```

## Testes
- Os testes estão em `src/components/*.test.tsx` e `src/services/*.test.ts`.
- Para rodar: `npm test`

## Observações
- O projeto não utiliza backend real, apenas simulação de autenticação.
- O foco é demonstrar boas práticas de autenticação, proteção de rotas e feedback ao usuário.

---

Desenvolvido por Antonia Maciel
