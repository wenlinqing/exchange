/*********************************************/

// 次文件只需要关注 getBars 和 subscribeBars 函数即可

/******************************************/

// 历史数据 第一条数据的 时间撮 因为k线图一次性历史数据只拿一部分，用户吧图往前滑动，就会用这个时间撮去请求更早的 历史数据
var detafeed_historyTime = 0
// 上一次的 K线周期 切换产品的时候 需要从websock 取消订阅这个
var detafeed_lastResolution = null
// 上一次的产品 切换产品的时候 需要从websock 取消订阅这个
var detafeed_lastSymbol = null


function FeedBase() {}

FeedBase.prototype.onReady = function(callback) {
	callback(this._configuration)
}

FeedBase.prototype.getSendSymbolName = function(symbolName) {
	var name = symbolName.split('/')
	return (name[0] + name[1]).toLocaleLowerCase()
}

FeedBase.prototype.resolveSymbol = function(symbolName, onResolve, onError) {
	onResolve({
		"name": symbolName,
		"timezone": "Asia/Shanghai",
		"pricescale": 100,
		"minmov": 1,
		"minmov2": 0,
		"ticker": symbolName,
		"description": "",
		"session": "24x7",
		"type": "bitcoin",
		"volume_precision": 10,
		"has_intraday": true,
		"intraday_multipliers": ['1', '5', '15', '30', '60', '240', '1440'], // 时间
		"has_weekly_and_monthly": false,
		"has_no_volume": false,
		"regular_session": "24x7"
	})
}


/**
 * 更多时间类型在这里添加 时间类型请看火币文档
 * @param resolution  订阅周期 按照自己喜欢的来 如 30 30分钟、 1D 一天 
 * @param name 交易对symbol
 * @param to 结束时间
 * @returns {object}
 */
const resolutionFormat = (resolution, name, to) => {
	let req = `market.${name}.kline.${resolution}min`;
	let minutes = resolution;

	if (resolution.includes('D')) {
		if (resolution.length < 2) resolution = '1' + resolution;
		req = `market.${name}.kline.${parseInt(resolution)}day`;
		minutes = parseInt(resolution) * 24 * 60;
	} else if (resolution.includes('W')) {
		if (resolution.length < 2) resolution = '1' + resolution;
		req = `market.${name}.kline.${parseInt(resolution)}week`;
		minutes = parseInt(resolution) * 24 * 60 * 7;
	} else if (resolution.includes('M')) {
		if (resolution.length < 2) resolution = '1' + resolution;
		req = `market.${name}.kline.${parseInt(resolution)}mon`;
		minutes = parseInt(resolution) * 24 * 60 * 30;
	} else {
		if (resolution / 60 >= 1) {
			req = `market.${name}.kline.${resolution / 60}hour`;
		}
	}

	let from = null;
	if (to) {
		from = to - 200 * minutes * 60;
		if (resolution.includes('M') || resolution.includes('W')) { // 周线月线控制条数，时间超出火币规定范围, ws报错
			from = to - 50 * minutes * 60;
		}
	}
	return {
		minutes,
		req,
		from,
		to,
	};
};

FeedBase.prototype.getBars = function(symbolInfo, resolution, rangeStartDate, rangeEndDate, onResult, onError) {
	
	
	
	// 切换产品周期 或者 切换产品 会执行这个函数
	let reso = resolutionFormat(resolution, symbolInfo.name, rangeEndDate > detafeed_historyTime ? rangeEndDate :
		detafeed_historyTime)
	// 是历史数据 
	var history = true
	/*
	  !detafeed_historyTime 如果没请请求过这个产品或者这个周期的历史数据
	  resolution !== detafeed_lastResolution 是否更换了产品周期
	  detafeed_lastSymbol !== symbolInfo.name 是否切换了产品
	*/
	if (!detafeed_historyTime || (resolution !== detafeed_lastResolution) || detafeed_lastSymbol !== symbolInfo.name) {
		// 那就不是历史数据
		history = false
		// 储存请求过的产品
		detafeed_lastSymbol = symbolInfo.name
		// 记录目前时间戳，就用目前时间戳往前请求历史数据
		detafeed_historyTime = window.parseInt((Date.now() / 1000))
		kLineData = null
	}
	
	
	
	/*
	  @socket.sendData
	  第一个参数订阅历史数据
	  第二个参数订阅实时数据
	  第三个参数 是  是否是历史数据
	*/
	// socket.sendData({
	// 	req: reso.req,
	// 	id: "id10",
	// 	from: reso.from,
	// 	to: reso.to,
	// }, reso.req, history)
	
	
	if(kLineData){
		if(kLineData.length>0){
			let arr = kLineData.splice(-200)
			let newArr = []
			for(let i of arr){	
				i = {
					time: i.id * 1000,
					open: i.open,
					high: i.high,
					low: i.low,
					close: i.close,
					volume: i.vol
				}
				newArr.push(i)
			}
			onResult(newArr,{noData:false})
			return
		}else{
			onResult([], {noData: true})
			return
		}
	}
	
	if(reso.minutes < 60){
		reso.minutes = reso.minutes + 'min'
	}else if(reso.minutes >= 60 && reso.minutes < 1440){
		reso.minutes = reso.minutes / 60 + 'hour'
	}else if(reso.minutes >= 1440){
		reso.minutes = reso.minutes / 1440 + 'day'
	}
	
	
	
	
	
	socket.sendData({
		method: 'trade$market$kline',
		lintType: reso.minutes,
		symbol: index_market,
	}, reso.req, history)
	


	EventTrad.off('data')

	EventTrad.on('data', data => {
		if (data && Array.isArray(data)) {
			// 记录这次请求的时间周期
			detafeed_lastResolution = resolution
			var meta = {
				noData: false
			}
			const datas = []
			if (data.length) {
				detafeed_historyTime = data[0].id
				for (let i of data) {
					i.time = i.id * 1000
					i.volume = i.vol
					datas.push(i)
				}
			} else {
				meta = {
					noData: true
				}
			}
			onResult(datas, meta)
		}
	})
}

FeedBase.prototype.subscribeBars = function(symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
	EventTrad.off('realTime')
	// 拿到实时数据 在这里画
	EventTrad.on('realTime', data => {
		if (Object.prototype.toString.call(data) === '[object Array]') {
			onTick({
				time: data[0],
				volume: data[5],
				close: data[4],
				open: data[1],
				high: data[2],
				low: data[3]
			})
		}
	})
}

FeedBase.prototype.unsubscribeBars = function(listenerGuid) {
	// 取消订阅产品的callback
}
