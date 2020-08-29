const router = require('koa-router')();
// route
const index = require('./index');

router.get('/views', index.view);
router.get('/html', index.html);
router.get('/index', index.index);
router.get('/index:id', index.index);
router.get('/test_error', index.test_error);
router.get('/', function (ctx, next) {
   // ctx.body = 'this a users response!';
   router.redirect('/flutter_go_website/index.htm')
});

module.exports = router
