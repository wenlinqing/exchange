<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	
	<view class="fixed fixdBox" :style="'top:'+statusBar+'px'">
		<view class="topBox flex flexbetween flex_ac">
			<!-- <image class="topLeft" src="../../static/edit.png" mode="widthFix"></image> -->
			<view></view>
			<view class="topCenter">{{$lang.quotes.quotes}}</view>
			<view></view>
			<!-- <image class="topRight" src="../../static/search.png" mode="widthFix" @click="linkTo('/pages/quotes/search')"></image> -->
		</view>
		<view class="navOneBox flex">
			<view :class="['flex1',{'on':navId==1}]" @click="navClick(1)">{{$lang.quotes.quoNav1}}</view>
			<view :class="['flex1',{'on':navId==2}]" @click="navClick(2)">{{$lang.quotes.quoNav2}}</view>
			<view :class="['flex1',{'on':navId==3}]" @click="navClick(3)">{{$lang.quotes.quoNav3}}</view>
			<view :class="['flex1',{'on':navId==4}]" @click="navClick(4)">{{$lang.quotes.quoNav4}}</view>
			<view :class="['flex1',{'on':navId==5}]" @click="navClick(5)">{{$lang.quotes.quoNav5}}</view>
		</view>
		
		
		<scroll-view scroll-x  class="scrollView" style="height: 41px;width: auto;position: relative;white-space: nowrap;"  :style="navId!=1?'':'opacity: 0.3;'">
			<view v-for="(item,index) in list" :key="index" class="inlineBlock" :class="activeArea==index?'on':''" @click="handleActiveArea(index)">{{item.areaName}}</view>
		</scroll-view>

		<view class="flex coinSortType">
			<view class="lists flex flex_ac flex1" style="padding-left: 16px;">
				<view class="flex_ac" style="height: 33px;" @click="handleSort('name')">
					<view class="li_name">{{$lang.index.sortTag4}}</view>
					<view class="sortBox">
						<view class="iconfont icon-biaotou-zhengxu" :style="sortName==1?'color:#1762E6':''"></view>
						<view class="iconfont icon-biaotou-daoxu" :style="sortName==2?'color:#1762E6':''"></view>
					</view>
				</view>
			</view>
			<view class="lists flex flex_ac flex1">
				<view class="flex_ac" style="height: 33px;" @click="handleSort('price')">
					<view class="li_name">{{$lang.index.sortTag5}}</view>
					<view class="sortBox">
						<view class="iconfont icon-biaotou-zhengxu" :style="sortPrice==1?'color:#1762E6':''"></view>
						<view class="iconfont icon-biaotou-daoxu" :style="sortPrice==2?'color:#1762E6':''"></view>
					</view>
				</view>
			</view>
			<view class="lists flex flex_ac flex1 flexEnd" style="padding-right: 16px;">
				<view class="flex_ac" style="height: 33px;" @click="handleSort('change')">
					<view class="li_name">{{$lang.index.sortTag3}}</view>
					<view class="sortBox">
						<view class="iconfont icon-biaotou-zhengxu" :style="sortChange==1?'color:#1762E6':''"></view>
						<view class="iconfont icon-biaotou-daoxu" :style="sortChange==2?'color:#1762E6':''"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="fixdBox"></view>
	
	<view class="coinBoxer">
		<view class="coinLiBox flex" v-for="(item,index) in marketList" :key="index" @click="goKLine(item)">
			<view class="flex1">
				<view class="coinName flex flex_ac">{{item.name.substr(0,item.name.indexOf('/'))}} <view>{{item.name.substr(item.name.indexOf('/'))}}</view></view>
				<view class="gray">{{$lang.index.sortTag7}} {{Math.round(item.volume)}}</view>
			</view>
			<view class="flex1">
				<view class="allNum">{{item.price}}</view>
				<view class="gray">¥{{item.cnyPrice}}</view>
			</view>
			<view class="flex1 flex flex_ac flexEnd">
				<view class="percent" :class="item.change>=0?'up':'down'">{{item.change>0?'+'+item.change:item.change}}%</view>
			</view>
		</view>
		<!-- ffff -->
		<!-- <view style="height: 500vh;"></view> -->
		
	</view>
	
	<!-- <Footer></Footer> -->
