# --- Estágio 1: Builder (Compila o TypeScript) ---
FROM node:18-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (para aproveitar cache do Docker)
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependências (incluindo devDependencies para ter o 'tsc')
RUN npm ci

# Copia o código fonte
COPY src ./src

# Compila o TypeScript para JavaScript (pasta dist)
RUN npm run build

# --- Estágio 2: Runner (Imagem Final de Produção) ---
FROM node:18-alpine

WORKDIR /app

# 1. Instalar Dependências do Sistema (FFmpeg, Python3 para o yt-dlp)
RUN apk add --no-cache ffmpeg python3 curl ca-certificates

# 2. Instalar o yt-dlp manualmente (versão mais recente)
# Baixa o binário oficial, move para a pasta correta e dá permissão de execução
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# 3. Copiar apenas o necessário do estágio de build
COPY package*.json ./
# Instala apenas dependências de produção (mais leve)
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

COPY src/views ./dist/views

COPY public ./dist/public

# Cria a pasta de downloads para garantir que existe e tem permissão
RUN mkdir -p downloads && chown node:node downloads

# Expor a porta da API
EXPOSE 3000

# Trocar para usuário não-root (segurança)
USER node

# Comando para iniciar a API
CMD ["node", "dist/server.js"] 
# (OBS: Verifique se seu arquivo principal compilado é 'dist/server.js' ou 'dist/index.js')