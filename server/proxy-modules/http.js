/**
 * Created by yr on 2017/9/7.
 */
var request = require('request')
var url = require('url')
var xwsse = require("../tools/xwsse")
var encode = require("../tools/encode")

function randomString(size) {
	var _builder = [];
	var _randomString = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var _maxCount = _randomString.length ;
	for (var i = 0; i < size; i++) {
		var _n = parseInt(Math.random() * _maxCount);
		_builder.push(_randomString[_n]);
	}
	return _builder.join("");
}
function wxPay(prepay_id){
	var key = '9d0b1e26bd7ebd0de4e9e160ab2dc6c4', data = {
		appId: 'wxdf4b926f5daa4b1a',
		timeStamp: Math.floor(new Date().getTime() / 1000), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		nonceStr: randomString(25), // 支付签名随机串，不长于 32 位
		package: 'prepay_id=' + prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
	};
	data.paySign = encode.cryptoParams(data, 'md5', key).toUpperCase()
	return data
}

module.exports = function (urlPath,req,res){
	var data = req.body;
	console.log(req.target + urlPath + JSON.stringify(data))
	var options = {
		headers: {
			"Host": "api.cy.card.com",
			"Accept": "application/json",
			"content-type": "application/json; charset=utf-8",
			"X-WSSE": xwsse.xwsse()
		},
		url: req.target + urlPath,
		method: 'POST',
		json: true,
		body: data,
		timeout:10000
	},apiList = [
		'/api/feedback/feed',
		'/api/login/loginmsg',
		'/api/user/changecard',
		'/api/order/pay',
		'/api/order/orderreply',
	];
	request(options,function (error, response, data) {
		if (!error && response.statusCode == 200) {
			var t = url.parse(req.originalUrl),resData = response.body;
			console.log(resData)
			if(apiList.indexOf(t.pathname) > -1){
				res.trace.interface({
					name: req.originalUrl,
					params: req.body
				})
			}
			if(urlPath === '/api/login/loginmsg' && data.header.code == 0){
				req.session.phone = response.body.phone
				req.session.uid = response.body.uid
				req.session.card = {
					address:response.body.address,
					company :response.body.companyName,
					isvip:response.body.isvip,
					name:response.body.name,
					endTime:response.body.endTime,
					setstate:response.body.setstate
				}
			}
			if(urlPath === '/api/user/changecard' && data.header.code == 0){
				req.session.card = {
					address:response.body.address,
					company :response.body.companyName,
					isvip:response.body.isvip,
					name:response.body.name,
					endTime:response.body.endTime,
					setstate:response.body.setstate
				}
			}
			//领取免费会员
			if(urlPath === '/api/order/pay' && data.header.code == 0){
				if(req.body.busineType === '2'){
					req.session.card.isvip = response.body.isvip
				}
				if(req.body.payType === '2'){
					resData.config = wxPay(resData.payUrl)
				}
			}
			res.json(resData)
		} else{
			res.trace.error({
				name: req.originalUrl,
				params: req.body,
				msg: error
			})
			res.json({
				header:{
					code:1008,
					msg:'网络错误，稍后请重试'
				}
			})
		}
	});
}