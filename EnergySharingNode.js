'use strict';

// 导入http模块:
var http = require('http');//http 模块
var url  = require('url');//地址模块
var fs   = require('fs');//文件读取模块
var path = require('path');//路径模块


// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);

    var pathname = url.parse(request.url).path;

    console.log(pathname);
    if(pathname === '/')
    {
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    var filepath = path.join('.',pathname,'EnergySharing.html');
    console.log(filepath + '1');
    
    fs.stat(filepath,function(err,stats){
        if(!err && stats.isFile())
        {
            console.log('200 ' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        }else
        {
            console.log('404 ' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
    }
    else 
    {
        var filepath = path.join('.',pathname);
        console.log(filepath + '2');
        fs.stat(filepath,function(err,stats){
            if(!err&&stats.isFile())
            {
                console.log('200' + request.url);
                response.writeHead(200);
                fs.createReadStream(filepath).pipe(response);
            }
        });    
    }

});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/'); 