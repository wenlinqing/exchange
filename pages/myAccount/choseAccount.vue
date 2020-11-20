<template>
<view  style="min-height: 100vh;">
	<status-bar ></status-bar>
	<topNav title="选择账户"></topNav>
	
	<!-- <view class="coins flex flex_ac flexbetween">币币账户 <image src="../../static/right.png" mode="widthFix" style="width: 7px;"></image></view> -->
	<view class="coins flex flex_ac flexbetween">法币账户 <image src="../../static/right.png" mode="widthFix" style="width: 7px;"></image></view>
	<view class="coins flex flex_ac flexbetween">全仓杠杆账户 <image src="../../static/right.png" mode="widthFix" style="width: 7px;"></image></view>
	<view class="coins flex flex_ac flexbetween">逐仓杠杆账户 <image src="../../static/right.png" mode="widthFix" style="width: 7px;"></image></view>
	<view class="coins flex flex_ac flexbetween">矿池账户 <image src="../../static/right.png" mode="widthFix" style="width: 7px;"></image></view>

</view>
</template>

<script>
export default {
	data() {
		return {
			showSearch: false,
			showDialog:false
		}
	},
	onLoad() {

	},
	methods: {

	}
}
</script>

<style scoped>
	.coins{font-weight: 400;padding:25px 0;}
	
</style>
