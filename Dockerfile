FROM node:8-slim

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]