# 使用node写一个简单的服务器

[代码传送门](https://github.com/ljhnhlh/-node-)

> 写在前面：在进行开发前，请配置好环境，这样就不需要你花功夫查询一个对象有什么方法等，提高效率。在开发过程中，尽量不要问为什么，因为底层的东西是不需要开发人员了解的，你只要知道怎么用就行了，当然，你想深入了解也未尝不可，但这样你的目的就不是开发利用了。我曾经也吃过这个亏，真的，不要跟工具较真，因为它真的能用，这就可以了。

进入正题

本文的目的是使用node实现一个可以获取包含html，图片和js文件网页的服务器

准备好所需要的文件

```html
//EnergySharing.html
<html>
    <script type="text/javascript" src="./EnergySharing.js"></script>
    <body>
        <h1 id="head" onclick="clic()">Welcome to EnergySharing App</h1>
        <img id="imge" src = "images.jpg" onclick="clic()" >
        <button onclick="clic()">dianwo</button>
    </body>
</html>
```

其打开的效果是这样的

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181222155233815.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

下面是与html进行交互的js文件，其效果是点击图片则图片隐藏

```javascript
//EnergySharing.js
function clic()
{
    var temp =  document.getElementById("imge");
    temp.hidden = true;
}  
```

接下来就是node写的服务器：

代码解析：



![在这里插入图片描述](https://img-blog.csdnimg.cn/20181222155940555.png)

>导入http模块，其中包括http的请求和响应模块，是服务器的只要功能模块
>
>导入url模块，该模块可以方便对url进行解析
>
>导入fs模块，该模块为文件流读取模块，可获取本地文件，作为响应发会给客户端
>
>导入path模块，该模块只要是对本地路径进行解析

接下来是创建服务器，服务器的使用仅需两步：创建和监听

创建：下图中request和response是http中已经封装好的请求和响应接口，当有用户请求时，request内会自动存储着用户请求的信息（当初我还纠结了很久，这两个东西怎么来的），而response是你原来做出响应的工具，可以是将文件流封装进去发送给客户端，你可以在{}内写请求处理函数

`var server = http.createServer(function (request, response) {});`



![0在这里插入图片描述](https://img-blog.csdnimg.cn/20181222161346297.png)



request处理

获取文件请求路径

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181222161916716.png)

以下是文件获取和发送的模板：

初始情况下，若输入`http://localhost:8080/`, 请文件的请求路径为 ‘/ ’

因为我们知道此时需要获取 的是html文件，所以在文件路径上添加 ”EnergySharing.html“

> join是一个字符串拼接函数，可拼接无数个字符串，只需要在每个字符串后面添加 ：
>
> ，'字符串' 即可

fs.stat 可以通过filepath 获取本地文件，其中有两个参数，err和stats，前者判断该文件是否存在，后者判断是否为文件，若二者处理，则可写入响应头，读取文件并返回响应

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181222162043559.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

因为html内还有js文件和图片文件，所以客户端收到html后还会再请求这两个文件，其请求处理函数与上面的相同，只是判断条件不同，因为客户端会自动附上要请求的文件路径和文件名

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181222162955956.png)

> ps,下面与上面不同之处在于，使用`http://localhost:8080/` 打开网页时，发送的请求只有 ‘/’，所以要人为地将其引导到 html文件的路径上，而后面请求的js文件和png，其请求中已经包含了文件路径，直接进行文件路径的拼接及文件查找即可，然后发送响应。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181222163623201.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

以上就是一个请求包含多个文件的html服务端代码

运行效果：

启动服务器：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181222164205867.png)

打开浏览器：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181222164306931.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

查看服务器输出：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181222164525234.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

以上就是全部了。





```javascript
'use strict';
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
    else if(pathname === '/EnergySharing.js')
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
    else if(pathname === '/images.jpg')
    {
        var filepath = path.join('.',pathname);
        console.log(filepath + '3');
        fs.stat(filepath,function(err,stats){
            if(!err&&stats.isFile())
            {
                console.log('200' + request.url);
                response.writeHead(200);
                fs.createReadStream(filepath).pipe(response);
            }
        });
    }
    else
    response.end();
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/'); 
```

