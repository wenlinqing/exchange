<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.transfer.detailTitle"></topNav>
	
	
	<view class="coinList"  >
		<view class="coin_N flex flexbetween" style="font-size: 48rpx;">
			{{detailObj.amount}} {{detailObj.coinName}}
		</view>
	</view>
	
	<view class="dt_item flex">
		<label>{{$lang.transfer.li0}}</label>
		<view class="dt_item_r flex1">
			{{detailObj.businessTypeStr}}
		</view>
	</view>
	<view class="dt_item flex">
		<label>{{$lang.transfer.li2}}</label>
		<view class="dt_item_r flex1">
			{{detailObj.status==0?$lang.transfer.statue0:detailObj.status==1?$lang.transfer.statue1:$lang.transfer.statue2}}
		</view>
	</view>
	<view class="dt_item flex" v-if="!(businessType=='recharge'||businessType=='withdraw')">
		<label>From</label>
		<view class="dt_item_r flex1">
			{{detailObj.from}}
		</view>
	</view>
	<view class="dt_item flex" v-if="!(businessType=='recharge'||businessType=='withdraw')">
		<label>To</label>
		<view class="dt_item_r flex1">
			{{detailObj.to}}
		</view>
	</view>
	
	<view class="dt_item flex" v-if="businessType=='withdraw'">
		<label>{{$lang.transfer.tibiAdr}}</label>
		<view class="dt_item_r flex1">
			{{result.coinName}}{{$lang.transfer.tibiAdr}}
			<view>{{result.address}}</view>
		</view>
	</view>
	<view class="dt_item flex" v-if="businessType=='withdraw'">
		<label>{{$lang.transfer.tibiFee}}</label>
		<view class="dt_item_r flex1">
			{{result.fee}} {{result.coinName}}
		</view>
	</view>
	<view class="dt_item flex" v-if="businessType=='recharge'||businessType=='withdraw'">
		<label>{{$lang.transfer.tibiId}}</label>
		<view class="dt_item_r flex1">
			{{result.txid}}
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
			businessType:'',
			result:''
		}
	},
	onLoad(options) {
		this.businessType=options.businessType
	},
	onShow() {
		if(this.businessType=='recharge'&&this.detailObj.rtxid!=''){
			this.$request({
				url: '/v2/s/coinRecharge/detail',
				data:{
					rTxid:this.detailObj.rtxid,
				},
			}).then(res=>{
				this.result=res.data
			}).catch(error=>{
				console.log(error);
			});
		}
		if(this.businessType=='withdraw'&&this.detailObj.rtxid!=''){
			this.$request({
				url: '/v2/w/withdraw/detail',
				data:{
					rTxid:this.detailObj.rtxid,
				},
			}).then(res=>{
				this.result=res.data
			}).catch(error=>{
				console.log(error);
			});
		}
	},
	methods: {
		
	}
}
</script>

<style scoped>
	.dark .coinList {background-color: #1B222D;}
	.dark .dt_item .dt_item_r {color: #C5CFD5;}
	.dark .dt_item {border-color: #283752;}
</style>
