<template>
	<view class="minHeight" :class="getTheme">
		<status-bar></status-bar>

		<view class="topNavsBox">
			<view class="topNavs flex">
				<view class="on">{{$lang.myAcount.navTag1}}</view>
				<view>{{$lang.myAcount.navTag6}}</view>
				<view @click="navigateToFiatCurrency">{{$lang.myAcount.navTag3}}</view>
			</view>
		</view>
		<view class="tradeTop flex flexbetween" :style="'z-index: 9;top:'+statusBar+'px'">
			<view class="top_lt flex flex_ac">
				<!-- <image src="../../static/more.png" mode="widthFix" style="width: 15px;margin-right: 15px;"></image> -->
				<view @click="handleShowside()" class="iconfont icon-gengduo" style="font-size: 18px;margin-right: 14px;"></view>
				{{coinDetail.symbolName}}
				<view :class="coinDetail.symbolChange<0?'down':'up'" style="margin-left: 15px;">{{coinDetail.symbolChange>0?'+'+coinDetail.symbolChange:coinDetail.symbolChange}}%</view>
				<!-- <view class="down">-5.04%</view> -->
			</view>
			<view class="top_rt flex flex_ac flexbetween">
				<!-- <image src="../../static/r1.png" mode="widthFix" style="width: 18px;" @click="navigateToKline"></image> -->
				<view class="iconfont icon-tongji" style="font-size: 19px;" @click="navigateToKline"></view>
				<view style="position: relative;">
					<!-- <image  src="../../static/dot2.png" mode="widthFix" style="width: 18px;"></image> -->
					<view @click="downNav=true" class="iconfont icon-gengduo1" style="font-size: 19px;"></view>

					<view class="sideBg fixed" @click="downNav=false" :class="downNav?'act':''" style="left: 0;"></view>
					<view class="downCont" :class="downNav?'act':'unact'">
						<view class="flex flex_ac" @click="navigateToAssets(1)">
							<!-- <image src="../../static/coin_in.png" mode="widthFix" style="width: 18px;"></image> -->
							<view class="iconfont icon-daoru" style="font-size: 19px;margin-right: 8px;"></view>
							{{$lang.recharge.recharge}}
						</view>
						<view class="flex flex_ac" @click="navigateToAssets(2)">
							<!-- <image src="../../static/coin_out.png" mode="widthFix" style="width: 18px;"></image> -->
							<view class="iconfont icon-daochu" style="font-size: 19px;margin-right: 8px;"></view>
							{{$lang.transfer.transfer}}
						</view>
						<view class="flex flex_ac">
							<!-- <image src="../../static/h.png" mode="widthFix" style="width: 18px;"></image> -->
							<view class="iconfont icon-hengpai" style="font-size: 19px;margin-right: 8px;"></view>
							{{$lang.trade.downNav1}}
						</view>
						<view class="flex flex_ac">
							<image src="../../static/start.png" mode="widthFix" style="width: 18px;"></image>
							{{$lang.trade.downNav2}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="trades flex">
			<view class="trade_left flexauto">
				<view class="tradeNav flex flexbetween">
					<view class="buySell flex">
						<view class="buy" :class="exchangeType==1?'on':''" @click="handleExchangeType(1)">{{$lang.trade.buy}}</view>
						<view class="sell" :class="exchangeType==2?'on':''" @click="handleExchangeType(2)">{{$lang.trade.sell}}</view>
					</view>
					<view class="limitPrice flex flex_ac">{{$lang.trade.limitPrice}}
						<image src="../../static/down.png" mode="widthFix" style="width: 8px;margin-left: 5px;"></image>
					</view>
				</view>
				<view class="formBox">
					<view class="priceBox flex">
						<input type="number" class="flex1 fontWei"  v-model="exchangePrice" placeholder-style="color:#C5CFD5" @input="handlePriceInput" />
						<view class="priceBtn flexCC flexauto">
							<view class="flexCC" style="padding: 15px 0;" @click="handleExchangePrice(-1)">
								<image src="../../static/add1.png" mode="widthFix" style="width: 14px;"></image>
							</view>|
							<view class="flexCC" style="padding: 12px 0;" @click="handleExchangePrice(1)">
								<image src="../../static/add2.png" mode="widthFix" style="width: 14px;"></image>
							</view>
						</view>
					</view>
					<view class="allcny fontWei">≈{{Math.round(coinDetail.cnyPrice/coinDetail.price * exchangePrice*100)/100}}CNY</view>
					<view class="priceBox flex">
						<input type="number" class="flex1 fontWei" :style="getTheme=='dark'?'color:#C5CFD5':''" v-model="exchangeNum" :placeholder="$lang.transfer.li1"
						 placeholder-style="color:#C5CFD5" @input="handleNumInput" />
						<view class="priceBtn flexCC flexauto" style="border-left: none;">
							<view class="flexCC fontWei">{{coinDetail.coinName}}</view>
						</view>
					</view>
					<view class="used flex flexbetween">
						<view>{{$lang.common.keyong}} </view>
						<view>{{exchangeType==1?exchangeDetail.buyAmount:exchangeDetail.sellAmount}}
							{{exchangeType==1?exchangeDetail.buyUnit:exchangeDetail.sellUnit}}</view>
					</view>

					<!-- 百分比选择 -->
					<!-- <view class="flexbetween moveWrap" :class="exchangeType==1?'buy':'sell'"  style="height: 46px;width: inherit;position: relative;">
					<view class="moveBtn" @click="handlePercentage(0.25)">25%</view>
					<view class="moveBtn" @click="handlePercentage(0.5)">50%</view>
					<view class="moveBtn" @click="handlePercentage(0.75)">75%</view>
					<view class="moveBtn" @click="handlePercentage(1)">100%</view>
				</view> -->

					<!-- <slider ></slider>		 -->

					<custom-slider :activeColor="exchangeType==1?'#15B383':'#D9343E'" style="margin: 14px 0;" :style="getTheme=='dark'?'background-color:#202939':''" @getValue="handlePercentage"></custom-slider>


					<view class="flexbetween">
						<view class="total">{{$lang.trade.tradeNum}}</view>
						<view style="font-size: 12px;color: #8C9FAD;font-weight: bold;">{{Math.round(exchangeNum*exchangePrice*100)/100}}
							{{exchangeType==1?exchangeDetail.buyUnit:exchangeDetail.buyUnit}}</view>
					</view>
					<view class="submit buy" v-if="$store.state.hasLogin" :class="exchangeType==1?'buy':'sell'" @click="handleExchange">{{exchangeType==1?$lang.trade.buy:$lang.trade.sell}}</view>
					<view class="submit buy" v-else :class="exchangeType==1?'buy':'sell'" @click="linkTo('/pages/component/login',false,false)">{{$lang.loginBtn}}</view>
				</view>
			</view>
			<!-- ////////////////////////////////////////////////////////////////////////// -->
			<view class="trade_right flex1">
				<view class="rt_tt flex">
					<view class="w15 flexauto">{{$lang.trade.item1}}</view>
					<view class="w40 textR">{{$lang.trade.item2}}</view>
					<view class="w45 textR">{{$lang.trade.item3}}</view>
				</view>
				<view class="flexColumn" style="flex-direction: column-reverse;">
					<view class="data_li flex" v-for="(item,index) in sellDepthList" :key="index" @click="depthExchangePrice(item.price)">
						<view class="w15 sell flexauto" style="font-weight: bold;">{{index+1}}</view>
						<view class="w40 sell textR" style="font-weight: bold;">{{item.price}}</view>
						<view class="w45 textR" style="font-weight: bold;">{{item.volume>1000?Math.round(item.volume/1000*100)/100 +'k':toFixed2(item.volume)}}</view>
						<!-- <view class="sellbg-width"></view> -->
					</view>
				</view>
				<view class="curPrice" style="justify-self: flex-start;font-weight: bold;">
					{{coinDetail.price}}
					<view class="allcny" style="padding:0;font-weight: bold;">≈{{coinDetail.cnyPrice}}CNY</view>
				</view>
				<view class="data_li flex" v-for="(item,index) in buyDepthList" :key="index+'a'" @click="depthExchangePrice(item.price)">
					<view class="w15 buy flexauto" style="font-weight: bold;">{{index+1}}</view>
					<view class="w40 buy textR" style="font-weight: bold;">{{item.price}}</view>
					<view class="w45 textR" style="font-weight: bold;">{{item.volume>1000?Math.round(item.volume/1000*100)/100 +'k':toFixed2(item.volume)}}</view>
					<!-- <view class="buybg-width"></view> -->
				</view>


				<!-- dropDown -->
				<dropdown class="flex dropDown" style="justify-content: flex-end;position: relative;" :list="depthList" :current="depthListCurrent"
				 @onClick="changeDropDown"></dropdown>
			</view>
		</view>
		<!-- <view style="height: 10px;background-color: #F7F7FB;"></view> -->

		<view class="curBuyBox">
			<view class="curBox_tt flex flexbetween">
				{{$lang.trade.curOrder}}
				<view class="flexCC" @click="navigateToList">{{$lang.trade.more}}
					<image src="../../static/right.png" mode="widthFix" style="width: 7px;"></image>
				</view>
			</view>

			<view class="curItem" v-for="(item,index) in entrustsOrder.records" :key="index">
				<view class="flex cur_tt">
					<view class="flex tt" :class="item.type==1?'buy':'sell'">{{item.type==1?$lang.trade.buy:$lang.trade.sell}}</view>
					<view class="flex1 time flex">{{item.created.slice(-8,-3)}} {{item.created.slice(5,11).replace('-','/')}}</view>
					<view class="action flex" @click="deleteRecords(item.orderId)">{{$lang.trade.cancelOrder}}</view>
				</view>
				<view class="flex datas">
					<view class="flex1">
						<text>{{$lang.trade.item2}}（{{coinDetail.symbolName.slice(coinDetail.symbolName.indexOf('/')+1)}}）</text>
						<view>{{item.price}}</view>
					</view>
					<view class="flex1">
						<text>{{$lang.trade.item3}}（{{coinDetail.symbolName.slice(0,coinDetail.symbolName.indexOf('/'))}}）</text>
						<view>{{item.volume}}</view>
					</view>
					<view class="flex1 textR">
						<text>{{$lang.trade.item4}}({{coinDetail.symbolName.slice(0,coinDetail.symbolName.indexOf('/'))}})</text>
						<view>{{item.dealVolume}}</view>
					</view>
				</view>
			</view>

			<noData v-if="entrustsOrder.records.length==0" :theme="getTheme"></noData>
		</view>

		<!-- 侧边栏 -->
		<view class="sideBg fixed" :class="showSide?'act':''" @click="showSide=false" @touchmove.stop.prevent="donothing"></view>
		<view class="sideBox fixed" :class="showSide?'act':''">
			<!-- #ifdef APP-PLUS -->
			<view :style="'height: '+statusBar+'px'"></view>
			<!-- #endif -->
			<view class="sideCont">
				<view class="sideTop flex flexbetween">
					{{$lang.myAcount.navTag1}}
					<!-- <image @click="showSide=false" src="../../static/more.png" mode="widthFix" style="width: 15px;"></image> -->
					<view class="iconfont icon-gengduo" style="font-size: 19px;" @click="showSide=false"></view>
				</view>
				<view class="flex_ac" style="height: 43px;">
					<view class="flexCC" style="width: 75px;">
						<view class="sideNav-item flexCC" :class="areaType=='self'?'on':''" @click="handleAreaType('self')">{{$lang.quotes.quoNav1}}</view>
					</view>
					<view class="flexCC" style="width: 75px;">
						<view class="sideNav-item flexCC" :class="areaType==index?'on':''" v-for="(item,index) in areaList" :key="index"
						 @click="handleAreaType(index)">USDT</view>
					</view>
				</view>
				<view class="sideCoin flex" v-for="(item,index) in marketList" :key="index" @click="handleCoinDetail(index)">
					<view class="flex1 name">{{item.name.slice(0,item.name.indexOf('/'))}}</view>
					<view class="flex1 textC" :class="item.change<0?'down':'up'">{{item.cnyPrice}}</view>
					<view class="flex1 textR per" :class="item.change<0?'down':'up'">{{item.change}}%</view>
				</view>
			</view>
		</view>

		<!-- <view style="height: 1000vh;"></view> -->
		<!-- <Footer></Footer> -->
	</view>
</template>
<script>
	import dropdown from "../component/dropDown.vue"
	import customSlider from "../component/custom-slider.vue"
	export default {
		components: {
			dropdown,
			customSlider
		},
		data() {
			return {
				coinsymbol: 'DKUSDT',
				showSide: false,
				downNav: false,
				depthStep: 'step0',
				areaList: [],
				areaListCurrent: 0,
				marketList: [],
				tradingAreaList: [],
				buyDepthList: [],
				sellDepthList: [],
				coinDetail: {},
				areaType: '0',
				entrustsOrder: {
					records: []
				},
				exchangeType: 1,
				exchangeDetail: {},
				exchangeNum: '',
				exchangePrice: 0,
				moveNumber: 0,
				depthList: [this.$lang.trade.deep1, this.$lang.trade.deep2, this.$lang.trade.deep3],
				depthListCurrent: 0,
				intervalSend: {},
				ws_detail: {}
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
			
			this.getAllData();
			if(this.$store.state.netWork){
				this.ws_detail = uni.connectSocket({
				  url: `wss://${this.$store.state.socketRequest}:8327`,
				});
				uni.onSocketOpen((res)=> {
				  let userInfo= uni.getStorageSync('userInfo')
				  if(userInfo){userInfo = JSON.parse(userInfo)}
				  let access_token = userInfo.access_token || ""
				  uni.sendSocketMessage({data: '{"authorization": ' + JSON.stringify(access_token) +  '}'})
				  this.intervalSend = setInterval( ()=>{ uni.sendSocketMessage({data: `{"method":"trade$market$depth","mergeType":"${this.depthStep}","symbol":"${this.coinsymbol}"}`}) }, 2000)
				});
				uni.onSocketMessage(res => {
					let detail = JSON.parse(res.data)
					if(detail.event === 'order.pending.update') {
						// console.log('111111')
						this.getOrderEntrusts().then(res=>{
							this.entrustsOrder = {
								current: res.data.current,
								pages: res.data.pages,
								records: res.data.records
							}
						})
					}else {
						if(detail.bids) {
							this.buyDepthList = this.sort(detail.bids,'price',1)
							this.sellDepthList = this.sort(detail.asks,'price')
							this.coinDetail.price = detail.price
							this.coinDetail.cnyPrice = detail.cnyPrice
							this.exchangePrice = this.exchangePrice || detail.price
						}
					}
			
				})
			}
		},
		onHide() {
			clearInterval(this.intervalSend)
			uni.closeSocket()
		},
		onPullDownRefresh() {
			this.getAllData()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 5000)
		},
		methods: {
			donothing() {},
			getMarketArea() {
				return this.$request({
					url: '/v2/s/trade/market/area'
				})
			},
			getTradingArea() {
				return this.$request({
					url: '/v2/s/trading_area'
				})
			},
			getDepth(symbol = this.coinsymbol) {
				return this.$request({
					url: `/v2/s/trade/market/depth/${symbol}/${this.depthStep}`
				})
			},
			getOrderEntrusts(current = 1, size = 10, symbol = this.coinsymbol) {
				return this.$request({
					url: `/v2/s/trade/order/entrusts/${symbol}/${current}/${size}`
				})
			},
			getCoinAccount(symbol = this.coinsymbol) {
				this.$request({
					url: `/v2/s/user/account/asset/${symbol}`
				}).then(res => {
					this.exchangeDetail = {
						buyAmount: res.data.buyAmount,
						buyFeeRate: res.data.buyFeeRate,
						buyLockAmount: res.data.buyLockAmount,
						buyUnit: res.data.buyUnit,
						sellAmount: res.data.sellAmount,
						sellFeeRate: res.data.sellFeeRate,
						sellLockAmount: res.data.sellLockAmount,
						sellUnit: res.data.sellUnit
					}
				})
			},
			handleAreaType(e) {
				if (e == this.areaType) return
				this.areaType = e
				if (e == 'self') {
					let list = uni.getStorageSync('favoritesAreaList')
					let newList = []
					for (let i of list) {
						for (let j of this.areaList) {
							if (i.areaName == j.areaName) {
								for (let k of j.markets) {
									if (i.name == k.name) {
										newList.push(k)
										break
									}
								}
								break
							}
						}
					}
					this.marketList = newList
				} else {
					this.marketList = this.areaList[e].markets
				}
			},
			sort(arr, type, status) {
				// while(arr.length<5){
				// 	arr = arr.push({})
				// }
				if (arr.length > 5) {
					arr = arr.splice(0, 5)
				}
				if (!status) {
					arr.sort((a, b) => {
						return a[type] - b[type]
					})
				} else {
					arr.sort((a, b) => {
						return b[type] - a[type]
					})
				}
				while (arr.length < 5) {
					arr.push({})
				}
				return arr
			},
			// 侧边栏的显示与隐藏
			handleShowside() {
				this.showSide = true
				this.handleAreaType(this.areaType)
			},
			// 侧边栏选择币种详情
			handleCoinDetail(e) {
				let list = this.marketList
				this.coinDetail = {
					price: list[e].price,
					cnyPrice: list[e].cnyPrice,
					symbolName: list[e].name,
					symbolChange: list[e].change,
					coinName: list[e].name.slice(0, list[e].name.indexOf('/')),
					low: list[e].low,
					high: list[e].high,
					volume: list[e].volume,
					numScale: list[e].numScale,
					priceScale: list[e].priceScale
				}
				this.exchangePrice = list[e].price
				this.coinsymbol = list[e].symbol
				this.showSide = false
				if (this.$store.state.hasLogin) {
					this.getCoinAccount()
				}
				Promise.all([this.getDepth(), this.getOrderEntrusts()]).then(res => {
					this.buyDepthList = this.sort(res[0].data.bids, 'price', 1)
					this.sellDepthList = this.sort(res[0].data.asks, 'price')
					this.entrustsOrder = {
						current: res[1].data.current,
						pages: res[1].data.pages,
						records: res[1].data.records
					}
				})
			},
			// 撤销委托订单，参数订单id
			deleteRecords(id) {
				uni.showModal({
					title: this.$lang.dialog.title2,
					content: this.$lang.dialog.content4,
					success: (res) => {
						if (res.confirm) {
							this.$request({
								url: '/v2/s/trade/order/entrusts/' + id,
								method: 'delete'
							}).then(res1 => {
								if (res1.errcode == 0) {
									this.getAllData()
								}
							})
						}
					}
				})
			},
			// 更新所有数据
			getAllData() {
				let arr = [this.getMarketArea(), this.getTradingArea(), this.getDepth()]
				if (this.$store.state.hasLogin) {
					arr.push(this.getOrderEntrusts())
				}
				// console.log(arr)
				Promise.all(arr).then(res => {
					this.areaList = res[0].data
					this.marketList = res[0].data[0].markets
					this.tradingAreaList = res[1].data
					this.buyDepthList = this.sort(res[2].data.bids, 'price', 1)
					this.sellDepthList = this.sort(res[2].data.asks, 'price')
					this.coinDetail = {
						price: res[2].data.price,
						cnyPrice: res[2].data.cnyPrice,
						symbolName: res[0].data[0].markets[0].name,
						symbolChange: res[0].data[0].markets[0].change,
						coinName: res[0].data[0].markets[0].name.slice(0, res[0].data[0].markets[0].name.indexOf('/')),
						low: res[0].data[0].markets[0].low,
						high: res[0].data[0].markets[0].high,
						volume: res[0].data[0].markets[0].volume,
						numScale: res[0].data[0].markets[0].numScale,
						priceScale: res[0].data[0].markets[0].priceScale
					}
					this.exchangePrice = this.exchangePrice || res[2].data.price
					if (this.$store.state.hasLogin) {
						this.entrustsOrder = {
							current: res[3].data.current,
							pages: res[3].data.pages,
							records: res[3].data.records
						}
					}
					// 根据币币选择要查询的币种持有量
					if (this.$store.state.hasLogin) this.getCoinAccount()
					uni.stopPullDownRefresh()
				}).catch(err => {
					console.log(err)
				})
			},
			handleExchangeType(e) {
				if (e == this.exchangeType) return
				this.exchangeType = e
			},
			handleExchangePrice(e) {
				let priceScale = 1 + '0'.repeat(this.coinDetail.priceScale)
				this.exchangePrice = Math.round((Number(this.exchangePrice) + e / priceScale) * priceScale) / priceScale
			},
			handlePriceInput(e) {
				if (this.exchangePrice.indexOf('.') >= 0) {
					var num = this.exchangePrice.toString()
					var left = num.substr(0, num.indexOf('.'))
					var right = num.substr(num.indexOf('.') + 1, this.coinDetail.priceScale)

					setTimeout(() => {
						this.exchangePrice = left + '.' + right
					}, 30)
				}
			},
			handleNumInput() {
				if (this.exchangeNum.indexOf('.') >= 0) {
					var num = this.exchangeNum.toString()
					var left = num.substr(0, num.indexOf('.'))
					var right = num.substr(num.indexOf('.') + 1, this.coinDetail.numScale)

					setTimeout(() => {
						this.exchangeNum = left + '.' + right
					}, 30)
				}
			},
			handleExchange() {
				if (!this.exchangeNum || !this.exchangePrice) return
				uni.showLoading({
					title: this.$lang.common.waiting,
					mask: true
				});
				this.$request({
					url: '/v2/s/trade/order/entrusts',
					method: 'post',
					data: {
						price: this.exchangePrice,
						symbol: this.coinsymbol,
						type: this.exchangeType,
						volume: this.exchangeNum
					}
				}).then(res => {
					setTimeout(() => uni.hideLoading(), 400)
					if (res.errcode == 0) {
						this.getAllData()
					}
				}).catch(res => {
					setTimeout(() => uni.hideLoading(), 200)
				})
			},
			navigateToList() {
				this.linkTo('./list?coinsymbol=' + this.coinsymbol + '&coinName=' + this.coinDetail.symbolName, true, true)
			},
			depthExchangePrice(e) {
				if (!e) return
				this.exchangePrice = e
			},
			// 深度选择
			changeDropDown(e) {
				this.depthListCurrent = e
				this.depthStep = 'step' + e
				this.getAllData()
			},
			navigateToKline() {
				let e = this.coinDetail
				let str =
					`&change=${e.symbolChange}&price=${e.price}+&cnyPrice=${e.cnyPrice}&volume=${Math.round(e.volume)}&high=${e.high}&low=${e.low}`
				uni.navigateTo({
					url: '/pages/quotes/kLine?coinName=' + e.symbolName + str
				})
			},
			handlePercentage(e) {
				if (this.exchangeType == 1) {
					this.exchangeNum = Math.floor(this.exchangeDetail.buyAmount / this.exchangePrice * e) || 0
				} else if (this.exchangeType == 2) {
					this.exchangeNum = Math.floor(this.exchangeDetail.sellAmount / this.exchangePrice * e) || 0
				}
			},
			navigateToAssets(e) {
				if (e == 1) {
					uni.navigateTo({
						url: '/pages/myAccount/recharge'
					})
				} else if (e == 2) {
					uni.navigateTo({
						url: '/pages/myAccount/transfer'
					})
				}
				this.downNav = false
			},
			navigateToFiatCurrency() {
				uni.navigateTo({
					url: './fiatCurrency/fiatCurrency'
				})
			},
			toFixed2(num) {
				return Math.round(num * 100) / 100 || ''
			}
		}
	}
</script>


<style>
	.sideNav-item {
		box-sizing: border-box;
		width: 45px;
		height: 43px;
		font-weight: bold;
	}
	.light .sideNav-item{border-bottom: 2px solid rgba(255, 255, 255, 0);}
	.dark .sideNav-item{color: #8C9FAD;}

	.sideNav-item.on {
		color: #1762E6;
		border-bottom: 2px solid #1762E6;
	}

	.data_li {
		position: relative;
	}

	.flex.tt.buy,
	.buy {
		color: #15B383;
	}

	.flex.tt.sell,
	.sell {
		color: #D9343E;
	}

	.moveBtn {
		border: 1px solid #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 30px;
		width: 42px;
		font-size: 12px;
		border-radius: 4px;
	}

	.trade_right {
		display: flex;
		flex-direction: column;
	}

	.trades .trade_right .rt_tt {
		padding: 8px 0px;
		margin: 0;
	}

	.datas .flex1 view,
	.flexbetween,
	.fontWei {
		font-weight: bold;
	}
	.dark .dropDown {background-color: #202939;}
</style>
