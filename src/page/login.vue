<!-- 首页内容渲染 -->
<template>
    <div>
        <div class="input-control">
            <i class="input-phone"></i>
            <input type="text" class="phone" maxlength="11" v-model="phone" placeholder="请输入您的手机号"/>
            <i class="input-clear" @click="clearPhone()" v-if="phone.length"></i>
        </div>
        <div class="input-control">
            <i class="input-code"></i>
            <input type="text" class="code " v-model="code" placeholder="请输入收到的验证码"/>
            <span @click="getCheckCode()" v-if="canCode">获取验证码</span>
            <span v-else class="clicked">{{time}}S</span>
        </div>
        <div class="bottom" v-if="process">
            <div @click="login()" class="btn btn-login" >
                <span :class="{true:'btn-submit',false:'btn-nosubmit'}[canSubmit]">登 录</span>
            </div>
        </div>
        <div v-else @click="login()"  class="btn btn-login">
            <a :class="{true:'btn-submit',false:'btn-nosubmit'}[canSubmit]">登 录</a>
        </div>
        <div class="float-btn"></div>
        <dialogComponents :dialogContent="dialogContent" v-if="dialogShow" :know="know"></dialogComponents>
    </div>
</template>
<style lang="less" scoped>
    .input-control {
        margin: .1rem 0.2rem 0;
        height: 1.13rem;
        border-bottom: 1px solid #e2e2e2;
        position: relative;
        font-size: .28rem;
        position: relative;
        input:-ms-input-placeholder {
            color: #aebad1;
        }

        input::-webkit-input-placeholder {
            color: #aebad1;
        }
        input {
            width: 100%;
            padding: .41rem 0 0 .48rem;
            background-color: transparent;
            color: #4f566a;
            &.code {
                width: 4rem;
            }
        }
        .clicked {
            background-color: rgba(56, 123, 238, 0.2);
        }
        span {
            display: inline-block;
            float: right;
            margin-top: .3rem;
            background-color: #387bee;
            width: 1.54rem;
            height: 0.52rem;
            border-radius: .26rem;
            line-height: 0.52rem;
            text-align: center;
            color: #fff;
            font-size: .24rem;
        }
        i {
            display: block;
            position: absolute;
            background-image: url('../assets/images/icons/icon-total.png');
            background-size: 4.64rem 7.52rem;
            background-repeat: no-repeat;
            &.input-phone {
                left: 0rem;
                top: .42rem;
                width: .24rem;
                height: .29rem;
                background-position: 0 -5.08rem;
            }
            &.input-clear {
                right: .09rem;
                bottom: .42rem;
                width: .29rem;
                height: .29rem;
                background-position: 0 -5.47rem;
            }
            &.input-code {
                width: .26rem;
                height: .29rem;
                left: 0;
                bottom: .42rem;
                background-position: -.26rem -5.08rem;
            }
        }
    }

    .btn-login {
        margin-top: 1.36rem;
    }
</style>
<script>
	import processComponents from '@/components/process'
	import router from '@/router'
	import dialogComponents from '@/components/dialog'
	import store from '@/store'

	export default{
		data(){
			return {
				canCode: true,
				time: 60,
				phone: '',
				code: '',
				process: this.$route.query.process ? true : false,
                dialogShow:false,
				dialogContent:{
					type:2,
					title:'提交提示',
                    content:'是否更改您之前的名片',
                }
			}
		},
		methods: {
			checkPhone: function (phone) {
				if (!(/^1[34578]\d{9}$/.test(phone))) {
					return false;
				} else {
					return true;
				}
			},
			getCheckCode: function () {
				var $this = this;
				if (!$this.phone) {
					$this.$tips('请输入手机号码')
					return false;
				}
				if (!$this.checkPhone($this.phone)) {
					$this.$tips('手机号码有误，请重填')
					return false;
				}
				$this.canCode = false;
				var timer = setInterval(function () {
					$this.time--;
					if ($this.time === 0) {
						clearInterval(timer);
						$this.time = 60;
						$this.canCode = true;
					}
				}, 1000)
				this.$axios.post('/api/login/sendmsgcode',{phone:$this.phone,loading:false}).then(function (response) {
                    var result = response.data;
					if(result.header.code !== '0'){
						clearInterval(timer);
						$this.time = 60;
						$this.canCode = true;
						if(result.header.code === '203'){
							$this.$tips('手机号码有误，请重填')
						} else if(result.header.code === '204' || result.header.code === '205'){
							$this.$tips('该业务只支持移动号码')
						}else{
							$this.$tips(result.header.msg)
                        }
                    }
				}).catch(function (error) {
				});
			},
			clearPhone: function () {
				this.phone = ''
			},
            valaidCode:function () {
				var $this = this;
                return new Promise(function (resolve) {
	                $this.$axios.post('/api/login/validatecode',{code:$this.code,phone:$this.phone}).then(function (response) {
		                var result = response.data;
		                if(result.header.code === '0'){
			                resolve('ok')
                        } else{
			                $this.$tips(result.header.msg)
			                resolve()
                        }
	                }).catch(function (error) {
		                resolve()
	                });
                })
            },
            pushUser:function (uid) {
	            var $this = this,data = Object.assign({uid:uid},sessionStorage.userInfo ? JSON.parse(sessionStorage.userInfo) : {});
                console.log(data)
                delete sessionStorage.userInfo
	            return new Promise(function (resolve) {
		            $this.$axios.post('/api/user/changecard',data).then(function (response) {
			            var result = response.data;
			            if(result.header.code === '0'){
				            resolve(result)
			            } else{
				            $this.$tips(result.header.msg)
				            resolve()
			            }
		            }).catch(function (error) {
			            resolve()
		            });
	            })
            },
			login:function () {
				var $this = this;
                if(!$this.canSubmit){
                	return;
                }
				$this.valaidCode().then(function (result) {
                    var data = {
						phone:$this.phone,
	                    fromType : '2'
                    }
					$this.user.spinfoCode && $this.user.spinfoCode.length && (data.spinfoCode = $this.user.spinfoCode.length)
					if(result === 'ok'){
	                    $this.$axios.post('/api/login/loginmsg',data).then(function (response) {
		                    var rlt = response.data;
		                    if(rlt.header.code === '0'){
		                    	$this.uid = rlt.uid;
		                    	if(rlt.isvip === '1'){
		                    		console.log('是会员')
                                    router.replace({path:'/profile'})
                                }else{
				                    console.log('非会员,去制作')
                                    router.replace({path:'/make',query:{process:true}})
                                }
		                    } else{
			                    $this.$tips(rlt.header.msg)
		                    }
	                    }).catch(function (error) {
		                    //$this.$tips('api error')
	                    });
                    }
                })
			},
			know:function () {
				var $this = this;
				$this.pushUser($this.uid).then(function (resp) {
					router.push({path:'/profile'})
				})
			}
		},
		created: function () {
			if(this.user && this.user.phone){
				router.replace({path:'/profile'})
            }
			this.$store.commit('setTitle', '验证号码')
			this.$store.commit('setIcon', {back: true, false: true, profile: false})
			this.$store.commit('setFooter',false)
			this.$store.commit('setIndex',true)
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
                if(this.checkPhone(this.phone) && this.code){
					return true
                }
                else{
                	return false
                }
			}
		},
		components: {
			processComponents,
			dialogComponents
        },
	}
</script>
