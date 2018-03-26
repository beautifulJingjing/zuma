/**
 * Created by yr on 2017/8/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		title:'',
		user:undefined,
		one:false,
		isLogin:false,
		isFree:false,
		isMake:false,
		isIndex:true,
		icon:{
			back:true,
			profile:false,
			question:false,
		},
		footer:false
	},
	actions: {
		CHANGE_TITLE:function({commit}){
			commit('SET_TITLE',{})
		}
	},
	mutations: {
		setTitle (state,data) {
			state.title = data;
		},
		setUser (state,data) {
			//console.log(data)
			state.user = data;
		},
		setOne (state,data) {
			state.one = data;
		},
		setLogin(state,data){
			state.isLogin = data;
		},
		setIcon (state,data) {
			state.icon.back = data.back;
			state.icon.profile = data.profile;
			state.icon.question = data.question;
		},
		setFree (state,data) {
			state.isFree = data;
		},
		setFooter (state,data) {
			state.footer = data;
		},
		setIndex (state,data) {
			state.isIndex = data;
		},
	},
	getters: {
		one:(state) => {
			return state.one
		},
		isLogin:(state) => {
			return state.isLogin
		},
		isFree:(state) => {
			return state.isFree
		},
		isIndex:(state) => {
			return state.isIndex
		},
	}
})
export default store