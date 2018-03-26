/**
 * Created by yr on 2017/9/6.
 */
var encode = require("../tools/encode");
const appid ='14805174f2b22b39', appkey='10787f0c14805174f2b22b39a7a1a864';

Date.prototype.format = function (fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
function randomString(size,date) {
	var _builder = [];
	var _randomString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" + date;
	var _maxCount = _randomString.length ;
	for (var i = 0; i < size; i++) {
		var _n = parseInt(Math.random() * _maxCount);
		_builder.push(_randomString[_n]);
	}
	return _builder.join("");
}
function xwsse() {
	var date = new Date();
	var Created = date.format("yyyy-MM-ddThh-mm-ssZ");
	var Nonce = randomString(25,date.format("yyyyMMddhh"));
	var PasswordDigest = encode.MD5(encode.SHA256 (Nonce + Created + appid + appkey))
	console.log('随机数'+ Created+Nonce)
	return 'UsernameToken:"' + appid + '",PasswordDigest:"' + PasswordDigest + '",Nonce:"'+ Nonce + '",Created:"' + Created + '" ';
}
module.exports = {
	xwsse : xwsse
}