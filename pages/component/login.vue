<template>
	<view class="content flex flexColumn flexbetween" :class="getTheme">
		<view class="swiperBox flex1">
			<uni-swiper-dot class="swiperBoxer" :info="info" :current="current" field="content" :mode="mode" :dots-styles="dotsStyles">
			    <swiper class="swiper-box" @change="change" autoplay interval="4000">
					<swiper-item>
					    <view class="swiper-item">
					        <image :src="'../../static/'+getTheme+'/start2.png'" mode="aspectFit"></image>
					    	<view class="swpH1">{{$lang.login.title1}}</view>
					    	<view class="swpTxt">{{$lang.login.content1}}</view>
					    </view>
					</swiper-item>
					<swiper-item>
					    <view class="swiper-item">
					        <image :src="'../../static/'+getTheme+'/start3.png'" mode="aspectFit"></image>
					    	<view class="swpH1">{{$lang.login.title2}}</view>
					    	<view class="swpTxt">{{$lang.login.content2}}</view>
					    </view>
					</swiper-item>
			    </swiper>
			</uni-swiper-dot>
		</view>
		<view class="btnBox">
			<navigator url="/pages/index/management/create?way=1" open-type="navigate"><button class="btnLight button1">{{$lang.login.btn1}}</button></navigator>
			<navigator url="/pages/component/importWords?type=login" open-type="navigate"><button class="btnLight button2" plain=true >{{$lang.login.btn2}}</button></navigator>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: [{
				content: '内容 B'
			}, {
				content: '内容 C'
			}],
			current: 0,
			mode: 'round',
			dotsStyles: {
				backgroundColor: '#D8D8D8',
				border: '1px #D8D8D8 solid',
				selectedBackgroundColor: '#1295FF',
				selectedBorder: '1px #1295FF solid',
				bottom:0
			}
		}
	},
	onLoad() {

	},
	methods: {
		change(e) {
			this.current = e.detail.current
		},
		load(){
			// try{
			// 	const value=uni.getStorageSync('startFlag')
			// 	if(value){
			// 		uni.switchTab({
			// 			url: '/pages/index/index'
			// 		})
			// 	}else{
			// 		this.startFlag=flase
			// 	}
			// } catch(e){
			// 	uni.setStorage({
			// 		key: 'startFlag',
			// 		data: true,
			// 		success:()=>{
			// 			console.log('error时存储launchFlag')
			// 		}
			// 	})
			// 	this.startFlag=true
			// }
		}
	}
}
</script>

<style scoped>
	.content{height: 100vh;width: 100vw;}
	.swiperBox{width: 100vw;text-align: center;margin-bottom: 30px;padding-top: 200rpx;}
	.swiperBox image{width: 100%;}
	.swiperBoxer,.swiper-box{height: 100%;}
	.swpH1{font-size: 50rpx;font-weight: bold;color: #1295FF;margin: 20px 0 10px;}
	.swpTxt{font-size: 28rpx;color: #333;}
	.btnBox{padding-bottom: 5vh;}
	.button1{margin-bottom: 40rpx;}
	.button2{border:1px solid #1295FF;color: #1295FF;}
	
	.dark .swpTxt {color: #8C9FAD;}
</style>
