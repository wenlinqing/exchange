<template>
    <view>
        <view class="btn" @tap="toTop" :style="{'display':(!display? 'none':'block'),'bottom':bottom+'px'}">
            <image src="../../static/top.png" mode="widthFix" style="width: 90rpx;height: 90rpx;"></image>
        </view>
    </view>
</template>

<script>
    export default {
        name: "upTop",
		props:{
			display:{
				type:Boolean,
				default:false
			},
			bottom:{
				type:[Number,String],
				default:50
			}
		},
        methods: {
            // 返回顶部
            toTop() {
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 300,
                });
            },
            
        }
    }
</script>

<style scoped>
    .btn {
        position: fixed;
        z-index: 1;
        right: 16px;
        border-radius: 50%;
    }
</style>