/**
 * Created by yr on 2017/9/5.
 */
var httpPost = require('./http')

module.exports = {
	feed:function (req, res) {
		httpPost('/api/feedback/feed',req, res)
	},
}
