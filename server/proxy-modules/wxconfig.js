/**
 * Created by yr on 2017/8/21.
 */

"use strict";

var _ = require("lodash");
var spidex = require("spidex")
var cookie = require('cookie')
var querystring = require('querystring')
var encode = require("../tools/encode");
var app = require.cache[require.resolve('../app.js')];
var AppID_WeiXin = "wxdf4b926f5daa4b1a",
	AppSecret_WeiXin = "4ddeceef007df43d536a41016ee5f9d5";

function randomString(size) {
	var _builder = [];
	var _randomString = "abcdefghijklmnopqrstuvwxyz0123456789";
	var _maxCount = _randomString.length - 1;
	for (var i = 0; i < size; i++) {
		var _n = _.random(_maxCount);
		_builder.push(_randomString[_n]);
	}
	return _builder.join("");
}

module.exports = function (req, res) {
	var jsapi_ticket = app.exports.locals.weixin_jsapi_ticket || undefined,
		jsapi_token =  app.exports.locals.weixin_jsapi_token || undefined;

	var getConfig = function () {
			var ticket = jsapi_ticket.ticket,
				noncestr = randomString(16),
				timestamp = new Date().getTime(),
				url = req.headers['referer'] || '';
			if (url.indexOf('#') > -1) url.substr(0, url.indexOf('#'));

			var signature = encode.SHA1("jsapi_ticket=" + ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url);
			return {
				appId: AppID_WeiXin,
				timestamp: timestamp,
				nonceStr: noncestr,
				signature: signature
			}
		},
		getticket = function (access_token) {
			return new Promise(function (resolve) {
				spidex.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi", {
					header: {"content-type": "application/x-www-form-urlencoded"},
					charset: "utf8",
					timeout: 5000,
					responseTimeout: 3000,
					requestTimeout: 3000
				}, function (content, statusCode, responseHeaders) {
					if (statusCode == 200) {
						var rec = JSON.parse(content);
						rec.expires_time = new Date() + rec.expires_in * 1000;
						console.log(content)
						console.log(rec.expires_in)
						resolve(rec)
					} else {
						resolve({
							code: 0,
							msg: content.message
						})
					}
				})
			})

		},
		gettoken = function () {
			console.log('https://api.weixin.qq.com/cgi-bin/token?' + querystring.stringify({
					grant_type: "client_credential",
					appid: AppID_WeiXin,
					secret: AppSecret_WeiXin
				}))
			return new Promise(function (resolve) {
				spidex.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxdf4b926f5daa4b1a&secret=4ddeceef007df43d536a41016ee5f9d5", {
					header: {"content-type": "application/x-www-form-urlencoded"},
					charset: "utf8",
					timeout: 5000,
					responseTimeout: 3000,
					requestTimeout: 3000
				}, function (content, statusCode, responseHeaders) {
					if (statusCode == 200) {
						var result = JSON.parse(content);
						console.log(content)
						resolve(result)
					}
					else {
						resolve({
							code: 0,
							msg: content.message
						});
					}
				}).on("error", function (err) {
					resolve(err)
					console.log("error" + err);
				})
			})

		}
	//jsapi_ticket
	if (!jsapi_ticket || jsapi_ticket.expires_time <= new Date()) {
		if(!jsapi_token || jsapi_token.expires_time <= new Date()){
			gettoken().then(function(result){
				if(result.access_token){
					app.exports.locals.weixin_jsapi_token = result;
					getticket(result.access_token).then(function(rlt){
						app.exports.locals.weixin_jsapi_ticket = jsapi_ticket = rlt;
						res.send({
							code: 0,
							data: getConfig()
						})
					})
				} else {
					res.send(result)
				}
			})
		}
		else{
			getticket(jsapi_token.access_token).then(function(rlt){
				app.exports.locals.weixin_jsapi_ticket = jsapi_ticket = rlt;
				res.send({
					code: 0,
					data: getConfig()
				})
			})
		}
	}else {
		res.send({
			code: 0,
			data: getConfig()
		});
	}
}