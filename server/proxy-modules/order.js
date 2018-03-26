/**
 * Created by yr on 2017/9/5.
 */
var httpPost = require('./http')

module.exports = {
	pay:function (req, res) {
		httpPost('/api/order/pay',req, res)
	},
	payinfo:function (req, res) {
		httpPost('/api/order/payinfo',req, res)
	},
	orderreply:function (req, res) {
		httpPost('/api/order/orderreply',req, res)
	},
}
