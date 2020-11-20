<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.login.btn1" ></topNav>
	<view style="padding-left: 15px;padding-right: 15px;" >
		<view class="formItems">
			<view class="itemName">{{$lang.login.form1}}</view>
			<input type="text" v-model.trim="walletName" :placeholder="$lang.login.formHolder1" placeholder-class="inputPlace"/>
		</view>
		<view class="formItems">
			<view class="itemName">{{$lang.login.form2}}</view>
			<input type="number" maxlength="6" v-model.trim="password" :placeholder="$lang.login.formHolder2" placeholder-class="inputPlace"/>
		</view>
		
		<view class="btnLight" v-if="way==1" style="width: 100%;border-radius: 5px;margin-top: 45px;" @click="saveFun">{{$lang.login.btn3}}</view>
		<view class="btnLight" v-if="way==2" style="width: 100%;border-radius: 5px;margin-top: 45px;" @click="saveAdr">{{$lang.login.btn3}}</view>

	</view>
</view>
</template>

<script>
import {mnemonic} from '../../../unit/mnemonic.js'
export default {
	name: 'create',
	data() {
		return {
			walletName: '',
			password: '',
			way: 2,
			mnemonic: '',
		};
	},
	onLoad(params) {
		this.way=params.way
		// #ifdef APP-PLUS
		plus.device.getInfo({
				success:function(e){
					Vue.prototype.uuid = e.uuid
				},
				fail:function(e){
					Vue.prototype.uuid = ''
				}
			});
		// #endif
	},
	mounted(){
		if(this.way==1){
			this.mnemonic=mnemonic
		}
	},
	methods: {
		saveFun(){
			if(this.walletName==''){
				uni.showToast({
					title:this.$lang.login.formHolder1,
					icon:"none"
				})
				return
			}
			if(this.password==''){
				uni.showToast({
					title:this.$lang.login.error1,
					icon:"none"
				})
				return
			}
			if(isNaN(this.password) || this.password.length!=6 || this.password.indexOf('.')>=0){
				uni.showToast({
					title:this.$lang.login.error2,
					icon:"none"
				})
				return
			}
			uni.setStorageSync('walletName', this.walletName);
			uni.setStorageSync('startPassWord', this.password);
			uni.setStorageSync('wordList', this.mnemonic);
			
			if(this.netWork){
				uni.showLoading({title: this.$lang.common.created,mask:true});
				var data={
					mnemonic:this.mnemonic,
					terminalNo:this.uuid || new Date().getTime(),
					password:this.password,
					type:'eth',
					walletName:this.walletName
				}
				this.$request({
					url: '/v2/u/user/register3', //仅为示例，并非真实接口地址。
					data:data,
					method:'POST',
				}).then(res=>{
					uni.setStorageSync('isRegister',true)
					uni.hideLoading();
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}).catch(error=>{
					uni.hideLoading();
					uni.showToast({
						title:error.errmsg,
						icon:"none"
					})
					uni.removeStorageSync('walletName');
					uni.removeStorageSync('startPassWord');
					uni.removeStorageSync('wordList');
					// console.log(error);
				});
			}else{
				setTimeout(function(){
					uni.reLaunch({
						url: '/pages/index/index'
					})
				},500)
			}
			
		},
		saveAdr(){
			if(!this.isNetWork()) return
			if(this.walletName==''){
				uni.showToast({
					title:this.$lang.login.formHolder1,
					icon:"none"
				})
				return
			}
			if(this.password==''){
				uni.showToast({
					title:this.$lang.login.error1,
					icon:"none"
				})
				return
			}
			if(isNaN(this.password) || this.password.length!=6){
				uni.showToast({
					title:this.$lang.login.error2,
					icon:"none"
				})
				return
			}
			uni.showLoading({title: this.$lang.common.created,mask:true});
			
			var data={
				walletName:this.walletName,
				password:this.password,
				type:'eth',
			}
			this.$request({
				url: '/v2/u/user/addWallet',
				data:data,
				method:'POST',
			}).then(res=>{
				uni.hideLoading();
				uni.showToast({
					title:this.$lang.common.createdSuc,
					duration:1500
				})
				setTimeout(()=>{
					this.goBack()
				},1500)
			}).catch(error=>{
				uni.hideLoading();
				uni.showToast({
					title:error.errmsg,
					duration:1500,
					icon:"none"
				})
			});
		},
	}
};
</script>

<style scoped>
.formItems {
	border-bottom: 1px solid #e5e5e5;
	padding: 20px 0;
}
.itemName {
	padding: 5px 0 10px;
	font-weight: bold;
	font-size: 28rpx;
}
.itemIcon {
	font-size: 20px;
	color: #999;
}

.dark .itemName {
	color: #C5CFD5;
}
.dark {
	background-color: #1b222d;
	color: #6f7f9b;
}
.dark .itemIcon {
	color: #c2ccde;
}
.dark .formItems {
	border-bottom: 1px solid #6f7f9b;
	color: #6f7f9b;
}
.dark .iconfont {
	color: #6f7f9b;
}
.dark .inputPlace {
	color: #3F506E;
}
.dark input {color: #C5CFD5;}
</style>
