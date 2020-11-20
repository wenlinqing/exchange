<template>
<view class="minHeight" :class="getTheme">
	<status-bar ></status-bar>
	<topNav title="确认助记词"></topNav>
	<view :class="cssStatic">
		<view class="title">{{$lang.backWord.text5}}</view>
		<view class="top-wrap">
			<view class="item-btn" v-for="(item, index) in numArray" :key="index" @click="removeItem(index)">
				<Button class="btn2-class" >{{ item.value }}</Button>
				<view class="left-wrap"></view>
				<view class="num">{{ item.numberNo }}</view>
			</view>
		</view>
		<view class="list-wrap">
			<view :class="['item-btn', { btn0: index % 4 == 3 }]" v-for="(item, index) in listArray" :key="index" @click="pushArray(index)">
				<Button class="btn2-class">{{ item.value }}</Button>
			</view>
		</view>
		<view class="toast">
			<view style="padding-top: 3px;"><image src="@/static/gantan.png" mode="widthFix" style="width: 20px;margin-right: 5px;height: 20px;" /></view>
			<view class="toast-text">{{$lang.backWord.text4}}</view>
		</view>
		<Button class="btn1-class" color="#fff" @touchstart.native="confirm">{{$lang.btnSure}}</Button>
	</view>
</view>
</template>

<script>
import Button from '../../../components/custom-keyboard/custom-button.vue';
export default {
	components: { Button },
	data() {
		return {
			// array: ['return1', 'return2', 'return3', 'home1', 'home2', 'home3', 'menu1', 'menu2', 'menu3', 'shift1', 'shift2', 'shift3'],
			topArrayLength: 3,
			listArray: [],
			numArray: [],
			array: []
		};
	},
	methods: {
		arraySort(arr, id) {
			let array = arr.sort((a, b) => {
				return a[id] - b[id];
			});
			return array;
		},
		randomNumArray(length) {
			let f_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			let f_numArray = [];
			do {
				let num = Math.floor(Math.random() * f_arr.length);
				f_numArray.push(f_arr[num]);
				f_arr.splice(num, 1);
			} while (f_numArray.length < length);
			return f_numArray;
		},
		randomArray(arr) {
			let f_listArray = [];
			for (let i of f_numArray) {
				let item = {
					value: this.array[i - 1],
					index: i - 1
				};
				f_listArray.push(item);
			}
			return f_listArray;
		},
		getNumArray() {
			let f_array = this.randomNumArray(this.topArrayLength);
			let f_numArray = [];
			for (let i of f_array) {
				f_numArray.push({
					value: '',
					numberNo: i
				});
			}
			return f_numArray;
		},
		getListArray() {
			let f_numArray = this.randomNumArray(12);
			let f_listArray = [];
			for (let i = 0; i < f_numArray.length; i++) {
				let item = {
					value: this.array[f_numArray[i] - 1],
					index: i
				};
				f_listArray.push(item);
			}
			return f_listArray;
		},
		confirm() {
			let numArray = this.numArray;
			let array = this.array;
			let flag = numArray.every(item => {
				return item.value === array[item.numberNo - 1];
			});
			if (flag) {
				uni.showToast({
					title: this.$lang.backWord.backOk,
					icon: 'none'
				})
				setTimeout(()=>{
					uni.setStorage({
						key:'isBackUpWord',
						data:true
					})
					uni.reLaunch({
						url:"/pages/index/index"
					})
				},1500)
			} else {
				uni.showToast({
					title: this.$lang.backWord.backNo,
					icon: 'none'
				})
			}
		},
		pushArray(e) {
			let f_obj = this.listArray[e];
			for (let i of this.numArray) {
				if (i.value === '') {
					i.value = f_obj.value;
					i.index = f_obj.index;
					this.listArray.splice(e, 1);
					break;
				}
			}
		},
		removeItem(e) {
			let f_obj = this.numArray[e];
			if (f_obj.value === '') return;
			let value = f_obj.value;
			let index = f_obj.index;
			let f_newObj = JSON.parse(JSON.stringify(f_obj));
			let obj = new Object({
				value: value,
				index: index
			});
			f_obj.value = '';
			f_obj.index = '';
			this.numArray[e] = f_obj;
			this.listArray.push(obj);
			let newArray = this.arraySort(this.listArray, 'index');
			this.listArray = newArray;
		}
	},
	onLoad() {
		this.array = uni.getStorageSync('wordList').split(' ');
		// 获取三个随机数字数组
		this.numArray = this.getNumArray();
		// 获取随机数组列表
		this.listArray = this.getListArray();
		let style =  this.$store.state.globalUIstyle
		this.cssStatic = style
		if(style=='black'){
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#1B222D'
			})
		}
	}
};
</script>

<style scoped>
.title {
	box-sizing: border-box;
	padding-top: 30px;
	width: 100%;
	display: flex;
	justify-content: center;
	font-size: 14px;
	font-weight: 500;
	color: #666666;
}
.top-wrap {
	box-sizing: border-box;
	margin-left: 15px;
	margin-right: 15px;
	padding-top: 40px;
	padding-bottom: 40px;
	border-bottom: 1px solid #e5e5e5;
	display: flex;
	align-items: center;
	justify-content: center;
}
.item-btn {
	width: 160rpx;
	height: 80rpx;
	background: #f4f9fa;
	border-radius: 8rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 10rpx;
	margin-bottom: 6px;
	font-size: 14px;
	color: #333333;
	position: relative;
	overflow: hidden;
}
.btn0 {
	margin-right: 0px;
}
.btn1-class {
	position: fixed;
	bottom: 40px;
	height: 44px;
	width: 590rpx;
	left: 80rpx;
	right: 80rpx;
	background: #1762E6;
	overflow: hidden;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 15px;
}
.btn2-class {
	width: 160rpx;
	height: 80rpx;
	font-size: 28rpx;
}
.list-wrap {
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	padding: 0 15px;
	margin-bottom: 30px;
	margin-top: 30px;
}
.left-wrap {
	width: 0;
	height: 0;
	position: absolute;
	top: 0;
	left: 0;
	border-width: 48rpx 48rpx 48rpx 0px;
	border-style: solid;
	border-color: #1762E6 transparent transparent #1762E6;
}
.num {
	position: absolute;
	z-index: 10;
	top: 1px;
	left: 6rpx;
	font-size: 18rpx;
	color: #fff;
}
.icon {
	width: 18px;
	height: 18px;
	margin-right: 10px;
}
.toast {
	margin: 0 15px;
	display: flex;
	flex-wrap: nowrap;
}
.toast-text {
	font-size: 13px;
	font-weight: 500;
	color: #666666;
}

.black {background-color: #1B222D; height: 100vh; width: 100vw; overflow: hidden;position: relative;}
.dark .item-btn {background-color: #202939;}
.dark .btn2-class {color: #C2CCDE;}
.dark .title,.dark .toast-text {color: #6F7F9B;}
</style>
