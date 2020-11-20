<template>
	<view :class="['shadow', { show: show }]" @click="hidePicker">
		<view class="bottom-popup" :class="cssStatic" @click.stop="donothing">
			<view class="title-row">
				<view class="title" style="font-size: 16px;">{{$lang.transfer.li0}}</view>
				<view class="iconfont icon-err1" style="font-size: 16px;" @click="hidePicker"></view>
			</view>
			<view class="middle" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
				<view class="middle-box">
					<view class="roller-wrap" :style="'top:' + (rollerWrapTop + moveLength) + 'px'">
						<view class="roller-item" v-for="(value, index) in array" :key="index">{{ value }}</view>
					</view>
				</view>
				<view class="middle-line-wrap"></view>
				<!-- <view class="middle-box-wrap"></view> -->
				<view class="middle-topBox"></view>
				<view class="middle-bottomBox"></view>
			</view>
			<Button class="btn1-class" @touchend.native="confirm" color="#fff">{{$lang.btnSure}}</Button>
		</view>
	</view>
</template>

<script>
import Button from './custom-button.vue';
export default {
	props: {
		array: Array,
		show: Boolean,
		cssStatic: String
	},
	components: { Button },
	data() {
		return {
			rollerWrapTop: 90,
			moveLength: 0,
			selectIndex: 2
		};
	},
	methods: {
		hidePicker() {
			this.$emit('hidePicker', false);
		},
		confirm() {
			this.selectIndex = Math.abs(Math.round(this.rollerWrapTop / 45 - 2));
			this.$emit('confirm', this.selectIndex);
		},
		init() {
			this.rollerWrapTop = 90;
		},
		donothing() {},
		touchStart(e) {
			this.startClientY = e.changedTouches[0].clientY;
		},
		touchMove(e) {
			let moveLength = e.changedTouches[0].clientY - this.startClientY;
			if (moveLength >= 0 && this.rollerWrapTop + moveLength <= 90) {
				this.moveLength = Math.round(moveLength * 1000) / 1000;
			}else if(moveLength >= 0 && this.rollerWrapTop + moveLength > 90){
				this.moveLength = 0
				this.rollerWrapTop = 90
			} else if (moveLength < 0 && this.rollerWrapTop + moveLength >= (this.array.length - 1) * -45 + 90) {
				this.moveLength = Math.round(moveLength * 1000) / 1000;
			}else if (moveLength < 0 && this.rollerWrapTop + moveLength < (this.array.length - 1) * -45 + 90){
				this.rollerWrapTop = (this.array.length - 1) * -45 + 90
				this.moveLength = 0
			}
		},
		touchEnd(e) {
			if (this.moveLength == 0) return;
			let rollerTop = this.rollerWrapTop + this.moveLength;
			this.moveLength = 0;
			this.rollerWrapTop = Math.round(rollerTop / 45) * 45;
		}
	}
};
</script>

<style>
.shadow {
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	z-index: 9999;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	pointer-events: none;
	opacity: 0;
	transition: all 0.3s linear;
}
.shadow.show {
	opacity: 1;
	pointer-events: auto;
	transition: all 0.3s linear;
}
.bottom-popup {
	width: 710rpx;
	height: 350px;
	background-color: #fff;
	position: absolute;
	z-index: 10000;
	bottom: 20px;
	left: 20rpx;
	right: 20rpx;
	border-radius: 10px;
	transform: translateY(120%);
	transition: all 0.2s linear;
}
.show .bottom-popup {
	transform: translateY(0%);
	transition: all 0.2s linear;
}
.title-row::before {
	content: '';
	display: block;
	width: 16px;
	height: 16px;
}
.title-row {
	box-sizing: border-box;
	height: 45px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 10px 14px;
	margin-bottom: 10px;
}
.btn1-class {
	height: 45px;
	width: 80%;
	border-radius: 5px;
	margin: 0 auto 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #1762E6;
	font-size: 17px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	overflow: hidden;
	margin-top: 10px;
}
.middle {
	position: relative;
	box-sizing: border-box;
	height: 225px;
	overflow: hidden;
}
.middle-line-wrap {
	position: absolute;
	box-sizing: border-box;
	height: 45px;
	width: 100%;
	top: 90px;
	left: 0;
	border-top: 1px solid #e5e5e5;
	border-bottom: 1px solid #e5e5e5;
}
.middle-top,
.middle-bottom {
	position: absolute;
	height: 90px;
	width: 100%;
	opacity: 1;
	left: 0;
}
.middle-top {
	top: 0;
}
.middle-bottom {
	bottom: 0;
}
.middle-box-wrap {
	position: absolute;
	width: 100%;
	height: 225px;
	top: 0;
	left: 0;
	background: -webkit-gradient(
		linear,
		0% 100%,
		0% 0%,
		from(rgba(255, 255, 255, 1)),
		color-stop(0.5, rgba(255, 255, 255, 0.2)),
		color-stop(0.5, rgba(255, 255, 255, 0.2)),
		to(rgba(255, 255, 255, 1))
	);
}
.roller-item {
	width: 100%;
	height: 45px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #222;
	font-weight: 600;
}
.roller-wrap {
	width: 100%;
	position: absolute;
}
.middle-box {
	height: inherit;
	transform-style: preserve-3d;
}
.dark {background-color: #202939;}
.dark .middle-line-wrap {
	border-top: 1px solid #283752;
	border-bottom: 1px solid #283752;
}
.dark .middle-box-wrap{
	background: none;
}
.dark .roller-item {color: #C2CCDE !important;}
.middle-topBox, .middle-bottomBox {position: absolute;height: 90px;width: 100%;left: 0; background-color: rgba(255,255,255,0.5);}
.middle-topBox  {top: 0;}
.middle-bottomBox {top: 135px;}


.dark .title-row .title,.dark .title-row .iconfont {color: #C5CFD5;}
.dark .middle-topBox {background-color: rgba(32,41,57,0.5);}
.dark .middle-bottomBox {background-color: rgba(32,41,57,0.5); }
</style>
