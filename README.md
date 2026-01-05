# Miles Tunes 🎵

Um conversor e pesquisador de vídeos do YouTube construído com Node.js, TypeScript e Express.

## 📋 Descrição

Miles Tunes é uma aplicação web que permite pesquisar vídeos no YouTube e convertê-los para diferentes formatos. A aplicação oferece uma interface simples e intuitiva para usuários realizarem buscas e conversões de mídia.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express** - Framework web para Node.js
- **EJS** - Template engine para renderização de views
- **Docker** - Containerização da aplicação

## 📁 Estrutura do Projeto

```
miles-tunes/
├── src/
│   ├── app.ts                      # Configuração principal da aplicação
│   ├── server.ts                   # Inicialização do servidor
│   ├── controllers/                # Controladores da aplicação
│   │   ├── convert.controller.ts   # Lógica de conversão
│   │   ├── index.controller.ts     # Controlador da página inicial
│   │   └── search.controller.ts    # Controlador de busca
│   ├── services/                   # Camada de serviços
│   │   ├── convert.service.ts      # Serviço de conversão
│   │   └── search.service.ts       # Serviço de busca
│   ├── routes/                     # Definição de rotas
│   │   └── index.router.ts
│   ├── dtos/                       # Data Transfer Objects
│   │   └── ResponseDTO.ts
│   └── views/                      # Templates EJS
│       ├── search/
│       │   ├── index.ejs
│       │   └── result.ejs
│       └── terms/
│           └── index.ejs
├── public/                         # Arquivos estáticos
│   ├── images/
│   ├── scripts/
│   │   ├── search/
│   │   └── utils/
│   └── styles/
│       ├── index.css
│       ├── search/
│       └── terms/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── cookies.txt
```

## 🔧 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Docker e Docker Compose (opcional)

## ⚙️ Instalação

### Instalação Local

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd miles-tunes
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. Execute a aplicação em modo de desenvolvimento:
```bash
npm run dev
```

### Usando Docker

1. Build e execute com Docker Compose:
```bash
docker-compose up -d
```

2. A aplicação estará disponível em `http://localhost:3000`

## 📝 Scripts Disponíveis

- `npm run dev` - Executa a aplicação em modo de desenvolvimento
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa a aplicação em produção

## 🌐 Rotas Principais

- `/` - Página inicial
- `/search` - Página de busca de vídeos (index.ejs)
- `/search/result` - Resultados da busca (result.ejs)
- `/terms` - Termos de uso (index.ejs)
- `/convert` - Endpoint de conversão

## 📦 Funcionalidades

- ✅ Pesquisa de vídeos do YouTube
- ✅ Validação de URLs do YouTube
- ✅ Conversão de vídeos para diferentes formatos
- ✅ Interface responsiva e amigável
- ✅ Dockerização para fácil deployment

## 🔒 Segurança

- A aplicação inclui validação de URLs do YouTube (isValidYouTubeUrl.js)
- Configurações de segurança implementadas no Express
- Arquivos sensíveis listados no .gitignore
