<template>
	<view class="container"><!-- :class="getThemeType" -->
		<status-bar background="#1295FF"></status-bar>
		<topNav bgColor="transparent" textColor="#fff" backIcon="white" title="会员码" :isToTop="true" style="color:#fff"></topNav>
		
		<view class="scanBG-wrap">
			<view class="flex" style="height: 60px;">
				<!-- <image :src="'../../../static/coin1.png'" class="icon"></image>
				<view style="font-size: 18px;font-weight: 600;color: #333333;">{{detailObj.coinName}}</view> -->
			</view>
			<view class="qrCode">
				<!-- <image :src="qr" mode="widthFix" style="width: 100%;"></image> -->
				<canvas style="width: 230px; height: 230px;" canvas-id="myQrcode"></canvas>
			</view>
			<view class="flex">
				<view class="address-text flex flex_ac">
					{{address|breviary(10)}}
					<image @click="copy(address)" src="../../static/copy3.png" mode="widthFix" style="width:16px;margin-left:5px;"></image>
				</view>
			</view>
		</view>
		<view class="button" @click="saveImage">保存地址</view>
		
		<canvas canvas-id="mycanvas" style="width: 350px;height: 470px;top: 10vh;position: fixed;left: -100vw;z-index:9;"></canvas>
		
	</view>
</template>

<script>
	import drawQrcode from '../../unit/weapp.qrcode.min.js'
	export default {
		data() {
			return {
				address: '',
				width:350,
				height:470,
				ewmUrl:'',
				imgurl:'',
			}
		},
		mounted(){
			setTimeout(()=>{
				var that=this;
				uni.canvasToTempFilePath({
					canvasId: 'myQrcode',
					width: 230,
					height: 230,
					success: (res) => {
						that.ewmUrl=res.tempFilePath
					},
					fail: () => {
						
					}
				});
			},1000)
			setTimeout(()=>{
				uni.hideLoading();
				this.canvasImage();
			},2000)
			
		},
		onLoad(options) {
			// this.actived=options.actived //https://192.168.1.31:8081/v2/w/address/getDefault
		},
		onShow(){
			uni.showLoading({
			    title: '请稍后'
			});
			this.$request({
				url: '/v2/w/address/getDefault',
				data:{},
			}).then(res=>{
				this.address=res.data.address
				drawQrcode({
				  width: 230,
				  height: 230,
				  canvasId: 'myQrcode',
				  text: this.address
				})
			}).catch(error=>{
				console.log(error);
			});
		},
		methods: {
			canvasImage(){
				var that=this;
				let myCanvas = uni.createCanvasContext('mycanvas', this); 
				const grd = myCanvas.createLinearGradient(0, 0, 0, this.height)
				grd.addColorStop(0, '#1295FF')
				grd.addColorStop(1, '#1762E6')
				
				myCanvas.setFillStyle(grd)
				myCanvas.fillRect(0, 0, this.width, this.height)
				myCanvas.draw()
				
				myCanvas.fillStyle = '#fff';
				
				myCanvas.font = `20px Arial`;//绘制文字
				myCanvas.fillText('会员码',130,40);
				
				myCanvas.drawImage('../../static/scanBG.png',20,70, 310, this.height*0.8);
				myCanvas.drawImage(that.ewmUrl,(this.width-this.width*0.6)/2, 125, this.width*0.6,this.width*0.6);
				
				// var coinName=this.detailObj.coinName
				// var lens=myCanvas.measureText(coinName).width+25+50
				// myCanvas.drawImage('../../../static/coin1.png',(this.width-lens)/2, 95,25,25);
				
				myCanvas.fillStyle = '#333';
				myCanvas.font = `16px Arial`;//绘制文字

				
				var txt1=this.address.substring(0,30);
				var txt2=this.address.substring(30);
				// console.log(txt1,txt2)
				myCanvas.fillText(txt1,40,405); 
				myCanvas.fillText(txt2,40,428); 

				
				//开始绘画，必须调用这一步，才会把之前的一些操作实施
				myCanvas.draw(true,()=>{
					uni.canvasToTempFilePath({
						canvasId: 'mycanvas',
						success: (res) => {
							// 在H5平台下，tempFilePath 为 base64
							this.imgurl = res.tempFilePath;
							uni.hideLoading();
						  },
						fail: () => {
							uni.showToast({
								title: '名片加载失败',
								duration: 2000 
							});
						}
					});
				});
				
			},
			saveImage(){
				uni.saveImageToPhotosAlbum({
					filePath: this.imgurl,//    图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
					success: () => {
						uni.showToast({
							title: '保存成功',
							duration: 2000,
							icon:'none'
						});
					},
					fail: () => {
						uni.showToast({
							title: '保存失败',
							duration: 2000 ,
							icon:'none'
						});
					}
				});
			},
		},
	}
</script>

<style>
.container{width:100vw;height:100vh;background:linear-gradient(180deg,#1295FF 0,#1762E6 100%);overflow: hidden;}
.back-icon{width:42px;height:44px}
.navibar{box-sizing:border-box;width:100vw;font-weight:600;height:44px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.text{font-size:18px;width:280px;display:flex;justify-content:center;align-items:center}
.scanBG-wrap{position:relative;margin:0 auto;width:315px;height:415px;top:15%;
background:url(../../static/scanBG.png) no-repeat;background-size:100% 100%}
.flex{width:100%;display:flex;justify-content:center;align-items:center}
.icon{width:24px;height:24px;margin-right:5px}
.qrCode{width:230px;height:230px;margin:0 auto}
.address-text{position:absolute;bottom:27px;font-size:16px;font-weight:400;margin:0 auto}
.button{font-weight:400;position:fixed;bottom:40px;left:80rpx;width:590rpx;display:flex;align-items:center;
justify-content:center;font-size:17px;color:#1762E6;background-color:#fff;height:44px;border-radius:5px}


.dark {color: #C2CCDE;}
.dark .navibar{color: #C2CCDE;}
.dark.container {background: linear-gradient(180deg, #1B222D 0%, #20304B 100%);}
.dark .scanBG-wrap{background-image:url(../../static/scanBG.png);}
.dark .button {background-color: #1295FF;color: #fff;}
</style>
