<template>
<view>
	<view style="height: 80px;"></view>
	<view class="footer flex flexauto fixed_bottom bgfff">
		<view :class="['flex1',curNav==1?'on':'']" @click="goNavigation(1)">
			<image src="../../static/part1.png" v-show="curNav!=1"></image>
			<image src="../../static/part1On.png" v-show="curNav==1"></image>
			首页1
		</view>
		<view :class="['flex1',curNav==2?'on':'']" @click="goNavigation(2)">
			<image src="../../static/part2.png" v-show="curNav!=2"></image>
			<image src="../../static/part2On.png" v-show="curNav==2"></image>
			行情{{curNav}}
		</view>
		<view :class="['flex1',curNav==3?'on':'']" @click="goNavigation(3)">
			<image src="../../static/part3.png" v-show="curNav!=3"></image>
			<image src="../../static/part3On.png" v-show="curNav==3"></image>
			交易
		</view>
		<view :class="['flex1',curNav==4?'on':'']" @click="goNavigation(4)">
			<image src="../../static/part4.png" v-show="curNav!=4"></image>
			<image src="../../static/part4On.png" v-show="curNav==4"></image>
			资产
		</view>
		
	</view>
</view>
	
</template>

<script>
	export default {
		data() {
			return {
				curNav:uni.getStorageSync('footerIndex'),
			}
		},
		onShow() {
			// this.curNav=uni.getStorageSync('footerIndex')?uni.getStorageSync('footerIndex'):1
		},
		onLoad(){
			
		},
		methods: {
			goNavigation(cur){
				this.curNav=cur
				
				if(cur==1){
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
				if(cur==2){
					uni.switchTab({
						url: '/pages/quotes/index'
					})
				}
				if(cur==3){
					uni.switchTab({
						url: '/pages/trade/index'
					})
				}
				if(cur==4){
					uni.switchTab({
						url: '/pages/myAccount/myAccount'
					})
				}
				uni.setStorage({
					key:'footerIndex',
					data:cur
				})
			}
		}
	}
</script>

<style scoped>
	.footer{border-top: 1px solid #F7F7FB;}
	.footer view{font-size: 20rpx;color: #B0C3D2; height: 50px;display: flex;flex-direction: column;justify-content: center;align-items: center;}
	.footer view image{width: 46rpx;height: 46rpx;}
	.footer view.on{color: #1762E6;}
</style>
