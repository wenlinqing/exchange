<template>
	<view class="scroll-wrap" :class="getTheme"  :style="'--btn-b-size:'+btnBigSize+'px;--btn-s-size:'+btnSmallSize+'px;--btn-color:'+activeColor" @tap="handleBtn">
		
		
		<!-- 可移动button  及  包裹的容器 -->
		
		<!-- 静态的btn 和 容器   及点击事件在该容器上-->
		<view class="bar-wrap" :style="'width:'+(sliderWidth-btnBigSize+btnSmallSize)+'px;'" >
			
			<view class="scroll-btn-wrap":style="'width:'+(sliderWidth-btnBigSize)+'px;'" @touchstart.stop="handleStart" @touchmove.stop="handleMove" @touchend.stop="handleEnd" >
				<view class="scroll-btn" :style="'left:' + intValue +'px'"></view>
			</view>
			
			<!-- 底色bar -->
			<view class="base-bar" :style="'width:'+(sliderWidth-2*btnBigSize+btnSmallSize)+'px;'"></view>
			
			<view class="first-btn-wrap">
				<view class="first-btn" :style="intValue>=0?'background-color:var(--btn-color)':''"></view>
			</view>
			<view class="unactive-btn-wrap" style="left: 25%;margin-left: -6px;">
				<view class="unactive-btn" :style="intValue>=((sliderWidth-btnBigSize)*0.25)?'background-color:var(--btn-color)':''"></view>
			</view>
			<view class="unactive-btn-wrap" style="left: 50%;margin-left: -6px;">
				<view class="unactive-btn" :style="intValue>=((sliderWidth-btnBigSize)*0.5)?'background-color:var(--btn-color)':''"></view>
			</view>
			<view class="unactive-btn-wrap" style="left: 75%;margin-left: -6px;">
				<view class="unactive-btn" :style="intValue>=((sliderWidth-btnBigSize)*0.75)?'background-color:var(--btn-color)':''"></view>
			</view>
			<view class="last-btn-wrap" style="right: 0;">
				<view class="last-btn" :style="intValue>=(sliderWidth-btnBigSize)?'background-color:var(--btn-color)':''"></view>
			</view>
			
			<view class="value-bar" :style="'width:'+intValue +'px'"></view>
		</view>
		
	</view>
</template>

<script>
export default {
	props: {
		btnBigSize: {
			type: [String,Number],
			default: 24
		},
		btnSmallSize: {
			type: [String,Number],
			default: 12
		},
		activeColor: {
			type: String,
			default: '#D9343E'
		}
	},
	data() {
		return {
			sliderWidth: 100,
			sliderLeft: 0,
			value: {
				type: [String, Number],
				default: 0
			}
		};
	},
	mounted() {
		const query = uni.createSelectorQuery().in(this);
		query.select('.scroll-wrap').boundingClientRect(data => {
			this.sliderWidth = data.width;
			this.sliderLeft = data.left;
		}).exec();	
	},
	methods: {
		handleBtn(e){
			// console.log(e)
			let width = this.sliderWidth-this.btnBigSize+this.btnSmallSize
			let clickX = (e.detail.x || e.target.x) - this.sliderLeft - this.btnBigSize/2
			let left =  this.getMathRound( clickX / this.sliderWidth) 
			// console.log(left)
			// this.value = left
			if(clickX > this.sliderWidth-this.btnBigSize) clickX = this.sliderWidth-this.btnBigSize
			this.value = -'' + clickX
			// console.log(this.value)
		},
		getMathRound(num){
			return Math.round(num*100)/100
		},
		handleMove(e) {
			// console.log(e.touches[0].pageX)
			let left = e.touches[0].pageX - 15 -this.btnBigSize/2
			// console.log(left)
			this.value = left < 0 ? 0 : left
			if(left < 0){
				this.value = 0
			}else if(left > this.sliderWidth-this.btnBigSize){
				this.value = this.sliderWidth-this.btnBigSize
			}
		},
		handleStart(){},
		handleEnd(){}
	},
	computed:{
		intValue:function(){
			let value = Math.round(this.value/(this.sliderWidth-this.btnBigSize)*100)/100
			value = value < 0? 0 : value
			this.$emit('getValue', value || 0)
			return this.value
		}
	}
};
</script>

<style>
.scroll-wrap {
	--btn-color:  #D9343E;
	--unactive-color: #e7ebee;
	--btn-b-size: 24px;
	--btn-s-size: 12px;
	height: 24px;
	position: relative;
	/* margin: 14px 0; */
}

.dark .scroll-wrap {
	--btn-color:  #D9343E;
	--unactive-color: #C5CFD5;
}

.scroll-btn-wrap {
	position: absolute;
	height: 100%;
	z-index: 4;
}

.bar-wrap {
	position: relative;
	width: 100%;
	height: 24px;
	margin: 0 auto;
}
.base-bar {
	background-color: var(--unactive-color);
	/* width: 100%; */
	height: 2px;
	position: absolute;
	left: var(--btn-s-size);
	z-index: 1;
	top: 50%;
	margin-top: -1px;
}
.value-bar {
	background-color: var(--btn-color);
	width: 0%;
	height: 2px;
	position: absolute;
	top: 50%;
	margin-top: -1px;
	z-index: 3;
}
.scroll-btn {
	display: inline-block;
	position: absolute;
	height: 20px;
	width: 20px;
	border-radius: 50%;
	background-color: var(--btn-color);
	top: 50%;
	left: 0;
	margin-top: -10px;
	z-index: 4;
	/* transition: all 0.1s linear; */
}
.unactive-btn-wrap {
	width: 16px;
	height: 16px;
	background-color: #fff;
	position: absolute;
	top: 50%;
	margin-top: -8px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 3;
}
.unactive-btn {
	width: 12px;
	height: 12px;
	background-color: var(--unactive-color);
	border-radius: 50%;
}
.first-btn-wrap {
	width: 14px;
	height: 12px;
	background-color: #fff;
	position: absolute;
	top: 50%;
	margin-top: -6px;
	z-index: 3;
	display: flex;
	align-items: center;
}
.last-btn-wrap{
	width: 14px;
	height: 12px;
	background-color: #fff;
	position: absolute;
	top: 50%;
	margin-top: -6px;
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.first-btn,.last-btn {
	width: 12px;
	height: 12px;
	background-color: var(--unactive-color);
	border-radius: 50%;
	position: absolute;
	top: 50%;
	margin-top: -6px;
	z-index: 3;
}

.dark .unactive-btn-wrap {background-color: #202939}
.dark .first-btn-wrap {background-color: #202939}
.dark .last-btn-wrap {background-color: #202939}
</style>
