#!/bin/sh
echo "拉取git仓库"

git fetch --all
git reset --hard origin/master
git pull origin master

echo "安装node_modules"

npm i

echo "启动项目"

npm run start