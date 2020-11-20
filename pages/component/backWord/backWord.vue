<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.manage.nav2"></topNav>
	<view class="noBacks">
		<image src="@/static/noDate.png" mode="widthFix"></image>
		<view class="textTitle">{{$lang.backWord.textTitle}}</view>
		<view class="grayTxts">{{$lang.backWord.text1}}</view>
		<view class="grayTxts flex flex_ac" style="font-weight: bold;"><view class="textIcon iconfont icon-warning"></view>{{$lang.backWord.text2}}</view>
	</view>
	<view class="btn flexCC" @click="showIf=true">{{$lang.backWord.btn1}}</view>
	<Keyboard :cssStatic="getTheme" :show="showIf" ref="keyboard" :success="checkResult" @hideKey="hidekeyboard" @getPassword="getPassword"></Keyboard>
</view>
</template>

<script>
	import Keyboard from "../../../components/custom-keyboard/custom-keyboard.vue"
	export default {
		components:  {Keyboard},
		data() {
			return {
				isShowChk:false,
				showIf: false,
				checkResult: true,
				cssStatic: '',
				imgStatic: '../../static/white/'
			}
		},
		methods: {
			hidekeyboard() {
				this.showIf = false;
				this.$refs.keyboard.clear()
			},
			getPassword(e) {
				if(e.msg=='success'){
					this.hidekeyboard()
					setTimeout(() => {
						uni.navigateTo({
							url:"/pages/component/backWord/backWordStepOne"
						})
					}, 200);
				}else{
					this.checkResult = false;
					this.$refs.keyboard.clear();
					setTimeout(() => {
						this.checkResult = true;
					}, 600);
				}
			}
		}
	}
</script>

<style scoped>
	/* page {height: 100vh;width: 100vw;} */
	.noBacks{padding-top: 100px;padding-left: 20px;padding-right: 20px;box-sizing: border-box;}
	.noBacks image{width: 130px;display: block;margin:0 auto;margin-bottom: 100px;}
	.textTitle{font-weight: bold;margin-bottom: 10px;font-size: 32rpx;}
	.grayTxts{color: #666;margin-bottom: 20px;font-size: 28rpx; line-height: 22px;}
	.textIcon{font-size: 26px;color: #666;margin-right: 5px;font-weight: normal;}
	.btn{position: fixed;bottom: 50px;left:10vw;width:80vw;background-color:#1762E6;color:#fff;height: 44px;border-radius: 5px;z-index: 9;}
	
	.dark {background-color: #1B222D;position: relative;overflow: hidden;}
	.dark .textTitle{color: #C2CCDE;}
	.dark .grayTxts{color: #6F7F9B;}
</style>
