/**
 * Created by yr on 2017/9/6.
 */
var httpPost = require('./http')

module.exports = {
	loginmsg: function (req, res) {
		httpPost('/api/login/loginmsg',req, res)
	},
	sendmsgcode: function (req, res) {
		httpPost('/api/login/sendmsgcode',req, res)
	},
	validatecode: function (req, res) {
		httpPost('/api/login/validatecode',req, res)
	},
}