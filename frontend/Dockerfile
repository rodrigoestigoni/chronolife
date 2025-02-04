FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# Instalar dependências do projeto, incluindo Font Awesome
RUN npm install && npm install @fortawesome/fontawesome-free
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
