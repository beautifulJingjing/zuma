/**
 * Created by yr on 2017/8/24.
 */
var express = require('express');
var router = express.Router();

var proxy = require('../proxy-modules/index');

router.get('/login', function(res,req,next){
	proxy.proxyLogin(res,req);
})
router.get('/log', function(res,req,next){
	proxy.log(res,req);
})
router.get('/wxconfig', function(res,req,next){
	proxy.wxconfig(res,req);
})
router.post('/pictrue', function(res,req,next){
	proxy.pictrue(res,req);
})

module.exports = router;