<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.manage.nav2"></topNav>
	<view :class="cssStatic" class="content">
		<view class="backText" style="line-height: 22px;">
			{{$lang.backWord.text3}}
		</view>
		
		<view class="wordBox flex">
			<view class="items" v-for="(item,index) in wordBak" :key="index"><label></label><view>{{index+1}}</view>{{item}}</view>
		</view>
		
		<view class="backText flex">
			<view style="padding-top: 5px;"><image src="@/static/gantan.png" mode="widthFix" style="width: 20px;margin-right: 5px;height: 20px;" /></view>
			<view style="line-height: 22px;" class="text">
				{{$lang.backWord.text4}}
			</view>
		</view>
		
		<view class="btn flexCC" @click="backUpFun">{{$lang.backWord.btn2}}</view>
	</view>
</view>
</template>

<script>

export default {
	data() {
		return {
			wordBak:[],
			// wordBak:['install','divert','way','isolate','picnic','audit','bicycle','paddle','brass','reward','nest','deliver'],
			cssStatic: 'white'
		}
	},	
	onLoad() {
		this.wordBak=uni.getStorageSync('wordList').split(' ')
		let style =  this.$store.state.globalUIstyle
		this.cssStatic = style
		if(style=='black'){
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#1B222D'
			})
		}
	},
	methods: {
		backUpFun(){
			uni.navigateTo({
				url:"/pages/component/backWord/backWordStepTwo"
			})
		}
	}
}
</script>

<style scoped>
	/* page {height: 100vh;width: 100vw;overflow: hidden;} */
	/* .content {height: 100vh;width: 100vw;overflow: hidden;} */
	.backText{color: #666;font-size: 28rpx;padding: 30px 0 20px;}
.wordBox{flex-wrap: wrap;}
.wordBox view.items{width: calc(25% - 7.5px);background-color: #F4F9FA;text-align: center;height: 80rpx;line-height: 80rpx;margin: 0 10px 10px 0;border-radius: 5px;overflow: hidden;position: relative;font-size: 28rpx;}
.wordBox view.items:nth-child(4n){margin-right: 0;}
.wordBox label{position: absolute;top: 0;left: 0;width: 0;height: 0;
border-top: 30px solid #1762E6;border-right: 30px solid transparent;}
.wordBox .items view{position: absolute;top: 0;left: 0;color: #fff;font-size: 20rpx;width: 15px;text-align: center;line-height: 20px;}
.btn{position: fixed;bottom: 50px;left:10vw;width:80vw;background-color:#1762E6;color:#fff;height: 44px;border-radius: 5px;z-index: 9;}

.dark {background-color: #1B222D;}
.dark .wordBox .items {background-color: #202939;color: #C2CCDE; }
.dark .backText,.dark .backText .text {color: #6F7F9B;}


</style>
