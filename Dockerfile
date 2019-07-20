FROM node:10
WORKDIR /root/blog-server
COPY . .
RUN npm install \
  && chmod +x /root/blog-server/setup.sh \
  && apt update \
  && apt install vim-tiny
VOLUME  ["/root/blog-server/confs"]
EXPOSE 3000
CMD ["sh", "/root/blog-server/setup.sh"]