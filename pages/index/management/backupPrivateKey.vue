<template>

<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav title="备份私钥"></topNav>
		<view class="top-wrap">
			<view style="width: 160px;display: flex;position: relative;">
				<view :class="['wrap', { active: active == 1 }]" @click="handleActive(1)">私钥</view>
				<view :class="['wrap', { active: active == 2 }]" @click="handleActive(2)">二维码</view>
				<view :class="active == 1 ? 'active1 line' : 'active2 line'"></view>
			</view>
		</view>
		<swiper :current="active - 1" @change="handleChange" style="height: 80vh;"><!-- :style="'height:calc(100vh - '+ (44+50+statusBarHeight+'px') +')'" -->
			<swiper-item>
				<view class="swiper-item">
					<view class="key-wrap">
						<text>{{del?key.slice(0,10)+"***"+key.slice(-10):key}}</text>
						<view class="eye" @click="showKey" v-if="del">
							<image src="../../../static/eyeClose.png" mode="widthFix" style="width: 32rpx;"></image>
						</view>
					</view>
					<view class="flex" style="margin:20px 0 40px;">
						<image src="../../../static/safe.png" mode="widthFix" style="width: 30rpx;margin-right: 5px;margin-top: 2px;"></image>
						<view style="color: #8C9FAD;font-size:26rpx;">掌握私钥就相当于拥有钱包的全部权限,请确保私钥得到妥善保管和安全传输</view>
					</view>
					<view class="btnLight" style="width: 100%;" @click="copyKey">复制私钥</view>
					<!-- <canvas style="width: 200px; height: 200px;" canvas-id="myQrcode"></canvas> -->
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="qrCode-wrap">
						<view class="qrCode" v-show="showCode">
							<canvas style="width: 200px; height: 200px;" canvas-id="myQrcode"></canvas>
						</view>
						<block v-if="!showCode">
							<view class="flexCC">
								<image src="../../../static/codeImg.png" style="width: 113px;height: 93px;"></image>
							</view>
							<view class="btnLight" style="width: 120px;"   @click="showQrCode">显示二维码</view>
						</block>
					</view>
					<view class="flex" style="margin-top:20px;">
						<!-- <text class="iconfont icon-safetycertificate-f" style="color:#8C9FAD;margin-top:2px;"></text> -->
						<image src="../../../static/safe.png" mode="widthFix" style="width: 30rpx;margin-right: 5px;margin-top: 2px;"></image>
						<view style="color: #8C9FAD;font-size:26rpx;">掌握私钥就相当于拥有钱包的全部权限,请确保私钥得到妥善保管和安全传输</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import drawQrcode from '../../../unit/weapp.qrcode.min.js'
export default {
	data() {
		return {
			screenHeight: 0,
			del: true,
			active: 1,
			key: '',
			showCode: false,
			walletItem:uni.getStorageSync('walletItem')?JSON.parse(uni.getStorageSync('walletItem')):{},
			qr:''
		};
	},
	mounted(){
		
	},
	onLoad(options){
		let {windowHeight} = uni.getSystemInfoSync()
		this.windowHeight = windowHeight
		this.key=this.walletItem.identity
		// this.key='fffffff'
	},
	methods: {
		handleActive(e) {
			this.active = e;
		},
		handleChange(e) {
			this.active = e.detail.current * 1 + 1;
		},
		showKey(){
			this.del = false
		},
		copyKey(){
			uni.setClipboardData({
				data: this.key,
				success:()=>{
					uni.showToast({
						title: '复制成功',
						icon: "none"
					})
				}
			})
		},
		showQrCode(){
			this.showCode = true
			setTimeout(()=>{
				drawQrcode({
				  width: 200,
				  height: 200,
				  canvasId: 'myQrcode',
				  text: this.walletItem.identity
				})
			},100)
		}
	},
	
};
</script>

<style>
.top-wrap {
	width: 100vw;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.wrap {
	height: 50px;
	width: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.line {
	position: absolute;
	bottom: 0;
	left: 0px;
	background-color: #1295ff;
	height: 2px;
	width: 80px;
}
.active1 {
	left: 0;
	transition: all 0.2s ease-in-out;
}
.active2 {
	left: 80px;
	transition: all 0.2s ease-in-out;
}
.active {
	color: #1295ff !important;
}
.btn {
	width: 590rpx;
	height: 88rpx;
	border-radius: 88rpx;
	margin: 50px auto 0;
}
.swiper-item {
	box-sizing: border-box;
	padding-top: 30px;
	padding-left: 20px;
	padding-right: 20px;
}
.key-wrap {
	width: calc(100vw - 40px);
	box-sizing: border-box;
	display: flex;
	border: 1px solid #F1F2F5;
	flex-wrap: wrap;
	padding: 10px 10px;
	word-break:break-all;
	/* height: 62px; */
	position: relative;
}
.eye {
	position: absolute;
	top: 0;
	right: 0;
	font-size: 18px;
	padding:15rpx 20rpx;
}
.qrCode-wrap {
	box-sizing: border-box;
	width: 260px;
	height: 260px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content:space-around;
	align-items: center;
	padding: 30px;
	box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
	border-radius: 4px;
}
.qrCode {
	width: 200px;
	height: 200px;
}
.qrbtn {
	height: 40px;
	width: 180px;
	border-radius: 40px;
}

.dark {color: #C2CCDE;}
.dark .wrap {color: #8C9FAD;}
.dark .key-wrap {border: 1px solid #283752;color: #8C9FAD;}
.dark .qrCode-wrap {background-color: #202939;}
</style>
