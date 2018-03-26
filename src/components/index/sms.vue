<!-- 首页内容渲染 -->
<template>
    <div>
        <router-link :to="{path:'/make'}">
            <span>{{ phone + '是通过短信渠道进来的'}}</span>
        </router-link>
    </div>
</template>
<style lang="less" scoped>
    img{
        display: block;
        width: 100%;
    }
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
			this.$store.commit('setTitle','企业商务助手')
			this.$store.commit('setIcon',{profile:true})
		},
		computed:{
			phone(){
				return this.$store.state.user.phone
			}
		},
		components:{

		},

	}
</script>
