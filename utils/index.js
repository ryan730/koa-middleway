

const request = require('request');
const request_promise = async (url) =>{
    return new Promise((resolve,reject)=>{
       request(url,(error, response, body)=>{
          if(error){
              reject(error);
          }else{
              resolve(body);
          }
       });
    });
}

exports.parse = async (ctx) =>{
    //https://timeline-merger-ms.juejin.im/v1/get_tag_entry?src=web&tagId=5a96291f6fb9a0535b535438&page=0&pageSize=20&sort=rankIndex
    if(ctx.url.indexOf('juejin.im/v1/get_tag_entry')!==-1 && ctx.method === 'GET'){
        const host = 'https://timeline-merger-ms.juejin.im/v1/get_tag_entry?';
        try{
            const data = await request_promise(host+ctx.querystring);
            ctx.response.type = 'application/json';
            ctx.body = data;
            return false;
        }catch(e){
            ctx.response.type = 'application/json';
            ctx.body = [];
            return true;
        }
        
    }else if(ctx.url === '/' && ctx.method === 'POST'){
        //当请求是post请求时
        return true;
    }else{
        //其他页面显示404页面
        //ctx.body = '<h1>404!</h1>'
        ctx.response.type = 'application/json';
        ctx.body = [];
        return true;
    }
}
