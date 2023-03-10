FROM node:18 

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN curl -v https://registry.npmjs.com/
RUN npm install

COPY . .

EXPOSE 3000

CMD ['node','server.js']