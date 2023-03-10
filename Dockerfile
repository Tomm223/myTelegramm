FROM node

WORKDIR /usr/src/app

COPY . .
# COPY package.json .
# COPY package-lock.json .

RUN npm install


EXPOSE 3000

CMD 'node server.js'