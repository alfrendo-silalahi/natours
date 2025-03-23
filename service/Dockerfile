FROM node:22.14-alpine

RUN apk add --no-cache bash
RUN npm install -g pnpm@latest

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod
COPY src/ ./src/
CMD ["node", "src/server.js"]