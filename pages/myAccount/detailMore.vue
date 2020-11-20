<template>
<view  style="min-height: 100vh;">
	<status-bar ></status-bar>
	<topNav ></topNav>
	<view class="coinList"  >
		<view class="coin_N flex flexbetween" style="font-size: 48rpx;">
			{{detailObj.amount}} {{detailObj.coinName}}
		</view>
	</view>
	
	<view class="dt_item flex">
		<label>{{$lang.transfer.li1}}</label>
		<view class="dt_item_r flex1">
			{{detailObj.businessTypeStr}}
		</view>
	</view>
	<view class="dt_item flex">
		<label>{{$lang.transfer.li1}}</label>
		<view class="dt_item_r flex1">
			{{detailObj.status==0?$lang.transfer.statue0:detailObj.status==1?$lang.transfer.statue1:$lang.transfer.statue2}}
		</view>
	</view>
	<view class="dt_item flex" v-if="detailObj.from!=''">
		<label>From</label>
		<view class="dt_item_r flex1">
			{{detailObj.from}}
		</view>
	</view>
	<view class="dt_item flex" v-if="detailObj.to!=''">
		<label>To</label>
		<view class="dt_item_r flex1">
			{{detailObj.to}}
		</view>
	</view>
	<view class="dt_item flex">
		<label>{{$lang.transfer.li3}}</label>
		<view class="dt_item_r flex1">
			{{formatDate(detailObj.created,'hh:mm MM/dd/yyyy')}}
		</view>
	</view>
	
</view>
</template>

<script>
export default {
	data() {
		return {
			detailObj: uni.getStorageSync('detailObj')?JSON.parse(uni.getStorageSync('detailObj')):{},
		}
	},
	onLoad() {

	},
	methods: {

	}
}
</script>

<style scoped>
	
</style>
