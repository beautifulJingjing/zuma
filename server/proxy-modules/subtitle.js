/**
 * Created by yr on 2017/9/5.
 */
var httpPost = require('./http')

module.exports = {
	getreason:function (req, res) {
		httpPost('/api/subtitle/getreason',req, res)
	},
}
