<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.login.btn2"></topNav>
	<view class="boxer">
		<view class="flex flexbetween importBox">
			<view :class="{on:loginType==1}" @click="choseLogin(1)">{{$lang.login.importTag1}}</view>
			<view :class="{on:loginType==2}" @click="choseLogin(2)">{{$lang.login.importTag2}}</view>
		</view>
		<view class="areaBox">
			<textarea ref="textarea" v-if="loginType==1" placeholder-class="inputPlace" v-model.trim="keyWord" :placeholder="$lang.login.formHolder3" />
			<textarea ref="textarea" v-if="loginType==2" placeholder-class="inputPlace" v-model.trim="identity" :placeholder="$lang.login.formHolder4" />
			<!-- <text class="parses">粘贴</text> -->
		</view>
		<view class="btnLight" @click="nextFun" v-if="type=='login'">{{$lang.login.btn4}}</view>
		<view class="btnLight" @click="importFun" v-if="type=='import'">{{$lang.login.btn5}}</view>
	</view>
</view>
</template>
<script>
	export default {
		name: "pwd",
		data(){
			return{//install divert way isolate picnic audit bicycle paddle brass reward nest deliver
				keyWord:'',
				loginType:1,
				identity:'',
				type:'login'
			}
		},
		onLoad(option) {
			this.type=option.type
		},
		methods:{
			importFun(){
				if(this.loginType==1){
					var data={
						mnemonic:this.keyWord
					}
				}else{
					var data={
						identity:this.identity
					}
				}
				this.$request({
					url: '/v2/w/address/importWallet',
					method: 'POST',
					data: data
				}).then(res=>{
					this.goBack()
				}).catch(error=>{
					uni.showToast({
						title:error.errmsg,
						icon:'none'
					})
				});	
			},
			choseLogin(loginType){
				this.loginType=loginType
			},
			nextFun(){
				if(!this.isNetWork()){return}
				
				if(this.loginType==1){
					if(this.keyWord==''){
						uni.showToast({
							title:this.$lang.login.error3,
							icon:'none'
						})
						return
					};
					// console.log(this.keyWord)
					this.$request({
						url: '/v2/u/user/existMnemonic',
						method: 'POST',
						data: { mnemonic: this.keyWord }
					}).then(res=>{
						if(res.data.isExist==1){
							uni.setStorageSync('wordList',this.keyWord)
							uni.setStorageSync('isRegister',true)
							
							uni.navigateTo({
								url:'/pages/component/password?way=2'
							})
						}else if(res.data.isExist==0){
							uni.showToast({
								title: this.$lang.login.error4,
								icon: "none"
							})
						}
					}).catch(error=>{
						console.log(error);
					});	
				}else{
					if(this.identity==''){
						uni.showToast({
							title:this.$lang.login.formHolder4,
							icon:'none'
						})
						return
					};
					this.$request({
						url: '/v2/u/user/existIdentity',
						method: 'POST',
						data: { identity: this.identity }
					}).then(res=>{
						if(res.data.isExist==1){
							uni.setStorageSync('isRegister',true)
							uni.setStorageSync('identity',this.identity)
							
							uni.navigateTo({
								url:'/pages/component/password?way=3'
							})
						}
					}).catch(error=>{
						console.log(error);
					});
				}
			}
		}
	}
</script>
<style scoped>
	.boxer{padding:10px 15px;box-sizing: border-box;}
	.areaBox{position: relative;box-sizing: border-box;}
	.importBox{width: 70%;margin:0 auto;padding-top: 20px;}
	.importBox view{height: 40px;line-height: 40px;font-weight: bold;color: #8C9FAD;}
	.importBox view.on{color: #1762E6;border-bottom: 2px solid #1762E6;}
	textarea{border: 1px solid #ececec;border-radius: 10rpx;padding:20rpx;width: calc(100% - 30px);color: #000;margin-top: 10px;height: 150px;}
	.parses{color: #1295FF;border: 1px solid #1295FF;font-size: 24rpx;position: absolute;right: 10rpx;bottom:10rpx;border-radius: 20px;padding:3px 10px;z-index: 9;}
	.btnLight{margin-top: 30px;width: 100%;}
	
	.dark .inputPlace {color: #3F506E;}
	.dark textarea {color: #C5CFD5;}
</style>