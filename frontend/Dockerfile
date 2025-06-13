# Dockerfile frontend

FROM node:20-slim

WORKDIR /frontend_app

COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 5173

#Host must be assigned so that App is reachable. Otherwise we are in localhost of container and we cant reach that.
CMD ["npm", "run", "dev", "--", "--host"] 