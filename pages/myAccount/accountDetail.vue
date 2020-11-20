<template>
<view class="minHeight">
	<status-bar ></status-bar>
	<topNav ></topNav>
	<view class="coinList" style="border-bottom: none;">
		<view class="coin_N flex flexbetween" style="font-size: 48rpx;margin-bottom: 25px;">
			{{coinObj.coinName}}
		</view>
		<view class="flex">
			<view class="flex1">
				<view class="tt">{{$lang.myAcount.keyong}}</view>
				<view class="num">{{coinObj.balanceAmount}}</view>
			</view>
			<view class="flex1">
				<view class="tt">{{$lang.myAcount.dongjie}}</view>
				<view class="num">{{coinObj.freezeAmount}}</view>
			</view>
			<view class="flex1 textR">
				<view class="tt">{{$lang.myAcount.zhehe}}(CNY)</view>
				<view class="other">{{coinObj.totalCny.toFixed(2)}}</view>
			</view>
		</view>
	</view>
	<view style="height: 10px;background-color: #F7F7FB;"></view>
	
	<view class="recordBox">
		<view class="record_TT flex flexbetween">
			{{$lang.myAcount.listTT}}
			<image src="../../static/filter.png" mode="widthFix" style="width: 22px;" @click="$refs.bottomSel.open()">
		</view>
		<noData v-if="list.length==0"></noData>
		
		<view class="coinList liBox" v-for="item,index in list" :key="index" @click="goMore(item)">
			<view class="coin_N flex flexbetween">
				{{item.businessTypeStr}}
			</view>
			<view class="flex">
				<view class="flex1">
					<view class="tt">{{$lang.transfer.li1}}</view>
					<view class="num">{{item.amount}}</view>
				</view>
				<view class="flex1">
					<view class="tt">{{$lang.transfer.li2}}</view>
					<view class="num">{{item.status==0?$lang.transfer.statue0:item.status==1?$lang.transfer.statue1:$lang.transfer.statue2}}</view>
				</view>
				<view class="flex1 textR">
					<view class="tt">{{$lang.transfer.li3}}</view>
					<view class="num">{{formatDate(item.created,'hh:mm MM/dd')}}</view>
				</view>
				<view class="dot flexauto flex">
					<image src="../../static/dot.png" mode="widthFix" style="width: 3px;height: 18px;display: block;">
				</view>
			</view>
		</view>
	</view>
	
	
	
	<view style="height: 100px;"></view>
	<view class="bottomBox flex fixed_bottom bgfff" style="height: 75px;">
		<view class="flex1 bt_item" @click="linkTo('/pages/myAccount/recharge',true)">
			<view class="flexCC"><image src="../../static/coin_in.png" mode="widthFix"></image></view>
			{{$lang.recharge.recharge}}
		</view>
		<view class="flex1 bt_item" @click="linkTo('/pages/myAccount/withdrawal',true)">
			<view class="flexCC"><image src="../../static/coin_out.png" mode="widthFix"></image></view>
			{{$lang.transfer.withdrawal}}
		</view>
		<view class="flex1 bt_item" @click="linkTo('/pages/myAccount/transfer',true)">
			<view class="flexCC"><image src="../../static/coin_trans.png" mode="widthFix"></image></view>
			{{$lang.transfer.transfer}}
		</view>
		<view class="flex1 bt_item" style="color: #1762E6;">
			<view class="flexCC"><image src="../../static/coin_trade.png" mode="widthFix"></image></view>
			{{$lang.transfer.bibiTrade}}
		</view>
	</view>
	
	<bottom-select ref="bottomSel" :value="value" :items="selObj" @callBack="callback"></bottom-select><!-- :cancelLight="true" -->
	<upTop :display="upTop" bottom="100"><!-- upTop 混入变量 --></upTop>
</view>
</template>

<script>
export default {
	data() {
		return {
			filter:false,
			coinId:'',
			list:[],
			coinObj: uni.getStorageSync('coinObj')?JSON.parse(uni.getStorageSync('coinObj')):{},
			pages:0,
			current:1,
			selObj:[
				{value:'',text:this.$lang.common.all},
				{value:1,text:this.$lang.recharge.recharge},
				{value:2,text:this.$lang.transfer.withdrawal},
				{value:3,text:this.$lang.pool.btn1},
				{value:4,text:this.$lang.pool.btn2},
			],
			value:'',
		}
	},
	mounted() {
		
	},
	onShow(){
		this.current=1
		this.getList()
		uni.removeStorageSync('selectAddr');
		uni.removeStorageSync('transferCoin')
		uni.removeStorageSync('detailObj')
	},
	onLoad(options) {
		this.coinId=options.coinId
	},
	onReachBottom() {
		if(this.current<this.pages){
			this.current+=1
			this.getList()
		}
	},
	methods: {
		getList(){
			uni.showLoading({mask:true});
			this.$request({
				url: '/v2/s/accountDetail/recordList', //仅为示例，并非真实接口地址。
				data:{
					coinId:this.coinId,
					current:this.current,
					size:20,
					type:this.value
				},
			}).then(res=>{
				uni.hideLoading();
				this.list.push.apply(this.list, res.data.records)
				this.pages=res.data.pages
			}).catch(error=>{
				uni.hideLoading();
				console.log(error);
			});
		},
		goMore(item){
			uni.setStorageSync('detailObj', JSON.stringify(item));
			this.linkTo('/pages/myAccount/record_detail?businessType='+item.businessType, false);
		},
		callback(type){
			this.value=type
			this.current=1
			this.list=[]
			this.getList()
			this.$forceUpdate()
		},
	}
}
</script>

<style scoped>
	.content image{width: 100%;}
</style>
