<template>
<view class="minHeight">
	<status-bar ></status-bar>
	<topNav :title="$lang.index.ft_btn10"></topNav>
	<view class="content">
		<view class="ecoItem" @click="linkTo('/pages/webView2',true)">
			<image src="../../static/eco1.png" mode="widthFix" style="width: 100%;display:block"></image>
			<view class="ecoTitle flex flex_ac">
				<image src="../../static/ecoIcon1.png" mode="widthFix" style="width: 72rpx;height: 72rpx;"></image>{{$lang.ecology.sec1}}
			</view>
			<view class="conts">{{$lang.ecology.text1}}</view>
		</view>
		
		<view class="ecoItem">
			<image src="../../static/eco2.png" mode="widthFix" style="width: 100%;display:block"></image>
			<view class="ecoTitle flex flex_ac">
				<image src="../../static/ecoIcon2.png" mode="widthFix" style="width: 72rpx;height: 72rpx;"></image>{{$lang.ecology.sec2}}
			</view>
			<view class="conts">{{$lang.ecology.text2}}</view>
		</view>
		
		<view class="ecoItem">
			<image src="../../static/eco3.png" mode="widthFix" style="width: 100%;display:block"></image>
			<view class="ecoTitle flex flex_ac">
				<image src="../../static/ecoIcon3.png" mode="widthFix" style="width: 72rpx;height: 72rpx;"></image>{{$lang.ecology.sec3}}
			</view>
			<view class="conts">{{$lang.ecology.text3}}</view>
		</view>
	</view>
	
</view>
</template>
<script>
	export default {
		data() {
			return {
				href:'',
				value:5
			}
		},
		onLoad(){
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.ecoItem{position: relative;margin-bottom: 20px;}
	.ecoTitle{color: #fff;font-size: 40rpx;position: absolute;top: 15px;left: 15px;z-index: 9;}
	.ecoTitle image{margin-right: 15px;}
	.conts{position: absolute;top: 50%;right: 15px;z-index: 9;font-size: 32rpx;background-color: rgba(255,255,255,.8);
	height: 64rpx;line-height: 64rpx;width: 200rpx;text-align: center;border-radius: 15px;}
	
</style>
