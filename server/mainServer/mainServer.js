const express = require('express')
const http = require("http");
const fs = require('fs')
// const cookieParser = require("cookie-parser");
// var bodyParser = require('body-parser');
// var multer = require('multer');
const mongodb = require('../mongodb/mongooseApiTest.js');

// 2、创建服务器应用程序
var app = express()

// 3、接收chrome 建行插件传回的数据
// {
// 	stuID: 2015101972,
// 	stuName: '朱柯青',
// 	OCPbalance: 1.1
// }


// 南工文章爬虫传输接口
var articleListStr = ''

app.get('/home', function (req, res) {
    // console.log(req)

    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.end('<b>正在进入 主服务器...</b>');
});

app.get('/articleList', function (req, res) {
    // console.log(req)
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    });
    res.end(articleListStr);
});

app.get('/basicdata', function (req, res) {
    // console.log(req)
    // console.log(req.query)
    // console.log(req.originalUrl); // '/admin/new'
    // res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
    // console.log(req.baseUrl); // '/admin'
    // res.json({stuID: req.query.stuId,stuName: '朱柯青',OCPbalance: 1.1});
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    });
    if(req.query.stuId){
        // console.log(req.query.stuId)
        // console.log(req.query.stuId)
        mongodb.stuMongoFind(req.query.stuId, function (ret) {
            var d = JSON.stringify(ret,function(key,value){
                if(key=='_id'){
                  return undefined;
                }else{
                  return value;
                }
              })
            res.end(d);
            // {'x': 1}
            // var x = {"stuId":[2015100001],"_id":"5c3211eb9ff65d2573645305","DEbalance":[{"_id":"5c3211e996e4767ab8f0cea2","balance":"","date":"2019-01-06T14:34:17.945Z"},{"_id":"5c32122cf92f10161ccb2f5a","balance":"","date":"2019-01-06T14:35:24.564Z"},{"_id":"5c3216ed6a4aba7f48448ba3","balance":"","date":"2019-01-06T14:55:41.334Z"}],"Dormitory":"","OCPbalance":[{"_id":"5c3211e996e4767ab8f0cea3","balance":"1561.74","date":"2019-01-06T14:34:17.945Z"},{"_id":"5c32122cf92f10161ccb2f5b","balance":"1561.74","date":"2019-01-06T14:35:24.564Z"},{"_id":"5c3216ed6a4aba7f48448ba4","balance":"49.74","date":"2019-01-06T14:55:41.334Z"}],"hidden":false,"stuName":"谢信东"}
        })
    }else {
        res.end('parameter error ')
    }

    // console.log(req.path); // '/new'
    // + req.query.stuId
    // res.end();
});

// 建行爬虫信息传输接口
app.post('/ccb', function (req, res) {
    // console.log('req.body:', req.body);
 	// var bbcJsonObj = JSON.parse(req.body)
 	// console.log(bbcJsonObj)
    // res.send('1');

    // 处理payload数据
    var str = ''
    req.on("data",function(dt){
        str+=dt
    })
    req.on("end",function(){
        // console.log(str)
    	mongodb.stuMongoUpdate(JSON.parse(str))

    })
    res.end()
});



// 南工文章列表爬虫传输接口
app.post('/NITArticleList', function (req, res) {

    // 接收到文章信息后 保存文件到lib文件夹
    // 处理payload数据
    var str = ''
    req.on("data",function(dt){
        str+=dt
    })
    req.on("end",function(){
        articleListStr = str
    })
    res.end()
});

app.post('/NITArticle', function (req, res) {

    // 接收到文章信息后 保存文件到lib文件夹
    // 处理payload数据
    var str = ''
    req.on("data",function(dt){
        str+=dt
    })
    req.on("end",function(){
        // console.log(str)
        if (JSON.parse(str)) {

        }
    })
    res.end()
});

// 启动服务
app.listen(3000, function () {
	console.log('app is running at port 3000.')
})
