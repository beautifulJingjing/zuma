<!-- 首页内容渲染 -->
<template>
    <div class="view-index">
        <div class="index-bar">
            <div class="jswbox-text">
                <div class="jswbox-center active">
                    <div class="go-title"></div>
                    <p>每一次拨打，都展示了您个人和公司的专业形象</p>
                </div>
                <div class="jswbox-center">
                    <div class="come-title"></div>
                    <p>每一次接听，都是对客户的问候和关怀</p>
                </div>
                <div class="jswbox-center">
                    <div class="sms-title"></div>
                    <p>每一次挂断，都可能是下一次合作的契机</p>
                </div>
            </div>
            <div class="jswbox-bar">
                <div id="jswbox">
                    <pre class="prev"></pre>
                    <pre class="next"></pre>
                    <ul>
                        <li value="0"><img src="../../assets/images/go-call.png" alt="derrick" /></li>
                        <li value="1"><img src="../../assets/images/come-call.png" alt="derrick" /></li>
                        <li value="2"><img src="../../assets/images/sms-call.png" alt="derrick" /></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="btn-bar" id="searchBar">
            <div class="buttom" @click="toMake()">
                <!--<div class="btn-img"></div>-->
            </div>
        </div>
        <p class="activity-time">活动时间：2017年10月1日-2017年11月30日</p>
        <div class="introduce">
            <img src="../../assets/images/index-title.png" alt="">
            <div class="title">
                <div class="make-item item-one">
                    <!--index-company-->
                    <div class="item-text">
                        <div class="item-title">
                            <i>1</i>
                            <span>100%展现</span>
                        </div>
                        <p>
                            不会被任何安全软件拦截， 名片内容100%展现在客户手机屏幕上
                        </p>
                    </div>
                </div>
                <div class="make-item item-two">
                    <!--index-company-->
                    <div class="item-text">
                        <div class="item-title">
                            <i>2</i>
                            <span>提升80%的电话</br>接通率</span>
                        </div>
                        <p>
                            向客户展示专业形象，提升电话接通率，商务沟通事半功倍
                        </p>
                    </div>
                </div>
                <div class="make-item item-three">
                    <!--index-company-->
                    <div class="item-text">
                        <div class="item-title">
                            <i>3</i>
                            <span>在线免费制作，</br>只需30秒</span>
                        </div>
                        <p>
                            无需安装客户端，在线免费制作。填写您想要向客户展示的信息，即可自动生成个性名片。内容随时更换，24小时内生效
                        </p>
                    </div>
                </div>
                <div class="make-item item-four">
                    <!--index-company-->
                    <div class="item-text">
                        <div class="item-title">
                            <i>4</i>
                            <span>永久保存</span>
                        </div>
                        <p>图文名片以彩信形式发送至客户手机，客户随时随地都可查看，为商务合作提供无限可能 </p>
                    </div>
                </div>
                <div class="make-item item-five">
                    <!--index-company-->
                    <div class="item-text">
                        <div class="item-title">
                            <i>5</i>
                            <span>一触即发</span>
                        </div>
                        <p>每一次通话，通话前和通话后都会发送一条名片。 深化客户服务感知，提升企业形象 </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <img src="../../assets/images/activity/rule.png" alt="">
            <div class="rule-text">
                <ul>
                    <li><span>1、</span>活动时间：2017年10月1日-2017年11月30日。</li>
                    <li><span>2、</span>活动期间，接到短信的手机号码限领一次，分享他人领取无效。</li>
                    <li><span>3、</span>领取成功的用户，免费使用时间从领取之日起至2017年11月30日。</li>
                    <li><span>4、</span>本次活动不折现、不退款。</li>
                </ul>
            </div>
        </div>
        <div class="float-btn" v-show="searchBarFixed">
            <div class="buttom" @click="toMake()">
                <div class="btn-img"></div>
            </div>
        </div>
        <div class="index-footer" @click="toMake()">

        </div>
        <dialogComponents :goMake="goMake" :goProfile="goProfile" :dialogContent="dialogContent" v-if="dialogShow"></dialogComponents>
    </div>
