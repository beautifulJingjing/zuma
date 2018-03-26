/**
 * Created by yr on 2017/9/5.
 */
/**
 * Created by yr on 2017/8/24.
 */
var express = require('express');
var router = express.Router();

var proxy = require('../proxy-modules/index');

//登录类接口
router.post('/login/loginmsg', function(res,req,next){
	proxy.login.loginmsg(res,req);
})
router.post('/login/sendmsgcode', function(res,req,next){
	proxy.login.sendmsgcode(res,req);
})
router.post('/login/validatecode', function(res,req,next){
	proxy.login.validatecode(res,req);
})
//用户类接口
router.post('/user/changecard', function(res,req,next){
	proxy.user.changecard(res,req);
})
router.post('/user/isuser', function(res,req,next){
	proxy.user.isuser(res,req);
})
//订单类接口
router.post('/order/pay', function(res,req,next){
	console.log('pay')
	proxy.order.pay(res,req);
})
router.post('/order/payinfo', function(res,req,next){
	proxy.order.payinfo(res,req);
})
router.post('/order/orderreply', function(res,req,next){
	proxy.order.orderreply(res,req);
})
//模板接口
router.post('/template/gettemplate', function(res,req,next){
	proxy.template.gettemplate(res,req);
})
//意见反馈接口
router.post('/feedback/feed', function(res,req,next){
	proxy.feedback.feed(res,req);
})
//失败原因接口
router.post('/subtitle/getreason', function(res,req,next){
	proxy.subtitle.getreason(res,req);
})

module.exports = router;