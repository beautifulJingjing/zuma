<!-- 首页内容渲染 -->
<template>
    <div slot="container">
        <div class="questionBox" v-for="item in questionAttr">
            <!--<div class="title-box">
                <div class="left">{{item.title}}</div>
            </div>-->
            <div class="title">
                <i></i>
                <span>{{item.title}}</span>
            </div>
            <dl class="question" v-for="questItem in item.questions">
                <dt class="questionTitle" v-if="questItem.question" @click="questItem.shows = !questItem.shows">
                    {{questItem.question}}
                    <span class="icon" :class="{'up':questItem.shows,'down':!questItem.shows}"></span>
                </dt>
                <dd class="questionContent" v-show="questItem.shows" v-html="questItem.questionContent">
                </dd>
            </dl>
            <!--<div class="line"></div>-->
        </div>
    </div>
</template>
<style lang="less">
    .questionBox:last-child {
        border: none;
    }

    .questionBox {
        padding: 0.4rem 0;
        border-bottom: 0.1rem solid #f7f7f7;
        .question {
            padding: 0 0.36rem;
            .questionTitle {
                position: relative;
                padding: 0.04rem .4rem .04rem 0;
                margin-bottom:.2rem;
            }
            .questionContent {
                margin:0.2rem 0 0.2rem;
                color: #8593bb;
                font-size: 0.26rem;
            }
            .icon {
                position: absolute;
                right: 0.1rem;
                display: inline-block;
                width: 0.2rem;
                height: 0.13rem;
                top: 50%;
                transform: translateY(-50%);
                &.up {
                    background: url("../assets/images/icons/icon-arow_up.png") no-repeat;
                    background-size: 0.2rem 0.12rem;
                }
                &.down {
                    background: url("../assets/images/icons/icon-arow_down.png") no-repeat;
                    background-size: 0.2rem 0.12rem;
                }
            }
        }
    }
    .title {
        height: .30rem;
        padding: 0 0.2rem;
        margin-bottom:.2rem;
        i, span {
            display: block;
            float: left;
        }
        i {
            background-color: #3170eb;
            width: .06rem;
            height: .22rem;
            border-radius: .03rem;
            margin: .04rem .1rem .04rem 0;
        }
        span {
            line-height: .30rem;
        }
    }
</style>
<script>
	import sms from '@/components/index/sms'
	import freefirst from '@/components/index/freefirst'

	export default{
		data(){
			return {
				questionAttr: [
					{
						title: '服务相关问题',
						questions: [
							{
								shows: false,
								question: 'Q:哪些省份可以办理品牌商务彩印业务？',
								questionContent: '目前陕西、河南、安徽、云南、贵州、山西、四川、江西、浙江、湖南、重庆、甘肃、福建、北京、黑龙江、广西、海南、吉林、辽宁省份支持该业务，其他省份陆续开通中'
							}, {
								shows: false,
								question: 'Q:办理了一年的财猫通话名片业务，还有半年到期，现在不想用了，能退钱么？',
								questionContent: '本产品为协议预付产品，已付款项不进行退还。'
							}, {
								shows: false,
								question: 'Q:手机号码是业务支持的省份，为什么总是开通失败？',
								questionContent: '请核查是否订购有和财猫通话名片（彩印）业务相冲突的其他业务，请拨打10086取消冲突业务后进行重试。'
							}, {
								shows: false,
								question: 'Q:业务开通后为什么不生效？',
								questionContent: '请核查手机是否有设置移动4G通话volte高清语音服务，请取消设置后进行重试。'
							}, {
								shows: false,
								question: 'Q:开通了财猫通话名片业务，哪些人可以看到设置的名片内容？',
								questionContent: '所有中国移动手机用户在拨打客户的手机时，都也可以看到设置的名片内容。'
							}, {
								shows: false,
								question: 'Q:联通和电信的号码可以开通财猫通话名片业务么？',
								questionContent: '暂不支持，我们正在努力争取中。'
							}, {
								shows: false,
								question: 'Q:财猫通话名片设置后，多久能生效？',
								questionContent: '设置后24小时内生效。'
							}, {
								shows: false,
								question: 'Q:财猫通话名片推送时间有限制么？',
								questionContent: ' 工作日8小时内有效（早上9点到晚上6点）。'
							}, {
								shows: false,
								question: 'Q:彩印作品商户名称字数有限制吗？',
								questionContent: '公司名称（必填）最多20字 ，公司地址（必填）最多20字，姓名（非必填）最多4字。'
							}, {
								shows: false,
								question: 'Q:财猫通话名片支持图片和视频吗？',
								questionContent: ' 目前只支持图片，视频暂不支持。'
							}, {
								shows: false,
								question: 'Q:我只想使用呼叫名片的功能，其他的两个功能不需要了，可以单独只使用这一个功能吗？',
								questionContent: ' 可以单独使用，请本机拨打4001009440取消。'
							}, {
								shows: false,
								question: 'Q:不想使用财猫通话名片业务了，如何退订？',
								questionContent: ' 拨打4001009440人工台，客服为您退订业务处理。'
							}
						]
					},
					{
						title: '更多问题',
						questions: [
							{
								shows: true,
								questionContent: '上述解答还没解决您的问题，请及时与我们的客服联系'
							}
						]
					}
				]
			}
		},
		methods: {},
		created: function () {
			this.$store.commit('setTitle', '常见问题')
			this.$store.commit('setIcon',{back:true,question:false,profile:false})
			this.$store.commit('setFooter',true)
			this.$store.commit('setIndex',true)
		},
		components: {
			sms,
			freefirst
		},

	}
</script>
