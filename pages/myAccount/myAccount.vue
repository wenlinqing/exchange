<template>
<view class="minHeight" :class="getTheme">
	<status-bar background="#1762E6"></status-bar>
	<view class="accountTop" style="background-color: #1762E6;">
		<view class="eyeBox">
			<image v-show="eyes==1" @click="showNumFun(2)" src="../../static/eyeOpen.png" mode="widthFix" style="width:44rpx;height: 30rpx;"></image>
			<image v-show="eyes==2" @click="showNumFun(1)" src="../../static/eyeClose2.png" mode="widthFix" style="width:44rpx;height: 30rpx;"></image>
		</view>
		<view class="textSmall">{{$lang.myAcount.allUsdt}}(USDT)</view>
		<view class="num">{{eyes==1?fixed(account.amountUs):'******'}}</view>
		<view class="textSmall">≈{{eyes==1?fixedCny(account.amount):'******'}} CNY</view>
		<view class="topBtn flex">
			<view class="flex1" @click="linkTo('/pages/myAccount/recharge',true)">{{$lang.recharge.recharge}}</view>
			<view class="flex1" style="margin:0 10px" @click="linkTo('/pages/myAccount/withdrawal',true)">{{$lang.transfer.withdrawal}}</view>
			<view class="flex1" @click="linkTo('/pages/myAccount/transfer',true)">{{$lang.transfer.transfer}}</view>
		</view>
	</view>
	<view class="tradeTag flex">
		<view class="on flex1">{{$lang.myAcount.navTag1}}</view>
		<view class="flex1">{{$lang.myAcount.navTag2}}</view>
		<view class="flex1">{{$lang.myAcount.navTag3}}</view>
		<view class="flex1">{{$lang.myAcount.navTag4}}</view>
		<view class="flex1">{{$lang.myAcount.navTag5}}</view>
	</view>
	<view class="tradeInfoBox">
		<view class="infos">
			<view class="text">{{$lang.myAcount.bibiUsdt}} (USDT)</view>
			<view class="num flex flex_ac">{{eyes==1?fixed(account.amountUs):'******'}} <view>≈{{eyes==1?fixedCny(account.amount):'******'}} CNY</view> </view>
		</view>
		<!-- <view style="height: 10px;background-color: #F7F7FB;"></view> -->
		
		<view class="coinFilter flex flexbetween">
			<view class="flex flex_ac filter_lt">
				<checkbox-group @change="handleFun">
						<label class="flex flex_ac"><checkbox value="hide" style="transform:scale(0.7)" /> {{$lang.myAcount.hide}} </label>
				</checkbox-group>
				<image src="../../static/q.png" mode="widthFix" style="width: 15px;margin-left: 10px;"></image>
			</view>
			<view class="filter_R">
				<image src="../../static/search3.png" mode="widthFix" style="width: 14px;"></image>
				<input class="input"  :placeholder="$lang.search" placeholder-class="inputPlace" @input.trim="inputFun" v-model="inputVal"/>
			</view>
		</view>
		
		<view class="coinList" @click="goDetail(item)" v-for="item,index in assertList" :key="index">
			<view class="coin_N flex flexbetween">
				{{item.coinName}}
				<image src="../../static/right.png" mode="widthFix" style="width: 6px;"></image>
			</view>
			<view class="flex">
				<view class="flex1">
					<view class="tt">{{$lang.myAcount.keyong}}</view>
					<view class="num">{{ eyes==1?fixed(item.balanceAmount):'******'}}</view>
				</view>
				<view class="flex1">
					<view class="tt">{{$lang.myAcount.dongjie}}</view>
					<view class="num">{{ eyes==1?fixed(item.freezeAmount):'******'}}</view>
				</view>
				<view class="flex1 textR">
					<view class="tt">{{$lang.myAcount.zhehe}}(CNY)</view>
					<view class="other">{{ eyes==1?fixedCny(item.totalCny):'******'}}</view>
				</view>
			</view>
		</view>
		
	</view>
	
	<upTop :display="upTop"><!-- upTop 混入变量 --></upTop>
	<!-- <Footer></Footer> -->
