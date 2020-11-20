<template>
	<view class="boxer flex flexColumn">
		<view class="pwdTop flex1 flex flexcenter flexColumn">
			<!-- <image src="../../../static/icon.png"></image> -->
			<view style="color:#fff">{{step==1?$lang.setPwd:$lang.setPwdAgain}}</view>
			<view class="pwdBox flex">
				<text :class="curPwd.length>=1?'on':''"></text>
				<text :class="curPwd.length>=2?'on':''"></text>
				<text :class="curPwd.length>=3?'on':''"></text>
				<text :class="curPwd.length>=4?'on':''"></text>
				<text :class="curPwd.length>=5?'on':''"></text>
				<text :class="curPwd.length>=6?'on':''"></text>
			</view>
			<!-- {{JSON.stringify(password)}}{{JSON.stringify(curPwd)}} -->
			<!-- <uni-badge text="1"></uni-badge><uni-icons type="contact" size="30"></uni-icons> -->
		</view>
		<view class="pwdBottom flex" >
			<view @click="chooseNum(1)">1</view>
			<view @click="chooseNum(2)">2</view>
			<view @click="chooseNum(3)">3</view>
			<view @click="chooseNum(4)">4</view>
			<view @click="chooseNum(5)">5</view>
			<view @click="chooseNum(6)">6</view>
			<view @click="chooseNum(7)">7</view>
			<view @click="chooseNum(8)">8</view>
			<view @click="chooseNum(9)">9</view>
			<view @click="cancelFun" style="font-size:32rpx">{{$lang.btnCancel}}</view>
			<view @click="chooseNum(0)">0</view>
			<view class="cancelBtn" @click="delFun" style="font-size:28rpx">{{$lang.deletes}}</view>
		</view>
		
		<!-- <uni-popup ref="popup" type="message"><uni-popup-message type="error" message="2次密码输入不一致" :duration="1000"></uni-popup-message></uni-popup> -->
		<!-- <uni-popup ref="sucPopup" type="message"><uni-popup-message type="success" message="钱包创建成功" :duration="1500"></uni-popup-message></uni-popup> -->
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {mnemonic} from '../../unit/mnemonic.js'
	export default {
		data() {
			return {
				type: 'set',
				password:[],
				curPwd:[],
				step:1,
				mnemonic:null
			}
		},
		onLoad(params) {
			this.way=params.way
		},
		mounted(){
			if(this.way==1){
				this.mnemonic=mnemonic
			}
		},
		methods: {
			...mapMutations(['loginAction']),
			chooseNum(num){
				if(this.curPwd.length<=6&&this.step==1){
					this.curPwd.push(num)
					if(this.curPwd.length==6){
						this.password=this.curPwd
						this.step=2
						this.curPwd=[]
					}
				}else if(this.curPwd.length<6){
					this.curPwd.push(num)
				}
				this.$forceUpdate()
				if(this.password.length==6&&this.curPwd.length==6&&(JSON.stringify(this.password)!=JSON.stringify(this.curPwd))){
					var that=this
					// this.$refs.popup.open()
					this.curPwd=[]
					return
				}
				if(this.password.length==6&&this.curPwd.length==6&&(JSON.stringify(this.password)==JSON.stringify(this.curPwd))){
					// this.$refs.sucPopup.open()

					uni.setStorage({
						key: 'startPassWord',
						data: this.password.join('')
					})
					if(this.isNetWork()){
						if(this.way==1){
							
						}else{
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					}else{
						setTimeout(function(){
							uni.reLaunch({
								url: '/pages/index/index'
							})
						},500)
					}
					
				}
			},
			delFun(){
				this.curPwd.pop()
			},
			cancelFun(){
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
	.boxer{background-color: #1762E6;height: 100vh;}
	.pwdTop {color: #fff;font-size: 28rpx;}
	.pwdBox{height: 30rpx;margin-top: 50px;}
	.pwdBox text{width: 30rpx;height: 30rpx;border:1px solid rgba(255,255,255,.5);border-radius: 50%;margin:0 8px;background-color: rgba(255,255,255,.1);}
	.pwdBox text.on{background-color: #fff;border:1px solid #fff;}
	.pwdBottom{flex-wrap: wrap;}
	.pwdBottom view{width: 33.33%;text-align: center;color: #fff;font-size: 38rpx;height: 130rpx;line-height: 130rpx;}
	
	
</style>
