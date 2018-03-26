/**
 * Created by LXP on 2017/3/23.
 */
"use strict";


module.exports = function (req, res, next) {
	const DEFAULTSPIN = '00000790131'
	res.locals = {
		get user() {
			var user = {
				phone: req.session.phone,
				uid: req.session.uid,
				openid: req.session.openid
			}
			return user;
		},
		set user(value) {
			req.session.user = value;
		},
		//当前SPInfoCode
		get spinfocode() {
			var spinfocode = req.query.spinfocode || req.params.spinfocode || (req.session ? req.session.spinfocode : undefined) || '';
			//排除短信地址链接带上短信内容问题
			spinfocode = spinfocode.replace(/\D/g, "");
			req.session.spinfocode = spinfocode;
			return spinfocode;
		},
		set spinfocode(val) {
			req.session.spinfocode = val;
		},
		//获取X-Forwarded-For内的IP
		get ip() {
			return req.headers['x-forwarded-for'] || req.ip;
		},
		//是否微信浏览器
		get isWeChar() {
			return req.headers['user-agent'].indexOf('MicroMessenger') > -1;
		},

		//是否移动客户端
		get isMobileClient() {
			return req.headers['user-agent'].indexOf('Mobile') > -1;
		}
	};
	next();
}