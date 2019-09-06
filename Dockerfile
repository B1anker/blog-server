FROM node:10
LABEL Version="1.0"
LABEL Name="blog-server"
LABEL Maintainer="b1anker"
WORKDIR /root/blog-server
COPY . .
RUN npm install --registry=https://registry.npm.taobao.org \
  && chmod +x /root/blog-server/setup.sh
VOLUME  ["/root/confs"]
EXPOSE 3000
CMD ["sh", "/root/blog-server/setup.sh"]
