<template>
    <view>
        <web-view :webview-styles="webviewStyles" src="https://darkchain.plus/"></web-view>
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
                }
            }
        }
    }
</script>