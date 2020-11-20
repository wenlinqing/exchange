<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.manage.manage"></topNav>
	<view class="paddingBox">
		<view class="manage_title">{{$lang.manage.txt}}</view>
		<view class="manageItem flex" v-for="item,index in list" :key="index">
			<image src="../../../static/chkOn.png" mode="widthFix" v-if="item.loginFlag==1" class="flexauto" style="width: 32rpx;height:32rpx;"></image>
			<image @click="checkLogin(item)" src="../../../static/chkOff.png" mode="widthFix" v-if="item.loginFlag==0" class="flexauto" style="width: 32rpx;height:32rpx;"></image>
			<view class="flex1" @click="goDetail(item)">
				<view class="name">{{item.walletName}}</view>
				<view class="adress">{{item.address}}</view>
			</view>
		</view>
		
		<view class="btnBox">
			<navigator url="/pages/index/management/create?way=2" open-type="navigate"><button class="btnLight button1">{{$lang.manage.btn1}}</button></navigator>
			<navigator url="/pages/component/importWords?type=import" open-type="navigate"><button class="btnLight button2" plain=true >{{$lang.manage.btn2}}</button></navigator>
		</view>
	</view>
	
</view>
</template>
<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				list:[]
			}
		},
		onShow(){
			this.getList()
		},
		methods: {
			...mapMutations(['loginAction']),
			checkLogin(item){
				if(!this.isNetWork()) return
				
				this.$request({
					url: '/v2/u/setWalletLogin', //仅为示例，并非真实接口地址。
					data:{
						id:item.id,
					},
					method:'post',
				}).then(res=>{
					this.loginAction(res.data)
					this.getList()
				}).catch(error=>{
					console.log(error);
				});
			},
			goDetail(item){
				uni.setStorageSync('walletItem', JSON.stringify(item));
				this.linkTo('/pages/index/management/accountDetail', true)
			},
			getList(){
				if(!this.isNetWork()) return
				this.$request({
					url: '/v2/w/address/list', //仅为示例，并非真实接口地址。
					data:{},
					method:'GET',
				}).then(res=>{
					this.list=res.data
				}).catch(error=>{
					console.log(error);
				});
			}
		}
	}
</script>

<style scoped>
	.manage_title{color: #8C9FAD;margin-bottom: 20px;}
	.manageItem{padding:10px 0;border-bottom: 1px solid #F1F2F5;}
	.manageItem image{margin-right: 10px;margin-top: 5px;}
	.manageItem .name{font-weight: bold;font-size: 32rpx;margin-bottom: 10px;}
	.manageItem .adress{color: #8C9FAD;font-size: 24rpx;word-break:break-all;}
	
	.btnBox{padding: 5vh 0;}
	.button1{margin-bottom: 20px;}
	.button2{border:1px solid #1295FF;color: #1295FF;}
	
	.dark .manageItem {border-color:#283752; }
	.dark .name {color: #C5CFD5;}
</style>
