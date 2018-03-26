<!-- 首页内容渲染 -->
<template>
    <div class="dialog-control">
        <div class="dialog-mask" @touchmove.prevent >
            <div class="dialog-content">
                <p class="bolder" :class="{1:'failed',2:'success'}[dialogContent.type]">{{dialogContent.title}}</p>
                <p class="dialog-text">{{dialogContent.content}}</p>
                <div class="btn">
                    <span class="btn-nosubmit" @click="goMake()">重新制作</span>
                    <span class="btn-submit" @click="goProfile()">我知道了</span>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="less" scoped>
    .dialog-control{
        .dialog-mask{
            position:fixed;
            background-color:rgba(0,0,0,0.5);
            height:100%;
            width:100%;
            top:0;
            bottom:0;
            left:0;
            z-index: 1001;
        }
        .dialog-content{
            width:5.2rem;
            //height:4.12rem;
            border-radius:.45rem;
            padding: 1.1rem .2rem .4rem;
            position: fixed;
            top:4.2rem;
            left:50%;
            transform: translateX(-50%);
            background-color: #fff;
            background-image: url('../assets/images/dialog-head.png');
            background-size: 5.2rem .69rem;
            background-repeat: no-repeat;
            background-position: 0 0;
            z-index: 1002;
            p{
                font-size:.34rem;
                text-align: center;
                line-height: .36rem;
                &.bolder{
                    font-weight: bold;
                    margin-bottom: .25rem;
                }
                &.dialog-text{
                    font-size:.26rem;
                    color: #8593bb;
                    //text-align: left;
                }
                &.success{
                    color: #387bee;
                }
                &.failed{
                    color: #f95818;
                }
            }
            .btn{
                width:100%;
                height:.7rem;
                padding:0 .2rem;
                margin:.6rem auto 0;
                .btn-nosubmit{
                    color:#387bee;
                    margin-right:.4rem;
                }
                span{
                    width:2rem;
                    line-height: .7rem;
                    padding:0;
                    font-size:.25rem;
                    float:left;
                }
            }
        }
    }
</style>
<script>
	export default{
		props:['dialogContent','goMake','goProfile'],
		data(){
			return{

			}
		},
		methods:{

		},
		created:function(){

		},
		computed:{

		},
		components:{

		},

	}
</script>
