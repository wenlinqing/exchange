import WAValidator from '../unit/wallet-address-validator.min.js';

let createAddr = (obj) => {
	let addrList = uni.getStorageSync('addrList') || []
	if (obj.def) {
		for (let i of addrList) {
			i.def = false
		}
	}
	obj.icon = saveCoinIcon(obj.type)
	addrList.push(obj)
	uni.setStorageSync('addrList', addrList)
}

let editAddr = (index, obj) => {
	let addrList = uni.getStorageSync('addrList')
	if (obj.def) {
		for (let i of addrList) {
			i.def = false
		}
	}
	obj.icon = saveCoinIcon(obj.type)
	addrList[index] = obj
	uni.setStorageSync('addrList', addrList)
}

let removeAddr = (index, addr) => {
	let addrList = uni.getStorageSync('addrList')
	for (let i = 0; i < addrList.length; i++) {
		if (i == index && addr == addrList[i].addr) {
			addrList.splice(i, 1)
		}
	}
	uni.setStorageSync('addrList', addrList)
}

let searchAddrType = (type) => {
	let addrList = uni.getStorageSync('addrList')
	let newArr = []
	if (!type) {
		return addrList
	} else {
		for(let i of addrList) {
			if(i.type.toLowerCase() == type.toLowerCase()){
				newArr.push(i)
			}
		}
		return newArr
	}
}

let searchAddrName = (name) => {
	console.log(name)
	let addrList = uni.getStorageSync('addrList')
	let newArr = []
	if(!name){
		return addrList
	}else{
		for(let i of addrList){
			if(i.name.indexOf(name) != -1){
				newArr.push(i)
			}
		}
		return newArr
	}
}

let validate = (addr, coinName) => {
	return WAValidator.validate(addr, coinName)
}

let saveCoinIcon = (type) => {
	let icon = ''
	switch (type.toLowerCase()) {
		case 'btc':
			icon = 'coin1'
			break;
		case 'eth':
			icon = 'coin2'
			break;
		case 'eos':
			icon = 'coin3'
			break;
	}
	return icon
}

export {
	createAddr,
	editAddr,
	removeAddr,
	searchAddrType,
	searchAddrName,
	validate
}
