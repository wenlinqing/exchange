<template>
<view style="min-height: 100vh;" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.system.modifyPwd"></topNav>

	<view class="title">{{$lang.system.modifyN}}</view>
	<view class="textBox" style="position: relative;">
		<textarea class="textarea" :value="value" @input="handleInput" :placeholder="$lang.system.modifyHolder" placeholder-class="text-place" />
		<!-- <view class="pasteWrap flexCC" @click="handlePaste">粘贴</view> -->
	</view>
	
	<view class="btn flexCC" @click="checkWord">{{$lang.btnSure}}</view>
</view>
</template>

<script>
export default {
	data() {
		return {
			value: ''
		};
	},
	onLoad() {
		this.wordList = uni.getStorageSync('wordList')
	},
	methods: {
		handleInput(e) {
			this.value = e.detail.value
		},
		checkWord() {
			let wordList = this.wordList.toString().split(',').join('').split(' ').join('')
			let value = this.value.toString().split(',').join('').split(' ').join('')
			if(wordList === value){
				uni.redirectTo({
					url: './modifyLogin'
				})
			}else {
				uni.showToast({
					title: this.$lang.system.modifyErr,
					icon: 'none'
				})
			}
		},
		handlePaste() {
			uni.getClipboardData({
				success: (res) => {
					this.value = res.data
				}
			})
		}
	}
}
</script>

<style>
.title {font-size: 16px;color: #666666;padding: 20px 15px;font-weight: 500;}
.textBox {width: 100vw;box-sizing: border-box;padding-left: 15px;padding-right: 15px;}
.textarea {width: 100%;height: 200rpx;border-radius: 4px;border: 1px solid #E5E5E5;box-sizing: border-box;padding: 20rpx;font-size: 14px;}
.btn {height: 88rpx;background-color: #1762E6;border-radius: 5px;margin: 50px 15px 0;color: #FFFFFF;font-size: 32rpx;}
.pasteWrap {width: 40px;height: 20px;border-radius: 20px;border: 1px solid #1762E6;color: #1762E6;font-size: 12px;position: absolute;bottom: 8px;right: 28px;}


.dark .title {color: #C2CCDE;}
.dark .textarea {border: 1px solid #283752;color:#C5CFD5;}
.dark .text-place {color: #505D75;}
</style>
