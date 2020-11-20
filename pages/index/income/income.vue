<template>
<view class="minHeight">
	<status-bar ></status-bar>
	<topNav :title="$lang.income.income" rightCoinName="list_icon" @callback="callFun"></topNav>

	<view class="content">
		<view class="pool_name">{{$lang.income.yesDay}}</view>
		<view class="flex poolNum">{{result.totalCnyAmount||0.00}} <label>CNY</label></view>
		
		<view class="bankInfo">
			<view class="flex flexbetween bankItem">
				{{$lang.income.turntableAmount}}（DK）
				<view class="textR">
					<view>{{result.turntableAmount||0.00}}</view>
					<label>{{result.turntableCnyAmount||0.00}} CNY</label>
				</view>
			</view>
			<view class="flex flexbetween bankItem">
				{{$lang.income.directAmount}}（DK）
				<view class="textR">
					<view>{{result.directAmount||0.00}}</view>
					<label>{{result.directCnyAmount||0.00}} CNY</label>
				</view>
			</view>
			<view class="flex flexbetween bankItem">
				{{$lang.income.groupAmount}}（DK）
				<view class="textR">
					<view>{{result.groupAmount||0.00}}</view>
					<label>{{result.groupCnyAmount||0.00}} CNY</label>
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
				poolInfo:{},
				result:''
			}
		},
		mounted(){
			if(!this.isNetWork()) return
			this.$request({
				url: '/v2/s/ferrisWheel/getTurntableStatistics',
				data:{},
				method:'post'
			}).then(res=>{
				this.result=res.data
			}).catch(error=>{
				console.log(error);
			});
		},
		methods: {
			getIpfsInfo(){
				if(!this.isNetWork()) return
				uni.showLoading({mask:true});
				this.$request({
					url: '/v2/s/memPerformance/info/'+this.coinId,
					data:{},
					methods:'post'
				}).then(res=>{
					uni.hideLoading();
					this.poolInfo=res.data;
				}).catch(error=>{
					uni.hideLoading();
					console.log(error);
				});
			},
			callFun(){
				this.linkTo('/pages/index/income/income_record', true);
			},
		}
	}
</script>

<style scoped>
	.pool_name{font-weight: 600;}
	.poolNum{font-size: 48rpx;font-weight: 600;align-items: flex-end;justify-content: center;padding:20px 0;}
	.poolNum label{color: #8C9FAD;font-size: 28rpx;margin-left: 10px;font-weight: normal;padding-bottom: 3px;}
	
	.bankInfo{padding:15px;background-color: #F7F7FB;border-radius: 5px;margin-top: 30px;}
	.bankItem{padding:10px 0;}
	.bankItem view view{font-size: 40rpx;font-weight: 600;}
	.bankItem .textR label{color: #8C9FAD;font-weight: 600;}
	
	
</style>
