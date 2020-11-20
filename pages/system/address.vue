<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.system.address"></topNav>
	<view style="padding-left: 15px;padding-right: 15px;" >
		
		<view class="searchBox flex_ac" style="margin-top: 20px;">
			<view class="iconfont icon-search" style="font-size: 20px;"></view>
			<input class="input" @input.trim="inputFun" type="text" v-model="value" :placeholder="$lang.system.schTxt" confirm-type="search" placeholder-style="color:#C5CFD5"/>
		</view>
		
		<!-- <view v-if="addrList.length==0" class="noDate flex flexColumn flexcenter" style="min-height: 80vh;">
			<image src="../../static/noAdr.png" mode="widthFix"></image>
			<view>暂无地址</view>
		</view> -->
		<noData v-if="addrList.length==0"></noData>
		
		<block v-else>
			<view v-for="(item,index) in addrList" :key="index" class="adressList" @click="selectAddr(index)">
				<view class="adrName flex flexbetween">
					<view class="adrLt flex flex_ac">
						<!-- <image :src="'../../static/'+ item.icon +'.png'" mode="widthFix" style="width: 22px;height: 22px;"></image> -->
						<view class="userName">{{item.name}}</view>
						<!-- <label v-if="item.def">常用</label> -->
					</view>
					<image src="../../static/edit2.png" @click.stop="navigateToEdit(index)" mode="widthFix" style="width: 28rpx;height: 28rpx;"></image>
					
				</view>
				<view class="adrKey">
					{{item.addr}}
				</view>
			</view>
		</block>
		<!-- <view class="adressList">
			<view class="adrName flex flexbetween">
				<view class="adrLt flex flex_ac">
					<image src="../../static/coin1.png" mode="widthFix"></image>
					<view class="userName">用户名</view>
					<label>常用</label>
				</view>
				<view class="editBtn iconfont icon-edit"></view>
			</view>
			<view class="adrKey">
				0x7852991dc7e54ce5fadada3fc91b1812d04949aa
			</view>
		</view> -->
		<view style="height: 110rpx;"></view>
		<view class="fixed_bottom" style="padding:30rpx 15px;">
			<view class="btnLight" style="width: 100%;border-radius: 5px;" @click="showIf=true">{{$lang.system.addTxt}}</view>
		</view>
		
		<Keyboard :cssStatic="getTheme" :show="showIf" ref="keyboard" :success="checkResult" @hideKey="hidekeyboard" @getPassword="getPassword"></Keyboard>
	</view>
</view>
</template>

<script>
import Keyboard from "../../components/custom-keyboard/custom-keyboard.vue"
export default {
	components:  {Keyboard},
	data() {
		return {
			value:'',
			addrList: [],
			addrListBak: [],
			showIf: false,
			checkResult: true,
		}
	},
	onLoad(options) {
		this.type = options.type || undefined
	},
	onShow(){
		uni.removeStorage("editAdrObj")
		this.getList()
	},
	methods: {
		hidekeyboard() {
			this.showIf = false;
			this.$refs.keyboard.clear()
		},
		getPassword(e) {
			if(e.msg=='success'){
				this.hidekeyboard()
				setTimeout(() => {
					uni.navigateTo({
						url:"/pages/system/addAdr"
					})
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
				data:{},
				method:'POST',
			}).then(res=>{
				this.addrList=res.data
				this.addrListBak=res.data
			}).catch(error=>{
				console.log(error);
			});
		},
		inputFun(e){
			var value=e.detail.value.trim().toString().toLocaleLowerCase()
			if(value!=''){
				var addrList = []
				this.addrListBak.forEach(item=>{
					var name=item.name.toString().toLocaleLowerCase()
					// console.log(name)
					if(name.indexOf(value)>=0){
						addrList.push(item)
					}
				})
				this.addrList = addrList
			}else{
				this.addrList = this.addrListBak
			}
			// console.log(this.addrList,'this.addrList')
		},
		navigateToEdit(index) {
			uni.setStorage({
				key:'editAdrObj',
				data:JSON.stringify(this.addrList[index])
			})
			uni.navigateTo({
				url: '/pages/system/editAddr'
			})
		},
		selectAddr(index){
			if(this.type){
				uni.setStorageSync('sendAddr',this.addrList[index].addr)
				uni.navigateBack()
			}
		}
	}
}
</script>

<style scoped>
	.topBoxer{z-index: 99;}
	.topBoxer image{width: 20px;}
	.topBoxer .goback{height: 40px;}
	.topBoxer .back{width: 10px;}
	.adressList{border-bottom: 1px solid #E5E5E5;padding:30rpx 0;}
	.adrName{margin-bottom: 10px;}
	.adrName image{width: 30px;}
	.adrLt view{font-weight: 500;font-size: 26rpx;}
	.adrLt label{font-size: 20rpx;color: #1295FF;border: 1px solid #F1F2F5;border-radius: 20px;padding:0 5px;}
	.editBtn{font-size: 22px;text-align: right;color: #999;}
	.adrLt .userName {font-size: 30rpx;}
	.adrKey {text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;
	display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;color: #8C9FAD;}
	.icon-search {margin-right: 16px;margin-left: 16px;}
	
	.searchBox {overflow:hidden;margin-bottom:20px;background-color:#F1F2F5;border-radius:25px;}
	/* .searchBox view {width:50px;height:45px;font-size:20px;color:#999;z-index:9;} */
	.searchBox input {height:45px;width: 80%;}
	
	
	.dark .searchBox {background-color: #202939;}
	/* .dark {background-color: #1B222D;color: #6F7F9B;} */
	.dark .userName {color: #C2CCDE !important;}
	.dark .adressList {border-bottom: 1px solid #6F7F9B; color: #6F7F9B;}
	.dark .iconfont {color: #6F7F9B !important;}
	.dark .input {background-color: #202939;color: #C5CFD5;}
	
</style>
