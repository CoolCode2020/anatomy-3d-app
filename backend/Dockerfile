#Dockerfilel backend

FROM node:23

WORKDIR /backend_app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev"]
