<template>
	<view :class="{'container': true,'out': !custom}">
		<slot name="icon"></slot>
		<slot name="title" class="title"></slot>
		<slot name="content"></slot>
	</view>
</template>

<script>
	export default {
		externalClasses: ['cell1-class','cell2-class'],
		props: {
			'custom': {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.out {
	margin: 0 16px;
}
.container {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	background-color: #fff;
	justify-content: space-between;
}
</style>
