<template>
<view  style="min-height: 100vh;" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.transfer.withdrawal" @callback="callFun">
		<view slot="rightIcon" class="iconfont icon-xiangqing1" style="font-size: 22px;"></view>
	</topNav>
	
	<view class="content">
		<view class="rech_choose flex flexbetween" @click="showSearch=true">
			{{choseCoin.name||'&nbsp;'}}
			<view class="flex flex_ac">
				{{$lang.common.choseCoin}}
				<!-- <image src="../../static/right.png" mode="widthFix" style="width: 7px;"></image> -->
				<view class="iconfont icon-right" style="font-size: 12px;margin-left: 4px;font-weight: bold;"></view>
			</view>
		</view>
		
		<view class="lian_name" v-if="choseCoin.name=='USDT'">{{$lang.recharge.chainName}}</view>
		<view class="choseCoin flex" v-if="choseCoin.name=='USDT'">
			<view class="on">ERC20</view>
			<view>TRC20</view>
			<view>OMNI</view>
		</view>
		
		<view class="lian_name">{{$lang.transfer.tibiAdr}}</view>
		<view class="formItem flex flex_ac">
			<input class="flex1" placeholder-class="inputPlace" :placeholder="$lang.transfer.holder1" v-model.trim="address" placeholder-style="color:#C5CFD5"/>
			<view class="form_r flex flex_ac" style="padding-left: 5px;">
				<view class="iconfont icon-scan" style="font-size: 18px;" @click="scanCode()"></view>
				<view style="margin:0 10px;color: #F1F2F5;">|</view>
				<view class="iconfont icon-location" style="font-size: 20px;" @click="goAdressBook"></view>
			</view>
		</view>
		
		<view class="lian_name">{{$lang.withdrawal.amount}}</view>
		<view class="formItem flex flex_ac" @click="stopInput">
			<input class="flex1" type="number" v-bind:disabled="JSON.stringify(withdrawInfo)=='{}'" placeholder-class="inputPlace" :placeholder="$lang.withdrawal.minAmount+' '+(withdrawInfo.minAmount||'')" v-model="amount" placeholder-style="color:#C5CFD5"/>
			<view class="form_r flex flex_ac">
				{{choseCoin.name}}
				<view style="margin:0 10px;color: #F1F2F5;">|</view>
				<view style="font-weight: bold;color: inherit;" @click="allNum">{{$lang.common.all}}</view>
			</view>
		</view>
		<view class="flex flex_ac abled">{{$lang.common.keyong}} {{withdrawInfo.balanceAmount||0}} {{choseCoin.name}} <image src="../../static/q.png" mode="widthFix" style="width:12px;margin-left: 5px;"></image></view>
		
		<view class="lian_name flex flex_ac">
			{{$lang.transfer.tibiFee}} 
			<view class="flex flex_ac abled" style="margin-top: 0;margin-left: 5px;">{{$lang.withdrawal.text1}} <image src="../../static/q.png" mode="widthFix" style="width:12px;margin-left: 5px;"></image></view>
		</view>
		<view class="formItem flex flex_ac">
			<input class="flex1" disabled placeholder-class="inputPlace" v-model="feeNum" />
			<view class="form_r flex flex_ac">
				{{choseCoin.name}}
			</view>
		</view>

		<view class="rech_ewm" v-if="choseCoin.name=='USDT'" style="padding:20px 15px;color: #8C9FAD;font-size: 24rpx;text-align: left;line-height: 22px;">
			{{$lang.withdrawal.minAmount}}：{{withdrawInfo.minAmount}} USDT(ERC20)。<br/>
			{{$lang.withdrawal.text2}}<br/>
			{{$lang.withdrawal.text3}}<br/>
			
		</view>

	</view>
	
	<view style="height: 200rpx;"></view>
	<view class="withBottom fixed_bottom">
		<view class="outNum flex flexbetween">
			{{$lang.withdrawal.resultNum}}
			<label>{{resultNum}} {{choseCoin.name}}</label>
		</view>
		<view class="outBtn" style="background-color: #1762E6;" @click="submit">{{$lang.transfer.withdrawal}}</view>
	</view>
	
	
	
	<view class="rech_search fixed" v-if="showSearch">
		<status-bar ></status-bar>
		<view class="searInput flex fixed" :style="'top:'+statusBar+'px'">
			<view class="inputs flex1">
				<image src="../../static/search3.png" mode="widthFix" style="width: 12px;"></image>
				<!-- <view class="iconfont icon-search1" style="font-size: 12px;"></view> -->
				<input type="text" placeholder-class="inputPlace" :placeholder="$lang.common.schTxt" @input.trim="inputFun" v-model="inputVal"/>
			</view>
			<view class="cancel" @click="cancelFun()">{{$lang.common.cancel}}</view>
		</view>
		
		<view class="usedTT" v-if="recommendCoin.length>0">{{$lang.common.commonUse}}</view>
		<view class="usedCoin flex" v-if="recommendCoin.length>0">
			<view v-for="(item,index) in recommendCoin" @click="chooseFun(item)" :key="index">{{item.name}}</view>
		</view>
		
		<view class="allCoin">{{$lang.common.allCoin}}</view>
		<view class="coins" v-for="(item,index) in walletList" @click="chooseFun(item)" :key="index">{{item.name}}</view>
	</view>
	
	<view class="dialogBg fixed" v-if="showDialog">
		<view class="dialogCenter bgfff">
			<view class="dialogTitle">{{$lang.dialog.title2}}</view>
			<view class="dialogCont">
				<view class="dialogNoticeToast">{{$lang.withdrawal.noticeTT}}：</view>
				<checkbox-group @change="handleFun">
					<label class="noticeItem flex">
						<checkbox value="rule1" style="transform:scale(0.7)" />
						<view>{{$lang.withdrawal.notice1}}</view>
					</label>
					<label class="noticeItem flex">
						<checkbox value="rule2" style="transform:scale(0.7)" />
						<view>{{$lang.withdrawal.notice2}}</view>
					</label>
					<label class="noticeItem flex">
						<checkbox value="rule3" style="transform:scale(0.7)" />
						<view>{{$lang.withdrawal.notice3}}</view>
					</label>
					
					<view style="color: #1762E6;margin:15px 0">{{$lang.withdrawal.notice4}}</view>
					<label class="noticeItem flex">
						<checkbox value="rule4" style="transform:scale(0.7)" />
						<view class="flex" style="font-size: 32rpx;font-weight: 600;">{{$lang.withdrawal.notice5}} 
						<view style="font-size: 32rpx;font-weight: 600;color: #1762E6;" @click.stop="">{{$lang.withdrawal.notice6}}</view></view>
					</label>
				</checkbox-group>
			</view>
			<view class="dialogBtns flex">
				<view class="flex1" style="margin-right: 10px;" @click="goBack">取消</view>
				<view class="flex1 hl_btns" v-if="downTime==0" @click="sureFun">确认</view>
				<view class="flex1 hl_btns disabled" v-if="downTime!=0">{{downTime}} S后可确认</view>
			</view>
		</view>
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
			showIf: false,
			checkResult: true,
			showSearch: false,
			showDialog:false,
			walletList:[],
			walletListBak:[],
			choseCoin:{},
			withdrawInfo:{},
			amount:'',
			address:'',
			feeNum:0,
			resultNum:0,
			recommendCoin:[],
			inputVal:'',
			
			downTime:3,
			rules:[]
		}
	},
	onShow() {
		if(uni.getStorageSync('selectAddr')){
			this.address=uni.getStorageSync('selectAddr')
		}
	},
	mounted() {
		this.showDialog=true
		this.timeFun()
		
		this.$request({
			url: '/v2/s/coin/trade/wallet',
			data:{},
		}).then(res=>{
			res.data.forEach(item=>{
				if(item.withdrawFlag==1){
					this.walletList.push(item)
					this.walletListBak.push(item)
				}
				if(item.isRecommend==1&&item.withdrawFlag==1){
					this.recommendCoin.push(item)
				}
			})
			if(!uni.getStorageSync('coinObj')){
				this.showSearch=true
			}else{
				var coinObj=JSON.parse(uni.getStorageSync('coinObj'))
				res.data.forEach(item=>{
					if(item.id==coinObj.coinId){
						this.choseCoin=item
						throw new Error();
					}
				})
			}
		}).catch(error=>{
			console.log(error);
		});
	},
	watch:{
		choseCoin(val,old){
			this.getWithdrawInfo()
		},
		amount(val,old){
			if(this.withdrawInfo.coinRate){
				var zhe=val*this.withdrawInfo.coinRate
				if(zhe<this.withdrawInfo.minFeeNum){
					this.feeNum=this.withdrawInfo.minFeeNum
				}else if(zhe>this.withdrawInfo.maxFeeNum){
					this.feeNum=this.withdrawInfo.maxFeeNum
				}else{
					this.feeNum=Math.floor(zhe*100)/100
				}
				
				if(val>=this.withdrawInfo.minAmount){//到账数量 计算
					this.resultNum=val-this.feeNum
				}else{
					this.resultNum=0
				}
			}
		}
	},
	methods: {
		goAdressBook(){
			if(JSON.stringify(this.choseCoin)!='{}'){
				this.linkTo('/pages/myAccount/adress?coinName='+this.choseCoin.name+'&coinId='+this.choseCoin.id,true)
			}else{
				uni.showToast({
					title:this.$lang.common.choseCoin,
					icon:"none"
				})
			}
		},
		inputFun(e){
			var value=e.detail.value.trim().toString().toLocaleLowerCase()
			if(value!=''){
				var walletList = []
				this.walletListBak.forEach(item=>{
					var name=item.name.toString().toLocaleLowerCase()
					if(name.indexOf(value)>=0){
						walletList.push(item)
					}
				})
				this.walletList = walletList
			}else{
				this.walletList = this.walletListBak
			}
		},
		handleFun(e){
			this.rules=e.detail.value
		},
		sureFun(){
			if(this.rules.length!=4){
				uni.showToast({
				    title: this.$lang.withdrawal.err1,
					icon:'none'
				});
				return
			}
			this.showDialog=false
		},
		timeFun(){
			setTimeout(()=>{
				--this.downTime
				if(this.downTime>0){
					this.timeFun()
				}else{
					this.downTime=0
				}
			},1000)
		},
		cancelFun(){
			if(uni.getStorageSync('coinObj')){
				this.showSearch=false
			}else{
				this.goBack()
			}
		},
		allNum(){
			if(JSON.stringify(this.choseCoin)!='{}'){
				this.amount=this.withdrawInfo.balanceAmount
			}
		},
		hidekeyboard() {
			this.showIf = false;
			this.$refs.keyboard.clear()
		},
		getPassword(e) {
			if(e.msg=='success'){
				this.hidekeyboard()
				setTimeout(() => {
					uni.showLoading({title: this.$lang.common.waiting,mask:true});
					this.$request({
						url: '/v2/s/withdraw',
						data:{
							coinId:this.choseCoin.id,
							payPassword: e.password,
							amount:this.amount,
							address:this.address,
						},
						method:'POST'
					}).then(res=>{
						uni.hideLoading();
						uni.showToast({
							title:this.$lang.common.actionSuc,
							icon:'success'
						})
						this.amount=''
						this.feeNum=''
						this.resultNum=0
						this.getWithdrawInfo()
					}).catch(error=>{
						uni.hideLoading();
						uni.showToast({
							title:error.errmsg,
							duration:1500,
							icon:"none"
						})
					});
				}, 200);
			}else{
				this.checkResult = false;
				this.$refs.keyboard.clear();
				setTimeout(() => {
					this.checkResult = true;
				}, 600);
			}
		},
		submit(){
			if(JSON.stringify(this.choseCoin)=='{}'){
				uni.showToast({
					title:this.$lang.common.choseCoin,
					icon:'none'
				})
				return
			}
			if(this.address==''){
				uni.showToast({
					title:this.$lang.withdrawal.err2,
					icon:'none'
				})
				return
			}
			if(this.amount==''){
				uni.showToast({
					title:this.$lang.withdrawal.err3,
					icon:'none'
				})
				return
			}
			if(this.amount<this.withdrawInfo.minAmount){
				uni.showToast({
					title:this.$lang.withdrawal.minAmount+' '+this.withdrawInfo.minAmount,
					icon:'none'
				})
				return
			}
			this.showIf=true
		},
		stopInput(){
			if(!this.withdrawInfo.coinRate){
				uni.showToast({
					title:this.$lang.common.choseCoin,
					icon:'none'
				})
			}
		},
		getWithdrawInfo(){
			this.$request({
				url: '/v2/s/withdraw/getWithdrawInfo',
				data:{
					coinId:this.choseCoin.id
				},
				method:'POST'
			}).then(res=>{
				this.withdrawInfo=res.data
				this.feeNum=res.data.minFeeNum
			}).catch(error=>{
				console.log(error);
			});
		},
		chooseFun(item){
			this.choseCoin=item
			this.showSearch=false;
		},
		callFun(){
			this.linkTo('/pages/myAccount/record?businessType=withdraw', true);
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
	/* .dialogBtns view:nth-child(2){border-left: 1px solid #E5E5E5;} */
	.dialogBtns .hl_btns{color: #fff;background-color: #1762E6;border: none;}
	.dialogBtns .hl_btns.disabled{background-color: #C5CFD5;border: none;color: #FFFFFF !important;}
	.dialogNoticeToast {color: #C5CFD5;}
	.noticeItem{margin:10px 0;line-height: 22px;}
	/* .noticeItem view{margin-left: 5px;} */
	.light .rech_search {background-color: #fff;}
	
	.dark .dialogCenter {background-color: #1F334D;}
	.dark .dialogTitle,.dark .noticeItem view,.dark .searInput .cancel,.dark .dialogBtns .hl_btns  {color: #C5CFD5;}
	.dark .dialogNoticeToast, {color: #8C9FAD;}
	.dark .dialogBtns view {border-color: #8C9FAD;color: #8C9FAD;}
	.dark .rech_search {background-color: #1B222D;}
	.dark .coins {color: #C5CFD5;border-color: #283752;}
	.dark .allCoin {background-color: #202939;}
	.dark .searInput {border-color: #283752;}
	.dark .searInput .inputs input {background-color: #202939 !important;}
	.dark .inputPlace {color: #8C9FAD !important;}
	.dark .inputs input,.dark .iconfont {color: #C5CFD5;}
	.dark .rech_choose {background-color: inherit;color: #C5CFD5;border: 1px solid #283752;}
	.dark .lian_name {color: #C5CFD5;}
	.dark .choseCoin view {background-color: #1B222D;border: 1px solid #283752;color: #8C9FAD;}
	.dark .rech_ewm {background-color: #202939;}
	.dark .formItem input {color: #C5CFD5;}
	.dark .formItem {border-bottom: 1px solid #283752;}
	.dark .form_r {color: #C5CFD5;}
</style>
