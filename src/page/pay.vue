<!-- 首页内容渲染 -->
<template>
    <div :class="{true:'pay-view'}[!$route.query.repay]">
        <processComponents :current="isFree ? 2 : 3" :isFree="isFree" v-if="!$route.query.repay"></processComponents>
        <!--会员时间-->
        <div class="card-content">
            <div class="title">
                <i></i>
                <span>财猫通话名片服务</span>
            </div>
            <div class="vip-control" v-for="(item,index) in monthList">
                <div class="vip-limittime">
                    <span :class="'month-'+ item.month"></span>
                    <u v-if="item.discount!==10"> {{isFree ? '限时' : item.discount + '折'}}</u>
                </div>
                <div class="vip-show">
                    <div class="vip-content">
                        <p>{{item.month}}个月</p>
                        <div class="vip-discount">
                            <p class="vip-money">￥{{item.total}}</p>
                            <p class="discount-money" v-if="item.discount!==10">已优惠{{item.dispay}}元</p>
                        </div>
                    </div>
                    <div class="vip-line"></div>
                </div>
                <i :class="{'active':currentChoose.index === index}" @click="chooseMonth(index,item)"></i>
            </div>
            <!--<div class="vip-control" v-show="isFree">
                <div class="vip-limittime">
                    <span class="month-1"></span>
                    <u>限时</u>
                </div>
                <div class="vip-show">
                    <div class="vip-content">
                        <p>1个月</p>
                        <div class="vip-discount">
                            <p class="vip-money">￥0</p>
                            <p class="discount-money">已优惠5元</p>
                        </div>
                    </div>
                    <div class="vip-line"></div>
                </div>
                <i class="active"></i>
            </div>-->
        </div>
        <!--支付方式-->
        <div class="card-content" v-show="!isFree || $route.query.repay">
            <div class="title">
                <i></i>
                <span>支付方式</span>
            </div>
            <div class="vip-control wechat">
                <div class="vip-limittime">
                    <span></span>
                </div>
                <div class="vip-show">
                    <div class="vip-content">
                        <p>微信支付</p>
                    </div>
                    <div class="vip-line"></div>
                </div>
                <i class="active"></i>
            </div>
        </div>
        <!--支付金额-->
        <div class="card-content">
            <div class="title">
                <i></i>
                <span>需支付： <u>{{totalPay}}元</u></span>
            </div>
        </div>
        <div class="bottom">
            <div @click="submit()" class="btn btn-login">
                <a :class="{true:'btn-submit',false:'btn-nosubmit'}[canSubmit]">{{btnContent}}</a>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .pay-view {
        padding-bottom: 2.5rem
    }

    .card-content {
        padding-bottom: 0;
        .title {
            u {
                font-size: .40rem;
                font-weight: bold;
            }
        }
        .vip-control {
            margin-top: .3rem;
            display: table;
            width: 100%;
            position: relative;
            .vip-limittime {
                position: relative;
                width: .9rem;
                height: .9rem;
                float: left;
                margin-right: .2rem;
                u {
                    position: absolute;
                    top: -0.1rem;
                    right: -0.2rem;
                    background-color: #fe5c61;
                    font-size: .20rem;
                    width: .5rem;
                    height: .3rem;
                    text-align: center;
                    border-radius: .15rem;
                    line-height: .3rem;
                    color: #fff;
                }
                span {
                    text-align: center;
                    line-height: .9rem;
                    color: #fff;
                    width: 100%;
                    height: 100%;
                    font-size: .45rem;
                    display: inline-block;
                    background-image: url('../assets/images/icons/icon-total.png');
                    background-size: 4.64rem 7.52rem;
                    background-repeat: no-repeat;
                    &.month-1 {
                        background-position: -2.76rem -1.61rem;
                    }
                    &.month-2 {
                        background-position: -3.68rem -1.61rem;
                    }
                    &.month-3 {
                        background-position: 0 -1.61rem;
                    }
                    &.month-6 {
                        background-position: -.92rem -1.61rem;
                    }
                    &.month-12 {
                        background-position: -1.84rem -1.61rem;
                    }

                }

                p {
                    float: left;
                    line-height: .73rem;
                    margin-left: .2rem;
                }
            }
            i {
                width: .46rem;
                height: .48rem;
                background-image: url('../assets/images/icons/icon-total.png');
                background-size: 4.64rem 7.52rem;
                background-repeat: no-repeat;
                background-position: -.46rem -6.36rem;
                display: block;
                position: absolute;
                right: 0;
                bottom: .54rem;
                margin-top: .22rem;
                &.active {
                    background-position: 0 -6.36rem;
                }
            }
            .vip-show {
                width: 3rem;
                float: left;
                height: 1.2rem;
                position: relative;
                padding-bottom: .3rem;
                .vip-line {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 6.2rem;
                    height: 0;
                    border-bottom: 1px solid #eee;
                }
                .vip-content {
                    font-size: .28rem;
                    line-height: .44rem;
                    .vip-discount {
                        p {
                            line-height: .4rem;
                            float: left;
                            &.vip-money {
                                color: #3170eb;
                                margin-right: .13rem;
                            }
                            &.discount-money {
                                font-size: .24rem;
                            }
                        }
                    }

                }

            }
            &.wechat {
                .vip-limittime {
                    span {
                        width: .73rem;
                        height: .73rem;
                        float: left;
                        background-image: url('../assets/images/icons/icon-total.png');
                        background-size: 4.64rem 7.52rem;
                        background-repeat: no-repeat;
                        background-position: 0 -.78rem;
                        margin-top: 0;
                    }
                }
                .vip-show {
                    height: 1.03rem;
                    .vip-content {
                        line-height: .73rem;
                    }
                }
                i {
                    bottom: .45rem;
                }
            }
        }
        .pay-type {
            padding: .4rem .15rem 0;
            height: 1.13rem;
            i {
                width: .73rem;
                height: .73rem;
                float: left;
                background-image: url('../assets/images/icons/icon-total.png');
                background-size: 4.64rem 7.52rem;
                background-repeat: no-repeat;
                background-position: 0 -.78rem;
            }
            p {
                float: left;
                line-height: .73rem;
                margin-left: .2rem;
            }
        }
    }

    .btn-get {
        margin-top: 2.04rem;
    }
