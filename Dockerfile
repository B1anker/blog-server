FROM node:10
ADD setup.sh /root/setup.sh
WORKDIR /root/service/blog-server
COPY package*.json ./
RUN npm install \
  && chmod +x /root/setup.sh
COPY . .
EXPOSE 3000
CMD ["sh", "/root/setup.sh"]