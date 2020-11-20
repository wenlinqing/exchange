<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.system.netWork"></topNav>
	
	<view class="content">
		<view class="flex flexbetween flex_ac" :class="{on:aisle===$lang.system.net1}" @click="chooseFun($lang.system.net1)">{{$lang.system.net1}} <label></label></view>
		<view class="flex flexbetween flex_ac" :class="{on:aisle===$lang.system.net2}" @click="chooseFun($lang.system.net2)">{{$lang.system.net2}} <label></label></view>
		<view class="flex flexbetween flex_ac" :class="{on:aisle===$lang.system.net3}" @click="chooseFun($lang.system.net3)">{{$lang.system.net3}} <label></label></view>
		<view class="flex flexbetween flex_ac" :class="{on:aisle===$lang.system.net4}" @click="chooseFun($lang.system.net4)">{{$lang.system.net4}} <label></label></view>
		<view class="flex flexbetween flex_ac" :class="{on:aisle===$lang.system.net5}" @click="chooseFun($lang.system.net5)">{{$lang.system.net5}} <label></label></view>
	</view>
</view>
</template>
<script>
    export default {
        data() {
            return {
                aisle:'',
            }
        },
		onShow() {
			this.aisle=uni.getStorageSync('aisle')||this.$lang.system.net1
		},
		methods:{
			chooseFun(text){
				this.aisle=text
				uni.setStorageSync('aisle',text)
			}
		}
    }
</script>
<style scoped>
	.content .flex{height: 55px;border-bottom: 1px solid #F1F2F5;}
	.content .flex.on label{width: 10px;height: 10px;border-radius: 50%;background-color: #15B383;}
	
	.dark .content .flex{border-color: #283752;}
	.dark .content .flexbetween {color: #C5CFD5;}
</style>
