/**
 * Created by yr on 2017/8/23.
 */
var express = require('express');
var path = require('path')
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStrore = require('connect-redis')(session);
var app = express()
var PORT = process.env.PORT || '3008';
var log4js = require('log4js')
require("date-utils")

app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//日志设定
var logger = require('./common/log4js');
app.use(log4js.connectLogger(logger('development')));

var static = express.static(path.join(__dirname, './dist/static'))
app.use('/static', static)

var redisConfig = require('./config/redis.json')
app.use(session({
	name : "sessionid",
	secret : 'keyboard cat',
	resave : true,
	rolling:true,
	saveUninitialized : false,
	cookie : redisConfig.cookie,
	store : new RedisStrore(redisConfig.sessionStore)
}))

app.use(function(req,res,next){
	if(process.env.NODE_ENV === 'production'){
		req.target = 'http://cmcb.ringbox.com.cn:8010' ; // 正式环境后端地址
		//req.target = 'http://60.191.59.46:5061'// 测试环境外网地址
	}else{
		req.target = 'http://60.191.59.46:5061'// 测试环境内网地址
	}
	next();
})

//扩展locals，增加自定义属性方法
var localsExtend = require('./common/localsExtend');
app.use(localsExtend);

//加载跟踪中间件，方便调用
var trace = require('./common/trace');
app.use(trace);

var activity = require('./common/activity')
app.use('/activity/*', activity)
//node接口
var routers = require('./router/index');
routers(app);

app.get('/favicon.ico',function(req, res){
	res.sendFile(path.join(__dirname, './dist/static/favicon.ico'))
})
//微信认证txt
app.get('/MP_verify_BfjH1Dk1LuyLJQ7D.txt', function (req, res) {
	res.sendFile(path.join(__dirname, './MP_verify_BfjH1Dk1LuyLJQ7D.txt'))
})

//微信登录处理
var getOpenId = require('./common/getOpenId')
app.get('*', getOpenId,function (req, res) {
	//到达日志
	res.trace.visit();
	res.sendFile(path.join(__dirname, './dist/index.html'))
})

console.log(`listening ${PORT}`)
app.listen(PORT)
module.exports = app;
