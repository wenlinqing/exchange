<template>
	<view :class="cssStatic">
		<view :class="['content', { show: show }]" @click="hide">
			<view class="bottom" @click.stop="donothing">
				<Cell :custom="true" class="cell1-class">
					<view slot="icon" style="height:60px;width:60px;"></view>
					<view slot="title" style="font-size: 17px;font-weight: 400;" :style="cssStatic=='light'?'color:#333':'color:#C2CCDE'">{{$lang.common.pwdValidate}}</view>
					<view slot="content" class="iconfont icon-close" @click="hide" style="font-size:20px;padding:20px;"></view>
				</Cell>
				<view :class="['flexCC',{'fail': !success}]">
					<view :class="['circle', { blackC: password.length >= 1 }]"></view>
					<view :class="['circle', { blackC: password.length >= 2 }]"></view>
					<view :class="['circle', { blackC: password.length >= 3 }]"></view>
					<view :class="['circle', { blackC: password.length >= 4 }]"></view>
					<view :class="['circle', { blackC: password.length >= 5 }]"></view>
					<view :class="['circle', { blackC: password.length >= 6 }]"></view>
				</view>
				<view class="bottom-row">
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('1')">1</Button>
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('2')">2</Button>
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('3')">3</Button>
				</view>
				<view class="bottom-row">
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('4')">4</Button>
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('5')">5</Button>
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('6')">6</Button>
				</view>
				<view class="bottom-row">
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('7')">7</Button>
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('8')">8</Button>
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('9')">9</Button>
				</view>
				<view class="bottom-row">
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('clear')">{{$lang.clear}}</Button>
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('0')">0</Button>
					<Button :color="cssStatic=='light'?'#333':'#C2CCDE'" class="btn1-class" @touchend.native="handleKey('backspace')">
						<!-- <image :src="cssStatic=='white'?'/static/backspace.png':'/static/backspace1.png'" class="icon"/> -->
						<view class="iconfont icon-backspace" style="font-size: 28px;" :style="cssStatic=='light'?'#333':'#C2CCDE'"></view>
					</Button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Button from './custom-button.vue';
import Cell from './custom-cell.vue';
export default {
	name: 'customKeyboard',
	components: { Button, Cell },
	props: {
		show: {
			type: Boolean,
			default: false,
			
		},
		success: {
			type: Boolean,
			default: true
		},
		cssStatic: {
			type: String,
			default: 'light'
		}
	},
	data() {
		return {
			password: ''
		};
	},
	methods: {
		handleKey(e) {
			if (Number(e) >= 0 && this.password.length <= 6) {
				this.password += e.toString();
				if (this.password.length === 6) {
					this.$request({
						url: '/v2/u/user/checkPaypwd',
						data:{
							paypassword:this.password
						}
					}).then(res=>{
						this.$emit('getPassword', {
							msg: 'success',
							password: this.password
						});
					}).catch(error=>{ 
						this.$emit('getPassword', {
							msg: 'error',
							password: this.password
						});
					});
					
				}
			}
			if (e === 'clear') {
				this.clear();
			}
			if (e === 'backspace') {
				if (this.password === '') return;
				let arr = this.password.split('');
				arr.pop();
				this.password = arr.join('');
			}
		},
		hide() {
			this.$emit('hideKey', false);
		},
		donothing() {},
		clear() {
			if (this.password === '') return;
			this.password = '';
		}
	},
	watch:{
	  'show'(newVal,oldVal){
	       if(newVal) this.password = ''
	  }
	}
};
</script>

<style>
.content {
	position: fixed;
	z-index: 10000;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	width: 100vw;
	height: 100vh;
	opacity: 0;
	pointer-events: none;
	transition: all 0.25s linear;
}
.content.show {
	pointer-events: auto;
	opacity: 1;
	transition: all 0.25s linear;
}
.bottom {
	background-color: #fff;
	position: fixed;
	z-index: 12000;
	bottom: 0;
	left: 0;
	width: 100%;
	padding-bottom: 20px;
	transform: translateY(100%);
	transition: all 0.2s linear;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
}
.show .bottom {
	transform: translateY(0%);
	transition: all 0.2s linear;
}
.bottom-row {
	width: 100%;
	display: flex;
}
.bottom-item,
.btn1-class {
	height: 52px;
	width: 33.33%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
}
.icon {
	width: 24px;
	height: 24px;
}
.circle {
	width: 12px;
	height: 12px;
	border: 1px solid #666;
	border-radius: 50%;
	margin: 0px 5px 20px;
}
.blackC {
	width: 12px;
	height: 12px;
	background-color: #666;
}
.cell1-class {
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
}
.fail {
	animation: shake 600ms ease-in-out;
}
@keyframes shake {
	10%,
	90% {
		transform: translate3d(-1px, 0, 0);
	}
	20%,
	80% {
		transform: translate3d(+2px, 0, 0);
	}
	30%,
	70% {
		transform: translate3d(-4px, 0, 0);
	}
	40%,
	60% {
		transform: translate3d(+4px, 0, 0);
	}
	50% {
		transform: translate3d(-4px, 0, 0);
	}
}


.dark .bottom {background-color: #202939;}
.dark .circle {border: 1px solid #C2CCDE;}
.dark .blackC {background-color: #C2CCDE;}
.dark .cell1-class {background-color: #202939;}
.dark .iconfont {color: #C2CCDE;}
</style>
