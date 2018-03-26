<!-- 首页内容渲染 -->
<template>
  <div class="view-printing">
      <headerComponents></headerComponents>
      <router-view class="view-control"></router-view>
      <footerComponents v-if="footer"></footerComponents>
  </div>
</template>
<style lang="less">
    @import '~less/reset.less';
    @import '~less/common.less';
    .view-control{  padding-top:.92rem;  }
</style>
<script>
	import headerComponents from '@/components/header'
	import footerComponents from '@/components/footer'

    export default{
        data(){
            return{
            }
        },
        methods:{
        },
        created:function(){
        },
        computed:{
	        footer(){
		        return this.$store.state.footer
	        },
        },
        components:{
	        headerComponents,
	        footerComponents
        },

    }
</script>
