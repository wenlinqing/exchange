<template>
<view>
	<view :class="['fixed',getTheme]" :style="'height:'+statusBar+'px;background:'+background"></view>
	<view :style="'height:'+statusBar+'px'"></view>
</view>
</template>
<script>
	export default {
		props:{
			background:{
				type:String,
				default:''
			}
		},
		created() {
			// console.log('this.statusBar',this.statusBar)
		}
	}
</script>
<style scoped></style>