</template>
<style lang="less" scoped>
    @import '../../plugins/zoompic/css/css.css';
    @keyframes fingermove {
        0%{
            top:.46rem;
            right:.5rem;
        }
        50%{
            top:.76rem;
            right:.4rem;
        }
        100% {
            top:.46rem;
            right:.5rem;
        }
    }
    @keyframes fingermove2 {
        0%{
            top:.46rem;
            right:1.1rem;
        }
        50%{
            top:.76rem;
            right:.9rem;
        }
        100% {
            top:.46rem;
            right:1.1rem;
        }
    }
    .view-index {
        padding-top: 0!important;
        background-image: url('../../assets/images/bg-repeat.jpg');
        background-size:100% auto;
        background-position: 0 9.12rem;
        background-repeat: repeat;
        position: relative;
        .index-bar {
            width: 100%;
            height:8.18rem;
            background-image: url('../../assets/images/activity/star-top.jpg');
            background-size:100% auto;
            background-repeat: no-repeat;
            position: relative;
            overflow-x: hidden;
            .jswbox-text{
                width:100%;
                position: absolute;
                bottom: 4.54rem;
                left:0;
                .jswbox-center{
                    display:none;
                    &.active{
                        display:block;
                    }
                }
                p{
                    width:100%;
                    text-align: center;
                    color:#c4c3c8;
                }
                .go-title{
                    width:1.64rem;
                    height:.41rem;
                    margin:0 auto;
                    background-image: url('../../assets/images/go-titile.png');
                    background-size:100% auto;
                    background-repeat: no-repeat;
                }
                .come-title{
                    width:1.64rem;
                    height:.41rem;
                    margin:0 auto;
                    background-image: url('../../assets/images/come-title.png');
                    background-size:100% auto;
                    background-repeat: no-repeat;
                }
                .sms-title{
                    width:1.64rem;
                    height:.41rem;
                    margin:0 auto;
                    background-image: url('../../assets/images/sms-title.png');
                    background-size:100% auto;
                    background-repeat: no-repeat;
                }
            }
            .jswbox-bar{
                position: absolute;
                bottom:0;
                height:4.6rem;
                width:7.5rem;
                .prev{
                    width:.6rem;
                    height:.6rem;
                    position: absolute;
                    left:.3rem;
                    top:50%;
                    margin-top:-.3rem;
                    z-index:2;
                    background-image: url('../../assets/images/icons/arrow_left.png');
                    background-size:100% auto;
                    background-repeat: no-repeat;
                }
                .next{
                    width:.6rem;
                    height:.6rem;
                    position: absolute;
                    right:.3rem;
                    top:50%;
                    margin-top:-.3rem;
                    z-index:2;
                    background-image: url('../../assets/images/icons/arrow_right.png');
                    background-size:100% auto;
                    background-repeat: no-repeat;
                }
            }

        }
        .btn-bar,.float-btn{
            height:1.55rem;
            width:100%;
            .buttom{
                height:100%;
                width:6.03rem;
                margin: .2rem auto 0;
                background-image: url('../../assets/images/activity/free-btn.gif');
                background-size:100% auto;
                background-repeat: no-repeat;
                position:relative;
            }
        }
        .activity-time {
            color: #c4c3c8;
            text-align: center;
            font-size: .2rem;
            line-height:.5rem;
        }
        .introduce {
            position: relative;
            z-index: 2;
            padding-bottom:.53rem;
            img {
                display: block;
                position: absolute;
                top: .27rem;
                width: 100%;
            }
            .title {
                padding: 1.42rem 0 .35rem;
                margin: .15rem auto;
                background-color: #fff;
                border-radius: .1rem;
                display: table;
                .make-item {
                    width: 6.78rem;
                    height: 3.35rem;
                    margin: 0 .18rem;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    position: relative;
                    .item-text {
                        width: 3.3rem;
                        position: absolute;
                        .item-title {
                            padding: 0 0 .15rem .45rem;
                            position: relative;
                            i {
                                position: absolute;
                                left: 0;
                                top: .05rem;
                                width: .3rem;
                                height: .3rem;
                                margin-right: .15rem;
                                line-height: .3rem;
                                background-color: #7582f5;
                                border-radius: 50%;
                                color: #fff;
                                font-size: .15rem;
                                text-align: center;
                            }
                            span {
                                font-size: .3rem;
                                color: #313962;
                                font-weight: bold;
                            }
                        }
                        p {
                            font-size: .24rem;
                            padding-left: .45rem;
                            color: #68748c;
                        }
                    }
                    &.item-one {
                        background-image: url('../../assets/images/item-one.png');
                        .item-text {
                            top: .42rem;
                            left: .2rem;
                        }
                    }
                    &.item-two {
                        height: 3.79rem;
                        background-image: url('../../assets/images/item-two.png');
                        .item-text {
                            top: .8rem;
                            right: .2rem;
                        }
                    }
                    &.item-three {
                        height: 3.79rem;
                        background-image: url('../../assets/images/item-three.png');
                        .item-text {
                            top: .3rem;
                            left: .2rem;
                        }
                    }
                    &.item-four {
                        height: 3.79rem;
                        background-image: url('../../assets/images/item-four.png');
                        .item-text {
                            top: .57rem;
                            right: .2rem;
                        }
                    }
                    &.item-five {
                        height: 3.79rem;
                        background-image: url('../../assets/images/item-five.png');
                        .item-text {
                            top: .76rem;
                            left: .2rem;
                        }
                    }
                }
            }
            .free-title {
                padding: .9rem .38rem .5rem 1.86rem;
                margin: .2rem .18rem .36rem;
                background-color: #fff;
                border-radius: .1rem;
                .free-item {
                    position: relative;
                    height: 1.82rem;
                    border-bottom: 1px dashed #b7b0b1;
                    padding: .45rem 0;
                    i {
                        position: absolute;
                        left: -1.27rem;
                        display: block;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .free-text {
                        .text-title {
                            font-size: .28rem;
                            font-weight: bold;
                            margin-bottom: .1rem;
                        }
                        .text-content {
                            color: #7a88a5;
                        }
                    }
                }
            }
        }
        .float-btn{
            width:100%;
            height:1.77rem;
            background-image: url('../../assets/images/bg-repeat.jpg');
            background-size:100% auto;
            background-repeat: repeat;
            position:fixed;
            top:0;
            left:0;
            z-index:1000;
        }
        .index-footer {
            height: 1.52rem;
            width: 100%;
            background-image: url('../../assets/images/index-bg.jpg');
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .rule {
            padding-top: .55rem;
            overflow: hidden;
            background-color: #150732;
            img {
                display: block;
                width: 2.73rem;
                height: .55rem;
                margin: 0 auto;
            }
            .rule-text {
                padding: .35rem .25rem 0;
                ul {
                    li {
                        font-size: .24rem;
                        color: #fff;
                        line-height: .44rem;
                        position: relative;
                        padding-left: .35rem;
                        span {
                            display: block;
                            width: .27rem;
                            height: .22rem;
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                    }
                }
            }
        }
    }
</style>
<script>
	import router from '@/router'
	import cookie from '@/common/cookie'
	import dialogComponents from '@/components/dialog'
	import phoneEncry from '../../../server/tools/phoneEncry'
	import ZoomPic from '@/plugins/zoompic/js/ZoomPic'

	export default{
		data(){
			return {
				dialogShow: false,
				searchBarFixed:false,
				dialogContent: {
					type: 2,
					title: '提示',
					content: '您已设置了专属的财猫通话名片'
				}
			}
		},
		methods: {
			handleScroll:function () {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				var offsetTop = document.querySelector('#searchBar').offsetTop
				if (scrollTop > offsetTop) {
					this.searchBarFixed = true
				} else {
					this.searchBarFixed = false
				}

			},
			getVip: function () {
				var $this = this;
				return new Promise(function (resolve) {
					$this.$axios.post('/api/order/pay', {
						busineType: '2',
						uid: $this.user.uid
					}).then(function (response) {
						var rlt = response.data;
						if (rlt.header.code === '0') {
							resolve('ok')
						} else {
							resolve()
						}
					}).catch(function (error) {
						//$this.$tips('api error')
					});
				})
			},
			toMake: function () {
				var $this = this;
				cookie.setCookie('isFree',true,1) //兼容sarafi chrome uc浏览器无痕模式
				if(!this.isLogin){
	                this.$tips('用户信息获取失败，请检查手机号是否为移动号码')
	                return
                }
				if(this.user && this.$route.query.a && phoneEncry.decodePhone(this.$route.query.a).toString() !== this.user.phone){
					this.$tips('用户信息获取失败')
					return
				}
				if($this.user.card.isvip === '1'){
					$this.dialogShow = true
					var set = {
						name: 'alertVip',
						type: 'event'
					};
					$this.$log(set)
				}else{
					var set = {
						name: 'getFreeVip',
						type: 'event'
					};
					$this.$log(set)
					$this.getVip().then(function (result) {
						if(result === 'ok'){
							//新用户
							cookie.setCookie('new',true,1)
							$this.$tips('免费会员领取成功，快去制作吧')
                            router.push({path: '/make', query: {process: true}})
						}else{
							$this.$tips('免费会员领取失败')
						}
					})
                }
			},
			goProfile: function () {
				this.dialogShow = false;
				var set = {
					name: 'goProfile',
					type: 'event'
				};
				this.$log(set).then(function () {
					router.push({path: '/profile'})
				})
			},
			goMake: function () {
				var $this = this
				var set = {
					name: 'goMake',
					type: 'event'
				};
				this.$log(set).then(function () {
					$this.dialogShow = false;
					router.push({path: '/make'})
				})
			}
		},
		created: function () {
			this.$store.commit('setTitle', '财猫通话名片 限时免费活动')
			this.$store.commit('setIcon', {back: false, question: false, profile: false})
			this.$store.commit('setFooter', false)
			this.$store.commit('setFree', true)
			this.$store.commit('setIndex', false)
			window.addEventListener('scroll', this.handleScroll)
		},
		mounted () {
			new ZoomPic("jswbox");
		},
		computed: {
			isLogin(){
				return this.$store.getters.isLogin
			},
			user(){
				return this.$store.state.user
			}
		},
		components: {
			dialogComponents
		},
	}
</script>
