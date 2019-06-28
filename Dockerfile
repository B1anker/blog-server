FROM node:10
WORKDIR /root/blog-server
COPY . .
RUN npm install \
  && chmod +x /root/blog-server/setup.sh
EXPOSE 3000
CMD ["sh", "/root/setup.sh"]