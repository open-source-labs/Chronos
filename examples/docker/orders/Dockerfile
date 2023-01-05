FROM node:16
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 7777
CMD ["node", "orderserver.js"]