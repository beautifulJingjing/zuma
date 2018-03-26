/**
 * Created by yr on 2017/9/5.
 */
var httpPost = require('./http')

module.exports = {
	gettemplate:function (req, res) {
		httpPost('/api/template/gettemplate',req, res)
	},
}
