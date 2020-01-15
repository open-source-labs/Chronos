FROM node:10.16
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 4545
ENTRYPOINT ["node", "BookServer.js"]