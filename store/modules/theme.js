import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default {
	state: {
		theme: uni.getStorageSync('theme') || 'light',
	},
	getters: {
		getTheme(state){
			return state.theme
		}
	},
	mutations:{
		setTheme(state,data){
			state.theme=data
			uni.setStorage({
				key:'theme',
				data:data
			})
		}
	}
}














