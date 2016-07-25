var express = require('express');
var path = require('path');
var db = require('./db');
var url = require('url');
var app = express();
var querystring = require('querystring');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname,'./public')));

app.use(function(request,response,next){
    var urlObj = url.parse(request.url, true);//得到url对象
    request.query = urlObj.query;//得到查询字符串对象
    next();
});
app.use(bodyParser.json());//处理JSON请求体
app.use(bodyParser.urlencoded({ extended: true }));//处理表单序列化 urlencoded请求体

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'))
});

var comments = null;
//增 POST /comment 用户数据
app.post('/comment',function(request,response){
    request.setEncoding('utf8');//设置编码类型
    console.log('post');
    var result = '';
    request.on('data',function(data){//设置编码类型之后data会从buffer转成字符串
        result += data;
        console.log('post_req_on_data');
    });
    request.on('end',function(){
        var Comment = JSON.parse(result);//把字符串转成对象
        Model('Comment').create(Comment,function(err,doc){
            if(err){
                response.end(JSON.stringify({
                    code:'error',
                    data:Comment
                }));
            }else{

                Model('Comment').find(function(err,docs){
                    comments = docs;
                    response.writeHead(200, {
                        'Content-Type': 'application/json;charset=utf-8'
                    });
                    response.end(JSON.stringify({
                        code:'success',
                        data:comments
                    }));
                });

                console.log('post_save_success');
            }
        });
    });
});

//删 DELETE /comment/?name=用户name

app.delete('/comment',function(request,response){
    var name = request.query.name;
    Model('Comment').remove({name: name}, function (err, doc) {
        if (err) {
            response.statusCode = 500;
            response.end(JSON.stringify({
                code:'error',
                data:err
            }));
        } else {
            response.end(JSON.stringify({
                code:'success',
                data:doc
            }));
        }
    });
});

//改 PUT /comment/?name=用户name 用户数据

app.put('/comment',function(request,response){
    var result = '';
    console.log('put');
    request.on('data',function(data){
        result += data;
    });
    request.on('end',function(){
        var Comment = querystring.parse(result);
        var content = Comment.content;
        var name = request.query.name;
        console.log(name);
        Model('Comment').update({name: name}, {$set : { content : content }}, function(error){
            if(error) {
                console.log(error);
                response.statusCode = 500;
                response.end(JSON.stringify({
                    code:'error',
                    data:error
                }));
            } else {
                response.writeHead(200, {
                    'Content-Type': 'application/json;charset=utf-8'
                });
                response.end(JSON.stringify({
                    code:'success',
                    data:Comment
                }));
                console.log('Update success!');
            }
        });
    });
});

//查 GET /comment/?name=用户name

app.get('/comment',function(request,response){
    var name = request.query.name;
    console.log(name);

    if(name){
        Model('Comment').findOne({ name: name}, function (err, doc){
            if (err) {
                response.statusCode = 500;
                response.end(JSON.stringify({
                    code:'error',
                    data:err
                }));
            } else {
                response.writeHead(200, {
                    'Content-Type': 'application/json;charset=utf-8'
                });
                response.end(JSON.stringify({
                    code:'success',
                    data:doc
                }));
            }
        });
    }else{
        response.writeHead(200, {
            'Content-Type': 'application/json;charset=utf-8'
        });
        response.end(JSON.stringify({
            code:'error',
            data:{info:'the param name is empty!'}
        }));
    }
});



app.listen(9090,function(){
    console.log('server start');
});
