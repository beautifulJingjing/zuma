<!-- 首页内容渲染 -->
<template>
    <div>
        <processComponents :current="isFree ? 3 : 4" :isFree="isFree" :isCompelete="true"></processComponents>
        <div class="get-tips">
            <div class="tip-text">
                <!--<p class="tips-one" v-if="isFree">恭喜你获得0元试用特权！</p-->
                <p class="tips-one">恭喜您，财猫通话名片（彩印）已制作完成！</p>
                <p class="tips-two">稍后您将会收到一条中国移动下发的通知短信</br>请按照短信提示回复</p>
                <p class="tips-three">服务将在回复短信后24小时内生效。详情可点击
                    <a @click="goProfile()">个人中心查看</a>
                    如有其它疑问，请联系客服咨询。
                </p>
            </div>
        </div>
        <div class="card-content bottom-bg">
            <div class="title">
                <i></i>
                <span>短信示例</span>
            </div>
            <div class="sms-control">
                <div class="sms-exp"></div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .get-tips {
        padding: .4rem .4rem 0;
        .tip-text {
            text-align: center;
            line-height: .5rem;
            .tips-one {
                font-size: .24rem;
            }
            .tips-two {
                font-size: .26rem;
                color: #ff9129;
            }
            .tips-three {
                border: 1px solid #c5c5c5;
                font-size: .24rem;
                border-radius: .13rem;
                margin-top: .15rem;
                text-align: justify;
                padding: .22rem .3rem;
                line-height: .34rem;
                color: #8593bb;
                a {
                    color: #ff9129;
                    text-decoration: underline;
                }
            }
        }
    }

    .card-content {
        padding-bottom: 0;
        .sms-control {
            .sms-exp {
                width: 5.2rem;
                height: 3.68rem;
                margin: .3rem auto;
                background-image: url('../assets/images/sms-exp.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }
    }

</style>
<script>
	import processComponents from '@/components/process'
	import router from '@/router'

	export default{
		data(){
			return {
				isFree: !!sessionStorage.isFree,
				go: false
			}
		},
		methods: {
			goProfile:function () {
				var set = {
					name: 'goProfile',
					type: 'event'
				};
				this.$log(set)
				router.push({path:'/profile'})
			}
        },
		created: function () {
			var $this = this;
			$this.$store.commit('setTitle', '提交完成')
			$this.$store.commit('setIcon', {back: true, question: false, profile: false})
			$this.$store.commit('setFooter', true)
			$this.$store.commit('setIndex', true)
		},
		computed: {
			user(){
				return this.$store.state.user
			},
			isLogin(){
				return this.$store.getters.isLogin
			},
		},
		components: {processComponents},
	}
</script>
