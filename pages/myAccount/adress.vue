<template>
<view  style="min-height: 100vh;" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="coinName+' '+$lang.system.formN2"></topNav>

	<view class="content">
		<!-- <view v-if="addrList.length==0" class="noDate flex flexColumn flexcenter" style="min-height: 80vh;">
			<image src="../../static/listNo.png" mode="widthFix"></image>
			<view>暂无地址</view>
		</view> -->
		<noData :theme="getTheme" v-if="addrList.length==0" style="min-height: 80vh;"></noData>
		<block v-else>
			<view v-for="(item,index) in addrList" :key="index" class="adressList" @click="selectAddr(item.addr)">
				<view class="adrName flex flexbetween">
					<view class="adrLt flex flex_ac">
						<view class="userName">{{item.name}}</view>
					</view>
					<image src="../../static/edit2.png" @click.stop="navigateToEdit(item)" mode="widthFix" style="width: 28rpx;height: 28rpx;"></image>
					
				</view>
				<view class="adrKey">
					{{item.addr}}
				</view>
			</view>
		</block>
	</view>
	
	<view style="height: 100rpx;"></view>
	<view class="withBottom fixed_bottom">
		<view class="outBtn" style="background-color: #1762E6;" @click="showIf=true">{{$lang.system.addTxt}}</view>
	</view>
	
	<Keyboard cssStatic="white" :show="showIf" ref="keyboard" :success="checkResult" @hideKey="hidekeyboard" @getPassword="getPassword"></Keyboard>
</view>
</template>

<script>
	import Keyboard from "../../components/custom-keyboard/custom-keyboard.vue"
export default {
	components:  {Keyboard},
	data() {
		return {
			showIf: false,
			checkResult: true,
			addrList: [],
			coinId:'',
			coinName:'',
		}
	},
	onShow() {
		uni.removeStorage("editAdrObj")
		this.getList()
	},
	onLoad(options) {
		this.coinName = options.coinName || undefined
		this.coinId = options.coinId || undefined
	},
	methods: {
		selectAddr(addr){
			uni.setStorageSync('selectAddr',addr)
			this.goBack()
		},
		hidekeyboard() {
			this.showIf = false;
			this.$refs.keyboard.clear()
		},
		getPassword(e) {
			if(e.msg=='success'){
				this.hidekeyboard()
				setTimeout(() => {
					this.linkTo('/pages/myAccount/adressNew?type=add&coinId='+this.coinId,true)
				}, 200);
			}else{
				this.checkResult = false;
				this.$refs.keyboard.clear();
				setTimeout(() => {
					this.checkResult = true;
				}, 600);
			}
		},
		getList(){
			this.$request({
				url: '/v2/s/user/wallet/queryList',
				data:{
					coinId:this.coinId
				},
				method:'POST',
			}).then(res=>{
				this.addrList=res.data
			}).catch(error=>{
				console.log(error);
			});
		},
		navigateToEdit(item) {
			uni.setStorage({
				key:'editAdrObj',
				data:JSON.stringify(item)
			})
			this.linkTo('/pages/myAccount/adressNew?type=edit&coinId='+item.coinId,true)
		},
	}
}
</script>

<style scoped>
	.adressList{border-bottom: 1px solid #E5E5E5;padding:30rpx 0;}
	.adrName{margin-bottom: 10px;}
	.adrName image{width: 30px;}
	.adrLt view{font-weight: 500;font-size: 26rpx;}
	.adrLt label{font-size: 20rpx;color: #1295FF;border: 1px solid #F1F2F5;border-radius: 20px;padding:0 5px;}
	.editBtn{font-size: 22px;text-align: right;color: #999;}
	.adrLt .userName {font-size: 30rpx;}
	.adrKey {text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;
	display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;color: #8C9FAD;}

</style>
