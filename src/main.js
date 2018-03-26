import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/App'
import store from '@/store'
import axios from 'axios'
import tips from '@/common/tips'
import log from '@/common/log'
import router from '@/router/index'
import rem from '@/common/rem'
import dialog from '@/components/dialog'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.component('dialogs', dialog)
Vue.use(Vuex)
Vue.use(tips)      // 添加全局实例方法
Vue.use(log)

rem();   //页面自适应

var loading = document.getElementById('loading'),count = 0;
axios.interceptors.request.use(function (config) {
	if (config.method === 'get' && config.params && config.params.loading === false) {
		return config;
	} else if (config.method === 'post' && config.data && config.data.loading === false) {
		return config;
	} else {
		loading.setAttribute('class', 'show')
		//count++
		return config;
	}
}, function (error) {

	return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
	var res = response.config
	if (res.method === 'get' && res.params && res.params.loading === false) {
		return response;
	} else if (res.method === 'post' && res.data && res.data.loading === false) {
		return response;
	} else {
		loading.setAttribute('class', 'hide')
		/*count--
		if(!count){
			loading.setAttribute('class', 'hide')
		}*/
		return response;
	}
}, function (error) {
	loading.setAttribute('class', 'hide')
	return Promise.reject(error);
})

router.beforeEach((to, from, next) => {
	Vue.prototype.$axios.get('/proxy/login', {params: {loading: false,timestamp:new Date().getTime()}}).then(function (response) {
		store.commit('setUser', response.data)
		if (!response.data.phone && !response.data.uid) {
			store.commit('setLogin', false)
			var routers = ['/','/login','/question','/profile']
			if (routers.indexOf(to.path)< 0 &&  to.name !== 'activity') {
				next({path: '/login'})
			} else {
				next()
			}
		} else {
			store.commit('setLogin', true)
			if (to.path === '/compelete') {
				if (to.query.ispay) {
					console.log(store.state.user)
					setTimeout(function () {
						Vue.prototype.$axios.post('/api/login/loginmsg',{
							phone: store.state.user.phone
						}).then(function (response) {
							var rlt = response.data;
							if (rlt.header.code === '0') {
								console.log('会员之前状态' + store.state.user.card.isvip)
								if (rlt.isvip === '0') {
									//开通会员失败
									console.log('开通会员失败')
									next({path: '/profile'})
								} else if (rlt.isvip === '1' && store.state.user.card.isvip === '1') {
									//正常会员续费
									console.log('正常会员续费')
									next({path: '/profile'})
								}else if(rlt.isvip === '1' && store.state.user.card.isvip === '0'){
									//开通会员
									console.log('开通会员')
									next()
								}
							}else{
								next()
							}
						}).catch(function (error) {
							console.log(error);
							next()
						})
					},1000)
				}else{
					next()
				}
			} else {
				next()
			}
		}
	}).catch(function (error) {
		console.log(error);
		next()
	});
})

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
