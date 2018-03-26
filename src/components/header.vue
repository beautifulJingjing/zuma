<template>
    <div class="print-header" :class="{true:'index-page'}[isIndex]" v-if="isIndex">
        <div>
            <div class="back" @click="back()" v-if="icon.back"><i></i></div>
            <h3>{{title}}</h3>
            <div class="profile" v-if="icon.profile"><a @click="goProfile()"></a></div>
            <div class="question" v-if="icon.question">
                <router-link :to="{path:'/question'}"></router-link>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .print-header{
        //padding: 0.25rem .2rem;
        &.index-page{
            background-color: #3170eb;
            h3{
                color:#fff;
            }
        }
        background-color: #fff;
        overflow: hidden;
        height: .94rem;
        width:100%;
        position:fixed;
        top:0;
        left:0;
        z-index:1000;
        .back,.question,.profile{
            padding:.25rem .2rem;
            a,i{
                display:block;
                color:#fff;
                background-image: url('../assets/images/icons/icon-total.png');
                background-size: 4.64rem 7.52rem;
                background-repeat: no-repeat;
            }
        }
        h3{
            display:block;
            color:#686868;
            width:6rem;
            text-align: center;
            font-size:0.32rem;
            position:absolute;
            top: 50%;
            margin-top:-.2rem;
            left:50%;
            transform: translateX(-50%);
        }
        .back{
            width:.7rem;
            height: .94rem;
            float:left;
            i{
                width:.23rem;
                height:.41rem;
                background-position: 0 -5.88rem;
            }
        }
        .question{
            a{
                width:.46rem;
                height:.45rem;
                background-position: -.24rem -5.84rem;
            }
            float:right;
        }
        .profile{
            a{
                width:.44rem;
                height:.45rem;
                background-position: -.71rem -5.84rem;
            }
            float:right;
        }
    }
</style>
<script>
	import router from '@/router'

	export default{
		data(){
			return{
			}
		},
		methods:{
			back:function(){
				history.back()
			},
			goProfile:function () {
				delete sessionStorage.userInfo;
                router.push({path:'/profile'})
			}
		},
		created:function(){
		},
		computed:{
			title(){
				return this.$store.state.title
			},
            icon(){
				return this.$store.state.icon
            },
			isIndex(){
				return this.$store.state.isIndex
			}
		},
		components:{

		},

	}
</script>
