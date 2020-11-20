<template>
<view class="selBg fixed">
	<view class="selCenter bgfff">
		<view class="selTitle">计价货币 </view>
		<view class="selItemBox">
			<view >sel 1</view>
			<view >sel 2</view>
			<view >sel 3</view>
			<view >sel 4</view>
			<view >sel 5</view>
		</view>
		<view class="selBtn">确定</view>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.selBg{height: 100vh;overflow: hidden;z-index: 99;background-color: rgba(0,0,0,0.5);}
	.selCenter{position: absolute;border-radius: 20px;bottom: 10px;left: 10px;right: 10px;padding:0 20px 20px;}
	.selTitle{font-size: 34rpx;padding:20px 0;text-align: center;}
	.selItemBox view{text-align: center;padding:10px 0;}
	
	
	
	.selBtn{text-align: center;background-color: #1295FF;color: #fff;font-size: 34rpx;height: 80rpx;line-height: 80rpx;}
</style>
