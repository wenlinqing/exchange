<template>
<view class="minHeight">
	<status-bar ></status-bar>
	<topNav :title="$lang.activation.activation" rightCoinName="list_icon" @callback="callFun"></topNav>
	<view class="content">
		<view class="formItems">
			<view class="itemName">{{$lang.activation.walletAdr}}</view>
			<view class="subItem flex flex_ac">
				<input class="flex1" v-model="address" :placeholder="$lang.activation.pHolder" />
				<image src="../../static/sao.png" mode="widthFix" style="width:36rpx;margin-left: 10px;" @click="scanCode()"></image>
			</view>
		</view>
		<view style="color: #8C9FAD;font-size: 24rpx;padding:5px 0 20px">{{$lang.activation.txt}} <label style="color: #D9343E;">0.001</label>  DK</view>
		
		<view class="btnLight" style="width: 100%;margin-top: 30px;" @click="submit">{{$lang.btnSure}}</view>
		
	</view>
</view>
</template>

<script>
export default {
	data() {
		return {
			address:'',
		}
	},
	onLoad() {

	},
	methods: {
		submit(){
			if(!this.isNetWork()) return
			
			if(this.address==''){
				uni.showToast({
					title:this.$lang.activation.pHolder,
					icon:"none"
				})
				return
			}
			
			var data={
				address:this.address,
			}
			uni.showLoading({title: this.$lang.common.waiting,mask:true});
			this.$request({
				url: '/v2/s/user/account/active',
				data:data,
				method:'POST',
			}).then(res=>{
				uni.hideLoading();
				uni.showToast({
					title:this.$lang.activation.actSuc,
					duration:1500
				})
				setTimeout(()=>{
					this.address=''
					this.linkTo('/pages/index/activation_record', true);
				},1500)
			}).catch(error=>{
				uni.hideLoading();
				uni.showToast({
					title:error.errmsg,
					duration:1500,
					icon:"none"
				})
			});
		},
		callFun(){
			this.linkTo('/pages/index/activation_record', true);
		},
		scanCode() {
			// 允许从相机和相册扫码
			uni.scanCode({
				success: (res)=> {
					this.address = res.result
				}
			});
		},
		goMore(){
			uni.navigateTo({
				url:'/pages/myAccount/detailMore'
			})
		}
	}
}
</script>

<style scoped>
	.formItems {
		border-bottom: 1px solid #e5e5e5;
		padding: 20px 0;
	}
	.itemName {
		padding: 5px 0 10px;
		font-weight: bold;
		font-size: 26rpx;
	}
	.itemIcon {
		font-size: 20px;
		color: #999;
	}
</style>
