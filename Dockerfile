FROM node:10
LABEL Version="1.0"
LABEL Name="blog-server"
LABEL Maintainer="b1anker"
WORKDIR /root/blog-server
COPY . .
ENV MYSQL_HOST=database \
  MYSQL_USERNWME="blog" \
  MYSQL_PASSWORD="blog"
RUN npm install --registry=https://registry.npm.taobao.org \
  && chmod 755 /root/blog-server/setup.sh
VOLUME  ["/root/confs"]
EXPOSE 3000
ENTRYPOINT ["/root/blog-server/setup.sh" ]
