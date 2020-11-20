<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.system.newAdr" ></topNav>
	<view style="padding-left: 15px;padding-right: 15px;" >
		<view class="formItems">
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
				<input class="flex1" v-model="address" :placeholder="$lang.system.formHolder2" @input="bindInput" />
				<image src="../../static/sao.png" mode="widthFix" style="width:36rpx;margin-left: 10px;" @click="scanCode()"></image>
			</view>
		</view>
		<view class="formItems">
			<view class="itemName">{{$lang.system.formN3}}</view>
			<view class="subItem flex flex_ac">
				<input class="flex1" v-model.trim="name" :placeholder="$lang.system.formHolder3"/>
			</view>
		</view>
		
		<view style="height: 110rpx;"></view>
		<view class="fixed_bottom" style="padding:30rpx 15px;">
			<view class="btnLight" style="width: 100%;border-radius: 5px;" @click="saveAdr">{{$lang.btnSure}}</view>
		</view>
		<!-- <Picker :show="pickerShowIf"  :array="array" ref="picker" @hidePicker="hidePicker" @confirm="pickerConfirm"></Picker> -->
	</view><!-- :cssStatic="getThemeType" -->
</view>
</template>

<script>
// import Picker from '../component/custom-picker.vue';
// import {createAddr,validate} from "../../unit/utils.js"
export default {
	name: 'addAddr',
	// components: { Picker },
	data() {
		return {
			iconType: 'BTC',
			array: [],
			index: 0,
			name: '',
			address: '',
			payPassword: '',
			pickerShowIf: false,
			def: true,
			walletList:[],
		};
	},
	onLoad() {
		
		this.$request({
			url: '/v2/s/coin/trade/wallet',
			data:{},
		}).then(res=>{
			this.walletList=res.data
			res.data.forEach(item=>{
				this.array.push(item.name)
			})
		}).catch(error=>{
			console.log(error);
		});
	},
	methods: {
		saveAdr(){
			if(!this.isNetWork()) return
			
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
				coinId:this.walletList[this.index].id,
				type:this.walletList[this.index].name,
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
					title:this.$lang.addSuc,
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
			// 允许从相机和相册扫码
			uni.scanCode({
				success: (res)=> {
					// console.log('条码类型：' + res.scanType);
					// console.log('条码内容：' + res.result);
					this.address = res.result
				}
			});
		},
		switch1Change(e) {
			// console.log('switch1 发生 change 事件，携带值为', e.target.value);
			this.def = e.target.value
		},
		bindPickerChange(e) {
			// console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
		},
		hidePicker() {
			this.pickerShowIf = false;
		},
		showPicker(e) {
			this.$refs.picker.init();
			this.pickerShowIndex = e;
			this.pickerShowIf = true;
		},
		pickerConfirm(e) {
			this.pickerShowIf = false;
			this.iconType = this.array[e]
		},
		bindInput(e) {
			this.address = e.detail.value;
		},
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
