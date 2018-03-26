var proxy = require('./proxy')
var apiproxy = require('./apiproxy')

module.exports = function (app) {
	//一些中间层接口
	app.use('/proxy',proxy);
	//java接口
	app.use('/api',apiproxy);
}
