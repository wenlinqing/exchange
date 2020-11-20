<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.transfer.transfer" rightCoinName="list_icon" @callback="callFun"></topNav>
	
	<view class="fromToBox flex flex_ac">
		<view class="leftDot">
			<view style="background-color: #1762E6;"></view>
			<view></view>
			<view></view>
			<view></view>
			<view style="background-color: #D9343E;"></view>
		</view>
		<view class="flex1">
			<view class="froms flex flexbetween" style="border-bottom: 1px solid #F1F2F5;">
				<view><label style="display:inline-block;min-width:55px">{{$lang.common.froms}}</label>{{$lang.transfer.F_account}}</view>
			</view>
			<view class="froms flex flexbetween" ><!-- @click="linkTo('/pages/myAccount/choseAccount')" -->
				<view><label style="display:inline-block;min-width:55px">{{$lang.common.to}}</label>{{$lang.transfer.To_account}}</view>
				<image src="../../static/right.png" mode="widthFix" style="width: 7px;"></image>
			</view>
		</view>
	</view>
	
	<view class="content">
		<view class="rech_choose flex flexbetween" @click="linkTo('/pages/myAccount/choseCoin')">
			{{transferCoin.name||'&nbsp;'}}
			<view class="flex flex_ac">
				{{$lang.common.choseCoin}}
				<image src="../../static/right.png" mode="widthFix" style="width: 7px;margin-left: 5px;"></image>
			</view>
		</view>

		<view class="lian_name">{{$lang.transfer.adr}}</view>
		<view class="formItem flex flex_ac">
			<input class="flex1" :placeholder="$lang.transfer.holder1" placeholder-style="color:#C5CFD5" v-model="address"/>
			<view class="form_r flex flex_ac">
				<image src="../../static/sao.png" mode="widthFix" style="width: 18px;" @click="scanCode()"></image>
				<view style="margin:0 10px;color: #F1F2F5;">|</view>
				<image @click="goAdressBook" src="../../static/adr.png" mode="widthFix" style="width: 16px;"></image>
			</view>
		</view>
		
		<view class="lian_name">{{$lang.transfer.num}}</view>
		<view class="formItem flex flex_ac">
			<input class="flex1" type="number" :placeholder="$lang.transfer.holder2" placeholder-style="color:#C5CFD5" v-model="amount"/>
			<view class="form_r flex flex_ac">
				{{transferCoin.name||'&nbsp;'}}
				<view style="margin:0 10px;color: #F1F2F5;">|</view>
				<view style="font-weight: bold;" @click="allFun">{{$lang.common.all}}</view>
			</view>
		</view>
		<view class="flex flex_ac abled">{{$lang.common.keyong}} {{balanceAmount}} {{transferCoin.name||'&nbsp;'}} </view>

		<!-- <view style="height: 100vh;"></view> -->
		<view class="rech_ewm" style="padding:20px 15px;color: #8C9FAD;font-size: 24rpx;text-align: left;line-height: 22px;">
			{{$lang.transfer.notice}}
		</view>

	</view>
	
	<view style="height: 100rpx;"></view>
	<view class="withBottom fixed_bottom bgfff">
		<!-- <view class="outNum flex flexbetween">
			到账数量
			<label>0.000000 USDT</label>
		</view> -->
		<view class="outBtn" style="background-color: #1762E6;" @click="chkFun">{{$lang.transfer.transfer}}</view>
	</view>
	
	<Keyboard cssStatic="white" :show="showIf" ref="keyboard" :success="checkResult" @hideKey="hidekeyboard" @getPassword="getPassword"></Keyboard>
</view>
</template>

<script>
	import Keyboard from "../../components/custom-keyboard/custom-keyboard.vue"