</style>
<script>
	import processComponents from '@/components/process'
	import dialogComponents from '@/components/dialog'
	import router from '@/router'
	import cookie from '@/common/cookie'

	export default{
		data(){
			return {
				monthList: undefined,
				currentChoose: {
					index: undefined,
				},
				isFree: !!cookie.getCookie('isFree'),
				totalPay: 0,
				process: this.$route.query.process ? true : false,
				repay: this.$route.query.repay ? true : false,
				hasChoose: false,
				dialogShow: false,
				btnContent: '',
				dialogContent: undefined
			}
		},
		methods: {
			bindWXJSSDK: function () {
				var $this = this;
				function wxJssdkInit() {
					$this.$axios.get('/proxy/wxconfig').then(function (res) {
						if (res.data.code == 0) {
							$this.configData = res.data.data;
							wx.config({
								debug: false,
								appId: $this.configData.appId,
								timestamp: $this.configData.timestamp,
								nonceStr: $this.configData.nonceStr,
								signature: $this.configData.signature,
								jsApiList: ['chooseWXPay']
							})
							wx.error(function(res){
								console.log(res)
								// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
							});
						}
					})
				}

				if (typeof WeixinJSBridge == 'undefined') {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', wxJssdkInit, false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', wxJssdkInit);
						document.attachEvent('onWeixinJSBridgeReady', wxJssdkInit);
					}
				} else {
					wxJssdkInit();
				}
			},
			wxPay(data){
				return new Promise(function (resolve) {
					wx.chooseWXPay({
						timestamp: data.timeStamp,
						nonceStr: data.nonceStr,
						package: data.package,
						signType: data.signType,
						paySign: data.paySign,
						success: function (res) {
							// 支付成功后的回调函数
							setTimeout(function () {
								router.push({path: '/compelete',query:{ispay:true}})
							},1000)
                            resolve(res);
						},
						cancel:function(){
							router.push({path: '/profile'})
							resolve()
                        },
						fail: function (err) {
							console.log(err)
							resolve()
						}
					});
				})
			},
			isWeiXin: function () {
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					return true;
				} else {
					return false;
				}
			},
			chooseMonth: function (index, item) {
				this.currentChoose.index = index;
				this.currentChoose.month = item.month;
				this.totalPay = item.total;
			},
			getPayList: function () {
				var $this = this;
				return new Promise(function (resolve) {
					$this.$axios.post('/api/order/payinfo').then(function (response) {
						var result = response.data;
						if (result.header.code === '0') {
							resolve(result)
						} else {
							$this.$tips(result.header.msg)
							resolve()
						}
					}).catch(function (error) {
					});
				})

			},
			goPay: function (data) {
				var $this = this
				return new Promise(function (resolve) {
					$this.$axios.post('/api/order/pay', data).then(function (response) {
						var rlt = response.data;
						if (rlt.header.code === '0') {
							resolve(rlt)
						} else {
							resolve()
						}
					})
				})
			},
			submit: function () {
				var $this = this, data;
				if (!this.canSubmit) {
					return
				}
				if (this.repay || !this.isFree) {
					data = {
						amount: $this.totalPay,
						busineType: '1',
						month: $this.currentChoose.month,
						uid: $this.user.uid,
					};
					if(this.isWeiXin()){
						data.payType = '2'
						data.openId = $this.user.openid
                    }else{
						data.payType = '1'
                    }
					if (this.repay) {
						var set = {
							name: $this.repay ? 'repay' : (this.isFree ? 'use' : 'pay'),
							type: 'event',
						};
						this.$log(set)
					}
                    $this.goPay(data).then(function (result) {
                        if(result){
                            if ($this.isWeiXin()) {
                                $this.wxPay(result.config).then(function (rlt) {
	                                /*if(rlt.errMsg === 'chooseWXPay:ok'){
		                                setTimeout(function () {
			                                router.push({path: '/compelete'})
		                                },1000)
	                                }*/
                                })
                            } else{
                                location.replace(result.payUrl)
                            }
                        }
                    })
				} else {
					router.push({path: '/compelete', query: $this.$route.query})
				}
			},
			know: function () {
				this.dialogShow = false;
				router.push({path: '/compelete', query: this.$route.query})
			}
		},
		created: function () {
			var $this = this;
			this.$store.commit('setIndex', true)
			if (this.repay) {
				this.$store.commit('setTitle', '服务续费')
				this.btnContent = '立即续费';
			} else {
				if (this.isFree) {
					this.$store.commit('setTitle', '0元使用');
					this.btnContent = '立即使用';
				} else {
					this.$store.commit('setTitle', '开通服务');
					this.btnContent = '立即开通';
				}
			}
			this.getPayList().then(function (result) {
				if (result) {
					$this.currentChoose.index = 0;
					$this.hasChoose = true;//直接修改canSubmit变量vue会提示错误
					if ($this.repay) {
						//会员续费
						$this.monthList = result.list;
						$this.monthList.forEach(function (item) {
							item.discount === '0' && (item.discount = 10)
							item.total = (item.month * result.monthAmount * item.discount * 0.1).toFixed(2);
							item.dispay = (item.month * result.monthAmount - item.total).toFixed(2);
						})
						$this.currentChoose.month = $this.monthList[0].month;
						$this.totalPay = $this.monthList[0].total;
					} else {
						if ($this.isFree) {
							var month = new Date().getMonth() === 8 ? 1 : 2;
							$this.monthList = [{
								total: 0,
								month: month,
								dispay: (month * result.monthAmount).toFixed(2),
							}]
						} else {
							//开通会员 3个月
							var monthList = result.list;
							$this.monthList = monthList.filter(function (item) {
								item.discount === '0' && (item.discount = 10)
								item.total = (item.month * result.monthAmount * item.discount * 0.1).toFixed(2);
								item.dispay = (item.month * result.monthAmount - item.total).toFixed(2);
								return item.month === '3'
							})
							$this.currentChoose.month = $this.monthList[0].month;
							$this.totalPay = $this.monthList[0].total;
						}
					}
				}
			})
			this.$store.commit('setIcon', {back: true, question: false, profile: false})
			this.$store.commit('setFooter', false)
			this.bindWXJSSDK()
		},
		computed: {
			// 能否提交
			canSubmit: function () {
				if (this.hasChoose) {
					return true
				}
				else {
					return false
				}
			},
			user(){
				return this.$store.state.user
			}
		},
		components: {
			processComponents,
			dialogComponents
		},
	}
</script>
