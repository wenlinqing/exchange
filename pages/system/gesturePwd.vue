<template>
	<view style="height: 100vh;overflow: hidden;" :class="getTheme">
		<status-bar ></status-bar>
		<topNav :title="$lang.system.gesture" v-if="lockType!=1"></topNav>
		<view class="lock-tips">
			<view class="big-tips" :style="[needAuthenticate&&!pwdError?{color:'#999999'}:needAuthenticate&&pwdError?{color:'#FF0000'}:{color:''}]">{{text}}</view>
			<view class="small-tips" v-if="lockType == 2 || (lockType == 3 && !needAuthenticate)">{{$lang.system.gestureTxt2}}</view>
		</view>

		<view class="container-lock">
			<mpvue-gesture-lock ref="mpvueGestureLock" :containerWidth="screenWidth" :cycleRadius="30" @end="onEnd" :password="password"></mpvue-gesture-lock>
		</view>
		<view class="container-confirm" v-if="showLockConfirm">
			<view class="lock-reset" @click="resetLock">{{$lang.system.gesBtn1}}</view>
			<view :class="[confirmEnable?'':'disable-confirm']" @click="lockConfirm">{{$lang.system.gesBtn2}}</view>
		</view>
	</view>
</template>

<script>
	
	import mpvueGestureLock from '../component/mpvueGestureLock/gestureLocker.vue';
	

	export default {
		components: {
			mpvueGestureLock
		},
		data() {
			return {
				password: [],
				text: this.$lang.system.gestureTxt1,
				screenWidth: '', //屏幕宽度
				screenHeight: '', //屏幕高度
				showLockConfirm: false, //是否显示确认
				confirmEnable: false, //是否确认可点击
				lockType: '', //手势锁认证类型（1-解锁、2、注册、3-修改）
				serverPwd: '', //用以验证的密码
				needAuthenticate: false, //是否需要认证（解锁、修改需要和设定好的密码做认证）
				pwdError: false, //手势认证是否通过
				errorTimes: 0, //认证失败次数(限制)
				maxErrorTimes: 5, //最多可以失败几次
				backNum: 0,
			}
		},
		onLoad(options) {
			this.getScreenHeight();
			this.lockType = options.lockType;
			// console.log(options)
			this.serverPwd = options.pwd || uni.getStorageSync('gesturePwd') || undefined;
			// console.log("type：" + this.lockType + ";pwd:" + this.serverPwd);

			if (this.lockType == 1) {
				this.text = this.$lang.system.gesNotice1;
				this.needAuthenticate = true;
				this.password = uni.getStorageSync('gestruePwd')
				// console.log("need:" + this.needAuthenticate + ";error:" + this.pwdError);
			} else if (this.lockType == 2) {
				this.text = this.$lang.system.gestureTxt1;
			} else if (this.lockType == 3) {
				this.text = this.$lang.system.gesNotice1;
				this.needAuthenticate = true;
			}
		},
		methods: {
			/* 测量屏幕高度，固定手势锁位置 */
			getScreenHeight() {
				//测量屏幕宽度（得到的是px单位）
				const deviceInfo = uni.getSystemInfoSync();
				// console.log("设备信息：" + JSON.stringify(deviceInfo));
				this.screenWidth = deviceInfo.screenWidth;
				// console.log("屏幕宽高：（" + this.screenWidth + ";" + this.screenHeight + ")");
			},
			onEnd(data) {
				if (this.password.length) {
					/* ***********二次认证*********** */
					if (this.lockType == 1) {
						//1、登录
						// console.log("认证失败次数1：" + this.errorTimes);
						if(this.password.join('')==data.join('')){
							uni.reLaunch({
								url: '../index/index'
							})
						}
						this.overFailedTimes();
					} else if (this.lockType == 2) {
						//2、注册
						this.secondDraw(data);
					} else if (this.lockType == 3) {
						//3、修改-重新设置
						this.secondDraw(data);
					}
				} else {
					/* ************首次绘制************ */
					this.password = data;
					if (this.lockType == 1) {
						//1、登录
						// console.log("认证失败次数1：" + this.errorTimes);
						if (!this.overFailedTimes()) {
							//解锁
							// console.log("密码：" + this.password.join(''));
							if ((this.password.join('')) == this.serverPwd) {
								this.text = this.$lang.system.lockSuc;
								this.needAuthenticate = false;
								setTimeout(function() {
									uni.switchTab({
										url: '../index/index'
									});
								}, 500);
							} else {
								this.certificationFailed();
							}
							this.password = [];
						}
					} else if (this.lockType == 2) {
						//2、注册
						this.firstDraw();
					} else if (this.lockType == 3) {
						//3、修改密码
						if (this.needAuthenticate) {
							// console.log("认证失败次数1：" + this.errorTimes);
							if (!this.overFailedTimes()) {
								//修改需要先认证
								// console.log("修改-密码认证：" + this.password.join(''));
								if ((this.password.join('')) == this.serverPwd) {
									uni.showToast({
										title: this.$lang.system.gesOk,
										icon: "success",
										duration: 500
									});
									this.text = this.$lang.system.gesOk;
									this.pwdError = false;

									setTimeout(res => {
										this.text = this.$lang.system.gestureTxt1;
										this.needAuthenticate = false;
									}, 800);
								} else {
									this.certificationFailed();
								}
								this.password = [];
							}
						} else {
							//修改密码-第一次绘制(认证通过)
							this.firstDraw();
						}
					}
				}
			},
			/* 注册、修改-第一次绘制手势 */
			firstDraw() {
				if (this.lockType == 1) {
					// console.log("注册-绘制第一次");
				} else if (this.lockType == 3) {
					// console.log("修改密码-重新设置第一次");
				}
				if (this.password.length < 4) {
					this.text = this.$lang.system.gesNotice2;
					this.password = [];
				} else {
					this.text = this.$lang.system.gesNotice3;
					this.showLockConfirm = true;
				}
			},
			/* 注册、修改-第二次绘制手势 */
			secondDraw(pwdAgain) {
				if (this.lockType == 1) {
					// console.log("注册-绘制第二次");
				} else if (this.lockType == 3) {
					// console.log("修改密码-重新设置第二次");
				}

				if (this.password.join('') === pwdAgain.join('')) {
					this.text = this.$lang.system.gesNotice4;
					this.confirmEnable = true;
					// console.log("密码：" + JSON.stringify(this.password));

					// this.password = []
				} else {
					this.text = this.$lang.system.gesNotice;
					this.confirmEnable = false;
					this.password = []
				}
			},
			/* 检查认证错误次数 */
			overFailedTimes() {
				if (this.errorTimes > this.maxErrorTimes - 1) {
					uni.showModal({
						title: this.$lang.system.modelTitle,
						content: this.$lang.system.modelCont,
						showCancel: false,
						confirmText: this.$lang.system.confirm
					});
					this.password = [];
					return true;
				}
				return false;
			},
			/* 手势认证失败 */
			certificationFailed() {
				this.text = this.$lang.system.gesNO;
				this.pwdError = true;
				this.needAuthenticate = true;
				this.errorTimes++;
			},
			/* 确认手势密码 */
			lockConfirm() {
				if (this.confirmEnable == true) {
					uni.showToast({
						title: this.$lang.system.gesSuc,
						icon: 'none',
						duration: 1000
					});
					uni.setStorageSync('gestruePwd',this.password)
					uni.setStorageSync('turnOnGestrue', true)
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 500);
				} else {

				}
			},
			/* 重绘密码 */
			resetLock() {
				this.text = this.$lang.system.gestureTxt1;
				this.password = [];
				this.$refs.mpvueGestureLock.refesh();
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.lock-tips {
		height: 25%;
		margin: 0 !important;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		justify-content: center;
	}

	.big-tips {
		font-size: 32rpx;
		color: #333333;
		text-align: center;
		font-weight: 500;
	}

	.small-tips {
		font-size: 24rpx;
		color: #999999;
		text-align: center;
		font-weight: 500;
		margin-top: 20rpx;
	}

	.container-lock {
		background-color: #FFFFFF;
	}

	.container-confirm {
		display: flex;
		width: 100%;
		height: 16%;
		position: absolute;
		bottom: 0;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;

		view {
			color: #666666;
			font-size: 28rpx;
			font-weight: 500;
			text-align: center;
			flex: 1;
			width: 80%;
			margin: 0 5%;
			height: 100rpx;
			line-height: 100rpx;
			border: 1px solid #F0F0F0;
			border-radius: 50rpx;
		}

		.disable-confirm {
			color: #999;
			background-color: #F1F1F1;
		}
	}
	
	.dark {background-color: #1B222D !important;color: #C2CCDE !important;}
	.dark .big-tips {color: #C2CCDE;}
	.dark .container-lock{background-color: #1B222D;}
	.dark .container-confirm view{color: #C2CCDE;}
	.dark .container-confirm .disable-confirm {color: #666;background-color: #ccc;border: 1px solid #ccc;}
</style>
