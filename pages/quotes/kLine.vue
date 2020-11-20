<template>
	<view>
		<!-- <status-bar ></status-bar> -->
		<web-view :src="url" @message="message"></web-view>
	</view>
</template>
<script>
export default {
	data() {
		return { 
			// url: '/hybrid/html/local.html?',
			url: 'https://darkchain.plus/tv/html/local.html?'
			// url: 'https://darkchain.mojivip.com/tv/html/local.html?'
		};
	},
	onLoad(e) {
		let list = uni.getStorageSync('favoritesAreaList') || []
		let favo = 0
		for(let i of list){
			if(i.name == e.coinName){
				favo = 1
			}
		}
		let lang = uni.getStorageSync("languageKey")||'zh'
		let str = `&change=${e.change}&price=${e.price}&cnyPrice=${e.cnyPrice}&volume=${Math.round(e.volume)}&high=${e.high}&low=${e.low}`
		this.url = this.url + 'statusBar=' + this.statusBar + '&lang=' + lang + '&coinName=' + e.coinName + '&favo=' + favo + str
	},
	methods: {
		message(event) {
			let name = event.detail.data[0].name;
			let areaName = event.detail.data[0].areaName;
			let list = uni.getStorageSync('favoritesAreaList') || [];
			let flag = false;
			for (let i=0;i<list.length;i++) {
				if (list[i].name == name) {
					console.log(list[i].name,name)
					flag = true;
					list.splice(i,1)
					uni.setStorageSync('favoritesAreaList',list)
					uni.showToast({
						title: this.$lang.quotes.favorFail,
						icon: "none"
					})
					break;
				}
			}
			if (!flag) {
				list.push({ areaName:areaName, name:name });
				uni.setStorageSync('favoritesAreaList', list);
				uni.showToast({
					title: this.$lang.quotes.favorSuc,
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style scoped>

</style>
