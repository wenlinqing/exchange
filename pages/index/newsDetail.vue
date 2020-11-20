<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav ></topNav>
	<view class="titleWrap" style="border-bottom: none;">
		<view class="title" style="">
			{{obj.title}}
			<view class="time">{{obj.created}}</view>
		</view>
		
	</view>
	<view class="newsDetail">
		<!-- <view class="conts">{{obj.content}}</view> -->
		<rich-text :nodes="obj.content"></rich-text>
	</view>
	<!-- <view class="rightTxt">{{obj.author}}</view> -->
	<!-- <view class="rightTxt">{{obj.created}}</view> -->
	
	<upTop :display="upTop" bottom="50"><!-- upTop 混入变量 --></upTop>
</view>
</template>
<script>
	export default {
		data() {
			return {
				obj:{}
			}
		},
		onLoad(options){
			this.$request({
				url: '/v2/s/notice/'+options.id,
			}).then(res=>{
				this.obj=res.data
			}).catch(error=>{
				console.log(error);
			});
		}
	}
</script>

<style>
	.titleWrap {padding: 15px;}
	.time {color: #6A84A4;margin-top: 5px;}
	.title {font-size: 48rpx;margin-bottom: 0;color: #172841;font-weight: normal;}
	.dark .titleWrap {color: #C5CFD5;}
	.dark .newsDetail {color: #C5CFD5;}
	.dark .title {color: #C5CFD5;}
</style>
