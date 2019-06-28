#!/bin/sh
git fetch --all
git reset --hard origin/master
git pull origin master

npm i

npm run start