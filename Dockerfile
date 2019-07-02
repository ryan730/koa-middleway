FROM docker.io/node
COPY . /app
WORKDIR /app
RUN npm install pm2 -g --registry=https://registry.npm.taobao.org
RUN npm install --registry=https://registry.npm.taobao.org
RUN lsof -i :3000|grep -v "PID"|awk '{print "kill -9",$2}'|sh
EXPOSE 3000
CMD npm run pm2