</view>
</template>

<script>
export default {
	data() {
		return {
			account: uni.getStorageSync('accounts')?JSON.parse(uni.getStorageSync('accounts')):{},
			accountBak: uni.getStorageSync('accounts')?JSON.parse(uni.getStorageSync('accounts')):{},
			assertList:[],
			inputVal:'',
			eyes:1
		}
	},
	mounted(){
		
	},
	onShow(){
			uni.setTabBarItem({
				index: 0,
				text: this.$lang.footNav1
			});
			uni.setTabBarItem({
				index: 1,
				text: this.$lang.footNav2
			});
			uni.setTabBarItem({
				index: 2,
				text: this.$lang.footNav3
			});
			uni.setTabBarItem({
				index: 3,
				text: this.$lang.footNav4
			});
			uni.setTabBarItem({
				index: 4,
				text: this.$lang.footNav5
			});
		
		this.assertList=this.account.assertList
		uni.removeStorageSync('coinObj')
		uni.removeStorageSync('detailObj')
		this.getAccounts()
	},
	watch:{
		checkbox(val,old){
			console.log(val,old)
		}
	},
	onLoad() {
		
	},
	methods: {
		showNumFun(eye){
			console.log(eye)
			this.eyes=eye
		},
		inputFun(e){
			var value=e.detail.value.trim().toString().toLocaleLowerCase()
			if(value!=''){
				var assertList = []
				this.accountBak.assertList.forEach(item=>{
					var coinName=item.coinName.toString().toLocaleLowerCase()
					if(coinName.indexOf(value)>=0){
						assertList.push(item)
					}
				})
				this.assertList = assertList
			}else{
				this.assertList=this.accountBak.assertList;
			}
		},
		handleFun(e){
			var value=e.detail.value[0]||''
			if(value!=''){
				this.assertList=[]
				this.accountBak.assertList.forEach(item=>{
					if(item.balanceAmount>0){
						this.assertList.push(item)
					}
				})
			}else{
				this.assertList=this.accountBak.assertList;
			}
		},
		getAccounts(){
			if(!this.netWork || !this.$store.state.hasLogin){return}
			this.$request({
				url: '/v2/s/account/accounts', //仅为示例，并非真实接口地址。
				data:{},
			}).then(res=>{
				this.account=res.data
				this.assertList=res.data.assertList
				this.accountBak=res.data
				uni.setStorage({
					key:'accounts',
					data:JSON.stringify(res.data)
				})
				for(var i=0;i<res.data.assertList.length;i++){
					var obj=res.data.assertList[i]
					if(obj.coinName==='USDT'){
						this.$request({
							url: '/v2/s/coinRecharge/sync/'+obj.coinId,
							data:{},
							method:'get',
						}).then(res2=>{
							if(res2.data>0){
								this.$request({
									url: '/v2/s/account/accounts', //仅为示例，并非真实接口地址。
									data:{},
								}).then(result=>{
									this.account=result.data
									uni.setStorage({
										key:'accounts',
										data:JSON.stringify(result.data)
									})
								}).catch(error=>{
									console.log(error);
								});
							}
						}).catch(error=>{
							
						});
						break;
					}
				}
				
			}).catch(error=>{
				console.log(error);
			});
		},
		goDetail(item){
			uni.setStorageSync('coinObj', JSON.stringify(item));
			uni.navigateTo({
				url:'/pages/myAccount/accountDetail?coinId='+item.coinId
			})
		}
	}
}
</script>

<style scoped>
	.content image{width: 100%;}
	.dark .inputPlace {color:#3F506E;}
	.dark .input {color: #C5CFD5;}
	
</style>
