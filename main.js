import Vue from 'vue'
import App from './App'
import store from './store'
import theme from 'store/mixin.js'
import {netWork} from 'unit/netWork.js'

import request from 'unit/request.js'
Vue.prototype.$request=request

import statusBar from 'pages/component/status-bar.vue'
Vue.component('statusBar',statusBar)

import Footer from 'pages/component/footer.vue'
Vue.component('Footer',Footer)

import topNav from 'pages/component/topNav.vue'
Vue.component('topNav',topNav)
// <topNav rightCoinName="notice" title="资产详情"></topNav>

import upTop from 'pages/component/upTop.vue'
Vue.component('upTop',upTop)

import noData from 'pages/component/noData.vue'
Vue.component('noData',noData)
// <noData v-if="list.length==0"></noData>

import bottomSelect from 'pages/component/bottomSelect.vue'
Vue.component('bottomSelect',bottomSelect)

Vue.prototype.goBack=function(){
	uni.navigateBack()
}

Vue.prototype.$store = store

import i18n from './lang/i18n.js'  
import en from './lang/en_US.js'
import zh from './lang/zh_CN.js'
i18n.registerLocale({en,zh})
Vue.prototype.$lang = i18n.getLanguage()


Vue.prototype.ToastFun=function(){
	uni.showToast({
		title: this.$lang.common.wait,
		icon: "none"
	})
}

Vue.prototype.copy=function(txt){
	uni.setClipboardData({
		data: txt,
		success:()=>{
			uni.showToast({
				title: this.$lang.common.copySuc,
				icon: "none"
			})
		},
		fail() {
			uni.showToast({
				title: this.$lang.common.copyErr,
				icon: "none"
			})
		}
	})
}
Vue.prototype.fixed=function(txt){
	if(!txt||txt==''){
		return '0.00000000'
	}else{
		return txt
	}
}
Vue.prototype.fixedCny=function(txt){
	if(!txt||txt==0||txt==''){
		return '0.00'
	}else{
		return Math.floor(txt * 100) / 100
	}
}
Vue.prototype.formatDate=function(time,format){
	if(typeof(format) ==='undefined'){
		format = "yyyy-MM-dd hh:mm:ss";
	}
	let ret;
	var date = new Date(time.replace(/-/g, '/'));
	const opt = {
		"y+": date.getFullYear().toString(),        // 年
		"M+": (date.getMonth() + 1).toString(),     // 月
		"d+": date.getDate().toString(),            // 日
		"h+": date.getHours().toString(),           // 时
		"m+": date.getMinutes().toString(),         // 分
		"s+": date.getSeconds().toString()          // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(format);
		if (ret) {
			format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return format;
}


// drill pair journey jaguar rhythm inside pencil zebra used awkward rice emotion

Vue.mixin(theme)
Vue.mixin(netWork)
Vue.config.productionTip = false

Vue.filter('formatDate', function (time,format) {
	return time;
	if(typeof(format) ==='undefined'){
		format = "yyyy-MM-dd hh:mm:ss";
	}
	let ret;
    const opt = {
		"Y+": date.getFullYear().toString(),        // 年
		"m+": (date.getMonth() + 1).toString(),     // 月
		"d+": date.getDate().toString(),            // 日
		"H+": date.getHours().toString(),           // 时
		"M+": date.getMinutes().toString(),         // 分
		"S+": date.getSeconds().toString()          // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(format);
		if (ret) {
			format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return format;
})
Vue.filter('breviary',function(value,len){
	value=value||'';
	if (value.length>len) {
		var obj1=value.substring(0,len);
		var obj2=value.substring(value.length-len)
		return obj1+"..."+obj2
	}else{
		return value
	}
})
Vue.filter('fixedTwo',function(value,len){
	if(value){
		// value=value*100
		const realVal = parseFloat(value).toFixed(2);
		// const realVal = Math.round(value)/100;
		return realVal;
	}else{
		return '0.00'
	}
})
/* 

uni.showLoading({
	title: '加载中',
	mask:true
});
uni.showLoading({title: '请稍后',mask:true}); uni.showLoading({title: this.$lang.common.waiting,mask:true});
uni.showLoading({mask:true});

uni.hideLoading();

<noData v-if="list.length==0"></noData>

 */



App.mpType = 'app'

const app = new Vue({
	...App,
	store,
	i18n
})
app.$mount()
