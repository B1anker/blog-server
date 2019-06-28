FROM node:10
WORKDIR /root/blog-server
COPY package*.json ./
RUN npm install \
  && chmod +x /root/blog-server/setup.sh
COPY . .
EXPOSE 3000
CMD ["sh", "/root/setup.sh"]