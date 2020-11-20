<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.system.aboutUs"></topNav>

	<view class="flexCC" style="padding:15px;">
		<image src="../../static/aboutBanner.png" mode="widthFix" style="width: 100%;"></image>
	</view>
	
	<view class="col flexbetween">
		<view style="font-weight: 500;font-size:32rpx;">{{$lang.system.version}}</view>
		<view class="flex_ac">
			<view class="versionText">{{version}}</view>
			<view class="iconfont icon-right" style="font-size: 18px;margin-left: 12px;"></view>
		</view>
	</view>
	<view class="col flexbetween">
		<view style="font-weight: 500;font-size:32rpx;">{{$lang.system.protocol}}</view>
		<view class="iconfont icon-right" style="font-size: 18px;margin-left: 12px;"></view>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				version:''
			}
		},
		mounted() {
			// #ifdef APP-PLUS
			this.version=plus.runtime.version
			// #endif
			// console.log(plus.runtime.version)
		},
		methods: {

		}
	}
</script>

<style>
.col {height: 110rpx;width: 100vw;background-color: #FFFFFF;box-sizing: border-box;padding-left: 15px;padding-right: 15px;}
/* .col view {color: #999;} */

.light {background-color: #F7F7FB;}
.versionText {color: #8C9FAD;}

.dark {background-color: #1B222D;color: #6F7F9B;}
.dark .col {background-color: #202939;}
.dark .col view,.dark .versionText {color: #6F7F9B;}
</style>
