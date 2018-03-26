/**
 * Created by yr on 2017/9/5.
 */
var httpPost = require('./http')

module.exports = {
	changecard:function (req, res) {
		httpPost('/api/user/changecard',req, res)
	},
	isuser:function (req, res) {
		httpPost('/api/user/isuser',req, res)
	}
}
