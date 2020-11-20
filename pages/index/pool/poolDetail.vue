<template>
<view class="minHeight">
	<status-bar ></status-bar>
	<topNav :title="$lang.pool.poolDetail" ></topNav>

	<view class="content" style="background-color: #F7F7FB;">
		<view class="feedItem flex flex_ac flexbetween">
			<view class="itemTt">{{$lang.pool.refferCount}}</view>
			<label>{{info.refferCount}}</label>
		</view>
		<view class="feedItem flex flex_ac flexbetween">
			<view class="itemTt">{{$lang.pool.refferDeviceCount}}</view>
			<label>{{info.refferDeviceCount}}</label>
		</view>
		<view class="feedItem flex flex_ac flexbetween">
			<view class="itemTt">{{$lang.pool.totalCount}}</view>
			<label>{{info.totalCount}}</label>
		</view>
		<view class="feedItem flex flex_ac flexbetween">
			<view class="itemTt">{{$lang.pool.totalDeviceCount}}</view>
			<label>{{info.totalDeviceCount}}</label>
		</view>
	</view>
	<view class="content">
		<view class="chiItem" v-for="item,index in list" :key="index">
			<view class="tt">{{$lang.pool.amount}}：{{item.ownAmount}}</view>
			<label>ID：{{item.userId}}</label>
			<view class="flex chiData">
				<view>{{$lang.pool.refferCount}}：{{item.refferCount}}</view>
				<view>{{$lang.pool.refferDeviceCount}}：{{item.refferDeviceCount}}</view>
				<view>{{$lang.pool.totalCount}}：{{item.totalCount}}</view>
				<view>{{$lang.pool.totalDeviceCount}}：{{item.totalDeviceCount}}</view>
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
				info:{},
				amount:'',
				coinId:'',
				list:[],
				current:1,
				pages:0
			}
		},
		mounted(){
			
			if(!this.isNetWork()) return
			this.$request({
				url: '/v2/s/memPerformance/sce/info',
				data:{},
			}).then(res=>{
				this.info=res.data;
				this.coinId=res.data.coinId
				this.getList()
			}).catch(error=>{
				console.log(error);
			});
			
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
					url: '/v2/s/memPerformance/info/list',
					data:{
						current:this.current,
						size:20,
						coinId:this.coinId
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
			callFun(){
				this.linkTo('/pages/index/pool/pool_record', true);
			},
		}
	}
</script>

<style scoped>
	.pool_name{font-weight: 600;}
	.poolNum{font-size: 48rpx;font-weight: 600;align-items: flex-end;justify-content: center;padding:20px 0;}
	.poolNum label{color: #8C9FAD;font-size: 28rpx;margin-left: 10px;font-weight: normal;padding-bottom: 3px;}
	
	.feedItem{padding:10px 0;}
	.itemTt{font-weight: 400;}
	.feedItem label{font-weight: 600;}
	
	.chiItem{padding:15px 0;border-bottom: 1px solid #F1F2F5;}
	.chiItem .tt{font-size: 32rpx;font-weight: bold;margin-bottom: 5px;}
	.chiItem label{color: #8C9FAD;font-weight: bold;font-size: 28rpx}
	.chiData{flex-wrap: wrap;}
	.chiData view{width: 50%;margin-top: 10px;font-weight: 400;}
	
</style>
