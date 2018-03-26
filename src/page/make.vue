<!-- 首页内容渲染 -->
<template>
    <!--<div class="make-view" @touchmove="btnClose()" @touchend="btnClose(true)">-->
    <div class="make-view">
        <processComponents :current="isFree ? 1 : 2" :isFree="isFree"></processComponents>
        <div class="card-content bottom-bg">
            <div class="title">
                <i></i>
                <span>填写内容</span>
            </div>
            <div class="content-control">
                <div class="input-control">
                    <label class="input-one"></label>
                    <input type="text" maxlength="20" v-model="company"
                           placeholder="请输入您的店名/公司名(字数上限20)" @focus="scroll()">
                    <i>*</i>
                    <!--<i class="input-clear" @click="clear('company')" v-if="company.length"></i>-->
                </div>
                <div class="input-control">
                    <label class="input-three"></label>
                    <input type="text" maxlength="20" v-model="address"
                           placeholder="请输入您的公司地址(字数上限20)" @focus="scroll(2)">
                    <i>*</i>
                </div>
                <div class="input-control">
                    <label class="input-two"></label>
                    <input type="text" maxlength="4" v-model="name"
                           placeholder="请输入您的名字(字数上限4)" @focus="scroll(1)">
                </div>
            </div>
        </div>
        <div class="card-content">
            <div class="call-content">
                <div class="title">
                    <i></i>
                    <span>模板预览</span>
                </div>
                <div class="show-control">
                    <div class="show-title">
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
        <div class="btn" v-show="!isTouch">
            <a :class="{true:'btn-submit',false:'btn-nosubmit'}[canSubmit]" @click="next()"
                  v-text="{true:'确认修改',false:'下一步'}[!!$route.query.ischange]"></a>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .make-view {
        padding-bottom: 1.34rem;
    }

    .content-control {
        .input-control {
            border: 1px solid #ccc;
            border-radius: .1rem;
            height: .92rem;
            width: 100%;
            padding: .1rem .2rem .1rem 1.08rem;
            position: relative;
            margin-bottom: .18rem;
            &:last-child {
                margin-bottom: 0;
            }
            input:-ms-input-placeholder {
                color: #8593bb;
            }
            input::-webkit-input-placeholder {
                color: #8593bb;
            }
            input {
                width: 5.4rem;
                height: 100%;
                //line-height:.9rem;
                background-color: transparent;
                color: #4f566a;
            }

            label {
                width: .68rem;
                height: .68rem;
                position: absolute;
                top: .1rem;
                left: .2rem;
                background-image: url('../assets/images/icons/icon-total.png');
                background-size: 4.64rem 7.52rem;
                background-repeat: no-repeat;
                &.input-one {
                    background-position: 0 0;
                }
                &.input-two {
                    background-position: -.68rem 0;
                }
                &.input-three {
                    background-position: -1.36rem 0;
                }
            }
            i {
                width: .16rem;
                height: .16rem;
                display: block;
                position: absolute;
                right: .12rem;
                color: #ff2e2e;
                font-size: .4rem;
                line-height: .4rem;
                top: .35rem;
                &.input-clear {
                    position: absolute;
                    right: .09rem;
                    top: .32rem;
                    width: .29rem;
                    height: .29rem;
                    background-position: 0 -5.47rem;
                    background-image: url('../assets/images/icons/icon-total.png');
                    background-size: 4.64rem 7.52rem;
                    background-repeat: no-repeat;
                }
            }
        }
    }

    .btn {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
    }
