<!-- 首页内容渲染 -->
<template>
    <div>
        <div v-if="isLogin">
            <div class="profile-info">
                <img src="../assets/images/icons/icon-avatar.png" alt="">
                <div v-if="status == 0 || status == 5">
                    <div class="tips-control">
                        <p class="vip-phone">{{user.phone}}<i class="deted"></i></p>
                        <p class="tips-text status-four">服务未开通</p>
                    </div>
                </div>
                <div v-if="status == 1 || status == 3 || status == 4 || status == 6">
                    <div class="vip-date">
                        <p class="vip-phone">{{user.phone}} <i class="deting"></i></p>
                        <p class="date">服务到期时间：{{endTime}}</p>
                    </div>
                </div>
                <div v-if="status == 2">
                    <div class="tips-control">
                        <p class="vip-phone">{{user.phone}} <i class="deted"></i></p>
                        <p class="tips-text status-four">服务已到期，请续费</p>
                    </div>
                </div>
                <a @click="goPay()" class="continu-pay" v-if="status !== 5"
                   v-text="{true:'立即开通',false:'立即续费'}[status === 0]"></a>
                <a @click="getSms()" class="continu-pay" v-else
                   v-text="{true:time + 'S',false:'获取服务开通短信'}[hasSend]" :class="{true:'fixed-width'}[hasSend]"></a>
            </div>
            <div class="vip-state">
                <i></i>
                <div class="state-text">
                    <p>名片状态</p>
                    <p class="card-current" v-text="{0:'未生效',1:'使用中',2:'未生效',3:'设置失败',4:'正在设置',5:'未生效',6:'名片未制作'}[status]"></p>
                </div>
                <a @click="statusGo()" class="continu-pay" v-text="{1:'修改内容',3:'查看原因'}[status]"
                   v-show="status == 1 || status == 3" :class="{true:'state-three'}[status == 3]"></a>
                <a @click="changeGo()" class="change-make" v-show="status == 3">修改内容</a>
                <a @click="changeGo(true)" class="change-make" v-show="status == 6">去制作</a>
            </div>
            <div class="card-content" v-if="templateData">
                <div class="call-content">
                    <div class="show-control">
                        <div class="show-title">
                            <i></i>
                            <p>通话名片 <span class="small-text">(通话时给对方推送名片)</span></p>
                        </div>
                        <ul>
                            <li v-if="goShow">
                                <p>呼叫名片</p>
                                <!--<p class="small-text">(去电时秀给对方)</p>-->
                                <div class="call-bg">
                                    <div class="bg-control">
                                        <div class="bg-content" v-text="goShow.content"></div>
                                    </div>
                                </div>
                            </li>
                            <li v-if="comeShow">
                                <p>接听名片</p>
                                <div class="call-bg">
                                    <div class="bg-control">
                                        <div class="bg-content" v-text="comeShow.content"></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="show-control" v-if="smsData">
                        <div class="show-title">
                            <i></i>
                            <p>图文名片 <span class="small-text">(挂断电话后发送图文信息给客户)</span></p>
                        </div>
                        <div class="show-mms">
                            <div class="mms-image">
                                <img :src="smsData.imgPath" alt="">
                            </div>
                            <div class="mms-content">
                                <p v-text="smsData.content"></p>
                                <p v-text="smsData.address"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="login-info">
                <p class="login-tips">您还没有登录哟！</p>
                <!--<a @click="share()" class="login-box" id="shareBtn">分享</a>-->
                <router-link :to="{path:'/login'}" class="login-box">登 录</router-link>
            </div>
            <div class="login-image">
                <img src="../assets/images/no-login.png" alt="">
                <p>登录之后查看更多信息</p>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .status-two {
        width: 2.1rem;
    }

    .status-three {
        width: 1.8rem;
    }

    .status-four {
        margin-top: .3rem
    }

    .profile-info {
        padding: .2rem 0 .34rem .58rem;
        background-color: #3170eb;
        position: relative;
        overflow: hidden;
        img {
            width: 1.4rem;
            height: 1.4rem;
            float: left;
        }
        .vip-date, .tips-control {
            float: left;
            margin-left: .4rem;
            line-height: .7rem;
            height: 1.4rem;
            p {
                font-size: .34rem;
                color: #fff;
                &.vip-phone {
                    position: relative;
                    display: table;
                }
                &.date, &.tips-date {
                    font-size: .26rem;
                    color: rgba(255, 255, 255, 0.7)
                }
                i {
                    width: .48rem;
                    height: .36rem;
                    display: block;
                    position: absolute;
                    top: .08rem;
                    right: -.61rem;
                    background-image: url('../assets/images/icons/icon-total.png');
                    background-size: 4.64rem 7.52rem;
                    background-repeat: no-repeat;
                    &.deted {
                        background-position: -.48rem -4.62rem;
                    }
                    &.deting {
                        background-position: 0 -4.62rem;
                    }
                }
            }
        }
        .tips-control {
            line-height: .4rem;
            padding: .1rem 0;
            .vip-phone {
                i {
                    top: -.06rem;
                }
            }
            .tips-text {
                font-size: .2rem;
                color: #fff;
                margin-top: .1rem;
                text-align: center;
                line-height: .36rem;
                border-radius: .05rem;
                background-color: #fe9c3f;
                display: table;
                padding: 0 .1rem;
            }

        }
        .continu-pay {
            position: absolute;
            display: block;
            padding: .2rem;
            text-align: center;
            color: #fff;
            background-color: #5d9dff;
            border-radius: .35rem 0 0 .35rem;
            right: 0;
            font-size: .24rem;
            bottom: .36rem;
            &.fixed-width{
                width:.8rem
            }
        }
    }

    .login-info {
        background-color: #3170eb;
        position: relative;
        overflow: hidden;
        .login-tips {
            color: #fff;
            text-align: center;
            margin: .5rem 0;
        }
        .login-box {
            width: 3.54rem;
            height: .8rem;
            display: block;
            border-radius: .1rem;
            border: 1px solid #fff;
            margin: 0 auto .64rem;
            text-align: center;
            line-height: .8rem;
            color: #fff;
            font-size: .32rem;
        }
    }

    .login-image {
        img {
            display: block;
            width: 2.47rem;
            height: 1.99rem;
            margin: 1.93rem auto .74rem;
        }
        p {
            color: #3d557e;
            font-size: .25rem;
            text-align: center;
        }
    }

    .vip-state {
        padding: .55rem .2rem .55rem .42rem;
        position: relative;
        i {
            width: .65rem;
            height: .7rem;
            margin-right: .5rem;
            position: absolute;
            top: .55rem;
            left: .42rem;
            background-image: url('../assets/images/icons/icon-total.png');
            background-size: 4.64rem 7.52rem;
            background-repeat: no-repeat;
            background-position: 0 -3.84rem;
        }
        .state-text {
            width: 3rem;
            position: absolute;
            top: .4rem;
            left: 1.57rem;
            p {
                font-size: .28rem;
                color: #7a88b2;
                &.card-current {
                    font-size: .34rem;
                    color: #4f566a;
                    font-weight: bolder;
                    margin-top: .1rem
                }
            }
        }
        .continu-pay,.change-make {
            position: absolute;
            top: .6rem;
            right: .2rem;
            font-size: .24rem;
            color: #7a88b2;
            border: 1px solid #ccc;
            border-radius: .05rem;
            padding: .15rem;
            &.state-three{
                top:.2rem;
            }
        }

        .change-make{
            top:1rem;
        }
    }

    .show-control {
        .show-title {
            position: relative;
            padding: 0 .16rem;
            i {
                background-color: #3170eb;
                width: .06rem;
                height: .22rem;
                border-radius: .03rem;
                margin: .04rem .1rem .04rem 0;
                position: absolute;
                top: .46rem;
                left: 0;
            }
        }
    }

