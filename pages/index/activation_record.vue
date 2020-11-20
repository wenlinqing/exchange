<template>
<view class="minHeight">
	<status-bar ></status-bar>
	<topNav :title="$lang.transfer.listTitle"></topNav>

	<view class="recordBox" style="padding:0 15px">
		<view class="coinList liBox" v-for="item,index in list" :key="index" @click="goMore(item)">
			<view class="coin_N flex flexbetween">
				{{item.businessTypeStr}}
			</view>
			<view class="flex">
				<view class="flex1">
					<view class="tt">{{$lang.transfer.li1}}（DK）</view>
					<view class="num">{{item.amount}}</view>
				</view>
				<view class="flex1">
					<view class="tt">{{$lang.transfer.li2}}</view>
					<view class="num">{{$lang.transfer.statue3}}</view>
				</view>
				<view class="flex1 textR">
					<view class="tt">{{$lang.transfer.li3}}</view>
					<view class="num">{{formatDate(item.created,'hh:mm MM/dd')}}</view>
				</view>
				<view class="dot flexauto flex">
					<image src="../../static/dot.png" mode="widthFix" style="width: 3px;height: 18px;display: block;">
				</view>
			</view>
		</view>
		
		<noData v-if="list.length==0"></noData>
	</view>
	
	
	<upTop :display="upTop" bottom="50"><!-- upTop 混入变量 --></upTop>
</view>
</template>

<script>
export default {
	data() {
		return {
			list:[],
			pages:0,
			current:1,
		}
	},
	mounted(){
		this.getList()
	},
	onShow(){
		uni.removeStorage({
			key:'detailObj'
		})
	},
	onLoad() {
		
	},
	onReachBottom() {
		if(this.current<this.pages){
			this.current+=1
			this.getList()
		}
	},
	methods: {
		getList(){
			if(!this.isNetWork()) return
			uni.showLoading({mask:true});
			this.$request({
				url: '/v2/s/accountDetail/otherRecord',
				data:{
					businessType:'account_active',//account_active：激活、tranfer_amount：划转
					current:this.current,
					size:20,
				},
			}).then(res=>{
				uni.hideLoading();
				this.list.push.apply(this.list, res.data.records)
				this.pages=res.data.pages
			}).catch(error=>{
				uni.hideLoading();
				console.log(error);
			});
		},
		goMore(item){
			uni.setStorageSync('detailObj', JSON.stringify(item));
			this.linkTo('/pages/index/activation_record_detail', false);
		}
	}
}
</script>

<style scoped>
	.content image{width: 100%;}
</style>
