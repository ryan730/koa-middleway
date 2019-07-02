FROM docker.io/node
COPY . /app
WORKDIR /app
RUN node -v
RUN npm install pm2 pm2-web -g --registry=https://registry.npm.taobao.org
RUN npm install --registry=https://registry.npm.taobao.org
# RUN lsof -i :3000|grep -v "PID"|awk '{print "kill -9",$2}'|sh
EXPOSE 8000
EXPOSE 9000
# CMD npm run pm2


# docker image build -t koa-middleway:0.0.1 .
# docker container run --rm -d -p 8000:8000 -p 9000:9000 -it koa-demo:0.0.1 /bin/bash
# docker container exec -it koa-demo:0.0.1 /bin/bash
# npm run pm2 & pm2-web --config pm2-web-config.json