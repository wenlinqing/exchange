
var netWork={
	data(){
		return {
			netWork:false,
		}
	},
	onShow(){
		// #ifdef H5
		this.netWork=navigator.onLine
		// #endif
		
		// #ifdef APP-PLUS
		var that=this;
		// 获取当前网络状态
		uni.getNetworkType({
			success: (res) => {
				if(res.networkType=='none'){ 
					that.netWork=false;
				}else{
					that.netWork=true;
				}
			}
		})
		
		// 监听网络状态变化
		uni.onNetworkStatusChange((res)=>{
			if(!res.isConnected){
				that.netWork=false;
				// uni.showToast({
				// 	icon:"none",
				// 	title: '您目前处于断网状态',
				// });
			}else{
				that.netWork=true
			}
		})
		// #endif
	},
	methods:{
		isNetWork(){
			if(this.netWork){
				return true
			}else{
				uni.showToast({
					title:this.$lang.chkNet,
					duration:1500,
					icon:'none'
				})
				return false
			}
		},
		linkTo(url,check=false,isLogin=true){
			if(isLogin&&!this.netWork){
				uni.showToast({
					title:this.$lang.chkNet,
					duration:1500,
					icon:'none'
				})
				return false
			}
			if(isLogin && !this.$store.state.hasLogin){// 需要登陆 并且 没登入
				// uni.showToast({
				// 	title:'请登录',
				// 	duration:1500,
				// 	icon:'none'
				// })
				uni.navigateTo({
					url:'/pages/component/login'
				})
				return
			}
			if(check){
				if(this.isNetWork()){
					uni.navigateTo({
						url:url
					})
				}
			}else{
				uni.navigateTo({
					url:url
				})
			}
		}
	}
}

export{
	netWork
}



