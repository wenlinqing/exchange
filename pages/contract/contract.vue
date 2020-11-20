<template>
	<view class="minHeight" :class="getTheme">
		<status-bar ></status-bar>
		<view class="topNavsWrap">
			<view class="topNavs flex">
				<view :class="{on:topActive==0}" @click="handleTopAct(0)">{{$lang.contract.topNav1}}</view>
				<view :class="{on:topActive==1}" @click="handleTopAct(1)">{{$lang.contract.topNav2}}</view>
			</view>
		</view> 
		
		<view class="tradeTop flex flexbetween" :style="'z-index: 9;top:'+statusBar+'px'">
			<view class="top_lt flex flex_ac">
				<image  src="../../static/more.png" mode="widthFix" style="width: 15px;margin-right: 15px;"></image>
				BTC {{$lang.contract.cur}}1225
				<view class="up">+5.04%</view>
			</view>
			<view class="top_rt flex flex_ac flexbetween">
				<image src="../../static/r1.png" mode="widthFix" style="width: 18px;" ></image>
				<view style="position: relative;">
					<image src="../../static/dot2.png" mode="widthFix" style="width: 18px;"></image>
				</view>
			</view>
		</view>
		<!-- <view class="top-wrap">
			<view class="top-wrap-item" :style="topActive===0?'background-color: #1762E6;color:#FFFFFF':'border: 1px solid #E8ECEF;color:#8C9FAD'" @click="handleTopAct(0)">合约</view>
			<view class="top-wrap-item" :style="topActive===1?'background-color: #1762E6;color:#FFFFFF':'border: 1px solid #E8ECEF;color:#8C9FAD'" @click="handleTopAct(1)">期权</view>
		</view>
		
		<view class="markets-wrap flexbetween">
			<view class="flexCC">
				<image src="../../static/more.png" mode="widthFix" style="width: 18px;"/>
				<view style="padding: 0 14px;">BTC 当季1225</view>
				<view class="market-changeBtn">+5.04%</view>
			</view>
			<view class="flexCC">
				<image src="../../static/r1.png" mode="widthFix" style="width: 18px;margin-right: 20px;"></image>
				<image src="../../static/dot2.png" mode="widthFix" style="width: 18px;"></image>
			</view>
		</view> -->
		
		<view class="jiaoge">{{$lang.contract.ju1}}65{{$lang.contract.ju2}}</view>
		
		<view class="flexbetween assetWrap" >
			<view class="flexColumn">
				<view class="income-item-title flex_ac">0.0616 <image src="../../static/contract_change.png" mode="widthFix" style="width: 12px;margin-left: 4px;" /></view>
				<view class="income-item flex_ac">BTC{{$lang.contract.sec1}}</view>
			</view>
			<view class="flexColumn">
				<view class="income-item-title flex_ac">- -</view>
				<view class="income-item flex_ac">{{$lang.contract.sec2}}USD</view>
			</view>
			<view class="flexColumn">
				<view class="income-item-title flex_ac" style="justify-content: flex-end;">- -</view>
				<view class="income-item flex_ac">{{$lang.contract.sec3}}<image src="../../static/q.png" mode="widthFix"  style="width: 12px;margin-left: 4px;" /></view>
			</view>
		</view>
		
		<view class="flex cangList">
			<view class="flexCC cang-item" :class="cangActive==0?'cangActive':''" style="width: 33.33%;" @click="handleCang(0)">{{$lang.contract.secNav1}}</view>
			<view class="flexCC cang-item" :class="cangActive==1?'cangActive':''" style="width: 33.33%;" @click="handleCang(1)">{{$lang.contract.secNav2}}</view>
			<view class="flexCC cang-item" :class="cangActive==2?'cangActive':''" style="width: 33.33%;" @click="handleCang(2)">{{$lang.contract.secNav3}}</view>
		</view>
		
		<view class="flex cangWrap" >
			<!-- 左边 -->
			<view class="flexColumn" style="width: 470rpx;" >
				<view class="flexbetween" style="margin-bottom: 8px;">
					<view class="kai-wrap kai-wrap1 flexCC" style="color: #fff;">{{$lang.contract.subNav1}}</view>
					<view class="kai-wrap kai-wrap2 flexCC" style="color: #8C9FAD;">{{$lang.contract.subNav2}}</view>
				</view>
				
				<view class="flexbetween" style="margin-bottom: 8px;color: #172841;font-weight: bold;">
					<view class="border-light flexbetween" style="width: 310rpx;height:52rpx;padding: 0 10rpx 0 24rpx;">{{$lang.contract.xian}}</view>
					<view class="border-light flexbetween" style="width: 144rpx;height:52rpx;padding: 0 10rpx 0 24rpx;">5X</view>
				</view>
				
				<view class="flexbetween" style="margin-bottom: 24px;">
					<input class="border-light flexbetween" type="number" value="" placeholder="价格" style="width: 310rpx;height: 92rpx;padding-left: 24rpx;" />
					<view class="border-light flexCC" style="width: 144rpx;height: 92rpx;">{{$lang.contract.dui}}</view>
				</view>
				
				<view class="flexbetween border-light" style="height: 92rpx;padding: 0 24rpx;">
					<input type="number" value="" style="height: 92rpx;"/>
					<view class="">{{$lang.contract.zhang}}</view>
				</view>
				
				<view class="flexbetween" style="margin: 20rpx 0;">
					<view class="border-light flexCC" style="width: 80rpx; font-size: 10px;height: 60rpx;">0%</view>
					<view class="border-light flexCC" style="width: 80rpx; font-size: 10px;height: 60rpx;">25%</view>
					<view class="border-light flexCC" style="width: 80rpx; font-size: 10px;height: 60rpx;">50%</view>
					<view class="border-light flexCC" style="width: 80rpx; font-size: 10px;height: 60rpx;">75%</view>
					<view class="border-light flexCC" style="width: 80rpx; font-size: 10px;height: 60rpx;">100%</view>
				</view>
				
				<view class="grayFont" style="margin-bottom: 28rpx;">{{$lang.trade.td7}} --</view>
				<view class="left-bottom-btn flexbetween">
					<view style="opacity: 0;">{{$lang.contract.ups}}</view>
					<view style="color: #fff;">{{$lang.contract.buyIn}}</view>
					<view style="color: #81DDB2;">{{$lang.contract.ups}}</view>
				</view>
			</view>
			
			
			<!-- 右边 -->
			<view class="flexColumn" style="width:216rpx;box-sizing: border-box;padding-left: 20rpx;">
				<view class="flexbetween" style="margin-bottom: 20rpx;">
					<view class="fnsize10" style="color: #C5CFD5;">{{$lang.trade.item2}}</view>
					<view class="fnsize10" style="color: #C5CFD5;">{{$lang.trade.item3}}</view>
				</view>
				
				<view class="flexbetween" v-for="(item,index) in list" :key="index" style="height: 48rpx;">
					<view class="fnsize12" style="color:#D9343E;font-family: DIN-Medium, DIN;">{{Math.round(item*0.12*10000)/10000 }}</view>
					<view class="fnsize12" style="color:#8C9FAD;font-family: DIN-Medium, DIN;">{{Math.round(item*1.52*10000)/100}}</view>
				</view>
				
				<view class="flexColumn">
					<view class="fnsize16" style="color:#D9343E;font-weight: bold;">0.061566</view>
					<view class="fnsize10" style="color: #C5CFD5;margin: 4rpx 0;font-family: DIN-Medium, DIN;">≈3271.87CNY</view>
					<view class="fnsize12 zhishu">{{$lang.contract.zhi}} 12897.56</view>
				</view>
				
				<view class="flexbetween" v-for="(item,index) in list" :key="index+'1'" style="height: 48rpx;">
					<view class="fnsize12" style="color:#15B383;font-family: DIN-Medium, DIN;">{{Math.round(item*0.02*10000)/10000 }}</view>
					<view class="fnsize12" style="color:#8C9FAD;font-family: DIN-Medium, DIN;">{{Math.round(item*1.2*10000)/100}}</view>
				</view>
				
				<view class=""></view>
			</view>
		</view>
		
		<view class="flexbetween weituoBox">
			<view class="flex">
				<view class="flexCC weituo" style="color: #1762E6;border-color: #1762E6;">{{$lang.contract.xian}}</view>
				<view class="flexCC weituo" >{{$lang.contract.jihuan}}</view>
			</view>
			<view class="fnsize14" style="color: #8C9FAD;font-weight: bold;">{{$lang.common.all}}</view>
		</view>
		
		<noData :theme="getTheme"><!-- v-if="list.length==0" --></noData>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topActive: 0,
				cangActive: 0,
				list: [1,2,3,4,5]
			}
		},
		onShow() {
			// if(uni.getStorageSync("languageKey")!='zh'){
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
			// }
		},
		methods: {
			handleTopAct(e){
				if(this.topActive == e) return
				this.topActive = e
			},
			handleCang(e){
				if(this.cangActive == e) return
				this.cangActive = e
			}
		}
	}
