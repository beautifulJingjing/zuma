/**
 * Created by yr on 2018/1/8.
 */
//判断变量类型
var Type = {};
for(var i = 0,type;type = ['String','Array','Object'][i++];){
	(function (type) {
		Type['is' + type] = function (obj) {
			return Object.prototype.toString.call(obj) === '[object ' + type + ']';
		}
	})(type)
}
Type.isString('str')

Function.prototype.uncurrying = function () {
	var self = this;
	return function () {
		var obj = Array.prototype.shift.call(arguments);
		console.log(arguments,obj)
		return self.apply(obj,arguments)
	}
}
var push = Array.prototype.push.uncurrying();
var obj = {
	"length":2,
	'0':1
}
push(obj,2)
console.log(obj)

var mult = function () {
	var a = 1;
	for(var i = 0,l = arguments.length;i < l; i++){
		a = a * arguments[i]
	}
	return a
}
var puls = function () {
	var a = 1;
	for(var i = 0,l = arguments.length;i < l; i++){
		a = a + arguments[i]
	}
	return a
}
var createProxyFactory = function (fn) {
	var cache = {};
	return function () {
		var args = Array.prototype.join.call(arguments,',')
		if(args in cache){
			return cache[args]
		}
		return cache[args] = fn.apply(this,arguments)
	}
}
var proxyMult = createProxyFactory(mult),proxyPuls = createProxyFactory(puls);
console.log(proxyMult(1,2,3,4))
console.log(proxyMult(1,2,3,4))
console.log(proxyPuls(1,2,3,4))
console.log(proxyPuls(1,2,3,4))