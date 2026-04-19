FROM node:20.10-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

COPY . .
RUN npm ci --prefer-offline --ignore-scripts

CMD ["npm", "run", "start:prod"]
