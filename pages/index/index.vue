<template>
	<view class="minHeight" :class="getTheme" @click.stop="showDownNav = false">
		<status-bar></status-bar>

		<view class="fixed" style="background: rgba(23, 40, 65, 0.1);top: 0; bottom: 0;right: 0;z-index: 10;" v-show="showDownNav" @click.stop="showDownNav = false"></view>
		<view class="downNavs fixed" :style="'top:' + (statusBar + 50) + 'px'" v-show="showDownNav" @click.stop="showDownNav = false">
			<view class="flex flex_ac" @click.stop="showDownNav = false;scanCode();">
				<!-- <image :src="'../../static/'+ getTheme +'/sao.png'" mode="widthFix" style="width: 36rpx;height: 36rpx;margin-right: 10px;"></image> -->
				<view class="iconfont icon-scan"></view>
				<view class="downNavs-text">{{$lang.common.saoma}}</view>
			</view>
			<view class="flex flex_ac" @click.stop="showDownNav = false;linkTo('/pages/index/receiveHuiyuan', true);">
				<!-- <image :src="'../../static/'+ getTheme +'/hui.png'" mode="widthFix" style="width: 36rpx;height: 36rpx;margin-right: 10px;"></image> -->
				
				<view class="iconfont icon-saoma"></view>
				<view class="downNavs-text">{{$lang.common.huiyuan}}</view>
			</view>
			<view class="flex flex_ac" @click.stop="showDownNav = false;ToastFun();">
				<!-- <image :src="'../../static/'+ getTheme +'/shou2.png'" mode="widthFix" style="width: 36rpx;height: 36rpx;margin-right: 10px;"></image> -->
				
				<view class="iconfont icon-shoukuan"></view>
				<view class="downNavs-text">{{$lang.common.shoukuanma}}</view>
			</view>
		</view>

		<view class="indexTop flex flex_ac fixed" :style="'top:' + statusBar + 'px'">
			<image src="../../static/tou.png" mode="widthFix" style="width: 30px;height: 30px;" @click="showSide = true"></image>
			<view class="indexTop_search flex1 flex flex_ac">
				<view class="iconfont icon-search" style="font-size: 20px;margin-right: 10px;"></view>
				{{$lang.common.schTxt}}
			</view>
			<!-- <image  :src="'../../static/'+getTheme+'/add.png'" mode="widthFix" style="width: 20px;height: 20px;"></image> -->
			<view class="iconfont icon-jia" @click.stop="showDownNav = true" style="font-size: 24px;"></view>
		</view>
		<view style="height: 50px;"></view>


		<!-- banner图 -->
		<view class="banner flex1">
			<uni-swiper-dot class="swiperBoxer" v-if="$store.state.netWork" :info="bannerList" :current="current" field="name">
				<swiper class="swiper-box" @change="change" autoplay interval="4000">
					<swiper-item v-for="(item, index) in bannerList" :key="index">
						<image :src="item.value" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
			<uni-swiper-dot class="swiperBoxer" v-else :info="bannerList" :current="current" field="name">
				<swiper class="swiper-box">
					<swiper-item>
						<image src="../../static/banner.png" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>

		<!-- 滚动轮播版本更新 -->
		<view class="flex flex_ac flexbetween indexNews">
			<view class="flex flex_ac" style="width: 90%;">
				<!-- <image :src="'../../static/'+getTheme+'/news.png'" mode="widthFix" class="flexauto" style="width: 30rpx;margin-right: 5px;"></image> -->
				<view class="iconfont icon-laba flexauto" style="font-size: 19px;margin-right: 5px;"></view>
				<view class="flex1">
					<swiper class="swiper" :vertical="true" :autoplay="true" :interval="3000" :duration="500" style="line-height: 20px;height: 20px;">
						<swiper-item v-for="(item,index) in noticeList" :key="index" v-if="index<3">
							<view class="txtEllip" @click="goDetail(item)" style="font-size: 24rpx;">{{item.title}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- <image @click="linkTo('/pages/index/newsList',false,false)" :src="'../../static/'+getTheme+'/more.png'" class="flexauto" mode="widthFix" style="width: 30rpx;"></image> -->
			<view class="iconfont icon-gengduo" @click="linkTo('/pages/index/newsList',false,false)" style="font-size: 19px;"></view>
		</view>

		<!-- 推荐币种实时数据 -->
		<view class="hotCoin flex">
			<view class="hotItems" v-for="(item, index) in recommendList" :key="index" @click="goKLine(item)">
				<view class="coinName flex flex_ac">
					{{ item.name }}
					<view :class="item.change >= 0 ? 'up' : 'down'">{{ item.change >= 0 ? '+' : '' }}{{ item.change }}%</view>
				</view>
				<view class="price" :class="item.change >= 0 ? 'up' : 'down'">{{ item.price }}</view>
				<view class="money">¥ {{ item.cnyPrice }}</view>
			</view>
		</view>

		<view class="buyFast">
			<image v-if="languageKey=='zh'" @click="linkTo('/pages/trade/fiatCurrency/fiatCurrency', true)" :src="'../../static/'+getTheme+'/fast.png'" mode="widthFix" style="width: 100%;display: block;"></image>
			<image v-if="languageKey=='en'" @click="linkTo('/pages/trade/fiatCurrency/fiatCurrency', true)" :src="'../../static/'+getTheme+'/fast2.png'" mode="widthFix" style="width: 100%;display: block;"></image>
		</view>

		<view class="indexNavs flex">
			<view class="navsItem" @click="linkTo('/pages/myAccount/transfer', true)">
				<image src="../../static/idx1.png" mode="widthFix" style="width: 44rpx;"></image>
				{{$lang.index.ft_btn1}}
			</view>
			<view class="navsItem" @click="linkTo('/pages/myAccount/recharge', true)">
				<image src="../../static/idx2.png" mode="widthFix" style="width: 44rpx;"></image>
				{{$lang.index.ft_btn2}}
			</view>
			<view class="navsItem" @click="linkTo('/pages/index/pool/pool', true)">
				<image src="../../static/idx3.png" mode="widthFix" style="width: 44rpx;"></image>
				{{$lang.index.ft_btn3}}
			</view>
			<view class="navsItem" @click="linkTo('/pages/index/activation', true)">
				<image src="../../static/idx4.png" mode="widthFix" style="width: 44rpx;"></image>
				{{$lang.index.ft_btn4}}
			</view>
			<view class="navsItem">
				<image src="../../static/idx5.png" mode="widthFix" style="width: 44rpx;"></image>
				{{$lang.index.ft_btn5}}
			</view>

			<view class="navsItem" @click="linkTo('/pages/webView',false,false)">
				<image src="../../static/idx6.png" mode="widthFix" style="width: 44rpx;"></image>
				{{$lang.index.ft_btn6}}
			</view>
			<view class="navsItem">
				<image src="../../static/idx7.png" mode="widthFix" style="width: 44rpx;"></image>
				{{$lang.index.ft_btn7}}
			</view>
			<view class="navsItem" @click="linkTo('/pages/index/income/income', true)">
				<image src="../../static/idx8.png" mode="widthFix" style="width: 44rpx;"></image>
				{{$lang.index.ft_btn8}}
			</view>
			<view class="navsItem" @click="linkTo('/pages/index/subscribe/subscribe', true)">
				<image src="../../static/idx9.png" mode="widthFix" style="width: 44rpx;"></image>
				{{$lang.index.ft_btn9}}
			</view>
			<view class="navsItem" @click="linkTo('/pages/index/ecology', false)">
				<image src="../../static/idx10.png" mode="widthFix" style="width: 44rpx;"></image>
				{{$lang.index.ft_btn10}}
			</view>
		</view>
		<!-- <view style="background-color: #F7F7FB;height:10px"></view> -->


		<!-- 底部币种榜 -->
		<view class="indexCoinLi">
			<view class="coinTab flex">
				<view class="flex1" :class="{ on: navIndex == 0 }" @click="handleNavIndex(0)">{{$lang.index.navTag1}}</view>
				<view class="flex1" :class="{ on: navIndex == 1 }" @click="handleNavIndex(1)">{{$lang.index.navTag2}}</view>
				<view class="flex1" :class="{ on: navIndex == 2 }" @click="handleNavIndex(2)">{{$lang.index.navTag3}}</view>
			</view>
			
			<swiper @change="buttomCoinListChange" style="min-height: 200px;" :current="navIndex" @transition="buttomCoinListTransition" duration="500">
				<!-- 涨幅榜 -->
				<swiper-item style="padding: 0px 12px 10px;box-sizing: border-box;">
					<view class="coinSort flex">
						<view class="flex1 flex flex_ac">
							{{$lang.index.sortTag1}}
							<image src="../../static/sort.png" mode="widthFix" style="width: 20rpx;height: 20rpx;margin-left: 5px;"></image>
						</view>
						<view class="flex1" style="margin-left: 30px;">{{$lang.index.sortTag2}}</view>
						<view class="flex1 textR">{{$lang.index.sortTag3}}</view>
					</view>
					<view class="coinItem flex" v-for="(item, index) in areaList" :key="index" @click="goKLine(item)">
						<view class="flex1 coinName flex">
							{{ item.name.split('/')[0] }}
							<view>/{{ item.name.split('/')[1] }}</view>
						</view>
						<view class="flex1 price">{{ item.price }}</view>
						<view class="flex1 textR">
							<view class="up_down" :class="item.change >= 0 ? 'up' : 'down'">{{ item.change >= 0 ? '+' : '' }}{{ item.change }}%</view>
						</view>
					</view>	
				</swiper-item>
				<!-- 成交额榜 -->
				<swiper-item style="padding: 0px 12px 10px;box-sizing: border-box;box-sizing: border-box;">
					<view class="coinSort flex">
						<view class="flex1">{{$lang.index.sortTag4}}</view>
						<view class="flex1" style="margin-left: 30px;">{{$lang.index.sortTag5}}(CNY)</view>
						<view class="flex1 textR">{{$lang.index.sortTag6}}(CNY)</view>
					</view>
					<view class="coinItem flex" v-for="(item, index) in chengjiaoList" :key="index" @click="goKLine(item)">
						<view class="flex1 coinName flex">
							{{ item.name.split('/')[0] }}
							<view>/{{ item.name.split('/')[1] }}</view>
						</view>
						<view class="flex1 price">{{ item.cnyPrice }}</view>
						<view class="flex1 textR">
							<view class="up_down" style="background: rgba(23, 98, 230, 0.05);color: #1762E6;font-weight: bold;">
								{{ (item.amount * item.coinCnyPrice).toFixed(2) }}
							</view>
						</view>
					</view>
				</swiper-item>
				<!-- 新币榜 -->
				<swiper-item style="padding: 0px 12px 10px;box-sizing: border-box;">
					<view class="coinSort flex">
						<view class="flex1 flex flex_ac">
							{{$lang.index.sortTag4}}
						</view>
						<view class="flex1" style="margin-left: 30px;">{{$lang.index.sortTag2}}</view>
						<view class="flex1 textR">{{$lang.index.sortTag3}}</view>
					</view>
					<view class="coinItem flex" v-for="(item, index) in newCoinList" :key="index" @click="goKLine(item)">
						<view class="flex1 coinName flex">
							{{ item.name.split('/')[0] }}
							<view>/{{ item.name.split('/')[1] }}</view>
						</view>
						<view class="flex1 price">{{ item.price }}</view>
						<view class="flex1 textR">
							<view class="up_down" :class="item.change >= 0 ? 'up' : 'down'">{{ item.change >= 0 ? '+' : '' }}{{ item.change }}%</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- <Footer></Footer> -->


		<!-- 侧边栏 -->
		<view class="sideBg fixed " :class="showSide ? 'act' : ''" @click="showSide = false"></view>
		<view class="sideBox bgfff fixed " :class="showSide ? 'act' : ''">
			<view class="sideCont" style="position: relative;">
				<view :style="'height: ' + statusBar + 'px'"></view>
				<view class="themes">
					<view class="theme-switch" :class="{'switchOn':themeStyle}" @click="handleSwitch(!themeStyle)">
						<view class="theme-circle"><image class="theme-icon" :src="themeStyle?'../../static/icon-dark.png':'../../static/icon-light.png'" /></view>
					</view>
					<!-- <image class="flexauto" src="../../static/theme1.png" mode="widthFix" style="width: 88rpx;"></image> -->
				</view>
				<view class="loginInfo flex flex_ac flexbetween">
					<view style="width: 80%;" v-if="startPassWord != '' && hasLogin && userInfo.id" @click="showSide = false;linkTo('/pages/index/management/manage', true);">
						<view class="name">Hi,{{ userInfo.walletName | breviary(5) }}</view>
						<view class="flex flex_ac" style="color: #8C9FAD;">
							ID:{{ userInfo.id | breviary(8) }}
							<!-- <image  src="../../static/copy.png" mode="widthFix" style="width: 11px;margin-left: 10px;"></image> -->
							<view class="iconfont icon-copy3" @click.stop="copy(userInfo.id)" style="font-size: 16px;margin-left: 8px;"></view>
						</view>
					</view>
					<view style="width: 80%;" v-if="startPassWord != '' && !hasLogin && !userInfo.id">
						<view class="name">Hi,{{ walletName }}</view>
						<view style="color: #8C9FAD;">{{$lang.index.sideWecome}}</view>
					</view>
					<view style="width: 80%;" @click="showSide = false;linkTo('/pages/component/login', false,false);" v-if="startPassWord == ''">
						<view class="name" style="color: #1762E6;">{{$lang.index.sideLogin}}</view>
						<view style="color: #8C9FAD;">{{$lang.index.sideWecome}}</view>
					</view>
					<!-- <image class="flexauto" src="../../static/right.png" mode="widthFix" style="width: 12rpx;margin-right: 2px;"></image> -->
					<view class="iconfont icon-right" style="font-size: 16px;"></view>
				</view>

				<view class="idxNav flex flex_ac" @click="showSide = false;linkTo('/pages/trade/list', true);">
					<image src="../../static/idx_n1.png" mode="widthFix" style="width: 32rpx;margin-right: 10px;"></image>
					{{$lang.index.sideNav1}}
				</view>
				<!-- <view class="idxNav flex flex_ac" @click="showSide=false;linkTo('/pages/component/backWord/backWord', false);">
				<image src="../../static/idx_n2.png" mode="widthFix" style="width: 32rpx;margin-right: 10px;"></image>备份助记词
			</view> -->
				<view class="idxNav flex flex_ac" @click="showSide = false;linkTo('/pages/index/management/manage', true);">
					<image src="../../static/idx_n2.png" mode="widthFix" style="width: 32rpx;margin-right: 10px;"></image>
					{{$lang.index.sideNav2}}
				</view>

				<view class="idxNav flex flex_ac" @click="showSide = false;linkTo('/pages/system/address', true);">
					<image src="../../static/idx_n3.png" mode="widthFix" style="width: 32rpx;margin-right: 10px;"></image>
					{{$lang.index.sideNav3}}
				</view>
				<view class="idxNav flex flex_ac" @click="showSide = false;linkTo('/pages/system/securityCenter', false);">
					<image src="../../static/idx_n4.png" mode="widthFix" style="width: 32rpx;margin-right: 10px;"></image>
					{{$lang.index.sideNav4}}
				</view>
				<view class="idxNav flex flex_ac" @click="showSide = false;linkTo('/pages/index/share', false,false);">
					<image src="../../static/idx_n5.png" mode="widthFix" style="width: 32rpx;margin-right: 10px;"></image>
					{{$lang.index.sideNav5}}
				</view>
				<view class="idxNav flex flex_ac" @click="showSide = false;linkTo('/pages/system/setUp', false,false);">
					<image src="../../static/idx_n6.png" mode="widthFix" style="width: 32rpx;margin-right: 10px;"></image>
					{{$lang.index.sideNav6}}
				</view>

				<view class="idx_bottom ">
					<view class="aboutUs flex flex_ac flexbetween" @click="showSide = false;linkTo('/pages/system/aboutUs', false,false);">
						{{$lang.index.sideNav7}}
						<image src="../../static/idx_r.png" mode="widthFix" style="width: 32rpx;"></image>
					</view>
					<view class="idx_bot_nav flex flex_ac">
						<view class="navs flex1 flexCC">
							<image src="../../static/idx_n7.png" mode="widthFix" style="width: 32rpx;margin-right: 10px;"></image>
							{{$lang.index.sideNav8}}
						</view>
						|
						<view class="navs flex1 flexCC" @click="showSide = false;linkTo('/pages/system/feedBack', false);">
							<image src="../../static/idx_n8.png" mode="widthFix" style="width: 32rpx;margin-right: 10px;"></image>
							{{$lang.index.sideNav9}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			current: 0,
			// mode: 'round',
			// dotsStyles: {
			// 	backgroundColor: '#D8D8D8',
			// 	border: '1px #D8D8D8 solid',
			// 	selectedBackgroundColor: '#1295FF',
			// 	selectedBorder: '1px #1295FF solid',
			// 	bottom:0
			// },
			showSide: false,
			themeStyle: false,
			navIndex: 0,
			noticeList: uni.getStorageSync('noticeList') ? JSON.parse(uni.getStorageSync('noticeList')) : [],
			recommendList: uni.getStorageSync('recommendList') ? JSON.parse(uni.getStorageSync('recommendList')) : [],
			bannerList: uni.getStorageSync('bannerList') ? JSON.parse(uni.getStorageSync('bannerList')) : [],
			areaList: uni.getStorageSync('areaList') ? JSON.parse(uni.getStorageSync('areaList')) : [],
			chengjiaoList: [],
			startPassWord: uni.getStorageSync('startPassWord') || '',
			walletName: uni.getStorageSync('walletName') || '',
			showDownNav: false,
			languageKey:uni.getStorageSync("languageKey")||'zh',
			newCoinList: []
		};
	},
	computed: {
		...mapState(['hasLogin', 'userInfo'])
	},
	mounted() {
		var wordList = uni.getStorageSync('wordList')||'';
		if( wordList!='' && !uni.getStorageSync('isRegister')){
			this.$request({
				url: '/v2/u/user/existMnemonic',
				method: 'POST',
				data: { mnemonic: wordList }
			}).then(res=>{
				if(res.data.isExist==1){
					uni.setStorageSync('wordList',wordList)
					uni.setStorageSync('isRegister',true)
					this.doLogin()
				}else if(res.data.isExist==0){
					this.doRegister()
				}
			}).catch(error=>{
				console.log(error);
			});	
		}else{
			this.doLogin()
		}
	},
	onLoad() {
		uni.onNetworkStatusChange((res)=>{
			if(!res.isConnected){
				this.$store.commit('setNetWork',false)
			}else{
				this.$store.commit('setNetWork',true)
				var wordList = uni.getStorageSync('wordList')||'';
				if( wordList!='' && !uni.getStorageSync('isRegister')){
					this.$request({
						url: '/v2/u/user/existMnemonic',
						method: 'POST',
						data: { mnemonic: wordList }
					}).then(res=>{
						if(res.data.isExist==1){
							uni.setStorageSync('wordList',wordList)
							uni.setStorageSync('isRegister',true)
							this.doLogin()
						}else if(res.data.isExist==0){
							this.doRegister()
						}
					}).catch(error=>{
						console.log(error);
					});	
				}else{
					this.doLogin()
				}
			}
		})
	},
	onShow() {
		this.languageKey=uni.getStorageSync("languageKey")||'zh'
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
		
		uni.removeStorageSync('selectAddr');
		uni.removeStorageSync('transferCoin');
		uni.removeStorageSync('walletItem');
		if (uni.getStorageSync('userInfo')) {
			this.loginAction(JSON.parse(uni.getStorageSync('userInfo')));
		}
		// this.doLogin()

		if (this.$store.state.netWork) {
			Promise.all([this.postQueryNoticeByType(),this.getQueryRecommendList(),
			this.postHomeBannerList(),this.getArea()]).then(res => {
				this.noticeList = res[0].data.records;
				uni.setStorage({
					key: 'noticeList',
					data: JSON.stringify(res[0].data.records)
				});
				this.recommendList = res[1].data;
				uni.setStorage({
					key: 'recommendList',
					data: JSON.stringify(res[1].data)
				});
				this.bannerList = res[2].data;
				uni.setStorage({
					key: 'bannerList',
					data: JSON.stringify(res[2].data)
				});
				let ary = [];
				res[3].data.forEach(item => {
					item.markets.forEach(obj => {
						ary.push(obj);
					});
				});
				ary.sort(function(a, b) {
					return b.change - a.change;
				});
				this.areaList = ary;
				uni.setStorage({
					key: 'areaList',
					data: JSON.stringify(ary)
				});
			});
		}
	},
	onReady() {
		let list1 = JSON.parse( JSON.stringify(this.areaList) )
		this.chengjiaoList = list1.sort((a,b)=>{
			return b.amount * b.coinCnyPrice - a.amount * a.coinCnyPrice;
		})
		let list2 = JSON.parse( JSON.stringify(this.areaList) )
		this.newCoinList = list2.sort((a,b)=>{
			return a.name.localeCompare(b.name)
		})
	},
	methods: {
		goKLine(e){
			let str = `&change=${e.change}&price=${e.price}+&cnyPrice=${e.cnyPrice}&volume=${Math.round(e.volume)}&high=${e.high}&low=${e.low}`
			uni.navigateTo({
				url:'/pages/quotes/kLine?coinName='+ e.name + str
			})
		},
		doRegister(){
			var data={
				mnemonic:uni.getStorageSync('wordList'),
				terminalNo:this.uuid || new Date().getTime(),
				password:uni.getStorageSync('startPassWord'),
				type:'eth',
				walletName:uni.getStorageSync('walletName')
			}
			this.$request({
				url: '/v2/u/user/register3', //仅为示例，并非真实接口地址。
				data:data,
				method:'POST',
			}).then(res=>{
				uni.setStorageSync('isRegister',true)
				this.doLogin()
			}).catch(error=>{
				uni.showToast({
					title:error.errmsg,
					icon:"none"
				})
				uni.removeStorageSync('walletName');
				uni.removeStorageSync('startPassWord');
				uni.removeStorageSync('wordList');
				this.walletName=''
				this.startPassWord=''
			});
		},
		doLogin(){
			if (this.startPassWord != '' && this.$store.state.netWork && !uni.getStorageSync('userInfo')) {
				if(uni.getStorageSync('wordList')){
					var mnemonic = uni.getStorageSync('wordList');
					var data = {
						mnemonic: mnemonic,
						pwd: this.startPassWord,
						walletName: this.walletName||''
					};
				}
				if(uni.getStorageSync('identity')){
					var identity = uni.getStorageSync('identity');
					var data = {
						identity: identity,
						pwd: this.startPassWord,
						walletName: this.walletName||''
					};
				}
				
				this.$request({
					url: '/v2/u/login', //仅为示例，并非真实接口地址。
					data: data,
					method: 'POST'
				}).then(res => {
					this.loginAction(res.data);
				})
				.catch(error => {
					uni.showToast({
						title: error.errmsg + '或账号异常',
						icon: "none"
					})
					this.loginOut()
				});
			}
		},
		scanCode() {
			var that=this;
			uni.scanCode({
				success: res => {
					that.linkTo('/pages/myAccount/transfer?address='+res.result,true)
				}
			});
		},
		...mapMutations(['loginAction']),
		change(e) {
			this.current = e.detail.current;
		},
		goDetail(obj) {
			if (this.$store.state.netWork) {
				this.linkTo('/pages/index/newsDetail?id=' + obj.id);
			}
		},
		postQueryNoticeByType() {
			return this.$request({ 
				url: '/v2/s/notice/queryNoticeByType', //仅为示例，并非真实接口地址。
				data: {
					current: 1,
					size: 50,
					type: 0
				},
				method: 'POST'
			})
		},
		getQueryRecommendList() {
			return this.$request({url: '/v2/s/trade/market/queryRecommendList'})
		},
		postHomeBannerList(){
			return this.$request({url: '/v2/s/config/getHomeBannerList',method: 'POST'})
		},
		getArea(){
			return this.$request({url: '/v2/s/trade/market/area'})
		},
		handleNavIndex(e){
			if(e == this.navIndex) return
			this.navIndex = e
		},
		buttomCoinListChange(e){
			let i = e.detail.current
			if(this.navIndex != i) this.navIndex = i
		},
		buttomCoinListTransition(e){
			// console.log(e.detail)
			if(e.detail.dx<0) return
		},
		handleSwitch(e){
			// this.themeStyle = e
			// if(e){
			// 	this.$store.commit('setTheme','dark')
			// 	uni.setTabBarStyle({
			// 		backgroundColor: '#1B222D',
			// 		color:'#8C9FAD',
			// 		selectedColor: '#1762E6'
			// 	})
			// }else{
			// 	this.$store.commit('setTheme','light')
			// 	uni.setTabBarStyle({
			// 		backgroundColor: '#ffffff',
			// 		color:'#B0C3D2',
			// 		"selectedColor": "#1762E6"
			// 	})
			// }
		}
	}
};
</script>

<style scoped>
.banner {
	height: 130px;
	padding: 5px 12px 0;
}
.swiperBoxer,
.swiper-box {
	height: 100%;
	border-radius: 10px;overflow: hidden;
}
.swiperBoxer image {
	width: calc(100vw - 24px);
	height: calc(130px - 5px);
	display: block;
}
.theme-switch {position:relative;box-sizing:border-box;height: 24px;width: 44px;border-radius: 24px;background-color: #F1F2F5;padding: 2px;transition: all 0.2s linear;}
.theme-circle {position:absolute;background-color: #FFFFFF;height: 20px;width: 20px;border-radius: 50%;display: flex;align-items: center;justify-content: center;transition: all 0.2s linear;left: 2px;top: 2px;}
.theme-icon {width: 14px;height: 14px;}

.theme-switch.switchOn {background-color: #1F334D;}
.switchOn .theme-circle {background-color: #BCC2C9;left: 22px;}



.dark .indexTop_search {background-color: #202939;}
</style>
