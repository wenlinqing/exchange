<template>
	<view class="boxer flex flexColumn">
		<status-bar ></status-bar>
		<topNav :title="$lang.system.modifyPwd"></topNav>
		<view class="pwdTop flex1 flex flexcenter flexColumn">
			<view class="toast-title" style="font-size: 20px;">{{$lang.system.pwdNew}}</view>
			<view class="toast" style="padding-top: 10px;font-size: 10px;">{{$lang.system.pwdNewTxt}}</view>
			<view class="pwdBox flex" :class="{ fail: fail }">
				<text :class="curPwd.length >= 1 ? 'on' : ''"></text>
				<text :class="curPwd.length >= 2 ? 'on' : ''"></text>
				<text :class="curPwd.length >= 3 ? 'on' : ''"></text>
				<text :class="curPwd.length >= 4 ? 'on' : ''"></text>
				<text :class="curPwd.length >= 5 ? 'on' : ''"></text>
				<text :class="curPwd.length >= 6 ? 'on' : ''"></text>
			</view>
		</view>
		<view class="pwdBottom flex">
			<view @click="chooseNum(1)">1</view>
			<view @click="chooseNum(2)">2</view>
			<view @click="chooseNum(3)">3</view>
			<view @click="chooseNum(4)">4</view>
			<view @click="chooseNum(5)">5</view>
			<view @click="chooseNum(6)">6</view>
			<view @click="chooseNum(7)">7</view>
			<view @click="chooseNum(8)">8</view>
			<view @click="chooseNum(9)">9</view>
			<view style="font-size:32rpx"></view>
			<view @click="chooseNum(0)">0</view>
			<view class="cancelBtn flexCC" @click="delFun"><image src="../../static/backspace.png" style="width: 24px;height: 24px;"/></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: 'set',
			password: '',
			curPwd: '',
			mnemonic: uni.getStorageSync('wordList'),
			fail: false,
			failShow: false,
			sucShow: false,
			oldpassword:uni.getStorageSync('startPassWord'),
		};
	},
	watch: {
		failShow(val1, val2) {
			if (val1) {
				setTimeout(() => {
					this.failShow = false;
				}, 1500);
			}
		},
		fail(val1, val2) {
			if (val1) {
				setTimeout(() => {
					this.fail = false;
				}, 600);
			}
		}
	},
	methods: {
		chooseNum(num) {
			if(this.curPwd.length < 6) {
				this.curPwd += '' + num
				if(this.curPwd.length == 6) {
					uni.showLoading({title: this.$lang.common.waiting,mask:true});
					this.$request({
						url: '/v2/u/user/updatePayPassword',
						data:{
							newpassword:this.curPwd,
							mnemonic:this.mnemonic,
							oldpassword:this.oldpassword
						},
						method:'POST'
					}).then(res=>{
						uni.hideLoading();
						uni.setStorageSync('startPassWord',this.curPwd)
						uni.showToast({
							title: this.$lang.system.modPwdSuc,
							icon:'none',
							success: ()=> {
								setTimeout(()=>{
									uni.navigateBack()
								},500)
							}
						})
					}).catch(error=>{
						uni.hideLoading();
						uni.showToast({
							title:error.errmsg,
							duration:1500,
							icon:"none"
						})
					});
				}
			}
			
		},
		delFun() {
			let psd = this.curPwd.split('');
			psd.pop();
			this.curPwd = psd.join('');
		},
		cancelFun() {
			uni.navigateBack();
		}
	}
};
</script>

<style scoped>
.boxer{background-color:#fff;height:100vh;color: #000;}
.toast-title {color: #333;}
.toast {color: #666;}
.pwdTop{color:#fff;font-size:28rpx}
.pwdBox{height:30rpx;margin-top:40px;margin-bottom:20px}
.pwdBox text{width:30rpx;height:30rpx;border:1px solid rgba(0,0,0);border-radius:50%;margin:0 8px;}
.pwdBox text.on{background-color:#333;}
.pwdBottom{flex-wrap:wrap;color: #666;}
.pwdBottom view{width:33.33%;text-align:center;color: #666;font-size:38rpx;height:130rpx;line-height:130rpx}
.fail{animation:shake .6s ease-in-out}
@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}
20%,80%{transform:translate3d(+2px,0,0)}
30%,70%{transform:translate3d(-4px,0,0)}
40%,60%{transform:translate3d(+4px,0,0)}
50%{transform:translate3d(-4px,0,0)}
}
.failToset{top:50rpx;width:100vw;height:50px;transform:translateY(0);transition:all .3s linear;opacity:0}
.failShow{transform:translateY(20px);opacity:1}


.dark{background-color:#1b222d;color:#c2ccde}
.dark .pwdBottom view{color:#c2ccde}
.dark .toast{color:#c2ccde}
.dark .pwdBox text{border:1px solid #c2ccde}
.dark .pwdBox text.on{background-color:#c2ccde;}
.dark .toast-title {color: #C2CCDE;}
</style>

