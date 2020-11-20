<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.recharge.recharge" rightCoinName="list_icon" @callback="callFun"></topNav>
	
	<view class="content">
		<view class="rech_choose flex flexbetween" @click="showSearch=true">
			{{rechargeCoin.name||'&nbsp;'}}
			<view class="flex flex_ac">
				{{$lang.common.choseCoin}}
				<!-- <image src="../../static/right.png" mode="widthFix" style="width: 7px;margin-left: 5px;"></image> -->
				<view class="iconfont icon-right" style="font-size: 16px;margin-left: 5px;"></view>
			</view>
		</view>
		
		<view class="lian_name" v-if="rechargeCoin.name=='USDT'">{{$lang.recharge.chainName}}</view>
		<view class="choseCoin flex" v-if="rechargeCoin.name=='USDT'">
			<view class="on">ERC20</view>
			<view>TRC20</view>
			<view>OMNI</view>
		</view>

		<view class="rech_ewm">
			<view class="flexCC" v-if="ewmData==''"><image src="../../static/codeImg.png" mode="widthFix" style="width: 200px;"></image></view>
			<view class="flexCC" v-if="ewmData!=''"><canvas style="width: 200px; height: 200px;" canvas-id="myQrcode"></canvas></view>
			<view class="saveM" @click="saveImg">{{$lang.common.saveImg}}</view>
			<view class="tt">{{$lang.recharge.rechargeAdr}} </view>
			<view class="adr" style="height: 20px;">{{ewmData}}</view>
			<view class="copy" @click="copyKey">{{$lang.common.copyAdr}}</view>
		</view>
		
		<view class="noticeText">
			{{$lang.recharge.text1}} {{rechargeCoin.name||'&nbsp;'}}{{$lang.recharge.text2}}<br/>
			{{$lang.recharge.text3}}<br/>
			{{$lang.recharge.text4}}：1 {{rechargeCoin.name||'&nbsp;'}}，{{$lang.recharge.text5}}<br/>
			{{$lang.recharge.text6}}<br/>
			{{$lang.recharge.text7}}
		</view>
	</view>
	
	
	<view class="rech_search fixed" :class="getTheme" v-if="showSearch">
		<status-bar ></status-bar>
		<view class="searInput flex fixed" :style="'top:'+statusBar+'px'">
			<view class="inputs flex1">
				<image src="../../static/search3.png" mode="widthFix" style="width: 12px;"></image>
				<!-- <view class="iconfont icon-search1" style="font-size: 14px;display: inline-block;"></view> -->
				<input type="text" placeholder-class="placeInput" :placeholder="$lang.common.schTxt" @input.trim="inputFun" v-model="inputVal"/>
			</view>
			<view class="cancel" @click="cancelFun">{{$lang.common.cancel}}</view>
		</view>
		
		<view class="usedTT" v-if="recommendCoin.length>0">{{$lang.common.commonUse}}</view>
		<view class="usedCoin flex" v-if="recommendCoin.length>0">
			<view v-for="item,index in recommendCoin" @click="chooseFun(item)" :key="index">{{item.name}}</view>
		</view>
		
		<view class="allCoin">{{$lang.common.allCoin}}</view>
		<view class="coins" v-for="item,index in walletList" @click="chooseFun(item)" :key="index">{{item.name}}</view>
	</view>
	
	
</view>
</template>

<script>
	import drawQrcode from '../../unit/weapp.qrcode.min.js'
export default {
	data() {
		return {
			showSearch: false,
			walletList:[],
			walletListBak:[],
			rechargeCoin:{},
			ewmData:'',
			recommendCoin:[],
			inputVal:''
		}
	},
	mounted() {
		this.$request({
			url: '/v2/s/coin/trade/wallet',
			data:{},
		}).then(res=>{
			res.data.forEach(item=>{
				if(item.rechargeFlag==1){
					this.walletList.push(item)
					this.walletListBak.push(item)
				}
				if(item.isRecommend==1){
					this.recommendCoin.push(item)
				}
			})
			if(!uni.getStorageSync('coinObj')){
				this.showSearch=true
			}else{
				var coinObj=JSON.parse(uni.getStorageSync('coinObj'))
				res.data.forEach(item=>{
					if(item.id==coinObj.coinId){
						this.rechargeCoin=item
						throw new Error();
					}
				})
			}
		}).catch(error=>{
			console.log(error);
		});
	},
	onShow() {
		
	},
	watch:{
		rechargeCoin(val,old){
			this.getLian()
		}
	},
	methods: {
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
		cancelFun(){
			if(uni.getStorageSync('coinObj')){
				this.showSearch=false
			}else{
				this.goBack()
			}
		},
		saveImg(){
			if(this.ewmData==''){
				uni.showToast({
					title:'请选择币种',
					icon:'none'
				})
				return
			}
			let __that = this;
			uni.canvasToTempFilePath({canvasId:'myQrcode',success(res){
				__that.shareQrImg = res.tempFilePath  //h5平台中是base64图片 
				uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success() {
						uni.showToast({
							title:'保存成功',
							icon:'success'
						})
					},
					fail(rej){
						//如果拒绝,让保存图片按钮变成打开设置的
						uni.showToast({
							title:'保存失败',
							icon:'success'
						})
					}
				})
			}}); 
		},
		callFun(){
			this.linkTo('/pages/myAccount/record?businessType=recharge', true);
		},
		getLian(){
			uni.showLoading({
			    title: '请稍后'
			});
			this.$request({
				url: '/v2/s/coinRecharge/address/'+this.rechargeCoin.id,
				data:{},
			}).then(res=>{
				uni.hideLoading();
				this.ewmData=res.data
				setTimeout(()=>{
					drawQrcode({
					  width: 200,
					  height: 200,
					  canvasId: 'myQrcode',
					  text: res.data
					})
				},100)
			}).catch(error=>{
				uni.hideLoading();
				uni.showToast({
					title:error.errmsg,
					duration:1500,
					icon:"none"
				})
			});
		},
		chooseFun(item){
			this.rechargeCoin=item
			this.showSearch=false;
		},
		copyKey(){
			if(this.ewmData==''){
				uni.showToast({
					title:'请选择币种',
					icon:'none'
				})
				return
			}
			uni.setClipboardData({
				data: this.ewmData,
				success:()=>{
					uni.showToast({
						title: '复制成功',
						icon: "none"
					})
				}
			})
		},
	}
}
</script>

<style scoped>
	.searInput {box-sizing: border-box;width: 100vw;}
.light {
	background-color: #fff;
}
.dark .searInput {background-color: #1B222D;border-color: #283752;}
.dark .cancel {color: #C5CFD5;}
.dark .searInput .inputs input {background-color: #202939 !important;color: #C5CFD5;}
.dark .placeInput {color: #8C9FAD;}
.dark .usedTT {color: #C5CFD5 !important;}
.dark .usedCoin view {background-color: #242F42;color: #C5CFD5;border: none;}
.dark .allCoin {background-color:#1B222D;color: #8C9FAD;}
.dark .coins {color: #C5CFD5;border-color: #283752;}

.dark .rech_choose {box-sizing: border-box;border:1px solid #283752;background-color: #1B222D;color: #C5CFD5;}
</style>
