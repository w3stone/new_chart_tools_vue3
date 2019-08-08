<template>
    <div class="error_page error_404">
        <div class="error_box center">
            <ul class="error_logo">
                    <li><img :src="imgDomain + '/num_4.png'" /></li>
                    <li class="error_logo_middle"><img :src="imgDomain + '/medical.png'" /></li>
                    <li><img :src="imgDomain + '/num_4.png'" /></li>
                </ul>
            <p class="bottom_line"></p>
            <h3 class="not_found">没有找到您要访问的页面
                <p v-show="jumpShow" style="display:inline-block">,
                    <span class="second" id="second">{{ countDown }}</span>秒后
                    <router-link to="/" >返回首页</router-link>
                </p>
            </h3>
        </div>
    </div>
</template>

<script>
	export default {
        name:'page404',
        data(){
            return {
                mainUrl: "/hospital", //主页
                countDown: 5,
                timer: null, //定时器
                jumpShow: true, //是否自动跳转
                imgDomain: ""
            }
        },
        mounted(){
            //如果路由含有404, 则不执行自动跳转
            let path = this.$route.path;
            if(path.indexOf("/404")>-1){
                this.jumpShow = false;
                return false;
            }

            //倒计时
            this.timer = setInterval(()=>{
                if(this.countDown>1){
                    this.countDown--;
                }else{
                    clearInterval(this.timer);
                    //刷新页面
                    this.$router.replace(this.mainUrl);
                }
            }, 1000);
        },
        destroyed(){
            clearInterval(this.timer);
        }
	}
</script>