</style>
<script>
	import processComponents from '@/components/process'
	import router from '@/router'
	import cookie from '@/common/cookie'

	export default{
		data(){
			return {
				company: '',
				name: '',
				address: '',
				isTouch: false,
				isFree: !!cookie.getCookie('isFree'),
				smsData: undefined,
				goShow: undefined,
				comeShow: undefined,
			}
		},
		methods: {
			scroll:function (type) {
                if(type){window.scrollTo(0,170)}
				else{window.scrollTo(0,100)}
			},
			pushUser: function (uid) {
				var $this = this, data = {
					uid: uid,
					companyName: this.company,
					name: this.name,
					address: this.address
				}
				return new Promise(function (resolve) {
					$this.$axios.post('/api/user/changecard', data).then(function (response) {
						var result = response.data;
						if (result.header.code === '0') {
							resolve(result)
						} else {
							$this.$tips(result.header.msg)
							resolve()
						}
					}).catch(function (error) {
						resolve()
					});
				})
			},
			getTemplate: function () {
				var $this = this;
				return new Promise(function (resolve) {
					$this.$axios.post('/api/template/gettemplate').then(function (response) {
						var rlt = response.data;
						if (rlt.header && rlt.header.code === '0') {
							var templateData = rlt.list
							templateData.forEach(function (item) {
								if (item.type === 2) {
									$this.goShow = {
										content:item.content
                                    }
								} else if(item.type === 1){
									$this.comeShow =  {
										content:item.content
									}
								}else{
									$this.smsData = {
										content: item.content.split(',')[0],
										address: item.content.split(',')[1],
										imgPath:item.imgPath
									}
                                }
							})
							$this.templateData = {
								goShow: {
									content: $this.goShow.content
								},
								comeShow: {
									content: $this.comeShow.content || ''
								},
								smsData: {
									content: $this.smsData.content || '',
									address: $this.smsData.address || ''
								}
							}
							resolve();
						} else {
							$this.$tips(rlt.header.msg)
							resolve();
						}
					}).catch(function (error) {
						$this.$tips('api error')
					});
				})
			},
			next: function () {
				var $this = this
				if (!this.canSubmit) {
					return;
				}
				//老用户只能修改
				if ($this.$route.query.ischange) {
                    $this.pushUser($this.user.uid).then(function () {
	                    var set = {
		                    name: 'changCard',
		                    type: 'event'
	                    };
	                    $this.$log(set)
                        router.replace({path: '/profile'})
                    })
				} else {
					var set = {
						name: 'nextStep',
						type: 'event'
					};
					$this.$log(set)
					if (!!cookie.getCookie('new')) {
						cookie.delCookie('new')
						$this.pushUser($this.user.uid).then(function () {
							router.push({path: '/pay', query: {process: true}})
						})
					} else {
						var isChange = ($this.lastInfo.company === $this.company && $this.lastInfo.name === $this.name && $this.lastInfo.address === $this.address) ? false : true;
						if ($this.user.card.isvip === '1') {
							if (isChange) {
								$this.pushUser($this.user.uid).then(function () {
									router.push({path: '/profile'})
								})
							} else {
								router.push({path: '/profile'})
							}
						} else {
							console.log(isChange)
							if (isChange) {
								$this.pushUser($this.user.uid).then(function () {
									router.push({path: '/pay', query: {process: true}})
								})
							} else {
								router.push({path: '/pay', query: {process: true}})
							}
						}

					}
				}
			},
			templateReplace (msg) {
				let pattern = new RegExp("[`~!@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*——|{}【】\\s‘；：”“'。，、？]")
				return msg.replace(pattern, '')
			},
			clear: function (type) {
				type === 'company' && (this.company = '')
				type === 'name' && (this.name = '')
				type === 'address' && (this.address = '')
			}
		},
		created: function () {
			var $this = this;
			if(this.$route.query.ischange){
				this.$store.commit('setTitle', '修改名片')
			}else{
				this.$store.commit('setTitle', '制作名片')
            }
			this.$store.commit('setIcon', {back: true, question: false, profile: false})
			this.$store.commit('setFooter', false)
			this.$store.commit('setIndex', true)
			$this.getTemplate().then(function () {
				//已登录
				if ($this.user.card) {
                    $this.lastInfo = {
                        company: $this.user.card.company,
                        name: $this.user.card.name,
                        address: $this.user.card.address,
                    }
                    $this.user.card.company && ($this.company = $this.user.card.company);
                    $this.user.card.name && ($this.name = $this.user.card.name);
                    $this.user.card.address && ($this.address = $this.user.card.address);
					var tempcome = $this.templateData.comeShow.content,
						tempgo = $this.templateData.comeShow.content,
						tempsms = $this.templateData.smsData.content;
					if ($this.user.card.company || $this.user.card.name) {
						$this.comeShow.content = tempcome.replace('[XXX]', $this.company + $this.name)
						$this.goShow.content = tempgo.replace('[XXX]', $this.company + $this.name)
						$this.smsData.content = tempsms.replace('[XXX]', $this.company)
					}
					if ($this.user.card.address) {
						$this.smsData.address = tempsms.replace('[XXX]', $this.address)
					}
				}
			});
		},
		watch: {
			company (val) {
				this.company = this.templateReplace(this.company)
				var tempcome = this.templateData.comeShow.content,
					tempgo = this.templateData.goShow.content,
					tempsms = this.templateData.smsData.content;
				this.comeShow.content = tempcome.replace('[XXX]', this.company + this.name)
				this.goShow.content = tempgo.replace('[XXX]', this.company + this.name)
				this.smsData.content = tempsms.replace('[XXX]', this.company)
			},
			name (val) {
				this.name = this.templateReplace(this.name)
				var tempcome = this.templateData.comeShow.content,
					tempgo = this.templateData.goShow.content,
					tempsms = this.templateData.smsData.content;
				this.comeShow.content = tempcome.replace('[XXX]', this.company + this.name)
				this.goShow.content = tempgo.replace('[XXX]', this.company + this.name)
				this.smsData.content = tempsms.replace('[XXX]', this.company)
			},
			address (val) {
				this.address = this.templateReplace(this.address)
				var temp = this.templateData.smsData.address;
				this.smsData.address = temp.replace('[XXX]', this.address)
			}
		},
		computed: {
			isLogin(){
				return this.$store.getters.isLogin
			},
			user(){
				return this.$store.state.user
			},
			// 能否提交
			canSubmit: function () {
				if (this.company && this.address) {
					return true
				}
				else {
					return false
				}
			},
		},
		components: {
			processComponents
		},
	}
</script>
