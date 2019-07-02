// 测试路由，输出请求的参数
exports.index = async ctx => {
    const body = ctx.request.body;
    const query = ctx.request.query;
    const params = ctx.params;
    ctx.body = {
        body: body,
        query: query,
        params: params,
    };
}
  
// 测试nunjucks模板
exports.view = async ctx => {
    await ctx.render('index', {
        title: 'Koa'
    })
}

// 测试异常
exports.test_error = async ctx => {
    throw new Error('测试异常');
}