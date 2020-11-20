<script>
import Vue from 'vue'
export default {
	//App.vue
	onLaunch: function(option) {
		uni.getSystemInfo({
		success: function(e) {
				Vue.prototype.statusBar = e.statusBarHeight
			}
		})
		
		uni.getNetworkType({
			success: (res) => {
				if(res.networkType=='none'){ 
					this.$store.commit('setNetWork',false)
				}else{
					this.$store.commit('setNetWork',true)
				}
			}
		})
		if(uni.getStorageSync('turnOnGestrue')){
			uni.redirectTo({
				url: '/pages/system/gesturePwd?lockType=1'
			})
		}
		
	},
	onShow: function() {
		//#ifdef APP-PLUS
		this.$request({
			url: '/v2/s/config/checkVersion', //仅为示例，并非真实接口地址。
			data: {},
		}).then(result=>{
			// 整包更新
			if (result.data.versionCode > plus.runtime.versionCode) {
			// if (result.data.versionCode <= 11 ) {
				uni.showModal({
					title: "发现新版本",
					content: "确认下载更新",
					success: (res) => {
						if (res.confirm) {//当用户确定更新，执行更新
						    if(uni.getSystemInfoSync().platform=='android'){
								this.wgtUrl = result.data.url
								this.doUpData();
							}else {
								this.wgtUrl = result.data.iosUrl
								plus.runtime.openURL(this.wgtUrl)
							}
							
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				})
			} 
		}).catch(error=>{
			console.log(error);
		});
		//#endif 
	},
	onHide: function() {
		// console.log('App Hide');
	},
	methods:{
		doUpData() {
		uni.showLoading({
			title: '更新中……'
		})
		uni.downloadFile({//执行下载
			url: this.wgtUrl,
			success: downloadResult => {//下载成功
				if (downloadResult.statusCode === 200) {
					uni.showModal({
						title: '',
						content: '更新成功，确定现在重启吗？',
						confirmText: '重启',
						confirmColor: '#EE8F57',
						success: function(res) {
							if (res.confirm) {
								plus.runtime.install(//安装
									downloadResult.tempFilePath, {
										force: true
									},
									function() {
										// utils.showToast('更新成功，重启中');
										plus.runtime.restart();
									},
									function(e) {
										// utils.showToast('更新失败');
									}
								);
							}
						}
					});
				}
			},
			complete: () => {
				uni.hideLoading();
			}
		});
	}
	}
};
</script>
<style>
	@import url("./static/font/iconfont.css");
	@import url('./static/css/fontFace.css');
	view,page{box-sizing:border-box;font-size:28rpx;color: #172841;font-family: DIN-Medium, DIN;}
	::-webkit-scrollbar{display: none;background:transparent;}
	.bgfff {background-color:#fff;}
	.bgf5 {background-color:#f5f5f5;}
	.flex {display:flex;}
	.flexColumn {display: flex; flex-direction:column;}
	.flex_ac {display: flex; align-items:center;}
	.flexcenter {align-items:center;justify-content:center;}
	.flexbetween {display:flex;align-items:center;justify-content:space-between;}
	.flex_b {display: flex;justify-content: space-between;}
	.flexaround {display: flex;justify-content: space-around;}
	.fixed {position:fixed;top:0;width:100%;z-index:9;}
	.fixed_bottom {position:fixed;bottom:0;left:0;width:100%;z-index:100;}
	.fixed_center {position:fixed;top:50%;left:50%;width:100%;z-index:91;-webkit-transform:translate(-50%,-50%);}
	.flex1 {flex:1;}
	.flexauto {flex:0 0 auto;}
	.flexCC {display:flex;align-items:center;justify-content:center;}
	.btnLight {background-color:#1762E6;color:#fff;width:85vw;border-radius:5px;height:80rpx;line-height:80rpx;text-align:center;font-size:32rpx;}
	.paddingBox,.content {padding:20rpx 30rpx;}
	.minHeight{min-height: 100vh;}
	
	.noDate {text-align:center;padding:50px 0;}
	.noDate view{color:#C5CFD5;font-size:34rpx;}
	.noDate image {width:140px;margin-bottom:20px;}
	
	.flexEnd{justify-content: flex-end;}
	.textR{text-align: right;}
	.textC{text-align: center;}
	.txtEllip{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
</style>
<style lang="scss">
	@import "./static/themeCss/common.scss";
	@import "./static/themeCss/dark.scss";
	@import "./static/themeCss/light.scss";
</style>
