import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import theme from './modules/theme.js'
export default new Vuex.Store({
	modules:{
		theme
	},
	state:{
		hasLogin:uni.getStorageSync('hasLogin')||false,
		userInfo:{},
		netWork: true,
		socketRequest: 'darkchain.plus' 
		// socketRequest: '192.168.1.30' 
	},
	gettters: {
		getNetWork(state) {
			return state.netWork
		},
		getSocketRequest(state){
			return state.socketRequest
		}
	},
	mutations:{
		loginAction(state,data){
			state.hasLogin=true;
			state.userInfo=data
			uni.setStorageSync('userInfo', JSON.stringify(data));
			uni.setStorageSync('hasLogin', true);
			uni.setStorageSync('walletName', data.walletName);
			uni.setStorageSync('wordList', data.mnemonic.replace(/,/g,' '));
		},
		loginOut(state){
			state.hasLogin=false;
			state.userInfo={}
			uni.removeStorageSync('hasLogin');
			uni.removeStorageSync('userInfo');
			uni.removeStorageSync('wordList');
			uni.removeStorageSync('startPassWord');
			uni.removeStorageSync('accounts');
			uni.removeStorageSync('isRegister');
			uni.removeStorageSync('walletName');
			uni.removeStorageSync('identity');
			uni.removeStorageSync('gestruePwd');
			uni.setStorageSync('turnOnGestrue',false);
		},
		setNetWork(state,data){
			state.netWork = data
		}
	}
})














