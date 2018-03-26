<!-- 首页内容渲染 -->
<template>
    <!--<div id="warpper" class="view-index">
        <div>
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
                            <li value="0"><img src="../assets/images/go-call.png" alt="derrick"/></li>
                            <li value="1"><img src="../assets/images/come-call.png" alt="derrick"/></li>
                            <li value="2"><img src="../assets/images/sms-call.png" alt="derrick"/></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="btn-bar" id="searchBar">
                <div class="buttom" @click="goMake()">
                </div>
            </div>
            <div class="introduce">
                <img src="../assets/images/index-title.png" alt="">
                <div class="title">
                    <div class="make-item item-one">
                        &lt;!&ndash;index-company&ndash;&gt;
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
                        &lt;!&ndash;index-company&ndash;&gt;
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
                        &lt;!&ndash;index-company&ndash;&gt;
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
                        &lt;!&ndash;index-company&ndash;&gt;
                        <div class="item-text">
                            <div class="item-title">
                                <i>4</i>
                                <span>永久保存</span>
                            </div>
                            <p>图文名片以彩信形式发送至客户手机，客户随时随地都可查看，为商务合作提供无限可能 </p>
                        </div>
                    </div>
                    <div class="make-item item-five">
                        &lt;!&ndash;index-company&ndash;&gt;
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

        </div>
        <div class="float-btn" id="fix_get" @click="goMake()">
        &lt;!&ndash;<img src="../assets/images/make-btn.gif" alt="">&ndash;&gt;
        <div class="buttom">
            <div class="btn-img"></div>
        </div>
    </div>
    </div>-->
    <div>
        <input type="file" id="inputBox" multiple>
        <ul class="fileUl"></ul>
        选择的文件数：<span id="fileNum">0</span>
        总共大小：<span id="fileSize">0</span>
    </div>

