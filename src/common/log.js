/**
 * Created by yr on 2017/8/28.
 */
const log = {
	install: function (vue) {
		vue.prototype.$log = function (data) {
			return new Promise(function (resolve) {
				//data.loading = false
				vue.prototype.$axios.get('/proxy/log',{params:data || {}}).then(function (response) {
					resolve()
				}).catch(function (error) {
					resolve()
				});
			})
		}
	}
}
export default log
