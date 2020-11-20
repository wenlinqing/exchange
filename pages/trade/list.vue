<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav></topNav>
	<view class="fixed listTop" :style="'top:'+(statusBar+44)+'px'">
		<view class="listNav flex">
			<view class="flex" :class="nav==1?'on':''" @click="handleNav(1)">{{$lang.trade.listNav1}}</view>
			<view class="flex" :class="nav==2?'on':''" @click="handleNav(2)">{{$lang.trade.listNav2}}</view>
			<view class="flex" :class="nav==3?'on':''" @click="handleNav(3)">{{$lang.trade.listNav3}}</view>
		</view>
		<view class="listSort flex">
			<view class="flex1">{{$lang.trade.listSortTag1}} <view class="iconfont icon-sanjiaoxia" style="display: inline; font-size: 14px;color: #8C9FAD;margin-left: 5px;"></view> </view>
			<view class="flex1">{{$lang.trade.listSortTag2}} <view class="iconfont icon-sanjiaoxia" style="display: inline;font-size: 14px;color: #8C9FAD;margin-left: 5px;"></view></view>
			<view class="flex1">{{$lang.trade.listSortTag3}} <view class="iconfont icon-sanjiaoxia" style="display: inline;font-size: 14px;color: #8C9FAD;margin-left: 5px;"></view></view>
			<view class="flex1">{{$lang.trade.listSortTag4}} <view class="iconfont icon-sanjiaoxia" style="display: inline;font-size: 14px;color: #8C9FAD;margin-left: 5px;"></view></view>
		</view>
	</view>
	<view class="listTop"></view>

	<view class="list" v-show="nav==1">
		<noData :theme="getTheme" v-if="orderList1.length==0"></noData>
		<view class="curItem" v-for="(item,index) in orderList1" :key="index">
			<view class="flex cur_tt" @click="navigateToDetail(item)">
				<view class="tt flex" :class="item.type==1?'buy':'sell'">{{item.type==1?$lang.trade.buy:$lang.trade.sell}}</view>
				<view class="flex1 name flex">{{item.marketName}}</view>
				<view class="more flex flex_ac" :style="item.status==0?'color:#F2B518;':item.status==1?'color:#09BB07;':'color:#D9343E;'">
					{{item.status==0?$lang.trade.statue0:item.status==1?$lang.trade.statue1:$lang.trade.statue2}}
					<view class="iconfont icon-right" style="font-size: 12px;margin-left: 10px;"></view>
				</view>
			</view>
			<view class="flex datas">
				<view class="flex1">
					<text>{{$lang.trade.td1}}</text>
					<view>{{item.created.slice(-8,-3)}} {{item.created.slice(5,11)}}</view>
				</view>
				<view class="flex1">
					<text>{{$lang.trade.td2}}({{item.marketName.slice(item.marketName.indexOf('/')+1)}})</text>
					<view>{{item.price}}</view>
				</view>
				<view class="flex1 textR">
					<text>{{$lang.trade.td3}}({{item.marketName.slice(0,item.marketName.indexOf('/'))}})</text>
					<view>{{item.volume}}</view>
				</view>
			</view>
			<view class="flex datas" style="padding-top: 10px;">
				<view class="flex1">
					<text>{{$lang.trade.td4}}({{item.marketName.slice(item.marketName.indexOf('/')+1)}})</text>
					<view>{{item.dealAmount}}</view>
				</view>
				<view class="flex1">
					<text>{{$lang.trade.td5}} ({{item.marketName.slice(item.marketName.indexOf('/')+1)}})</text>
					<view>{{item.dealAvgPrice}}</view>
				</view>
				<view class="flex1 textR">
					<text>{{$lang.trade.td6}}({{item.marketName.slice(0,item.marketName.indexOf('/'))}})</text>
					<view>{{item.dealVolume}}</view>
				</view>
			</view>
		</view>
	</view>
	
	
	<view class="list" v-show="nav==2">
		<noData :theme="getTheme" v-if="orderList2.length==0"></noData>
		<view class="curItem" v-for="(item,index) in orderList2" :key="index">
			<view class="flex cur_tt" @click="navigateToDetail(item)">
				<view class="tt flex" :class="item.type==1?'buy':'sell'">{{item.type==1?$lang.trade.buy:$lang.trade.sell}}</view>
				<view class="flex1 name flex">{{item.marketName}}</view>
				<view class="more flex flex_ac" :style="item.status==0?'color:#F2B518;':item.status==1?'color:#09BB07;':'color:#D9343E;'">
					{{item.status==0?$lang.trade.statue0:item.status==1?$lang.trade.statue1:$lang.trade.statue2}}
					<view class="iconfont icon-right" style="font-size: 12px;margin-left: 10px;"></view>
				</view>
			</view>
			<view class="flex datas">
				<view class="flex1">
					<text>{{$lang.trade.td1}}</text>
					<view>{{item.created.slice(-8,-3)}} {{item.created.slice(5,11)}}</view>
				</view>
				
				<view class="flex1">
					<text>{{$lang.trade.td2}}({{item.marketName.slice(item.marketName.indexOf('/')+1)}})</text>
					<view>{{item.price}}</view>
				</view>
				<view class="flex1 textR">
					<text>{{$lang.trade.td3}}({{item.marketName.slice(0,item.marketName.indexOf('/'))}})</text>
					<view>{{item.volume}}</view>
				</view>
			</view>
			<view class="flex datas" style="padding-top: 10px;">
				<view class="flex1">
					<text>{{$lang.trade.td4}}({{item.marketName.slice(item.marketName.indexOf('/')+1)}})</text>
					<view>{{item.amount}}</view>
				</view>
				<view class="flex1">
					<text>{{$lang.trade.td5}} ({{item.marketName.slice(item.marketName.indexOf('/')+1)}})</text>
					<view v-show="nav!=3">{{item.dealAvgPrice}}</view>
					<view v-show="nav==3">{{item.turnoverPrice}}</view>
				</view>
				<view class="flex1 textR">
					<text>{{$lang.trade.td6}}({{item.marketName.slice(0,item.marketName.indexOf('/'))}})</text>
					<view>{{item.dealVolume}}</view>
				</view>
			</view>
		</view>
	</view>
	
	<view class="list" v-show="nav==3">
		<noData :theme="getTheme" v-if="orderList3.length==0"></noData>
		<view class="curItem" v-for="(item,index) in orderList3" :key="index">
			<view class="flex cur_tt" @click="navigateToDetail(item)">
				<view class="tt flex" :class="item.tradeType==1?'buy':'sell'">{{item.tradeType==1?$lang.trade.buy:$lang.trade.sell}}</view>
				<view class="flex1 name flex">{{item.marketName}}</view>
				<view class="more flex flex_ac" :style="item.status==0?'color:#F2B518;':item.status==1?'color:#09BB07;':'color:#D9343E;'">
					{{item.status==0?$lang.trade.statue0:item.status==1?$lang.trade.statue1:$lang.trade.statue2}}
					<view class="iconfont icon-right" style="font-size: 12px;margin-left: 10px;"></view>
				</view>
			</view>
			<view class="flex datas">
				<view class="flex1">
					<text>{{$lang.trade.td1}}</text>
					<view>{{item.created.slice(-8,-3)}} {{item.created.slice(5,11)}}</view>
				</view>
				
				<view class="flex1">
					<text>{{$lang.trade.item5}}</text>
					<view>{{$lang.trade.limitPrice}}</view>
				</view>
				<view class="flex1 textR">
					<text>{{$lang.trade.td9}} ({{item.marketName.slice(item.marketName.indexOf('/')+1)}})</text>
					<view>{{item.turnoverPrice}}</view>
					
				</view>
			</view>
			<view class="flex datas" style="padding-top: 10px;">
				<view class="flex1">
					<text>{{$lang.trade.td6}}({{item.marketName.slice(0,item.marketName.indexOf('/'))}})</text>
					<view>{{item.turnoverNum}}</view>
				</view>
				<view class="flex1">
					<text>{{$lang.trade.td7}}({{item.marketName.slice(item.marketName.indexOf('/')+1)}})</text>
					<view>{{item.turnoverAmount}}</view>
				</view>
				<view class="flex1 textR">
					<text>{{$lang.trade.td8}}({{item.marketName.slice(item.marketName.indexOf('/')+1)}})</text>
					<view>{{item.fee}}</view>
				</view>
			</view>
		</view>
	</view>
