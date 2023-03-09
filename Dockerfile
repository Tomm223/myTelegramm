FROM node:18 

WORKDIR /daniil_osipov

COPY . .

RUN npm install

EXPOSE 3000

CMD ['node','server.js']