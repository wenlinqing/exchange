<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.system.setUp" ></topNav>
	<view class="page">
		<view class="content bgfff">
			<view class="items flex flexbetween" @click="showPicker(1)">
				{{$lang.system.setUpNav1}}
				<view class="itemsRt flex flex_ac">
					{{selectMoney}}
					<image src="../../static/right.png" mode="widthFix" style="height:24rpx;width:12rpx;margin-left:5px"></image>
				</view>
			</view>
			<view class="items flex flexbetween" @click="showPicker(2)">
				{{$lang.system.setUpNav2}}
				<view class="itemsRt flex flex_ac">
					{{selectLang}}
					<image src="../../static/right.png" mode="widthFix" style="height:24rpx;width:12rpx;margin-left:5px"></image>
				</view>
			</view>
			<view class="items flex flexbetween" @click="linkTo('/pages/system/network', false);">
				{{$lang.system.setUpNav3}}
				<view class="itemsRt flex flex_ac">
					{{aisle}}
					<image src="../../static/right.png" mode="widthFix" style="height:24rpx;width:12rpx;margin-left:5px"></image>
				</view>
			</view>
		</view>
		<view class="content bgfff" style="padding-top: 5px;padding-bottom: 5px;" v-if="wordList!=''">
			<view class="items flex flexbetween" @click="linkTo('/pages/component/backWord/backWord', false);">
				{{$lang.system.setUpNav4}}
				<view class="itemsRt flex flex_ac"><image src="../../static/right.png" mode="widthFix" style="height:24rpx;width:12rpx;margin-left:5px"></image></view>
			</view>
			<!-- <view class="items flex flexbetween" style="color: #EE1212;" @click="clear">删除钱包</view> -->
		</view>
		<!-- <Dialog title="警告" ref="dialogOne" content="若无妥善备份，删除钱包后将无法找回钱包，请谨慎处理该操作" sureText="确认删除" @close="close" @confirm="confirm"></Dialog> -->

		<!-- <Dialog
			title="温馨提示"
			ref="dialogTwo"
			content="删除钱包后将删除所有钱包资产，仅通过导入助记词才可以重新找回资产，请务必确保助记词已备份"
			cancelText="我已备份"
			sureText="立即备份"
			@close="close"
			@confirm="confirm2"
		></Dialog> -->
		<!-- <view class="">指纹成功 {{ res }}</view> -->
		<!-- <view class="">指纹成功 {{ fail }}</view> -->
		<!-- <Modal :show="modalShowIf1" :cssStatic="getThemeType" :single="true" @confirm="modalConfirm1" :content="modalContent"></Modal> -->
		<!-- <Keyboard :show="keyboardShowIf" :cssStatic="getThemeType" ref="keyboard" :success="checkResult" @hideKey="hideKeyboard" @getPassword="getPassword"></Keyboard> -->
		
		<Picker :show="pickerShowIf"  :cssStatic="getTheme" :array="array" ref="picker" @hidePicker="hidePicker" @confirm="pickerConfirm"></Picker>
		
		<!-- <Modal :show="modalShowIf2" :cssStatic="getThemeType" @cancel="modalCancel2" @confirm="modalConfirm2" content="删除钱包后将删除所有钱包资产，仅通过导入助记词才可以重新找回资产，请务必确保助记词已备份" cancelText="我已备份" confirmText="立即备份"></Modal> -->
		<!-- <Modal :show="modalShowIf3" :cssStatic="getThemeType" @cancel="modalCancel3" @confirm="modalConfirm3" content="若无妥善备份，删除钱包后将无法找回钱包，请谨慎处理该操作" confirmText="删除钱包"></Modal> -->
	</view>
	
	<view style="height: 110rpx;"></view>
	<view class="" style="padding:30rpx 15px;" v-if="hasLogin">
		<view class="btnLight" style="width: 100%;border-radius: 5px;" @click="$refs.dialogOne.open()">{{$lang.loginOut}}</view>
	</view>
	
	<Dialog :title="$lang.dialog.title2" ref="dialogOne" :content="$lang.dialog.content3" :cancelText="$lang.btnCancel" :sureText="$lang.btnSure" @close="close" @confirm="loginOutFun"></Dialog>
	
</view>
</template>

<script>
	import i18n from '../../lang/i18n.js'
	import Vue from 'vue'
