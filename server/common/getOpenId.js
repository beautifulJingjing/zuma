/**
 * Created by yr on 2017/8/9.
 */
var spidex = require("spidex")
var querystring = require('querystring')
var url = require("url")

var APPID = 'wxdf4b926f5daa4b1a',SCOPE = 'snsapi_base',SECRET = '4ddeceef007df43d536a41016ee5f9d5';
function isWeChar(req) {
	return req.headers['user-agent'].indexOf('MicroMessenger') > -1;
}
function getOpenid(req,res,code){
	var urlPath = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+ APPID + '&secret=' + SECRET + '&code=' + code + '&grant_type=authorization_code';
	console.log(urlPath)
	return new Promise(function(resolve,reject){
		spidex.get(urlPath, {
			header: { "content-type": "application/x-www-form-urlencoded" },
			charset: "utf8",
			timeout: 5000,
			responseTimeout: 3000,
			requestTimeout: 3000
		},function(content, statusCode, responseHeaders) {
			if(statusCode == 200){
				var data = JSON.parse(content);
				req.session.openid = data.openid;
				console.log(content)
				resolve(data)
			}
			resolve(content)
		}).on("error", function(err){
			resolve(err)
		})
	})

}

module.exports = function (req,res,next) {
	if(isWeChar(req)){
		console.log(req.protocol + req.hostname + req.originalUrl)
		if(req.session.openid) {
			next();
		}else{
			var path = url.parse(req.originalUrl,true).query
			if(path.code){
				getOpenid(req,res,path.code).then(function(rlt){
					next();
				})
			}else{
				//获取code
				var REDIRECT_URI = encodeURIComponent('https://' + req.hostname + req.originalUrl);
				console.log(req.protocol + req.hostname + req.originalUrl)
				var reUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=' + SCOPE + '&state=STATE#wechat_redirect'
				res.redirect(reUrl)
			}
		}
	}else{
		next()
	}
}