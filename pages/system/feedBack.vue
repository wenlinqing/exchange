<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav :title="$lang.system.feedTitle"></topNav>
	<view style="padding: 30px 20px;">
		<view class="feedItem">
			<view class="itemTt">{{$lang.system.feedFromN1}}</view>
			<input type="text" v-model.trim="fedObj.callName" :placeholder="$lang.system.feedFromN1" placeholder-class="placeInput"/>
		</view>
		<view class="feedItem">
			<view class="itemTt">{{$lang.system.feedFromN2}}</view>
			<input type="number" :placeholder="$lang.system.feedFromHolder1" v-model.trim="fedObj.mobile" placeholder-class="placeInput"/>
			<input type="text" :placeholder="$lang.system.feedFromHolder2" v-model.trim="fedObj.email" placeholder-class="placeInput"/>
		</view>
		<view class="feedItem">
			<view class="itemTt">{{$lang.system.feedFromN3}}</view>
			<view class="flex flexbetween selectBox" @click="$refs.bottomSel.open()">
				<view class="noChose" v-if="value==''">{{$lang.system.quests}}</view>
				<view class="chose"  v-else>{{selObj[value-1].text}}</view>
				<text class="iconfont icon-xiangyoujiantou"></text>
			</view>
		</view>
		<view class="feedItem">
			<view class="itemTt">{{$lang.system.feedFromN4}}</view>
			<textarea :adjust-position="false" :placeholder="$lang.system.feedFromHolder3" v-model.trim="fedObj.question" placeholder-class="placeInput"></textarea>
		</view>
		
		<view class="btnLight" style="width: 100%;" @click="submit">{{$lang.system.feedBtn}}</view>

	</view>
	
	<bottom-select ref="bottomSel" :value="value" :cancelLight="true" :items="selObj" @callBack="callback"></bottom-select>
</view>
</template>

<script>
	import bottomSelect from '../component/bottomSelect.vue'
	export default {
		components:{bottomSelect},
		data() {
			return {
				title: 'Hello',
				selObj:[
					{value:1,text:this.$lang.system.ques1},
					{value:2,text:this.$lang.system.ques2},
					{value:3,text:this.$lang.system.ques3},
					{value:4,text:this.$lang.system.ques4},
					{value:5,text:this.$lang.system.ques5},
				],
				value:'',
				fedObj:{
					callName:'',
					mobile:'',
					email:'',
					question:'',
					type:'',
				}
			}
		},
		onLoad() {
			
		},
		methods: {
			submit(){
				if(!this.isNetWork()) return
				
				if(this.fedObj.callName==''){
					uni.showToast({
						title:this.$lang.system.err1,
						icon:"none"
					})
					return
				}
				if(this.fedObj.email==''){
					uni.showToast({
						title:this.$lang.system.err2,
						icon:"none"
					})
					return
				}
				if(this.fedObj.question==''){
					uni.showToast({
						title:this.$lang.system.err3,
						icon:"none"
					})
					return
				}
				uni.showLoading({title: this.$lang.common.waiting,mask:true});
				this.$request({
					url: '/v2/s/workIssue/addWorkIssue',
					data:this.fedObj,
					method:'POST',
				}).then(res=>{
					uni.hideLoading();
					uni.showToast({
						title:this.$lang.system.feedSuc,
						duration:1500
					})
					setTimeout(()=>{
						this.goBack()
					},1500)
				}).catch(error=>{
					uni.hideLoading();
					uni.showToast({
						title:error.errmsg,
						duration:1500,
						icon:"none"
					})
				});
			},
			callback(type){
				this.value=type
				this.fedObj.type=type
				this.$forceUpdate()
				// console.log("getStorageSync('isOnline')==sssss",uni.getStorageSync('isOnline'))
			},
		}
	}
</script>

<style scoped>
	.feedItem{margin-bottom: 20px;}
	.itemTt{font-weight: 500;}
	.feedItem input,.selectBox{height: 50px;width: 100%;border-bottom: 1px solid #E5E5E5;font-size: 34rpx;}
	.selectBox text,.selectBox view.noChose{color: #999;}
	.feedItem textarea{border: 1px solid #E5E5E5;width: 100%;border-radius: 5px;margin-top: 10px;padding:10px;}
	.btnLight{margin-top: 50px;}
	.placeInput {color:#C5CFD5;}
	
	.dark .placeInput,.dark .selectBox .noChose {color: #3F506E !important;}
	.dark .feedItem input,.dark textarea, .dark .chose{color: #C5CFD5 !important;}
	.dark {background-color: #1B222D;color: #6F7F9B;}
	.dark .itemTt {color: #C5CFD5;}
	.dark input,.dark .selectBox {border-bottom: 1px solid #283752;color: #3F506E;}
	.dark textarea {border: 1px solid #283752;}
</style>