</view>
</template>
<script>
export default {
	data() {
		return {
			href:'',
			value:5,
			navId:2,
			list: [],
			activeArea: 0,
			marketList: [],
			sortName: 0,
			sortPrice: 0,
			sortChange: 0,
			closeWebsocket: 0,
			intervalSend: {},
			ws_detail: {}
		}
	},
	onShow() {
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
		// plus.navigator.setFullscreen(true);
	},
	onLoad(){
		// uni.setStorageSync('favoritesAreaList',[{areaName: "USDT", name: "DK/USDT"}])
		
	},
	onShow(){
		if(this.$store.state.netWork){
			this.navClick(this.navId)
			this.ws_detail = uni.connectSocket({
			  url: `wss://${this.$store.state.socketRequest}:8327`,
			});
			uni.onSocketOpen((res)=> {
			  this.intervalSend = setInterval( ()=>{ uni.sendSocketMessage({data: '{"method":"trade$market$markets"}'}) }, 3000)
			});
			uni.onSocketMessage(res => {
				this.list = JSON.parse(res.data)
				// console.log(this.list)
				let marketList = this.marketList
				// console.log(marketList)
				let newList = []
				// console.log(this.list)
				for(let i of marketList){
					for(let j of this.list){
						if(i.priceUnit == j.areaName){
							for(let k of j.markets){
								if(i.name == k.name){
									newList.push(k)
									break
								}
							}
							break
						}
					}
				}
				this.marketList = newList
				// console.log(marketList)
				// this.marketList = this.list[0].markets
				// console.log(this.marketList)
			})
		}
	},
	onHide(){
		clearInterval(this.intervalSend)
		uni.closeSocket()
	},
	methods: {
		goKLine(e){
			let str = `&change=${e.change}&price=${e.price}+&cnyPrice=${e.cnyPrice}&volume=${Math.round(e.volume)}&high=${e.high}&low=${e.low}`
			uni.navigateTo({
				url:'/pages/quotes/kLine?coinName='+ e.name + str
			})
			console.log(e.name)
		},
		navClick(id){
			if(id >= 3) return
			this.navId=id
			if(id==1){
				let list = uni.getStorageSync('favoritesAreaList')
				let newList = []
				for(let i of list){
					for(let j of this.list){
						if(i.areaName == j.areaName){
							for(let k of j.markets){
								if(i.name == k.name){
									newList.push(k)
									break
								}
							}
							break
						}
					}
				}
				// console.log(newList)
				this.marketList = newList
			}else{
				this.$request({url: '/v2/s/trade/market/area',}).then(res => {
					this.list = res.data
					this.marketList = res.data[0].markets
				})
				// this.marketList = this.list[id-2].markets
			}
		},
		onChange(e) {
			console.log('rate发生改变:' + JSON.stringify(e))
		},
		handleActiveArea(e){
			if(e==this.activeArea || this.navId==1) return
			this.activeArea = e
			let str = 'marketList'+e
			this[str] = this.list[e].markets
		},
		handleSort(e) {
			if(e=='change'){
				if(this.sortChange==2){
					this.sortChange = 0
				}else{
					this.sortChange += 1
				}
				this.sortName = 0
				this.sortPrice = 0
				this.sortList(e,this.sortChange)
			}else if(e=='price'){
				if(this.sortPrice==2){
					this.sortPrice = 0
				}else{
					this.sortPrice += 1
				}
				this.sortName = 0
				this.sortChange = 0
				this.sortList(e,this.sortPrice)
			}else if(e=='name'){
				if(this.sortName==2){
					this.sortName = 0
				}else{
					this.sortName += 1
				}
				this.sortChange = 0
				this.sortPrice = 0
				this.sortList(e,this.sortName)
			}
		},
		sortList(type,status) {
			if(status > 0){
				var newArr = this.marketList0.sort(function(a,b){
					if(status == 1){
						if(type == 'name'){
							return a.symbol.localeCompare(b.symbol)
						}else {
							return a[type] - b[type]
						}
						// return a[type] - b[type]
					}else if(status == 2){
						if(type == 'name'){
							return b.symbol.localeCompare(a.symbol)
						}else {
							return b[type] - a[type]
						}
						// return b[type] - a[type]
					}
				})
				this.marketList0 = newArr
			}else{
				this.marketList0 = this.list[0].markets
				if(type == 'name') {
					this.marketList0.sort((a,b)=>{return a.symbol.localeCompare(b.symbol)})
				}
			}
		}
	}
}
</script>

<style scoped >
	.fixdBox{height: 156px;}
	.inlineBlock {display: inline-flex;height: 40px;width: 64px;align-items: center;justify-content: center;}
	.scrollView .on:after{content: '';position: absolute;bottom: 0;height: 4px;width: 20px;z-index: 1;background-color: #1762E6;left: 50%;margin-left: -10px;border-radius: 2px;}
	.scrollView .on{font-weight: bold;color: #1762E6;position: relative;}
	.coinSortType {height: 33px;color: #8C9FAD;}
</style>
