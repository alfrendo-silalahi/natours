FROM node:24.11.1-slim

WORKDIR /app

COPY package.json .

RUN npm install --prod

COPY src/ ./src/

CMD ["node", "src/server.js"]
