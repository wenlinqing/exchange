<template>
<view style="height: 100vh;overflow: hidden;position: relative;">
	<status-bar background="#040717"></status-bar>
	<topNav bgColor="transparent" backIcon="white" :isToTop="true"></topNav>
	<image src="../../static/share2.png" mode="widthFix" style="width: 100%;display: block;"></image>
	<view class="save" @click="saveFun">{{$lang.index.share}}</view>
</view>
</template>
<script>
	export default {
		data() {
			return {
				imgSrc:require('../../static/share.png'),
			}
		},
		onLoad(){
			
		},
		methods: {
			saveFun(){
				var _self=this;
				uni.saveImageToPhotosAlbum({
					filePath: _self.imgSrc,
					success: function() {
						uni.showToast({
							title: _self.$lang.saveSuc,
							icon: "success"
						});
					},
					fail: function() {
						uni.showToast({
							title: _self.$lang.saveFail,
							icon: "none"
						});
					}
				})
			},
		}
	}
</script>

<style scoped>
	.save{width: 98px;height: 35px;line-height: 35px;text-align: center;position: absolute;top: 70%;left: 50%;margin-left: -50px;
	background: rgba(30, 224, 255, 0.2);border-radius: 4px;border: 1px solid #1EE0FF;color: #fff;font-size: 32rpx;z-index: 99;}
	
</style>
