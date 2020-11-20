<template>
<view class="minHeight">
	<status-bar ></status-bar>
	<view class="indexTop flex flex_ac fixed bgfff" :style="'box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);top:'+statusBar+'px'">
		<view class="indexTop_search flex1 flex flex_ac" style="margin-left:0;">
			<image src="../../static/search2.png" mode="widthFix" style="width: 32rpx;margin-right: 10px;"></image>
			<input class="searchInput flex1" type="text" value="" placeholder="搜索币种" placeholder-style="color:#8C9FAD"/>
		</view>
		<view style="color: #1762E6;font-size: 32rpx;" @click="goBack">取消</view>
	</view>
	<view style="height: 50px;"></view>
	
	<view class="sch_coin flex flex_ac flexbetween">
		DASH/USDT
		<image src="../../static/startOn.png" mode="widthFix" style="width: 20px;"></image>
	</view>
	<view class="sch_coin flex flex_ac flexbetween">
		BCH/USDT
		<image src="../../static/start.png" mode="widthFix" style="width: 18px;"></image>
	</view>
	<view class="sch_coin flex flex_ac flexbetween">
		ETC/USDT
		<image src="../../static/start.png" mode="widthFix" style="width: 18px;"></image>
	</view>
	<view class="sch_coin flex flex_ac flexbetween">
		DTA/BTC
		<image src="../../static/start.png" mode="widthFix" style="width: 18px;"></image>
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
			onChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e))
			}
		}
	}
</script>

<style scoped>
	.searchInput {
		height: 30px;
	}
	.sch_coin{padding:15px;font-weight: bold;}
</style>
