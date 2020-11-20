<template>
<view class="minHeight">
	<status-bar ></status-bar>
	<topNav :title="$lang.system.editAdr"></topNav>
	<view style="padding-left: 15px;padding-right: 15px;" >
		<view class="formItems" @click="showPicker">
			<view class="itemName">{{$lang.system.formN1}}</view>
			<view class="subItem flex flex_ac">
				<picker class="flex1" mode=selector @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
				<image src="../../static/right.png" mode="widthFix" style="width:14rpx"></image>
			</view>
		</view>
		<view class="formItems">
			<view class="itemName">{{$lang.system.formN2}}</view>
			<view class="subItem flex flex_ac">
				<input class="flex1" v-model="editAdrObj.addr" :placeholder="$lang.system.formHolder2" />
				<image src="../../static/sao.png" mode="widthFix" style="width:36rpx;margin-left: 10px;" @click="scanCode()"></image>
			</view>
		</view>
		<view class="formItems">
			<view class="itemName">{{$lang.system.formN3}}</view>
			<view class="subItem flex flex_ac">
				<input class="flex1" v-model="editAdrObj.name" :placeholder="$lang.system.formHolder3"/>
			</view>
		</view>
		
		<view style="height: 110rpx;"></view>
		<view class="fixed_bottom " style="padding:30rpx 15px;">
			<view class="flex">
				<view class="btnLight flex1" style="border-radius: 5px;background-color: #D9343E;" @click="deleteAdr">{{$lang.deletes}}</view>
				<view style="width: 20px;"></view>
				<view class="btnLight flex1" style="border-radius: 5px;" @click="editSubmit">{{$lang.save}}</view>
			</view>
		</view>

	</view>
</view>
</template>

<script>
export default {
	data() {
		return {
			array: [],
			index: 0,
			pickerShowIf: false,
			walletList:[],
			editAdrObj:JSON.parse(uni.getStorageSync('editAdrObj'))||{}
		};
	},
	onLoad(options) {
		this.$request({
			url: '/v2/s/coin/trade/wallet',
			data:{},
		}).then(res=>{
			this.walletList=res.data
			res.data.forEach((item,index)=>{
				this.array.push(item.name)
				if(this.editAdrObj.coinName==item.name){
					this.index=index
				}
			})
		}).catch(error=>{
			console.log(error);
		});
	},
	methods: {
		scanCode() {
			uni.scanCode({
				success: (res) => {
					this.addr = res.result
				}
			});
		},
		deleteAdr(){
			if(!this.isNetWork()) return
			var that=this
			uni.showModal({
			    title: that.$lang.dialog.title1,
			    content: that.$lang.system.delNotice,
			    success: function (res) {
			        if (res.confirm) {
						uni.showLoading({title: this.$lang.common.waiting,mask:true});
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
			if(!this.isNetWork()) return
			if(this.editAdrObj.addr==''){
				uni.showToast({
					title:this.$lang.system.formHolder2,
					icon:"none"
				})
				return
			}
			if(this.editAdrObj.name==''){
				uni.showToast({
					title:this.$lang.system.formHolder3,
					icon:"none"
				})
				return
			}
			var data={
				name:this.editAdrObj.name,
				addr:this.editAdrObj.addr,
				id:this.editAdrObj.id,
				coinId:this.walletList[this.index].id,
				type:this.walletList[this.index].name,
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
		}
	}
};
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

.clear-btn {
	width: 590rpx;
	height: 88rpx;
	color: #ca0d01;
	border: 1px solid #ca0d01;
	border-radius: 88rpx;
	margin: 30px auto 0;
}

.dark {
	background-color: #1b222d;
	color: #6f7f9b;
}
.dark .itemIcon {
	color: #c2ccde;
}
.dark .formItems {
	border-bottom: 1px solid #6f7f9b;
	color: #6f7f9b;
}
.dark .iconfont {
	color: #6f7f9b;
}
</style>
