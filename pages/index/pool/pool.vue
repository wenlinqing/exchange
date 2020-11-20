<template>
<view class="minHeight">
	<status-bar ></status-bar>
	<topNav :title="$lang.pool.pool" rightCoinName="list_icon" @callback="callFun"></topNav>

	<view class="content">
		<view class="pool_name">{{$lang.pool.income}}（DK）</view>
		<view class="flex poolNum">{{poolInfo.income}} <label>≈{{poolInfo.cnyIncome}} CNY</label></view>
		
		<view class="bankInfo flex flex_ac">
			<view class="flex1 bankItem">
				<view>{{poolInfo.holdPower}}</view>
				<label>{{$lang.pool.holdPower}}</label>
			</view>
			<view class="line"></view>
			<view class="flex1 bankItem">
				<view>{{poolInfo.promotePower}}</view>
				<label>{{$lang.pool.promotePower}}</label>
			</view>
		</view>
		
		<view class="feedItem flex flex_ac flexbetween">
			<view class="itemTt">{{$lang.pool.bestHold}}（DK）</view>
			<label>{{poolInfo.bestHold}}</label>
		</view>
		<view class="feedItem flex flex_ac flexbetween">
			<view class="itemTt">{{$lang.pool.minHold}}（DK）</view>
			<label>{{poolInfo.minHold}}</label>
		</view>
		<view class="feedItem flex flex_ac flexbetween" @click="linkTo('/pages/index/pool/poolDetail', false);">
			<view class="itemTt">{{$lang.pool.poolDetail}} </view>
			<image src="../../../static/right.png" mode="widthFix" style="width: 12rpx;height: 24rpx;"></image>
		</view>
		<view class="feedItem">
			<view class="itemTt">{{$lang.pool.ownAmount}}：{{poolInfo.ownAmount|fixedTwo}}</view>
			<view class="flex selectBox">
				<input type="number" v-model="amount" :placeholder="$lang.pool.err1" placeholder-style="color:#C5CFD5;"/>
				<view class="btn" @click="actionFun(1)">{{$lang.pool.btn1}}</view>
				<view class="btn" style="background-color: #D9343E;" @click="actionFun(2)">{{$lang.pool.btn2}}</view>
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
				amount:'',
				coinId:''
			}
		},
		mounted(){
			if(!this.isNetWork()) return
			this.$request({
				url: '/v2/s/memPerformance/list',
				data:{},
			}).then(res=>{
				this.coinId=res.data[0].coinId
				this.getIpfsInfo()
			}).catch(error=>{
				uni.showToast({
					title:error.errmsg,
					icon:'none'
				})
			});
		},
		methods: {
			actionFun(type){
				if(!this.isNetWork()) return
				if(this.amount==''){
					uni.showToast({
						title:this.$lang.pool.err1,
						icon:'none'
					})
					return
				}
				if(this.amount==0){
					uni.showToast({
						title:this.$lang.pool.err2,
						icon:'none'
					})
					return
				}
				uni.showLoading({title: this.$lang.common.waiting,mask:true});
				this.$request({
					url: '/v2/s/user/account/poolTranfer',
					data:{
						coinId:this.coinId,
						amount:this.amount,
						type:type,
					},
					method:'post'
				}).then(res=>{
					uni.hideLoading();
					uni.showToast({
						title:this.$lang.common.actionSuc,
						icon:'success'
					})
					this.getIpfsInfo()
					this.amount=''
				}).catch(error=>{
					uni.hideLoading();
					uni.showToast({
						title:error.errmsg,
						icon:'none'
					})
				});
			},
			getIpfsInfo(){
				if(!this.isNetWork()) return
				this.$request({
					url: '/v2/s/memPerformance/info/'+this.coinId,
					data:{},
					methods:'post'
				}).then(res=>{
					this.poolInfo=res.data;
				}).catch(error=>{
					console.log(error);
				});
			},
			callFun(){
				this.linkTo('/pages/index/pool/pool_record?coinId='+this.coinId, true);
			},
		}
	}
</script>

<style scoped>
	.pool_name{font-weight: 600;}
	.poolNum{font-size: 48rpx;font-weight: 600;align-items: flex-end;justify-content: center;padding:20px 0;}
	.poolNum label{color: #8C9FAD;font-size: 28rpx;margin-left: 10px;font-weight: normal;padding-bottom: 3px;}
	
	.feedItem{border-bottom: 1px solid #F1F2F5;padding:15px 0;}
	.itemTt{font-weight: 400;}
	.feedItem label{font-weight: 600;}
	.selectBox{padding-top: 5px;}
	.selectBox input{height: 30px;flex: 1;}
	.selectBox .btn{width: 52px;height: 30px;line-height: 30px;text-align: center;background: #15B383;border-radius: 5px;color: #fff;margin-left: 10px;}
	
	.bankInfo{padding:20px 0;background-color: #F7F7FB;border-radius: 5px;text-align: center;margin-bottom: 30px;}
	.bankInfo view{font-size: 40rpx;font-weight: 600;}
	.bankInfo label{color: #8C9FAD;}
	.bankInfo .line{width: 1px;height: 24px;background: #C5CFD5;}
	
	
</style>
