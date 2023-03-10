FROM node

WORKDIR /usr/src/app

COPY package*.json ./

# COPY package.json .
# COPY package-lock.json .
RUN npm ci --only=production
# RUN npm install
COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]