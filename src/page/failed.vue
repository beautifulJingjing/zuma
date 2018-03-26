<!-- 首页内容渲染 -->
<template>
    <div class="failed-image">
        <img src="../assets/images/icons/icon-compelete.png">
        <p class="failed-large">省份系统异常。暂时无法订购，如有疑问，请联系我们</p>
        <p class="failed-small">客服电话：4001009440；客服QQ：706524573</p>
    </div>
</template>
<style lang="less" scoped>
    .failed-image{
        img{
            display: block;
            width:1.4rem;
            height:1rem;
            margin:1.3rem auto .6rem ;
        }
        p{
            text-align: center;
            color: #4f566a;
            &.failed-large{
                font-size:.28rem;
            }
            &.failed-small{
                margin-top:.4rem;
                font-size:.24rem;
            }
        }

    }
</style>
<script>

	export default{
		data(){
			return{
                myicon:''
			}
		},
		methods:{

		},
		created:function(){
			this.$store.commit('setTitle','查看原因')
			this.$store.commit('setIcon', {back: true, question: false, profile: false})
			this.$store.commit('setFooter',false)
			this.$store.commit('setIndex',true)
		},
		computed:{
			/*phone(){
				return this.$store.state.user.phone
			}*/
		},
		components:{
		},

	}
</script>
