FROM node:20-alpine

WORKDIR /app

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "if [ -f package.json ]; then npm install && npm run dev; else echo 'Backend package not initialized yet'; fi"]
