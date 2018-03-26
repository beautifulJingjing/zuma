/**
 * Created by yr on 2017/8/23.
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		return {x: 0, y: 0}
	},
	routes: [
		{
			path: '/',
			component: resolve => require(['@/page/index'], resolve)
		},
		{
			path: '/activity/:activity',
			name:'activity',
			component: resolve => require(['@/page/activity/index'], resolve)
		},
		{
			path: '/make',
			component: resolve => require(['@/page/make'], resolve)
		},
		{
			path: '/login',
			component: resolve => require(['@/page/login'], resolve)
		},
		{
			path: '/compelete',
			component: resolve => require(['@/page/compelete'], resolve)
		},
		{
			path: '/profile',
			component: resolve => require(['@/page/profile'], resolve)
		},{
			path: '/question',
			component: resolve => require(['@/page/question'], resolve)
		},{
			path: '/feedback',
			component: resolve => require(['@/page/feedback'], resolve)
		},{
			path: '/pay',
			component: resolve => require(['@/page/pay'], resolve)
		},{
			path: '/failed',
			component: resolve => require(['@/page/failed'], resolve)
		},{
			path: '*',
			redirect: '/'
		}
	]
})
