<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.manage.nav1" ></topNav>
	<view style="padding-left: 15px;padding-right: 15px;" >
		<view class="formItems">
			<view class="itemName">{{$lang.manage.editName}}</view>
			<input type="text" v-model="walletName" placeholder-class="inputPlace" :placeholder="$lang.manage.editHolder"/>
		</view>
		<view style="font-size: 24rpx;color: #8C9FAD;margin-top: 5px;">
			{{$lang.manage.editTxt}}
		</view>
		
		<view class="btnLight" style="width: 100%;border-radius: 5px;margin-top: 45px;" @click="saveAdr">{{$lang.btnSure}}</view>

	</view>
</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
export default {
	name: 'create',
	data() {
		return {
			walletName: '',
			password: '',
			walletItem:uni.getStorageSync('walletItem')?JSON.parse(uni.getStorageSync('walletItem')):{},
		};
	},
	computed:{
		...mapState(['userInfo'])
	},
	onShow(){
		// console.log('this.walletItem',this.walletItem,this.userInfo)
	},
	methods: {
		...mapMutations(['loginAction']),
		saveAdr(){
			if(!this.isNetWork()) return
			
			if(this.walletName==''){
				uni.showToast({
					title:this.$lang.manage.editHolder,
					icon:"none"
				})
				return
			}
			var data={
				walletName:this.walletName,
				id:this.walletItem.id,
			}
			uni.showLoading({mask:true});
			this.$request({
				url: '/v2/w/address/editName',
				data:data,
				method:'POST',
			}).then(res=>{
				uni.hideLoading();
				uni.showToast({
					title:this.$lang.editSuc,
					duration:1500
				})
				this.walletItem.walletName=this.walletName
				if(this.walletItem.loginFlag==1){
					this.userInfo.walletName=this.walletName
					this.loginAction(this.userInfo)
				}
				uni.setStorage({
					key:'walletItem',
					data:JSON.stringify(this.walletItem)
				})
				setTimeout(()=>{
					this.goBack()
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
	}
};
</script>

<style scoped>
.formItems {
	border-bottom: 1px solid #e5e5e5;
	padding-top: 20px;
	padding-bottom: 10px;
}
.itemName {
	padding: 5px 0 10px;
	font-weight: bold;
	font-size: 28rpx;
}
.itemIcon {
	font-size: 20px;
	color: #999;
}

.dark .itemIcon {
	color: #c2ccde;
}
.dark .formItems {
	border-bottom: 1px solid #6f7f9b;
}
.dark .itemName {
	color: #C5CFD5;
}
.dark .inputPlace {
	color: #3F506E;
}
.dark input {
	color: #C5CFD5;
}
</style>
