#Dockerfilel backend

FROM node:20-alpine

WORKDIR /backend_app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev"]
