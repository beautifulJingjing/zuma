<!-- 首页内容渲染 -->
<template>
    <div slot="container" class="wrapper">
        <div class="card-content">
            <div class="call-content">
                <div class="title">
                    <i></i>
                    <span>请简单描述您的问题</span>
                </div>
                <div class="type-text">
                    <ul class="type-list">
                        <li v-for="item in questionTypes"
                            @click="getType(item)"
                            :class="{true : 'current'}[item.active]">
                            {{item.text}}
                        </li>
                    </ul>
                    <div class="textarea-box">
                        <textarea name="description" v-model="content" placeholder="请输入您想要给我们的建议..."></textarea>
                    </div>
                    <div class="textarea-box phone-box">
                        <input name="description" v-model="phone" placeholder="请填写您的手机"/>
                    </div>
                    <div class="textarea-box phone-box">
                        <input name="description" v-model="qq" placeholder="请填写您的QQ"/>
                    </div>
                    <div class="textarea-box phone-box">
                        <input name="description" v-model="email" placeholder="请填写您的邮箱"/>
                    </div>
                </div>
                <div class="bottom">
                    <div class="btn">
                        <a @click="submit()" :class="{false:'btn-nosubmit',true:'btn-submit'}[canSubmit]">提交</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .card-content {
        padding: .4rem .2rem 0;
        .type-text {
            margin-top: .25rem;
        }
        .has-border-left {
            position: relative;
            display: inline-block;
            margin-left: .74rem;

            &:before {
                content: "";
                display: block;
                position: absolute;
                height: .3rem;
                width: 1px;
                background: #7d7d7d;
                left: -0.37rem;
            }
        }

        h2 {
            margin: .3rem 0 .24rem;
            font-size: .28rem;
        }

        .textarea-box {
            margin: .3rem 0 .25rem;
            padding: .1rem .2rem;
            border: 1px solid #e2e2e2;
            border-radius: .07rem;
            height: 2.3rem;
            font-size: .28rem;
            &.phone-box {
                height: .9rem;
                width: 100%;
                input {
                    display: block;
                    font-size: .26rem;
                    width: 100%;
                    height: 100%;
                }
            }
            textarea {
                font-size: .26rem;
                width: 100%;
                height: 100%;
            }
        }

        .type-list {
            text-align: center;

            &:after {
                display: block;
                content: "";
                clear: both;
            }

            li {
                float: left;
                padding: 0 .13rem;
                font-size: 0.25rem;
                height: .6rem;
                line-height: .6rem;
                border-radius: .1rem;
                border: 1px solid #e2e2e2;

                & + li {
                    margin-left: .16rem;
                }

                &.current {
                    background: rgba(56, 123, 238, 0.1);
                    border-color: #387bee;
                }
            }
        }
    }

</style>
<script>
	import router from '@/router/index'

	export default{
		data(){
			return {
				type: this.$route.query.type || 0,
				questionTypes: undefined,
				content: '',
				email: '',
				phone:'',
                qq:'',
				hasType: false
			}
		},
		methods: {
			getType: function (item) {
				this.questionTypes.forEach(function (data) {
					data.active = false;
				})
				item.active = true;
				this.content = item.text;
				this.hasType = true;
			},
			submit: function () {
				var $this = this,data;
				if (!this.isLogin) {
					router.push('/login')
					return
				}
				data = {
					content: $this.content,
					uid: $this.user.uid
                }
                this.email && (data.email =  $this.email);
                this.phone && (data.phone =  $this.phone);
                this.qq && (data.qq =  $this.qq);
				this.$axios.post('/api/feedback/feed', data).then(function (response) {
					var rlt = response.data;
					if (rlt.header.code === '0') {
						//router.push('/profile')
						$this.$tips('感谢您的反馈，我们会尽快处理')
					} else {
						$this.$tips(rlt.header.msg)
					}
				}).catch(function (error) {

				});
			}
		},
		created: function () {
			this.question = [
				[
					{text: '平台不流畅', active: false},
					{text: '制作时间太长', active: false},
					{text: '无法支付', active: false},
					{text: '不清楚规则', active: false},
				],
				[
					{text: '铃音不太清晰', active: false},
					{text: '主播声音不太满意', active: false},
					{text: '语速不太满意', active: false}
				]
			];
			this.questionTypes = this.question[this.type]
            this.phone = this.user.phone
			this.$store.commit('setTitle', '意见反馈')
			this.$store.commit('setIcon', {back: true, question: false, profile: false})
			this.$store.commit('setFooter', false)
			this.$store.commit('setIndex', true)
		},
		computed: {
			isLogin(){
				console.log(this.$store.getters)
				return this.$store.getters.isLogin
			},
			// 能否提交
			canSubmit: function () {
				if (this.content && this.hasType && (this.email || this.phone || this.qq)) {
					return true
				}
				else {
					return false
				}
			},
			user(){
				return this.$store.state.user
			},
		},
		components: {},

	}
</script>
