<template>
<view class="minHeight">
	<status-bar ></status-bar>
	<topNav :title="$lang.income.incomeList"></topNav>

	<view>
		<view class="coinList liBox" v-for="item,index in list" :key="index">
			<view class="coin_N flex flexbetween">
				{{$lang.income.gameIn}}（{{item.totalCnyAmount}} CNY）
				<label>{{formatDate(item.createTime,'yyyy/MM/dd')}}</label>
			</view>
			<view class="flex">
				<view class="flex1 itemList">
					<view class="bold">{{item.turntableAmount}}</view>
					<label>{{item.turntableCnyAmount}} CNY</label>
					<label>{{$lang.income.turntableAmount}}（DK）</label>
				</view>
				<view class="flex1 itemList">
					<view class="bold">{{item.directAmount}}</view>
					<label>{{item.directCnyAmount}} CNY</label>
					<label>{{$lang.income.directAmount}}（DK）</label>
				</view>
				<view class="flex1 itemList">
					<view class="bold">{{item.groupAmount}}</view>
					<label>{{item.groupCnyAmount}} CNY</label>
					<label>{{$lang.income.groupAmount}}（DK）</label>
				</view>
			</view>
		</view>
		
		<noData v-if="list.length==0"></noData>
	</view>
	
	<upTop :display="upTop"><!-- upTop 混入变量 --></upTop>
</view>
</template>

<script>
export default {
	data() {
		return {
			list:[],
			pages:0,
			current:1,
		}
	},
	mounted(){
		this.getList()
	},
	onShow(){
		uni.removeStorageSync('detailObj')
	},
	onLoad(options) {
		
	},
	onReachBottom() {
		if(this.current<this.pages){
			this.current+=1
			this.getList()
		}
	},
	methods: {
		getList(){
			if(!this.isNetWork()) return
			uni.showLoading({mask:true});
			this.$request({
				url: '/v2/s/ferrisWheel/queryTurntableStatisticsList',
				data:{
					current:this.current,
					size:20,
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
	}
}
</script>

<style scoped>
	.coin_N{color: #1762E6;font-weight: 500;font-size: 32rpx;}
	.coin_N label{color: #8C9FAD;font-weight: normal;}
	.itemList .bold{font-weight: bold;font-size: 40rpx;}
	.itemList label{display: block;color: #8C9FAD;font-size: 22rpx;margin-top: 5px;}
</style>
