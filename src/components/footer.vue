<template>
    <footer class="footer">
        <div class="contact-box">
            <i>Tel:<a href="tel:4001009440">4001009440</a></i><i class="has-border-left">QQ:706524573</i>
        </div>
        <router-link to="/feedback" class="feedback"><u>意见反馈</u></router-link>
    </footer>
</template>

<script>
	export default {

	}
</script>

<style lang="less" scoped>
    .footer {
        margin-top: .2rem;
        text-align: center;
        width:100%;
        u{
            text-decoration: underline;
            color:#4f566a;
        }
        a {
             display: inline-block;
             //margin-top: .31rem;
            color:#4f566a;
            &.feedback{
                padding:.31rem .8rem
            }
             // text-decoration: underline;都有兼容性
             //border-bottom: 0.01rem solid red;
         }
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
            background: #8c8c8c;
            left: -.36rem;
        }
    }
</style>
