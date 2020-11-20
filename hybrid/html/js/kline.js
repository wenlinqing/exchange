function get(url) {
	// let baseUrl='https://192.168.1.30:8081/';
	var baseUrl = 'https://darkchain.plus:8081/' // 线上环境
	return new Promise((resolve,reject)=>{
		axios({
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: 'get',
			url:baseUrl + url,
		})
		.then(res=>{
			if(res.data.errcode==0){
				resolve(res.data)
			}else{
				reject()
				alertError('请求超时')
			}
		})
		.catch(err=>{
			alertError('请求超时')
		})
	})
}

// 弹窗
function alertError(title) {
	document.addEventListener('plusready',function() {
		// console.log('......')
	})
	try{
		plus.nativeUI.toast(title, {
			 icon:'/static/common/toast-error.png',
			 style:'inline',
			 verticalAlign:'top'
		});
	}catch(e){
		//TODO handle the exception
	}
}
var app = new Vue({
	el:'#app',
	data:{
		MA5:'',
		MA10:'',
		MA30:'',
		volMA5:'',
		volMA10:'',
		current:5,
		tabs:[
			{'label':'1分钟','value':1},
			{'label':'15分钟','value':2},
			{'label':'30分钟','value':3},
			{'label':'1小时','value':4},
			{'label':'4小时','value':5},
			{'label':'1天','value':6},
		],
		category:1,
		categoryList:[
			{'label':'委托挂单','value':1},
			{'label':'成交','value':2},
			{'label':'简介','value':3},
		],
		txData:{},//交易数据统计
		buyList:[],
		sellList:[],
		dealHis:[],
		tokenInfo:{},
		page:1,
		statusBar: 30,
		allKlineData: [],
		coinName: '',
		favo: 0
	},
	created() {
		this.statusBar = getQuery('statusBar')
		this.lang = getQuery('lang')
		if(this.lang!='zh'){
			this.tabs = [{'label':'1min','value':1},{'label':'15min','value':2},{'label':'30min','value':3},{'label':'1hour','value':4},{'label':'4hour','value':5},{'label':'1day','value':6}]
			this.categoryList = [{'label':'Entrust order','value':1},{'label':'Deal','value':2},{'label':'Introduction','value':3}]
			chartConfig.locale = 'en'
		}
		this.coinName = getQuery('coinName')
		this.favo = Number(getQuery('favo')) 
		this.symbol = getQuery('coinName').split('/').join('')
	},
	mounted() {
		this.getDepth()
		this.getTxData()
	},
	methods:{
		handlefavo(){
			let areaName = this.coinName.slice(this.coinName.indexOf('/')+1)
			let name = this.coinName
			uni.postMessage({
				data: {
					areaName: areaName,
					name: this.coinName
				}
			})
			this.favo = !this.favo
		},
		send(){
			uni.switchTab({
				url: '/pages/trade/index'
			})
		},
		handleData(data,num){
			if( !num ) num = 1
			let arr = data.splice(-100 * num)
			let list = []
			let j = ''
			for(let i of arr){
				j = JSON.parse(i)
				j[0] = formatDate(j[0])
				list.push(j)
			}
			return list
		},
		
		// 返回上一页
		back(){
			uni.navigateBack()
		},
		
		// 列表条数不足补全
		addItem(list,type){
			// type: 1开头加，2末尾加
			list=list || [];
			let len=20-list.length;
			if(len>0){
				for(let i=0;i<len;i++){
					if(type==1){
						list.unshift({})
					}else{
						list.push({})
					}
				}
			}
			return list;
		},
		// 获取深度数据
		getDepth(){
			get(`v2/s/trade/market/depth/${this.symbol}/step0`).then(res=>{
				let buyCount=0,sellCount=0;
				let buyList = res.data.bids.splice(0,20) || []
				let sellList = res.data.asks.splice(0,20) || []
				for(let i of buyList){
					buyCount += Number(i.volume) 
				}
				for(let j of sellList){
					sellCount += Number(j.volume)
				}
				buyList = this.addItem(buyList)
				sellList = this.addItem(sellList)
				let prevBuyWidth = 0,prevSellWidth = 0;
				for(let i of buyList){
					i.width = prevBuyWidth + Math.round(Number(i.volume)/buyCount*100) || 0
					prevBuyWidth = i.width
				}
				for(let j of sellList){
					j.width = prevSellWidth + Math.round(Number(j.volume)/sellCount*100) || 0
					prevSellWidth = j.width
				}
				this.buyList = buyList
				this.sellList = sellList
			})
		},
		
		// 获取24小时交易数据统计
		getTxData(){
			this.txData = {
				high : getQuery('high'),
				low : getQuery('low'),
				dayVolume : getQuery('volume'),
				change : getQuery('change'),
				cnyPrice : getQuery('cnyPrice'),
				price : getQuery('price')
			}
		},
		
		// 获取成交记录
		getDealHis(){
			get(`v2/s/trade/market/trades/${this.symbol}`).then(res=>{
				this.dealHis = res.data.splice(0,20)
			})
		},
		// 获取项目简介信息
		getTokenInfo(){
			this.tokenInfo=tokenInfo;
		},
		
		// 切换类目
		switchCategory(val){
			if(this.category==val) return;
			this.category=val;
			if(this.category==1){
				this.getDepth()
			}else if(this.category==2){
				this.getDealHis()
			}else{
				this.getTokenInfo()
			}
		},
		// 截取数字字符串 保留precision小数
		formatterNum(value, precision) {
			let reg = new RegExp('^\\d+(?:\\.\\d{0,' + precision + '})?')
			return value.toString().match(reg)
		},
	}
})