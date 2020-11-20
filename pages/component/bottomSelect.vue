<template>
<view :class="getTheme">
	<view class="viewBg fixed" :class="showLineBox?'show':''" @click="cancelFun"></view>
	<view class="lineBox fixed_bottom" :class="!showLineBox?'act':''" >
		<view class="subBox">
			<view class="btns offBtn" :class="value==item.value?'on':''" @click="choose(item.value)" v-for="item,index in items" :key="index">
				{{item.text}}
			</view>
		</view>
		<view style="height: 10px;" :style="getTheme=='light'?'background-color: #F1F2F5;':'background-color: #1B222D;'"></view>
		<view class="btns cancel" style="border-bottom: none;" :class="cancelLight?'on':''" @click="cancelFun">{{$lang.btnCancel}}</view>
	</view>
</view>
</template>

<script>
	export default {
		props:{
			items:{
				type:Array,
				default: []
			},
			value:{
				type:[String,Number,Boolean],
				default:''
			},
			cancelLight:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				showLineBox: false
			}
		},
		methods: {
			choose(type){
				this.showLineBox=false
				this.$emit('callBack',type)
			},
			open(){
				this.showLineBox=true
			},
			cancelFun(){
				this.showLineBox=!1
				uni.showTabBar()
			}
		}
	}
</script>

<style scoped>
	.viewBg{background-color: rgba(0,0,0,0.4);z-index: 9999;bottom:0;left: 0;opacity: 0;pointer-events: none;transition: all 0.2s ease-in-out;}
	.viewBg.show{opacity: 1;pointer-events: auto;}
	.lineBox{z-index: 10000;transition:bottom 0.25s ease-in-out;opacity: 1;border-radius: 10px 10px 0 0;overflow: hidden;}
	.lineBox .subBox{background-color: #fff;}
	.lineBox .btns{text-align: center;background-color: #fff;height: 100rpx;line-height: 100rpx;
	font-size: 32rpx;border-bottom: 1px solid #F1F2F5;font-weight: 600;}
	.lineBox .btns.on{color: #1295FF;}
	
	.lineBox.act{bottom:-100%;}
	
	
	.dark .lineBox {background-color: #1B222D;}
	.dark .subBox .btns,.dark .cancel{background-color: #202939;}
	.dark .btns {border-color: #283752;color: #C5CFD5;}
</style>
