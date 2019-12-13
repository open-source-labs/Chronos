FROM node:10
WORKDIR /bookContainer/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4545
CMD ["node", "books.js"]