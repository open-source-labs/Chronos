FROM node:10.16
WORKDIR /orderContainer/
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 7777
CMD ["node", "orderserver.js"]