import Picker from '../component/custom-picker.vue';
import Dialog from '../component/dialog.vue'
import {mapState,mapMutations} from "vuex"
export default {
	components: {
		Dialog,
		Picker
	},
	data() {
		return {
			switch1Checked: false,
			res: '',
			fail: '',
			modalShowIf1: false,
			modalShowIf2: false,
			modalShowIf3: false,
			keyboardShowIf: false,
			checkResult: true,
			modalContent: '',
			pickerShowIf: false,
			pickerShowIndex: 1,
			array: [],
			language: ['简体中文','English'],
			money: ['CNY (￥)','USD ($)'],
			selectLang: '简体中文',
			selectMoney: 'CNY (￥)',
			aisle:'',
			wordList: uni.getStorageSync('wordList')||''
		};
	},
	computed: {
		...mapState(['hasLogin'])
	},
	onLoad(){
		let language = uni.getStorageSync('languageKey')||'zh'
		this.selectLang = language == 'zh' ? '简体中文' : 'English'
	},
	onShow() {
		this.aisle=uni.getStorageSync('aisle')||this.$lang.system.net1
		this.wordList=uni.getStorageSync('wordList')||''
	},
	methods: {
		changeAisle(){
			if(!uni.getStorageSync('aisle')){
				this.aisle=this.$lang.system.net1
				return
			}
			var aisle=uni.getStorageSync('aisle')||this.$lang.system.net1
			if(aisle=='通道一'){
				this.aisle='Channel one'
				uni.setStorageSync('aisle','Channel one')
			}
			if(aisle=='通道二'){
				this.aisle='Channel two'
				uni.setStorageSync('aisle','Channel two')
			}
			if(aisle=='通道三'){
				this.aisle='Channel three'
				uni.setStorageSync('aisle','Channel three')
			}
			if(aisle=='通道四'){
				this.aisle='Channel four'
				uni.setStorageSync('aisle','Channel four')
			}
			if(aisle=='通道五'){
				this.aisle='Channel five'
				uni.setStorageSync('aisle','Channel five')
			}
			
			if(aisle=='Channel one'){
				this.aisle='通道一'
				uni.setStorageSync('aisle','通道一')
			}
			if(aisle=='Channel two'){
				this.aisle='通道二'
				uni.setStorageSync('aisle','通道二')
			}
			if(aisle=='Channel three'){
				this.aisle='通道三'
				uni.setStorageSync('aisle','通道三')
			}
			if(aisle=='Channel four'){
				this.aisle='通道四'
				uni.setStorageSync('aisle','通道四')
			}
			
			if(aisle=='Channel five'){
				this.aisle='通道五'
				uni.setStorageSync('aisle','通道五')
			}
		},
		...mapMutations(['loginOut']),
		close() {
			// console.log('ssssss');
		},
		loginOutFun(){
			this.loginOut()
			uni.showToast({
				title:this.$lang.loginSuc,
				duration:1500
			})
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},1500)
			
		},
		fingerPrintLogin(e) {
			this.switch1Checked = e.detail.value;
			if(e.detail.value) this.keyboardShowIf = true;
		},
		confirm2() {
			uni.navigateTo({
				url: '/pages/personal/backWord'
			});
		},
		close() {
			console.log('ssssss');
		},
		confirm() {
			console.log('ccccccccc');
		},
		testFun() {
			this.$refs.dialogOne.open();
		},
		switch1Change: function(e) {
			// console.log('switch1 发生 change 事件，携带值为', e.target.value);
		},
		modalShow(text) {
			this.modalShowIf1 = true;
			this.modalContent = text;
		},
		modalConfirm1() {
			this.modalShowIf1 = false;
		},
		hideKeyboard() {
			this.switch1Checked = false;
			this.keyboardShowIf = false;
		},
		getPassword(e) {
			if(e=='success'){
				uni.checkIsSoterEnrolledInDevice({
					checkAuthMode: 'fingerPrint',
					success: res => {
						if (res.isEnrolled) {
							uni.startSoterAuthentication({
								requestAuthModes: ['fingerPrint'],
								challenge: '123456',
								authContent: '请用指纹解锁',
								success:(res)=> {
									this.modalShow('指纹验证通过')
								},
								fail:(err)=> {
									this.switch1Checked = false
									this.modalShow('错误次数过多,请稍后再试')
								}
							})
						} else {
							uni.showToast({
								title: '检测指纹指纹\n请检查是否开启指纹解锁',
								icon: 'none'
							});
						}
					},
					fail: err => {
						this.modalShow('指纹检测失败,请检查设备是否支持指纹')
					},
					complete:()=>{
						this.keyboardShowIf = false;
					}
				});
			}else{
				this.checkResult = false;
				this.$refs.keyboard.clear();
				setTimeout(() => {
					this.checkResult = true;
				}, 600);
			}
		},
		hidePicker(){
			this.pickerShowIf = false
		},
		showPicker(e){
			this.$refs.picker.init()
			this.pickerShowIndex = e
			if(e===1){
				this.pickerShowIf = true
				this.array = this.money
			}else{
				this.pickerShowIf = true
				this.array = this.language
			}
		},
		pickerConfirm(e){
			this.pickerShowIf = false
			if(this.pickerShowIndex == 1){
				this.selectMoney = this.money[e]
			}else {
				this.selectLang = this.language[e]
				let str = e == 0 ? 'zh' : 'en'
				i18n.setLocale(str)
				// this.$lang=i18n.getLanguage()
				Vue.prototype.$lang = i18n.getLanguage()
				setTimeout(()=>{
					this.changeAisle()
				},500)
			}
		},
		backUp(){
			this.modalShowIf2 = true;
		},
		clear(){
			this.modalShowIf3 = true;
		},
		modalCancel2(){
			this.modalShowIf2 = false;
		},
		modalCancel3(){
			this.modalShowIf3 = false;
		},
		modalConfirm2(){
			this.modalShowIf2 = false
			uni.navigateTo({
				url: '/pages/wallet/backWordStepTwo'
			})
		},
		modalConfirm3(){
			this.modalShowIf3 = false
			uni.clearStorageSync()
			plus.runtime.restart()
		}
	},
	
};
</script>

<style scoped lang="scss">
	
.light {background-color: #f8f8f8;}
.dark {background-color: $darkBGColor}
.content {margin-bottom: 10px;margin-top: 10px;}
.items {height: 50px;font-size: 32rpx;}
.itemsRt {color: #999;}
.itemsRt image {width: 20px;margin-right: 5px;}
.itemsRt text {height: 16px;margin-left: 5px;}

.dark .content {background-color: #202939 !important;}
.dark .items {color: $darkFontColor;}
.dark .itemsRt {color: #8C9FAD;}
</style>
