<template>
<view  style="min-height: 100vh;">
	<status-bar ></status-bar>
	<topNav :title="'USDT'+$lang.system.formN2"></topNav><!-- 编辑 -->

	<view class="content">

		<view class="lian_name">{{$lang.system.formN2}}</view>
		<view class="formItem flex flex_ac">
			<input class="flex1" v-model.trim="address" :placeholder="$lang.system.formHolder4" placeholder-style="color:#C5CFD5"/>
			<view class="form_r flex flex_ac" @click="scanCode()" style="padding-left: 5px;">
				<image src="../../static/sao.png" mode="widthFix" style="width: 18px;"></image>
			</view>
		</view>
		
		<view class="lian_name">{{$lang.system.formN3}}</view>
		<view class="formItem flex flex_ac">
			<input class="flex1" v-model.trim="name" :placeholder="$lang.system.formHolder3" placeholder-style="color:#C5CFD5"/>
		</view>

	</view>
	
	<view style="height: 100rpx;"></view>
	<view class="withBottom fixed_bottom bgfff" v-if="type=='add'">
		<view class="outBtn" style="background-color: #1762E6;" @click="saveAdr">{{$lang.system.addTxt}}</view>
	</view>
	<view class="fixed_bottom " style="padding:30rpx 15px;" v-if="type=='edit'">
		<view class="flex">
			<view class="btnLight flex1" style="border-radius: 5px;background-color: #D9343E;" @click="deleteAdr">{{$lang.deletes}}</view>
			<view style="width: 20px;"></view>
			<view class="btnLight flex1" style="border-radius: 5px;" @click="editSubmit">{{$lang.save}}</view>
		</view>
	</view>
	
</view>
</template>

<script>
export default {
	data() {
		return {
			address: '',
			name:'',
			coinId:'',
			type:'add',
			editAdrObj: uni.getStorageSync('editAdrObj')?JSON.parse(uni.getStorageSync('editAdrObj')):{},
		}
	},
	onShow() {
		if(this.type=='edit'){
			this.address=this.editAdrObj.addr
			this.name=this.editAdrObj.name
		}
	},
	onLoad(options) {
		this.coinId = options.coinId
		this.type = options.type
	},
	methods: {
		deleteAdr(){

			var that=this
			uni.showModal({
			    title: this.$lang.dialog.title1,
			    content: this.$lang.system.delNotice,
			    success: function (res) {
			        if (res.confirm) {
						uni.showLoading({title: that.$lang.common.waiting,mask:true});
			            that.$request({
							url: '/v2/s/user/wallet/deleteAddress',
							data:{
								addressId:that.editAdrObj.id,
								payPassword:uni.getStorageSync('startPassWord'),
							},
							method:'POST',
						}).then(res=>{
							uni.hideLoading();
							uni.showToast({
								title:that.$lang.deleteSuc,
								duration:1500
							})
							setTimeout(()=>{
								that.goBack()
							},1500)
						}).catch(error=>{
							uni.hideLoading();
							uni.showToast({
								title:error.errmsg,
								duration:1500,
								icon:"none"
							})
						});
			        } else if (res.cancel) {
			            // console.log('用户点击取消');
			        }
			    }
			});
		},
		editSubmit(){
			if(this.address==''){
				uni.showToast({
					title:this.$lang.system.formHolder2,
					icon:"none"
				})
				return
			}
			if(this.name==''){
				uni.showToast({
					title:this.$lang.system.formHolder3,
					icon:"none"
				})
				return
			}
			var data={
				name:this.name,
				addr:this.address,
				id:this.editAdrObj.id,
				coinId:this.coinId,
				payPassword:uni.getStorageSync('startPassWord'),
			}
			uni.showLoading({title: this.$lang.common.waiting,mask:true});
			this.$request({
				url: '/v2/s/user/wallet/updateAddress',
				data:data,
				method:'POST',
			}).then(res=>{
				uni.hideLoading();
				uni.showToast({
					title:this.$lang.update,
					duration:1500
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
		saveAdr(){
			
			if(this.address==''){
				uni.showToast({
					title:this.$lang.system.formHolder2,
					icon:"none"
				})
				return
			}
			if(this.name==''){
				uni.showToast({
					title:this.$lang.system.formHolder3,
					icon:"none"
				})
				return
			}
			
			var data={
				name:this.name,
				address:this.address,
				coinId:this.coinId,
				payPassword:uni.getStorageSync('startPassWord'),
			}
			uni.showLoading({title: this.$lang.common.waiting,mask:true});
			this.$request({
				url: '/v2/s/user/wallet/address',
				data:data,
				method:'POST',
			}).then(res=>{
				uni.hideLoading();
				uni.showToast({
					title:this.$lang.saveSuc,
					duration:1500
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
		scanCode() {
			uni.scanCode({
				success: (res)=> {
					this.address = res.result
				}
			});
		},
	}
}
</script>

<style scoped>


</style>