export default {
	components:  {Keyboard},
	data() {
		return {
			transferCoin:{},
			address:'',
			amount:'',
			balanceAmount:0,
			showIf: false,
			checkResult: true,
		}
	},
	onShow(){
		if(uni.getStorageSync('selectAddr')){
			this.address=uni.getStorageSync('selectAddr')
		}		
		
		this.transferCoin=uni.getStorageSync('transferCoin')?JSON.parse(uni.getStorageSync('transferCoin')):{};
		if(this.transferCoin&&this.transferCoin.id){
			this.$request({
				url: '/v2/s/account/accounts/'+this.transferCoin.id,
				data:{},
			}).then(res=>{
				this.balanceAmount=res.data.balanceAmount
			}).catch(error=>{
				uni.showToast({
					title:error.errmsg,
					duration:1500,
					icon:"none"
				})
			});
		}
		
	},
	onLoad(option) {
		if(option.address){
			this.address=option.address
		}
	},
	methods: {
		hidekeyboard() {
			this.showIf = false;
			this.$refs.keyboard.clear()
		},
		getPassword(e) {
			if(e.msg=='success'){
				this.hidekeyboard()
				this.submit()
			}else{
				this.checkResult = false;
				this.$refs.keyboard.clear();
				setTimeout(() => {
					this.checkResult = true;
				}, 600);
			}
		},
		goAdressBook(){
			if(JSON.stringify(this.transferCoin)!='{}'){
				this.linkTo('/pages/myAccount/adress?coinName='+this.transferCoin.name+'&coinId='+this.transferCoin.id,true)
			}else{
				uni.showToast({
					title:this.$lang.transfer.error1,
					icon:"none"
				})
			}
		},
		allFun(){
			this.amount=this.balanceAmount
		},
		callFun(){
			this.linkTo('/pages/myAccount/record?businessType=tranfer_amount', true);
		},
		chkFun(){
			if(JSON.stringify(this.transferCoin)=='{}'){
				uni.showToast({
					title:this.$lang.transfer.error1,
					icon:"none"
				})
				return
			}
			if(this.address==''){
				uni.showToast({
					title:this.$lang.transfer.error2,
					icon:"none"
				})
				return
			}
			if(this.amount==''){
				uni.showToast({
					title:this.$lang.transfer.holder2,
					icon:"none"
				})
				return
			}
			if(this.amount<=0){
				uni.showToast({
					title:this.$lang.transfer.error3,
					icon:"none"
				})
				return
			}
			this.showIf=true;
		},
		submit(){
			var data={
				address:this.address,
				amount:this.amount,
				coinId:this.transferCoin.id,
			}
			uni.showLoading({title: '请稍后',mask:true});
			this.$request({
				url: '/v2/s/user/account/tranfer',
				data:data,
				method:'POST',
			}).then(res=>{
				uni.hideLoading();
				uni.showToast({
					title:'划转成功',
					duration:1500
				})
				setTimeout(()=>{
					this.amount=''
					this.linkTo('/pages/myAccount/record?businessType=tranfer_amount', true);
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
	.dialogBg{height: 100vh;overflow: hidden;z-index: 999;background-color: rgba(0,0,0,0.5);}
	.dialogCenter{position: absolute;width: 90%;top: 50%;left: 5%;-webkit-transform:translateY(-50%);border-radius: 10px;}
	.dialogTitle{padding: 20px 15px;font-size: 40rpx;font-weight: bold;}
	.dialogCont{padding:0 15px 15px;min-height: 80px;line-height: 22px;}
	.dialogBtns{padding:15px 15px 20px}
	.dialogBtns view{height: 80rpx;line-height: 80rpx;text-align: center;font-size: 32rpx;border-radius: 5px;font-weight: 600;border: 1px solid #C5CFD5;}
	.dialogBtns view:nth-child(2){border-left: 1px solid #E5E5E5;}
	.dialogBtns .hl_btns{color: #fff;background-color: #1762E6;}
	.dialogBtns .hl_btns.disabled{background-color: #C5CFD5;}
	
	.noticeItem{margin:10px 0;line-height: 22px;}
	/* .noticeItem view{margin-left: 5px;} */
	
</style>
