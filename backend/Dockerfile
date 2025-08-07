FROM node:20-slim


RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /backend_app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8080
# You only need this if you do not have the dbs locally but on server, but i dont for performance
RUN npm rebuild better-sqlite3
CMD ["npm", "run", "dev"]ç