<template>
    <div class="card-process bottom-bg">
        <div class="process-image" v-show="!isMake">
            <img src="../assets/images/icons/icon-make.png" v-show="!isCompelete">
            <img src="../assets/images/icons/icon-compelete.png" v-show="isCompelete">
            <p>当前手机号：{{user.phone}}</p>
        </div>
        <div class="card-content" v-show="isMake">
            <div class="title">
                <i></i>
                <span>当前手机号：{{user.phone}}</span>
            </div>
        </div>
        <div class="process-image" v-if="isFree">
            <div class="card-parent">
                <span :class="{'doing':current === 1,'done':current > 1}"></span>
            </div>
            <i class="isfree"></i>
            <div class="card-parent">
                <span :class="{'undo':current < 2,'doing':current === 2,'done':current > 2}"></span>
            </div>
            <i class="isfree"></i>
            <div class="card-parent">
                <span :class="{'undo':current < 3,'doing':current === 3,'done':current > 3}"></span>
            </div>
        </div>
        <div class="process-image" v-else>
            <div class="card-parent">
                <span :class="{'doing':current === 1,'done':current > 1}"></span>
            </div>
            <i></i>
            <div class="card-parent">
                <span :class="{'undo':current < 2,'doing':current === 2,'done':current > 2}"></span>
            </div>
            <i></i>
            <div class="card-parent">
                <span :class="{'undo':current < 3,'doing':current === 3,'done':current > 3}"></span>
            </div>
            <i></i>
            <div class="card-parent">
                <span :class="{'undo':current < 4,'doing':current === 4,'done':current > 4}"></span>
            </div>
        </div>
        <ul class="process-text">
            <li v-for="item in stepList" :class="{true:'lifree'}[isFree]">{{item.value}}</li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    .card-process {
        padding: .4rem 0;
        p {
            text-align: center;
        }
        img {
            display: block;
            width: 1.4rem;
            margin: 0 auto .2rem;
        }
        .card-content {
            padding: 0 .2rem .4rem;
        }
        .process-image {
            display: table;
            //height: .2rem;
            margin: 0 auto .39rem;
            .card-parent, i {
                float: left
            }
            .card-parent {
                position: relative;
                width: .2rem;
                height: .2rem;
                .undo {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ccc;
                    border-radius: 50%;
                }
                .doing {
                    position: absolute;
                    top: -.19rem;
                    left: -0.19rem;
                    width: .58rem;
                    height: .58rem;
                    background-image: url('../assets/images/icons/icon-total.png');
                    background-size: 4.64rem 7.52rem;
                    background-repeat: no-repeat;
                    background-position: 0 -6.94rem;
                }
                .done {
                    background-color: #ff9129;
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            i {
                width: 1.48rem;
                height: 0;
                border-top: 1px solid #ccc;
                margin: .09rem 0;
                &.isfree {
                    width: 2.2rem;
                }
            }
        }
        .process-text {
            display: table;
            text-align: center;
            margin: 0 auto;
            li {
                width: 1.68rem;
                &.lifree {
                    width: 2.4rem;
                }
            }
        }
    }
</style>
<script>
	export default{
		props: {
			current: {
				required: true
			},
			isFree: {
				default: false
			},
			isCompelete: {
				default: false
			},
		},
		data(){
			return {
				isMake:this.$route.path === '/make' ? true : false,
				stepList: this.isFree ? [
					{value: '制作名片'},
					{value: '0元使用'},
					{value: '提交完成'}
				] : [
					{value: '验证号码'},
					{value: '制作名片'},
					{value: '开通服务'},
					{value: '提交完成'}
				]
			}
		},
		methods: {},
		created: function () {
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