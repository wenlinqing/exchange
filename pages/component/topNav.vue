<template>
<view :class="getTheme">
	<view class="backBox fixed flexbetween" :style="'top:'+statusBar+'px;'">
		<view class="goBack flexCC" @click="goBack">
			<!-- <image src="../../static/back.png" mode="widthFix" v-if="backIcon=='white'"></image>
			<image src="../../static/back2.png" mode="widthFix" v-if="backIcon=='black'"></image> -->
			<view class="iconfont icon-left" style="font-size: 22px;"></view>
		</view>
		<view class="title">{{title}}</view>
		<view class="goBack Right flexCC" v-if="rightCoinName!=''" @click="clickFun">
			<slot name="rightIcon"></slot>
		</view>
	</view>
	<view class="backBox" v-if="!isToTop"></view>
</view>
</template>
<script>
	export default {
		props:{
			backIcon:{
				type:String,
				default:'black'
			},
			title:{
				type:String,
				default:''
			},
			isToTop:{
				type:Boolean,
				default:false
			},
		},
		data(){
			return {}
		},
		methods:{
			clickFun(){
				this.$emit('callback')
			}
		}
	}
</script>

<style lang="scss">
	.dark {
		.backBox {background-color: $darkBGColor;} 
		.title,.iconfont {
			color: #C5CFD5;
		}
	}
	.light .backBox {background-color: #fff;}
</style>