
import {mapGetters,mapMutations} from 'vuex'

var theme= {
	data() {
		return {
			upTop:false,
		}
	},
	onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
	    if (e.scrollTop > 200) { //当距离大于10时显示回到顶部按钮
	        this.upTop = true
	    } else {
	        this.upTop = false
	    }
	},
	computed:{
		...mapGetters([
			'getTheme'
		])
	}
}

export default theme