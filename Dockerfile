FROM node

WORKDIR /myApp

# COPY package.json .
# COPY package-lock.json .
# RUN npm ci --only=production
RUN npm install
RUN npm run build

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]