</script>

<style lang="scss">
	page {font-family: DIN-Regular, DIN;}
.top-wrap {height: 35px;display: flex;align-items: center;justify-content: center;width: 100%;}
.top-wrap-item {box-sizing: border-box;height: 30px;display: inline-flex;width: 170px;border-radius: 4px;align-items: center;justify-content: center;}

.markets-wrap {box-sizing: border-box;padding: 10px 15px;}
.market-changeBtn {color: #15B383;font-size: 12px;background-color: rgba(21,179,111,0.1);border-radius: 2px;}
.income-item-title {font-size: 16px;font-weight: bold;height: 24px;}
.income-item {font-size: 12px;color: #8C9FAD;height: 22px;}
.cang-item {font-size: 16px;font-weight: bold;color: #8C9FAD;box-sizing: border-box;border-bottom: 2px solid transparent;}
.cangActive {color: #1762E6;border-bottom: 2px solid #1762E6;}

.kai-wrap {width: 230rpx;height: 64rpx;background-repeat: no-repeat;background-size: 100% 100%;}
.kai-wrap1 {background-image: url(../../static/con_actRect.png);}
.kai-wrap2 {background-image: url(../../static/con_unactRect.png);}
.left-bottom-btn {width: 380rpx;box-sizing: border-box;padding: 16rpx;height: 88rpx;background-color: #15B383;border-radius: 8rpx;}


.border-light {border: 1px solid #E8ECEF;box-sizing: border-box;}
.grayFont {color: #8C9FAD;font-weight: bold;}
.fnsize16 {font-size: 16px;}
.fnsize10 {font-size: 10px;}
.fnsize12 {font-size: 12px;}
.fnsize14 {font-size: 14px;}

.assetWrap {
	height: 68px;padding: 4px 16px 0;box-sizing: border-box;width: 100%;border-bottom: 8px solid #F7F7FB;
}

.weituo {border-bottom: 2px solid transparent;height: 104rpx;color: #8C9FAD;font-weight: bold;}
.weituo+.weituo {margin-left: 40px;}
.cangWrap {padding: 32rpx;border-bottom: 16rpx solid #F7F7FB;}
.jiaoge {box-sizing:border-box; height: 20px;border-top: 1px solid #F1F2F5;border-bottom: 1px solid #F1F2F5;padding-left: 16px;color: #8C9FAD;}
.cangList {height: 38px;width: 100%;border-bottom: 1px solid #F1F2F5;}
.zhishu {color: #172841;font-weight: bold;font-family: DIN-Medium, DIN;}
.weituoBox {height: 106rpx;box-sizing: border-box;padding: 0 16px;border-bottom: 2rpx solid #F1F2F5;}

.dark {
	.cangList,.topNavs,.assetWrap,.topNavsWrap,.tradeTop,.jiaoge {background-color: #202939;}
	.assetWrap,.cangWrap {border-color: #1B222D;}
	.cangList {border-color: #283752;}
	.zhishu {color: #C5CFD5;}
	.jiaoge {border-color: #283752;}
	.cangWrap,.weituoBox {background-color: #202939;}
	.weituoBox {border-color: #283752;}
}
</style>
