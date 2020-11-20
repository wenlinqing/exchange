<template>
<view class="minHeight" >
	<view class="fixed" :style="area==1?'background-color:#1762E6':'background-color:#F7F7FB;'" :class="area==1?'fast':''">
		<status-bar background="transparent"></status-bar>
		<topNav bgColor="transparent" :backIcon="area==1?'white':'black'"></topNav>
		<view class="listTop flex flexbetween" style="height: 65px;"><!-- :style="'top:'+(statusBar+44)+'px'" -->
			<view class="listNav flex">
				<view class="flex" :class="nav==1?'on':''" @click="handleNav(1)">我要买</view>
				<view class="flex" :class="nav==2?'on':''" @click="handleNav(2)">我要卖</view>
			</view>
			<image src="../../../static/li.png" v-show="area==2" mode="widthFix" style="width:36rpx;height: 36rpx;margin-right: 15px;"></image>
			<image src="../../../static/li2.png" v-show="area==1" mode="widthFix" style="width:36rpx;height: 36rpx;margin-right: 15px;"></image>
		</view>
		<view class="bgfff flatNav flex">
			<view class="flatItem on">
				<label>比特币</label>
				<view>BTC</view>
			</view>
			<view class="flatItem" v-for="item,index in 10" :key="index">
				<label>以太坊</label>
				<view>ETH</view>
			</view>
		</view>
		
		<view class="areaNav flex" :style="'top:'+(statusBar+10)+'px'">
			<view @click="areaFun(1)" :class="{on:area==1}" style="margin:-1px 1px 0 -1px;">快捷区</view>
			<view @click="areaFun(2)" :class="{on:area==2}" style="margin:-1px -1px 0 1px;">自选区</view>
		</view>
	</view>
	
	<view :style="'height:'+(statusBar+180)+'px'"></view>
	
	<view class="buyItems flex1 bgfff" v-for="item,i in 10" :key="i" v-show="area==2">
		<view class="item_name flex flexbetween">
			<view class="name flex flex_ac">
				<image src="../../../static/flat_tou.png" mode="widthFix" style="width:48rpx;height: 48rpx;margin-right: 10px;"></image> 愤怒的小孩
			</view>
			<view class="percents">
				1155 | 96%
			</view>
		</view>
		<view class="flex flexbetween">
			<view class="flex1 amout">
				<view>数量 128593.214777 USDT</view>
				<view>限额 ￥2000.00 - ￥5000.00</view>
			</view>
			<view class="textR price">
				<view><label>¥</label> 6.81</view>
				<text>单价</text>
			</view>
		</view>
		<view class="flex flexbetween buyBtn">
			<view class="flex1 banks">
				<image src="../../../static/flat1.png" mode="widthFix" style="width:36rpx;height: 36rpx;margin-right: 10px;"></image>
				<image src="../../../static/flat2.png" mode="widthFix" style="width:36rpx;height: 36rpx;margin-right: 10px;"></image>
				<image src="../../../static/flat3.png" mode="widthFix" style="width:36rpx;height: 36rpx;margin-right: 10px;"></image>
			</view>
			<view class="btns flexCC" :class="{sell:nav==2}">{{nav==1?'购买':'出售'}}</view>
		</view>
	</view>
	
	<view class="content" v-show="area==1">
		<view class="flex flex_ac fastBuyName">购买金额<label>CNY</label> <image src="../../../static/dao.png" mode="widthFix" style="width:7px;height: 5px;margin-left: 5px;"></image></view>
		<view class="flex flex_ac fastPriceInput">
			￥<input type="number" class="flex1" placeholder="100元起" placeholder-style="color:#F1F2F5"/>
		</view>
		<view class="fastTxt flex flexbetween">
			<view>价格约 16.96 CNY/EOS</view>
			<view class="byAmount flex flex_ac">
				<image src="../../../static/re.png" mode="widthFix" style="width: 24rpx;height: 24rpx;margin-right: 5px;"></image>
				按数量购买
			</view>
		</view>
		
		<view class="btnLight" style="width: 100%;font-weight: bold;margin-top: 40px;">{{nav==1?'购买':'出售'}}</view>
		
		<view class="proto fixed_bottom">点击购买即表示您已同意 <label>《一键买卖交易协议》</label></view>
	</view>
	
	<view style="height: 50px;"></view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				nav:1,
				area:2,
			}
		},
		onLoad(){
			
		},
		methods: {
			areaFun(type){
				this.area=type
			},
			handleNav(e) {
				if(e==this.nav) return
				this.nav = e
			},
		}
	}
</script>

<style scoped>
	.flatNav{border-radius: 10px 10px 0 0;border-bottom: 1px solid #F1F2F5;overflow-x: auto;height: 70px;}
	.flatNav .flatItem{padding: 15px 15px 10px;flex: 0 0 auto;text-align: center;position: relative;}
	.flatNav .flatItem label{color: #C5CFD5;font-size: 24rpx;}
	.flatNav .flatItem view{color: #8C9FAD;font-size: 28rpx;font-weight: bold;margin-top: 5px;}
	
	.flatNav .flatItem.on label{color: #1762E6;}
	.flatNav .flatItem.on view{color: #1762E6;}
	.flatNav .flatItem.on::after{position: absolute;bottom: 0;left: 30%;content: '';width: 40%;height: 3px;border-radius: 2px;background-color: #1762E6;}
	
	.buyItems{padding:15px;border-bottom: 1px solid #F1F2F5;}
	.item_name{margin-bottom: 10px;}
	.item_name .name{font-weight: bold;}
	.item_name .percents{color: #8C9FAD;font-size: 12px;}
	.amout view{color: #8C9FAD;font-size: 12px;margin-bottom: 5px;;}
	.price view{font-weight: bold;color: #1762E6;font-size: 20px;}
	.price view label{margin-right: 5px;color: #1762E6;font-size: 12px;}
	.price /deep/ span{color: #8C9FAD;font-size: 12px;}
	.buyBtn{margin-top: 10px;}
	.buyBtn .btns{width: 88px;height: 30px;background: #1762E6;border-radius: 5px;color: #fff;}
	.buyBtn .btns.sell{background-color: #8C9FAD;}
	
	.areaNav{position: absolute;right: 15px;border: 1px solid #8C9FAD;height: 30px;border-radius: 15px;width: 110px;z-index: 100;}
	.areaNav view{width: 50%;text-align: center;height: 30px;line-height: 30px;font-size: 12px;color: #8C9FAD;}
	.areaNav view.on{border: 1px solid #1762E6;color: #1762E6;border-radius: 15px;}
	
	.fast .listNav view.on{color: #fff;}
	.fast .areaNav view.on{border-color: #fff;color: #fff;}
	
	
	.fastBuyName{padding:15px 0;}
	.fastBuyName label{color: #1762E6;font-size: 24rpx;margin:0 2px 0 10px;}
	.fastPriceInput{font-size: 20px;font-weight: bold;border-bottom: 1px solid #F1F2F5;padding: 10px 0 5px;margin-bottom: 10px;}
	.fastPriceInput input{height: 40px;font-size: 32rpx;padding-left: 5px;}
	
	.fastTxt view{font-size: 24rpx;color: #8C9FAD;}
	.fastTxt view.byAmount{color: #1762E6;}
	.proto{text-align: center;bottom: 30px;font-size: 24rpx;color: #8C9FAD;}
	.proto label{color: #1762E6;}
</style>
