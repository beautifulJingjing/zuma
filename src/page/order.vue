<!-- 首页内容渲染 -->
<template>
    <div slot="container">
        order
    </div>
</template>
<style lang="less">

</style>
<script>
	import sms from '@/components/index/sms'

	export default{
		data(){
			return {

			}
		},
		methods: {},
		created: function () {
			this.$store.commit('setTitle', '提交订单')
			this.$store.commit('setIcon', {profile: true})
			this.$store.commit('setIndex',true)
		},
		components: {
		},

	}
</script>
