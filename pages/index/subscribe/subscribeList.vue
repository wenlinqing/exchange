<template>

<view class="minHeight">
	<status-bar ></status-bar>
	<topNav :title="$lang.subscribe.subList"></topNav>
    <view class="listBox">
        <view class="li_item" v-for="item,index in list" :key="index">
            <view class="flex flexbetween">
                <label>{{$lang.subscribe.subLi1}}</label>
                <view>{{item.subscribeNum}}</view>
            </view>
            <view class="flex flexbetween">
                <label>{{$lang.subscribe.subLi2}}</label>
                <view>{{item.subscribeMode}}</view>
            </view>
            <view class="flex flexbetween">
                <label>{{$lang.subscribe.subLi3}}</label>
                <view>{{item.income}} fil</view>
            </view>
            <!-- <view class="flex flexbetween">
                <label>{{$lang.subscribe.subLi4}}</label>
                <view>{{item.type==1?'5金豆种子 / 2T':item.type==1?'260USDT / T':'1688RMB / T'}}</view>
            </view> -->
            <view class="flex flexbetween">
                <label>{{$lang.subscribe.subLi5}}</label>
                <view>{{item.status}}</view>
            </view>
            <view class="flex flexbetween">
                <label>{{$lang.subscribe.subLi6}}</label>
                <view>{{item.discount==100?'无':item.discount/10+'折'}}</view>
            </view>
            <view class="flex flexbetween">
                <label>{{$lang.subscribe.subLi7}}</label>
                <view>{{formatDate(item.createTime,'hh:mm MM/dd')}}</view>
            </view>
        </view>
    </view>

	<noData v-if="list.length==0"></noData>
	
	<upTop :display="upTop" bottom="50"><!-- upTop 混入变量 --></upTop>
</view>
</template>

<script>

export default {
  name: 'subscribeList',
  data () {
    return {
      list:[]
    }
  },
  mounted(){
	  uni.showLoading({mask:true});
	  this.$request({
	  	url: '/v2/s/ipfsRecord/queryIpfsList',
	  	current:1,
	  	size:50
	  }).then(res=>{
		uni.hideLoading();
	  	this.list=res.data.records
	  }).catch(error=>{
		uni.hideLoading();
	  });
  },
  created(){
    
  },
  methods:{
   
  }
}



</script>
<style scoped>
    .listBox{padding:15px;}
    .li_item{margin-bottom: 10px;padding: 10px 10px;border-radius: 5px;background: #F7F7FB url(../../../static/zhang.png) no-repeat 95% 95% ;background-size: 130px;}
    .li_item view{height: 40px;}
    .li_item view label{color: #8C9FAD;}
    .li_item view view{color: #172841;}
</style>