</view>
</template>
<script>
	export default {
		data() {
			return {
				nav:1,
				current1: 1,
				current2: 1,
				current3: 1,
				orderList1: [],
				orderList2: [],
				orderList3: []
			}
		},
		onLoad(options){
			this.coinsymbol = options.coinsymbol || 'DKUSDT'
			// console.log(this.coinsymbol)
			this.getOrderEntrusts().then(res=>{
				this.orderList1 = res.data.records
				this.current1 = res.data.current
				this.pages1 = res.data.pages
			})
		},
		onReachBottom(){
			if(this.nav == 1){
				if(this.pages1 > this.current1) {
					this.getOrderEntrusts(this.current1+1).then(res=>{
						this.orderList1 = [...this.orderList1,...res.data.records]
						this.current1 = res.data.current
						this.pages1 = res.data.pages
					})
				}
			}else if(this.nav == 2){
				if(this.pages2 > this.current2) {
					this.getHistoryOrder(this.current2+1).then(res=>{
						this.orderList2 = [...this.orderList2,...res.data.records]
						this.current2 = res.data.current
						this.pages2 = res.data.pages
					})
				}
			}else if(this.nav == 3){
				if(this.pages3 > this.current3) {
					this.getDealList(this.current3+1).then(res=>{
						this.orderList3 = [...this.orderList3,...res.data.records]
						this.current3 = res.data.current
						this.pages3 = res.data.pages
					})
				}
			}
		},
		methods: {
			handleNav(e) {
				if(e==this.nav) return
				this.nav = e
				this.current = 1
				if(e==2 && this.orderList2.length==0){
					this.getHistoryOrder().then(res=>{
						this.orderList2 = res.data.records
						this.current2 = res.data.current
						this.pages2 = res.data.pages
					})
				}else if(e==3 && this.orderList3.length==0){
					this.getDealList().then(res=>{
						this.orderList3 = res.data.records
						this.current3 = res.data.current
						this.pages3 = res.data.pages
					})
				}
			},
			getOrderEntrusts(current=this.current1,size=10,symbol=this.coinsymbol){
				return this.$request({url:`/v2/s/trade/order/entrusts/${symbol}/${current}/${size}`})
			},
			getHistoryOrder(current=this.current2,size=10,symbol=this.coinsymbol){
				return this.$request({url:`/v2/s/trade/order/history/${symbol}/${current}/${size}`})
			},
			getDealList(current=this.current3,size=10,symbol=this.coinsymbol){
				return this.$request({
					url: '/v2/s/orderManager/dealDetailList',
					method: 'post',
					data: {
						current,
						size,
						symbol,
						type: 0
					}
				})
			},
			navigateToDetail(e){
				if(this.nav == 3) return
				uni.setStorageSync('entrustsDetail',e)
				uni.navigateTo({
					url: "./detail"
				})
			}
		}
	}
</script>

<style scoped>
	.dark .on {color: #C5CFD5;}
	.dark .listSort .flex1 {color: #8C9FAD;}
	.light .listTop {background-color: #fff;}
	.dark .listTop {background-color: #1B222D;}
	.dark .curItem .flex1 view {color: #C5CFD5;}
	.iconfont {font-weight: bold;}
	.dark .iconfont {color: #C5CFD5;}
</style>
