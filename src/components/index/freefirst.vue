<!-- 首页内容渲染 -->
<template>
    <div>
        <router-link :to="{path:'/make'}">
            <span>我是通过活动渠道进来的</span>
        </router-link>
    </div>
</template>
<style lang="less" scoped>

</style>
<script>
	export default{
		props:['title'],
		data(){
			return{

			}
		},
		methods:{

		},
		created:function(){
			this.$store.commit('setTitle','免费试用资格')
		},
		components:{

		},

	}
</script>
