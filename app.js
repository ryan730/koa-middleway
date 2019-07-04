const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const sslify = require('koa-sslify').default;//http强制HTTPS
const compress =require('koa-compress');
const serve = require("koa-static");

const index = require('./routes/index');
const routers = require('./routes/routers');
const utils = require('./utils/index');

// middlewares
app.use(compress({threshold:2048}));
app.use(convert(sslify()));
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

// app.use(convert(serve(__dirname + '/static/css')));
app.use(convert(serve(__dirname+ "/static/html",{ extensions: 'html'})));
app.use(views(__dirname + '/static/views-jade', { extension: 'jade'}));
app.use(views(__dirname + '/static/views-ejs', { extension: 'ejs'}));

// logger
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "GET");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  ctx.set("Content-Type", "application/json;charset=utf-8");
  //ctx.set("Access-Control-Allow-Credentials", true);

  const start = new Date();
  const goto = await utils.parse(ctx);
  goto && await next();///暂时关闭，只支持指定请求
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// app.use(router.routes(), router.allowedMethods());

// 路由
app.use(routers.routes())

// response
app.on('error', function(err, ctx){
  console.log(err)
  log.error('server error', err, ctx);
});

module.exports = app;