</style>
<script>
	import router from '@/router'
	import soshm from 'soshm'

	Date.prototype.Format = function (fmt) { //author: meizz
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	export default{
		data(){
			return {
				templateData:[],
				smsData:undefined,
				goShow:undefined,
				comeShow:undefined,
                hasSend:false,
				time:60
			}
		},
		methods: {
			changeGo:function (isEmpty) {
				var set = {
					name: 'goChange',
					type: 'event'
				};
				this.$log(set)
				router.push({path: '/make',query:{ischange:true}})
			},
			statusGo: function () {
				if (this.status === 1) {
					var set = {
						name: 'goChange',
						type: 'event'
					};
					this.$log(set)
					router.push({path: '/make'})
				} else {
					var set = {
						name: 'goFailed',
						type: 'event'
					};
					this.$log(set)
					router.push({path: '/failed'})
				}
			},
            getSms:function(){
	            var $this = this
                if(this.hasSend){
	            	return false
                }
                this.hasSend = true
	            var timer = setInterval(function () {
		            $this.time--;
		            if ($this.time === 0) {
			            clearInterval(timer);
			            $this.hasSend = false;
			            $this.time = 60;
		            }
	            }, 1000)
	            //重获短信
	            var set = {
		            name: 'regetSms',
		            type: 'event'
	            };
	            this.$log(set).then(function () {
		            $this.$axios.post('/api/order/orderreply',{uid:$this.user.uid}).then(function (response) {
			            var rlt = response.data;
			            if(rlt.header.code === '0'){

			            } else{
				            $this.$tips(rlt.header.msg)
			            }
		            }).catch(function (error) {
			            //$this.$tips('api error')
		            });
	            })
            },
			goPay: function () {
				var $this = this
				if (this.status === 0) {
					var set = {
						name: 'startVip',
						type: 'event'
					};
					this.$log(set).then(function () {
						router.push({path: '/pay', query: {process: true}})
					})
				} else {
					var set = {
						name: 'repay',
						type: 'event'
					};
					this.$log(set).then(function () {
						router.push({path: '/pay', query: {repay: true}})
					})
				}
			},
            getTemplate:function () {
				var $this = this;
				return new Promise(function (resolve) {
					$this.$axios.post('/api/template/gettemplate').then(function (response) {
						var rlt = response.data;
						if(rlt.header.code === '0'){
                            resolve(rlt.list)
						} else{
							resolve()
						}
					}).catch(function (error) {
						resolve()
					});
				})

            },
			share:function () {
				soshm('#shareBtn', {
					// 分享的链接，默认使用location.href
					url: 'http://caimao.ringbox.com.cn',
					// 分享的标题，默认使用document.title
					title: '我的妈呀',
					// 分享的摘要，默认使用<meta name="description" content="">content的值
					digest: '',
					// 分享的图片，默认获取本页面第一个img元素的src
					pic: '',
					// 默认显示的网站为以下六个个,支持设置的网站有
					// weixin,weixintimeline,qq,qzone,yixin,weibo,tqq,renren,douban,tieba
					sites: ['weixin', 'weixintimeline','qq',]
				});
				/*soshm.popIn({
					title: '弹窗分享',
					sites: ['weixin', 'weixintimeline', 'qzone', 'qq']
				});*/
			}
		},
		created: function () {
			var $this = this
			this.$store.commit('setTitle', '个人中心')
			this.$store.commit('setIcon', {back: true, question: true, profile: false})
			this.$store.commit('setFooter', false)
			this.$store.commit('setIndex',true)
            if(this.isLogin){
	            this.$axios.post('/api/login/loginmsg',{
		            phone:$this.user.phone
	            }).then(function (response) {
		            var rlt = response.data;
		            if(rlt.header.code === '0'){
			            $this.user.card.isvip = rlt.isvip
			            $this.user.card.endTime = rlt.endTime
			            $this.user.card.setstate = rlt.setstate
		            }
	            })
	            this.getTemplate().then(function (result) {
                    if(result){
                    	var templateData = result
	                    templateData.forEach(function (item) {
		                    if (item.type === 1 || item.type === 2) {
			                    item.type === 2 && ($this.goShow = item)
			                    item.type === 1 && ($this.comeShow = item)
		                    } else {
			                    $this.smsData = {
				                    content: item.content.split(',')[0].replace('[XXX]', $this.user.card.company),
				                    address: item.content.split(',')[1].replace('[XXX]', $this.user.card.address),
                                    imgPath:item.imgPath
			                    }
		                    }
	                    })
                        var str = $this.user.card.company + ($this.user.card.name ? $this.user.card.name : '')
	                    $this.goShow.content = $this.goShow.content.replace('[XXX]', str)
	                    $this.comeShow.content = $this.comeShow.content.replace('[XXX]', str)
                    }
	            })
            }
		},
		components: {},
		computed: {
			isLogin(){
				return this.$store.state.isLogin
			},
			user(){
				return this.$store.state.user
			},
			status(){
				//0:服务未开通 1：设置成功 2 ：服务到期 3：设置失败 4 :设置中 5:未回复短信 6:开通服务但未制作，直接跳到个人中心
                var state = this.$store.state.user.card.setstate;
                if(parseInt(state) === 4 && !this.$store.state.user.card.company.length){
	                return 6
                }else{
	                return parseInt(state)
                }
				console.log('服务状态'+ state)
			},
            endTime(){
	            var state = this.status
	            if(state === 1 || state === 3 || state === 4 || state === 6){
		            if(this.$store.state.user.card.endTime){
			            var time = this.$store.state.user.card.endTime;
			            return new Date(parseInt(time)).Format('yyyy/MM/dd')
		            }
	            }else{
	            	return 0
                }
            }
		}
	}
</script>
