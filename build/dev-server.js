require('./check-versions')()
require("date-utils")

var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var express = require('express')
var session = require('express-session');
var RedisStrore = require('connect-redis')(session);
var webpack = require('webpack')
var opn = require('opn')
var bodyParser = require('body-parser');
var webpackConfig = require('./webpack.dev.conf')
var log4js = require('log4js')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port

var app = express()

app.use(bodyParser.json())

var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
//日志设定
var logger = require('../server/common/log4js');
app.use(log4js.connectLogger(logger('development')))

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var redisConfig = require('../server/config/redis.json')
app.use(session({
	name : "sessionid",
	secret : 'keyboard cat',
	resave : true,
	rolling:true,
	saveUninitialized : false,
	cookie : redisConfig.cookie,
	store : new RedisStrore(redisConfig.sessionStore)
}))

app.use('*',function(req,res,next){
	req.target = 'http://60.191.59.46:5061'// 测试环境内网地址
	next();
})

var activity = require('../server/common/activity')
app.use('/activity/*',activity)

//扩展locals，增加自定义属性方法
var localsExtend = require('../server/common/localsExtend');
app.use(localsExtend);

//加载跟踪中间件，方便调用
var trace = require('../server/common/trace');
app.use(trace);

//node api
var routers = require('../server/router/index');
routers(app);
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
