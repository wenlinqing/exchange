<template>
<view :class="getTheme">
	<view class="dialogBg fixed" v-show="showDialog"></view>
	<view class="flexCC fixed dialogBoxer" :class="{'act':showDialog}">
		<view class="dialogCenter">
			<view class="dialogTitle">{{title}}</view>
			<view class="dialogCont flexCC">{{content}}</view>
			<view class="dialogBtns flex">
				<view class="flex1" @click="cancelFun" v-if="isCancelBtn">{{cancelText}}</view>
				<view class="flex1 hl_btns" @click="sureFun">{{sureText}}</view>
			</view>
		</view>
	</view>
</view>

</template>

<script>
	export default {
		data() {
			return {
				showDialog:false,
			}
		},
		props:{
			title:{
				type:String,
				default:'提醒'
			},
			content:{
				type: String,
				default:''
			},
			cancelText:{
				type: String,
				default:'取消'
			},
			sureText:{
				type: String,
				default:'确定'
			},
			isCancelBtn:{
				type:Boolean,
				default:true
			}
		},
		onLoad() {
			
		},
		methods: {
			open(){
				this.showDialog=true
			},
			cancelFun(){
				this.showDialog=false
				// this.$emit('close')
			},
			sureFun(){
				this.showDialog=false
				this.$emit('confirm')
			}
		}
	}
</script>

<style scoped>
	.dialogBg{height: 100vh;overflow: hidden;z-index: 99;background-color: rgba(0,0,0,0.5);}
	.dialogBoxer{height: 100vh;overflow: hidden;position: fixed;z-index: 100;-webkit-transform:scale(0);transition: all .3s ease;}
	.dialogCenter{width: 80%;border-radius: 10px;}
	.dialogBoxer.act{-webkit-transform:scale(1);}
	.dialogTitle{text-align: center;padding: 20px 0;font-size: 36rpx;font-weight: bold;}
	.dialogCont{padding:0 15px 15px;min-height: 80px;line-height: 22px;}
	.dialogBtns{border-top: 1px solid #E5E5E5;}
	.dialogBtns view{height: 100rpx;line-height: 100rpx;text-align: center;color: #999;font-size: 34rpx;}
	.dialogBtns view:nth-child(2){border-left: 1px solid #E5E5E5;}
	.dialogBtns .hl_btns{color: #1295FF;}
	
	.light .dialogCenter {background-color: #fff;}
	
	.dark .dialogCenter {background-color: #202939;}
	.dark .dialogTitle {color: #6F7F9B;}
	.dark .dialogCont {color: #6F7F9B !important;}
	.dark .dialogBtns,.dark .dialogBtns view:nth-child(2){border-color: #283752;}
</style>
