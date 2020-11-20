<template>
<view  style="min-height: 100vh;">
	<status-bar ></status-bar>
	<topNav :title="$lang.common.choseCoin"></topNav>
	
	<view class="coins" v-for="item,index in walletList" @click="chooseFun(item)" :key="index">{{item.name}}</view>
</view>
</template>

<script>
export default {
	data() {
		return {
			walletList:[],
		}
	},
	onShow() {
		this.$request({
			url: '/v2/w/tranfer/list',
			data:{},
		}).then(res=>{
			this.walletList=res.data
		}).catch(error=>{
			console.log(error);
		});
	},
	methods: {
		chooseFun(item){
			uni.setStorage({
				key:'transferCoin',
				data:JSON.stringify(item)
			})
			this.goBack()
		}
	}
}
</script>

<style scoped>
	.coins{font-weight: 500;}
	
</style>
