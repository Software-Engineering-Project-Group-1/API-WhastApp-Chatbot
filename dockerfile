FROM node:20-slim

# Instala las dependencias necesarias para Puppeteer y Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libnss3 \
    libnspr4 \
    libxss1 \
    libgtk-3-0 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Carpeta de trabajo
WORKDIR /app

# Copia y instala dependencias
COPY package*.json ./
RUN npm install

COPY . .

# Exponer el puerto por convención
EXPOSE 3001

# Comando para lanzar el servidor
CMD ["node", "src/server.js"]
