<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav></topNav>
	<view class="listNav flex">
		<view class="flex on">{{$lang.trade.detailTT}}</view>
	</view>

	<view class="list">
		<view class="curItem" >
			<view class="flex cur_tt">
				<view class="tt flex" :class="detail.type==1?'buy':'sell'">{{detail.type==1?$lang.trade.buy:$lang.trade.sell}}</view>
				<view class="flex1 name flex">{{detail.marketName}}</view>
			</view>
			<view class="flex datas">
				<view class="flex1">
					<text>{{$lang.trade.td1}}</text>
					<view>{{detail.created.slice(-8,-3)}} {{detail.created.slice(5,11)}}</view>
				</view>
				<view class="flex1">
					<text>{{$lang.trade.td2}}({{detail.marketName.split('/')[1]}})</text>
					<view>{{detail.price}}</view>
				</view>
				<view class="flex1 textR">
					<text>{{$lang.trade.td3}}({{detail.marketName.split('/')[0]}})</text>
					<view>{{detail.volume}}</view>
				</view>
			</view>
			<view class="flex datas" style="padding-top: 10px;">
				<view class="flex1">
					<text>{{$lang.trade.td4}}({{detail.marketName.split('/')[1]}})</text>
					<view>{{detail.amount}}</view>
				</view>
				<view class="flex1">
					<text>{{$lang.trade.td5}}({{detail.marketName.split('/')[1]}})</text>
					<view>{{detail.dealAvgPrice}}</view>
				</view>
				<view class="flex1 textR">
					<text>{{$lang.trade.td6}}({{detail.marketName.split('/')[0]}})</text>
					<view>{{detail.dealVolume}}</view>
				</view>
			</view>
		</view>
		
		
		<view class="dt_more flex flexbetween" >
			<!-- <text>{{detail.status==0?'委托':detail.status==1?'成交':'撤销'}}时间</text> -->
			<text>{{$lang.trade.td1}}</text>
			{{detail.lastUpdateTime.slice(-8,-3)}} {{detail.lastUpdateTime.slice(5,11)}}
		</view>
		<view class="dt_more flex flexbetween">
			<text>{{$lang.trade.item5}} </text>
			{{$lang.trade.limitPrice}}
		</view>
		<view class="dt_more flex flexbetween">
			<text>{{$lang.trade.td9}}</text>
			{{detail.dealAvgPrice}} {{detail.marketName.split('/')[1]}}
		</view>
		<view class="dt_more flex flexbetween">
			<text>{{$lang.trade.td6}}</text>
			{{detail.dealVolume}} {{detail.marketName.split('/')[0]}}
		</view>
		<view class="dt_more flex flexbetween">
			<text>{{$lang.trade.td8}}</text>
			{{detail.dealFee}} {{detail.marketName.split('/')[1]}}
		</view>

	</view>
	
</view>
</template>
<script>
	export default {
		data() {
			return {
				nav:1,
				detail: {}
			}
		},
		onLoad(){
			console.log(uni.getStorageSync('entrustsDetail'))
			this.detail = uni.getStorageSync('entrustsDetail')
		},
		methods: {
			onChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e))
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	.dark .listNav .on {color: #C5CFD5;}
	.dark .cur_tt .name{color: #C5CFD5;}
	.dark .flex1 view {color: #C5CFD5;}
	/* .dt_more {border-top: 10px solid #F7F7FB;} */
	.dark .dt_more {color: #C5CFD5;}
</style>
