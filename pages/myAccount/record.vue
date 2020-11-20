<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<!-- <topNav :title="businessType=='recharge'?'充值记录':businessType=='withdraw'?'提币记录':'划转记录'"></topNav> -->
	<topNav :title="$lang.transfer.listTitle"></topNav>

	<view class="recordBox" style="padding:0 15px">
		<view class="coinList liBox" v-for="item,index in list" :key="index" @click="goMore(item)">
			<view class="coin_N flex flexbetween">
				{{item.businessTypeStr}}
			</view>
			<view class="flex">
				<view class="flex1">
					<view class="tt">{{$lang.transfer.li1}}（{{item.coinName}}）</view>
					<view class="num">{{item.amount}}</view>
				</view>
				<view class="flex1">
					<view class="tt">{{$lang.transfer.li2}}</view>
					<view class="num">{{item.status==0?$lang.transfer.statue0:item.status==1?$lang.transfer.statue1:$lang.transfer.statue2}}</view>
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
			businessType:'',
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
	onLoad(options) {
		this.businessType=options.businessType
	},
	onReachBottom() {
		if(this.current<this.pages){
			this.current+=1
			this.getList()
		}
	},
	methods: {
		getList(){
			uni.showLoading({mask:true});
			this.$request({
				url: '/v2/s/accountDetail/otherRecord',
				data:{
					businessType:this.businessType,//account_active：激活、tranfer_amount：划转
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
			this.linkTo('/pages/myAccount/record_detail?businessType='+this.businessType, false);
		}
	}
}
</script>

<style scoped>
	.content image{width: 100%;}
	.dark .recordBox .coinList.liBox {background-color: inherit;}
	.dark .recordBox .coinList.liBox .coin_N {color: #C5CFD5;}
</style>
