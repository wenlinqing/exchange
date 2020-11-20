<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav ></topNav>
	<view class="titleWrap" style="border-bottom: none;">
		<view class="coin_N flex flexbetween" style="font-size: 48rpx;margin-bottom: 0;">
			{{$lang.gonggao}}
		</view>
	</view>
	<view class="news" v-for="item,index in noticeList" :key="index" @click="goDetail(item)">
		{{item.title}}
	</view>
	
	<upTop :display="upTop" bottom="50"><!-- upTop 混入变量 --></upTop>
</view>
</template>
<script>
	export default {
		data() {
			return {
				noticeList:uni.getStorageSync('noticeList')?JSON.parse(uni.getStorageSync('noticeList')) : [],
			}
		},
		onLoad(){
			if(this.netWork){
				this.$request({
					url: '/v2/s/notice/queryNoticeByType',
					data:{
						current:1,
						size:50,
						type:0
					},
					method:'POST',
				}).then(res=>{
					this.noticeList=res.data.records
					uni.setStorage({
						key:'noticeList',
						data:JSON.stringify(res.data.records)
					})
				}).catch(error=>{
					console.log(error);
				});
			}
		},
		methods: {
			goDetail(obj) {
				if(this.isNetWork()){
					this.linkTo('/pages/index/newsDetail?id='+obj.id)
				}
			}
		}
	}
</script>

<style>
	.coin_N {color: #172841;}
	.titleWrap {padding: 15px 16px;}
	.dark .coin_N,.dark .news{color: #C5CFD5;border-color: #283752;}
</style>
