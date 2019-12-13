FROM node:10
WORKDIR /orderContainer/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7777
CMD ["node", "orders.js"]