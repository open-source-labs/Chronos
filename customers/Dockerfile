FROM node:10
WORKDIR /customerContainer/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5555
CMD ["node", "customers.js"]