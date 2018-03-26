/**
 * Created by yr on 2017/8/17.
 */
var request = require('request')
var querystring = require('querystring')
var url = require("url")
var spidex = require("spidex")
var phoneEncry = require('../tools/phoneEncry')
var xwsse = require("../tools/xwsse")

function getPhone(phone) {
	return phoneEncry.decodePhone(phone)
}
module.exports = function (req, res, next) {
	var query = url.parse(req.originalUrl, true).query;
	if (query.a) {
		//若未登录
		var realPhone = getPhone(query.a), data = {
			phone: realPhone,
			fromType: 1
		};
		if (!req.session.phone || req.session.phone !== realPhone) {
			console.log(req.target + '/api/login/loginmsg?' + querystring.stringify(data))
			spidex.post(req.target + '/api/login/loginmsg', {
				data: JSON.stringify(data),
				header: {
					"Host": "api.cy.card.com",
					"Accept": "application/json",
					"content-type": "application/json",
					"X-WSSE": xwsse.xwsse()
				},
				timeout: 10000,
				responseTimeout: 10000,
				requestTimeout: 10000
			}, function(content, statusCode, responseHeaders) {
				console.log(content)
				if (statusCode === 200) {
					var body = JSON.parse(content)
					if(body.header.code === '0'){
						req.session.uid = body.uid
						req.session.phone = body.phone
						req.session.card = {
							address: body.address,
							company: body.companyName,
							isvip: body.isvip,
							name: body.name,
							setstate:body.setstate,
							endTime:body.endTime,
						}
						next();
					}else{
						next();
					}
				}else{
					next();
				}
			}).on("error", function(err) {
				console.log(err);
				res.trace.error({
					name: req.originalUrl,
					params: req.body,
					msg: err
				})
				next();
			});
			/*
			 var options = {
			 headers: {
			 "Host": "api.cy.card.com",
			 "Accept": "application/json",
			 "content-type": "application/json; charset=utf-8",
			 "X-WSSE": xwsse.xwsse
			 },
			 url: req.target + '/api/login/loginmsg',
			 method: 'POST',
			 json: true,
			 body: data
			 };
			 request.post(options, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log(body)
					if(body.header.code === '0'){
						req.session.uid = body.uid
						req.session.phone = body.phone
						req.session.card = {
							address: body.address,
							company: body.companyName,
							isvip: body.isvip,
							name: body.name,
						}
						next();
					}else{
						console.log(body)
						next();
					}
				}else{
					next();
				}
			})*/
		} else {
			next();
		}
	} else {
		next();
	}
}