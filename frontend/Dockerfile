FROM node:lts-alpine AS build

WORKDIR /app

COPY . .

RUN npm install 

CMD ["npm", "run", "dev"]
