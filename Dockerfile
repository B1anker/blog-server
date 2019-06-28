FROM node:10
WORKDIR /root/service/blog-server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]