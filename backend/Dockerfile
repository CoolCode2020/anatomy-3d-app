FROM node:20-slim


RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /backend_app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8080
RUN npm rebuild better-sqlite3
CMD ["npm", "run", "dev"]ç