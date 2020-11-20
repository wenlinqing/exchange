import Vuex from 'vuex'
import store from '../store/index.js'


// var baseUrl = 'https://192.168.1.30:8081' // 测试环境
// var baseUrl = 'https://darkchain.mojivip.com:8082' // 测试环境


var baseUrl = 'https://darkchain.plus:8081' // 线上环境

function request(options){
	if(!store.state.netWork) {
		uni.showToast({
			title: this.$lang.netWorkErr,
			icon: "none"
		})
		return new Promise((res,rej)=>{
			return
		})
	}
	var userInfo=uni.getStorageSync('userInfo')?JSON.parse(uni.getStorageSync('userInfo')):{}
	let headers={}
	var language=(!uni.getStorageSync("languageKey") || uni.getStorageSync("languageKey")=='zh')? 1:2
	headers['Authorization'] = userInfo.access_token||'';
	headers["Content-Type"] = "application/json";
	headers["language"] = language;
	headers["version"] = 12;

	return new Promise((res,rej)=>{
		uni.request({
			url:baseUrl + options.url,
			method:options.method || 'GET',
			data:options.data,
			sslVerify: false,
			header:headers,
			success(data) {
				if(data.data.errcode==0){
					res(data.data)
				}else{
					if(data.data.errcode==40001){
						uni.removeStorageSync('userInfo')
						uni.reLaunch({
							url:'/pages/index/index'
						})
					}
					rej(data.data)
				}
			},
			fail(err) {
				rej(err)
			}
		})
	})
}
export default request;