</template>
<style lang="less" scoped>
    @import '../plugins/zoompic/css/css.css';

    @keyframes fingermove {
        0% {
            top: .46rem;
            right: .5rem;
        }
        50% {
            top: .76rem;
            right: .4rem;
        }
        100% {
            top: .46rem;
            right: .5rem;
        }
    }

    @keyframes fingermove2 {
        0% {
            top: .46rem;
            right: 1.1rem;
        }
        50% {
            top: .76rem;
            right: .9rem;
        }
        100% {
            top: .46rem;
            right: 1.1rem;
        }
    }
    .view-index {
        padding-top: 0 !important;
        background-image: url('../assets/images/bg-repeat.jpg');
        background-size: 100% auto;
        background-position: 0 9.12rem;
        background-repeat: repeat;
        position: relative;
        //padding:7.83rem 0 1.03rem;
        .index-bar {
            width: 100%;
            height: 8.18rem;
            background-image: url('../assets/images/star-top.jpg');
            background-size: 100% auto;
            background-repeat: no-repeat;
            position: relative;
            overflow-x: hidden;
            .jswbox-text {
                width: 100%;
                position: absolute;
                bottom: 4.54rem;
                left: 0;
                .jswbox-center {
                    display: none;
                    &.active {
                        display: block;
                    }
                }
                p {
                    width: 100%;
                    text-align: center;
                    color: #c4c3c8;
                }
                .go-title {
                    width: 1.64rem;
                    height: .41rem;
                    margin: 0 auto;
                    background-image: url('../assets/images/go-titile.png');
                    background-size: 100% auto;
                    background-repeat: no-repeat;
                }
                .come-title {
                    width: 1.64rem;
                    height: .41rem;
                    margin: 0 auto;
                    background-image: url('../assets/images/come-title.png');
                    background-size: 100% auto;
                    background-repeat: no-repeat;
                }
                .sms-title {
                    width: 1.64rem;
                    height: .41rem;
                    margin: 0 auto;
                    background-image: url('../assets/images/sms-title.png');
                    background-size: 100% auto;
                    background-repeat: no-repeat;
                }
            }
            .jswbox-bar {
                position: absolute;
                bottom: 0;
                height: 4.6rem;
                width: 7.5rem;
                .prev {
                    width: .6rem;
                    height: .6rem;
                    position: absolute;
                    left: .3rem;
                    top: 50%;
                    margin-top: -.3rem;
                    z-index: 2;
                    background-image: url('../assets/images/icons/arrow_left.png');
                    background-size: 100% auto;
                    background-repeat: no-repeat;
                }
                .next {
                    width: .6rem;
                    height: .6rem;
                    position: absolute;
                    right: .3rem;
                    top: 50%;
                    margin-top: -.3rem;
                    z-index: 2;
                    background-image: url('../assets/images/icons/arrow_right.png');
                    background-size: 100% auto;
                    background-repeat: no-repeat;
                }
            }

        }
        .btn-bar, .float-btn {
            height: 1.55rem;
            width: 100%;
            .buttom {
                height: 100%;
                width: 6.03rem;
                margin: .2rem auto 0;
                background-image: url('../assets/images/make-btn.gif');
                background-size: 100% auto;
                background-repeat: no-repeat;
                position: relative;
            }
        }
        .activity-time {
            color: #c4c3c8;
            text-align: center;
            font-size: .2rem;
            line-height: .5rem;
        }
        .introduce {
            position: relative;
            z-index: 2;
            padding-bottom: .53rem;
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
                        background-image: url('../assets/images/item-one.png');
                        .item-text {
                            top: .42rem;
                            left: .2rem;
                        }
                    }
                    &.item-two {
                        height: 3.79rem;
                        background-image: url('../assets/images/item-two.png');
                        .item-text {
                            top: .8rem;
                            right: .2rem;
                        }
                    }
                    &.item-three {
                        height: 3.79rem;
                        background-image: url('../assets/images/item-three.png');
                        .item-text {
                            top: .3rem;
                            left: .2rem;
                        }
                    }
                    &.item-four {
                        height: 3.79rem;
                        background-image: url('../assets/images/item-four.png');
                        .item-text {
                            top: .57rem;
                            right: .2rem;
                        }
                    }
                    &.item-five {
                        height: 3.79rem;
                        background-image: url('../assets/images/item-five.png');
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
        .float-btn {
            width: 100%;
            height: 1.85rem;
            background-image: url('../assets/images/bg-repeat.jpg');
            background-size: 100% auto;
            background-repeat: repeat;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            display: none;
            img {
                display: block;
                width: 6.03rem;
                height: 1.55rem;
                margin: .30rem auto 0;
            }
        }
        .index-footer {
            height: 1.52rem;
            width: 100%;
            background-image: url('../assets/images/index-bg.jpg');
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
	import ZoomPic from '@/plugins/zoompic/js/ZoomPic'
	//import IScroll from '@/plugins/scroll/scroll'

	export default{
		data(){
			return {
				searchBarFixed: false
			}
		},
		methods: {
			goMake: function () {
				delete sessionStorage.isFree;
				if (this.isLogin) {
					if (this.user.card.isvip === '1') {
						var set = {
							name: 'reLogin',
							type: 'event'
						};
						this.$log(set).then(function () {
							router.push({path: '/profile'})
						})
					} else {
						router.push({path: '/make'})
					}
				} else {
					var set = {
						name: 'toLogin',
						type: 'event'
					};
					this.$log(set).then(function () {
						router.push({path: '/login'})
					})
				}
			},
			handleScroll: function () {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				var offsetTop = document.querySelector('#searchBar').offsetTop
				if (scrollTop > offsetTop) {
					$('.float-btn').fadeIn();
				}
				else {
					$('.float-btn').fadeOut();
				}

			}
		},
		created: function () {
			this.$store.commit('setTitle', '彩印名片')
			this.$store.commit('setIcon', {back: false, question: false, profile: true})
			this.$store.commit('setFooter', false)
			this.$store.commit('setIndex', false)
			this.$store.commit('setFree', false)

		},
		destroyed () {
			window.removeEventListener('scroll', this.handleScroll)
		},
		mounted () {
			var $this = this
			//new ZoomPic("jswbox");
			cookie.delCookie('isFree')
			//window.addEventListener('scroll', this.handleScroll)
            var inputBox = document.getElementById('inputBox'),list = []
            console.log(inputBox.files.length)
			inputBox.addEventListener("change",function(){
				for(var i = 0;i<inputBox.files.length;i++){
					var reader = new FileReader();
					var files = inputBox.files[i]; // files可以获取当前文件输入框中选择的所有文件，返回列表
					reader.readAsDataURL(files);
					reader.onload = function () {
						var ulLi = document.createElement('li');
						var ulLiA = document.createElement('a');
						var ulLiimg = document.createElement('img');
						ulLiimg.style.width = '100px'
						ulLiimg.src = this.result
						list.push(this.result)
						$this.$axios.post('/proxy/pictrue',{pictrueList:list}).then(function (response) {
						}).catch(function (error) {
						});
						ulLiA.appendChild(ulLiimg);
						ulLi.appendChild(ulLiA);
						document.getElementsByClassName('fileUl')[0].appendChild(ulLi)
					}
				}

			})

		},
		computed: {
			isLogin(){
				return this.$store.getters.isLogin
			},
			user(){
				return this.$store.state.user
			}
		},
		components: {},

	}
</script>
