const router = require('koa-router')();

// route
const index = require('./index');

router.get('/view', index.view);
router.get('/index', index.index);
router.get('/index:id', index.index);
router.get('/test_error', index.test_error);
router.get('/', function (ctx, next) {
    ctx.body = 'this a users response!';
  });

module.exports = router