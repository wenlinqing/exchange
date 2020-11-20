<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
		<!-- access_token={{userInfo.access_token}} -->
    </view>
</template>
<script>
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				url:''
            }
        },
		onLoad(){
			this.url='https://darkchain.plus/game/#/start?userid='+this.$store.state.userInfo.id
			// this.url='https://darkchain.mojivip.com/game/#/start?userid='+this.$store.state.userInfo.id
		},
		onShow() {
			// this.userInfo=this.$store.state.userInfo
		}
    }
</script>