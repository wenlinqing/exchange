<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.system.securityCenter"></topNav>
	<view class="page">
		<view class="content bgfff" style="padding-top: 5px;padding-bottom: 5px;">
			<view class="items flex flexbetween" @click="backUp">
				{{$lang.system.secNav1}}
				<view class="itemsRt flex flex_ac">
					<view class="iconfont icon-right" style="font-size: 16px;margin-left:5px"></view>
				</view>
			</view>
		</view>
		<view class="content bgfff" style="padding-top: 5px;padding-bottom: 5px;">
			<view class="items flex flexbetween">
				{{$lang.system.secNav2}}
				<switch :checked="turnOnGestrue" @change="fingerPrintLogin" />
			</view>
			<view class="items flex flexbetween">
				{{$lang.system.secNav3}}
				<switch @change="switch1Change" />
			</view>
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
		
		<Picker :show="pickerShowIf"  :array="array" ref="picker" @hidePicker="hidePicker" @confirm="pickerConfirm"></Picker>
		
		<!-- <Modal :show="modalShowIf2" :cssStatic="getThemeType" @cancel="modalCancel2" @confirm="modalConfirm2" content="删除钱包后将删除所有钱包资产，仅通过导入助记词才可以重新找回资产，请务必确保助记词已备份" cancelText="我已备份" confirmText="立即备份"></Modal> -->
		<!-- <Modal :show="modalShowIf3" :cssStatic="getThemeType" @cancel="modalCancel3" @confirm="modalConfirm3" content="若无妥善备份，删除钱包后将无法找回钱包，请谨慎处理该操作" confirmText="删除钱包"></Modal> -->
	</view>

</view>
</template>

<script>
// import Dialog from '@/components/dialog.vue';
// import Select from '@/components/select.vue';
// import Modal from '../../components/custom-modal.vue';
// import Keyboard from '@/components/custom-keyboard.vue';
import Picker from '../component/custom-picker.vue';
import {mapMutations} from "vuex"
export default {
	components: {
		// Dialog,
		// Select,
		// Modal,
		// Keyboard,
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
			turnOnGestrue: false
		};
	},
	methods: {
		...mapMutations(['setLanguage']),
		fingerPrintLogin(e) {
			this.turnOnGestrue = e.detail.value;
			if(e.detail.value){
				uni.navigateTo({
					url: './gesturePwd?lockType=2'
				})
			}else {
				uni.removeStorageSync('gestruePwd')
				uni.setStorageSync('turnOnGestrue',false)
			}
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
				this._i18n.setLocale(str)
				this.$store.commit('setLanguage',str)
			}
		},
		backUp(){
			uni.navigateTo({
				url: './modifyPwd'
			})
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
	onLoad(){
		let language = uni.getStorageSync('languageKey')
		this.selectLang = language == 'zh' ? '简体中文' : 'English'
	},
	onShow(){
		this.turnOnGestrue = uni.getStorageSync('turnOnGestrue') || false
	}
};
</script>

<style scoped>
.content {margin-bottom: 10px;margin-top: 10px;}
.items {height: 50px;font-size: 32rpx;}
.itemsRt {color: #999;}
.itemsRt image {width: 20px;margin-right: 5px;}
.itemsRt text {height: 16px;margin-left: 5px;}

.light {background-color: #f8f8f8;}
.dark {background-color: #1B222D;color: #C2CCDE;}
.dark .items,.dark .iconfont {color: #C5CFD5;}
.dark .content {background-color: #202939 !important;}
</style>
