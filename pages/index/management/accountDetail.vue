<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="walletItem.walletName|breviary(8)"></topNav>
	<view class="page">
		<view class="content bgfff" style="padding-top: 5px;padding-bottom: 5px;">
			<view class="items flex flexbetween" @click="changeName">
				{{$lang.manage.nav1}}
				<view class="itemsRt flex flex_ac">
					<image src="../../../static/right.png" mode="widthFix" style="height:24rpx;width:12rpx;margin-left:5px"></image>
				</view>
			</view>
			<view class="items flex flexbetween" v-if="walletItem.loginFlag==1" @click="showIf2=true;">
				{{$lang.manage.nav2}}
				<view class="itemsRt flex flex_ac"><image src="../../../static/right.png" mode="widthFix" style="height:24rpx;width:12rpx;margin-left:5px"></image></view>
			</view>
			<view class="items flex flexbetween" v-if="walletItem.loginFlag==1" @click="showIf=true">
				{{$lang.manage.nav3}}
				<view class="itemsRt flex flex_ac"><image src="../../../static/right.png" mode="widthFix" style="height:24rpx;width:12rpx;margin-left:5px"></image></view>
			</view>
			<view class="items flex flexbetween" @click="$refs.dialogOne.open()">
				{{$lang.manage.nav4}}
				<view class="itemsRt flex flex_ac"><image src="../../../static/right.png" mode="widthFix" style="height:24rpx;width:12rpx;margin-left:5px"></image></view>
			</view>
		</view>
	
	</view>
	
	<view style="height: 40rpx;"></view>

	<Keyboard :show="showIf" :cssStatic="getTheme" ref="keyboard" :success="checkResult" @hideKey="hidekeyboard" @getPassword="getPassword"></Keyboard>
	<Keyboard :show="showIf2" :cssStatic="getTheme" ref="keyboard2" :success="checkResult2" @hideKey="hidekeyboard2" @getPassword="getPassword2"></Keyboard>
	
	<Dialog :title="$lang.dialog.title1" ref="dialogOne" :content="$lang.dialog.content1" :sureText="$lang.dialog.groupBtnOk1" @close="close" @confirm="confirm"></Dialog>
	<Dialog
		:title="$lang.dialog.title2"
		ref="dialogTwo"
		:content="$lang.dialog.content2"
		:cancelText="$lang.dialog.groupBtnCancel2"
		:sureText="$lang.dialog.groupBtnOk2"
		@close="close"
		@confirm="confirm2"
	></Dialog>
</view>
</template>

<script>
	import Dialog from '@/pages/component/dialog.vue';
	import Keyboard from '@/components/custom-keyboard/custom-keyboard.vue';
export default {
	components: {
		Dialog,Keyboard
	},
	data() {
		return {
			walletItem: uni.getStorageSync('walletItem')?JSON.parse(uni.getStorageSync('walletItem')):{},
			showIf: false,
			checkResult: true,
			showIf2: false,
			checkResult2: true,
		};
	},
	methods: {
		getPassword2(e) {
			if(e.msg=='success'){
				this.hidekeyboard()
				this.showIf2 = false;
				this.linkTo('/pages/component/backWord/backWordStepOne',false)
			}else{
				this.checkResult2 = false;
				this.$refs.keyboard2.clear();
				setTimeout(() => {
					this.checkResult2 = true;
				}, 600);
			}
		},
		hidekeyboard2() {
			this.showIf2 = false;
			this.$refs.keyboard2.clear()
		},
		getPassword(e) {
			if(e.msg=='success'){
				this.hidekeyboard()
				setTimeout(() => {
					uni.navigateTo({
						url: './backupPrivateKey'
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
		hidekeyboard() {
			this.showIf = false;
			this.$refs.keyboard.clear()
		},
		changeName(){
			this.linkTo('/pages/index/management/renamed', true)
		},
		confirm() {
			if(!this.isNetWork()) return
			var data={
				id:this.walletItem.id,
			}
			this.$request({
				url: '/v2/w/address/delete',
				data:data,
				method:'GET',
			}).then(res=>{
				uni.showToast({
					title:this.$lang.deleteSuc,
					duration:1500
				})
				setTimeout(()=>{
					this.goBack()
				},1500)
			}).catch(error=>{
				uni.showToast({
					title:error.errmsg,
					duration:1500,
					icon:"none"
				})
			});
		},
		confirm2() {
			uni.navigateTo({
				url: '/pages/personal/backWord'
			});
		},
		close() {
			console.log('ssssss');
		},
	},
	onShow(){
		this.walletItem=uni.getStorageSync('walletItem')?JSON.parse(uni.getStorageSync('walletItem')):{}
	}
};
</script>

<style scoped>
.content {margin-bottom: 10px;margin-top: 10px;}
.items {height: 50px;font-size: 32rpx;}
.itemsRt {color: #999;}
.itemsRt image {width: 20px;margin-right: 5px;}
.itemsRt text {height: 16px;margin-left: 5px;}

/* .dark.page {background-color: #1B222D;color: #C2CCDE;} */
.dark .content {background-color: #202939;}
.dark .items {color: #C5CFD5;}
.light {background-color: #f8f8f8;}
</style>
