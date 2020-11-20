'use strict'
import { ethers } from 'ethers';
const bip39 = require('bip39');

// console.log(ethers.Wallet)

const validateMnemonic = mnemonic=>{
	try{
		var Wallet = ethers.Wallet.fromMnemonic(mnemonic);
		var privateKey = Wallet.privateKey;
		// console.log("ETH私钥：",privateKey)
		var address = Wallet.address;
		// console.log("ETH地址：",address)
		var publicKey = Wallet.publicKey;
		// console.log("ETH公钥：",publicKey)
		return {
			mnemonic:mnemonic,
			address:address,
			privateKey:privateKey,
			publicKey:publicKey
		}
		// return false
	}catch(e){
		return false
	}
}

module.exports = {
	mnemonic: bip39.generateMnemonic(),
	validateMnemonic
}




