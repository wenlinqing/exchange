<template>
    <view class="noList flexCC flexColumn">
    	<image :src="'../../static/'+theme+'/listNo.png'" mode="widthFix" style="width: 150px;">
    	{{$lang.common.noData}}
    </view>
</template>

<script>
	export default {
		props: {
			theme: String,
			default: 'light'
		},
		data() {
			return {
				
			}
		}
	}
</script>